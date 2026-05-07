"use client"

import { isManual, isPaypal, isStripeLike } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { ReviewTranslations } from "@content/checkout/types"
import { Button } from "@modules/common/components/ui"
import { useStripeSetup } from "@modules/checkout/components/payment-wrapper"
import {
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import ErrorMessage from "../error-message"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
  t: ReviewTranslations
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
  t,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  switch (true) {
    case isStripeLike(paymentSession?.provider_id):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
          t={t}
        />
      )
    case isPaypal(paymentSession?.provider_id):
      return (
        <PayPalPaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
          t={t}
        />
      )
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} t={t} />
      )
    default:
      return <Button disabled>{t.selectPaymentMethod}</Button>
  }
}

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
  t,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
  t: ReviewTranslations
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const stripe = useStripe()
  const elements = useElements()
  const { clientSecret } = useStripeSetup()

  const disabled = !stripe || !elements || !clientSecret

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !clientSecret || !cart) {
      setSubmitting(false)
      return
    }

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setErrorMessage(submitError.message || "An unexpected error occurred.")
      setSubmitting(false)
      return
    }

    const countryCode = cart.shipping_address?.country_code?.toLowerCase()
    const returnUrl = `${window.location.origin}/${countryCode}/order/confirmed`

    const result = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: { return_url: returnUrl },
      redirect: "if_required",
    })

    if (result.error) {
      const pi = result.error.payment_intent
      if (pi?.status === "requires_capture" || pi?.status === "succeeded") {
        return onPaymentCompleted()
      }
      setErrorMessage(result.error.message || "An unexpected error occurred.")
      setSubmitting(false)
      return
    }

    if (
      result.paymentIntent?.status === "requires_capture" ||
      result.paymentIntent?.status === "succeeded"
    ) {
      return onPaymentCompleted()
    }
  }

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        {t.placeOrder}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  )
}

const PayPalPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
  t,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
  t: ReviewTranslations
}) => {
  const [{ isPending, isResolved }] = usePayPalScriptReducer()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => setErrorMessage(err.message))
      .finally(() => setSubmitting(false))
  }

  const handleApprove = async (
    _data: OnApproveData,
    actions: OnApproveActions
  ) => {
    setSubmitting(true)
    try {
      const authorization = await actions.order?.authorize()
      if (authorization?.status !== "COMPLETED") {
        setErrorMessage(`Authorization failed: ${authorization?.status}`)
        setSubmitting(false)
        return
      }
      await onPaymentCompleted()
    } catch {
      setErrorMessage("An error occurred during PayPal authorization.")
      setSubmitting(false)
    }
  }

  if (isPending) {
    return <Button disabled size="large">{t.loadingPaypal}</Button>
  }

  if (!isResolved) {
    return <Button disabled size="large">{t.paypalUnavailable}</Button>
  }

  return (
    <div data-testid={dataTestId}>
      <PayPalButtons
        style={{ layout: "horizontal", color: "gold", shape: "rect", label: "pay" }}
        disabled={notReady || submitting}
        createOrder={() => session?.data?.paypalOrderId as string}
        onApprove={handleApprove}
        onError={(err) => setErrorMessage(String(err))}
      />
      <ErrorMessage
        error={errorMessage}
        data-testid="paypal-payment-error-message"
      />
    </div>
  )
}

const ManualTestPaymentButton = ({
  notReady,
  t,
}: {
  notReady: boolean
  "data-testid"?: string
  t: ReviewTranslations
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = () => {
    setSubmitting(true)
    onPaymentCompleted()
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
      >
        {t.placeOrder}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
