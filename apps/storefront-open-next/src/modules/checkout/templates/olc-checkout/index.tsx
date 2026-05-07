"use client"

import {
  applyPromotions,
  initiatePaymentSession,
  placeOrder,
  setAddresses,
  setShippingMethod,
} from "@lib/data/cart"
import { isPaypal, isStripeLike } from "@lib/constants"
import { convertToLocale } from "@lib/util/money"
import { useStripeSetup } from "@modules/checkout/components/payment-wrapper"
import Spinner from "@modules/common/icons/spinner"
import { HttpTypes } from "@medusajs/types"
import type {
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js"
import { PayPalButtons as PayPalButtonsComponent } from "@paypal/react-paypal-js"
import { ExpressCheckoutElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import Image from "next/image"
import { useEffect, useState } from "react"

/* ─── types ────────────────────────────────────────────────── */

type Props = {
  cart: HttpTypes.StoreCart
  customer: HttpTypes.StoreCustomer | null
  shippingMethods: HttpTypes.StoreCartShippingOption[]
  availablePaymentMethods: { id: string }[]
  countryCode: string
}

/* ─── small shared primitives ──────────────────────────────── */

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label className="block text-[13px] font-semibold text-gray-700 mb-1">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  )
}

function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className="w-full border border-gray-300 rounded-[3px] px-3 py-[9px] text-sm text-gray-800 focus:outline-none focus:border-gray-500 focus:ring-0 bg-white"
    />
  )
}

/* ─── Card brand mini-logos (pure SVG) ─────────────────────── */

function VisaIcon() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded border border-gray-200">
      <rect width="34" height="22" rx="3" fill="#1A1F71"/>
      <path d="M14.2 15.6H12l1.4-8.2h2.2L14.2 15.6zM10.6 7.4 8.5 12.8l-.2-1.2-.8-3.8S7.4 7 6.4 7H2.8l-.1.2s1.2.3 2.6 1.1l2.1 7.3H9.8l3.2-8.2h-2.4zM27 15.6h1.9l-1.7-8.2h-1.7c-.9 0-1.1.6-1.1.6l-3.1 7.6h2.3l.5-1.2h2.8l.1 1.2zm-2.5-3 1.2-3 .7 3h-1.9zM22.2 8.8l.3-1.7S21.2 7 20 7c-1.4 0-4.7.6-4.7 3.5 0 2.7 3.8 2.7 3.8 4 0 1.2-3.4 1-4.5.2l-.3 1.8s1.3.6 3.3.6c2 0 5-.9 5-3.7 0-2.9-3.8-3.1-3.8-4 0-.9 2.6-1.2 3.4-.6z" fill="white"/>
    </svg>
  )
}

function MastercardIcon() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded border border-gray-200">
      <rect width="34" height="22" rx="3" fill="white"/>
      <circle cx="13" cy="11" r="6" fill="#EB001B"/>
      <circle cx="21" cy="11" r="6" fill="#F79E1B"/>
      <path d="M17 6.8a6 6 0 010 8.4A6 6 0 0117 6.8z" fill="#FF5F00"/>
    </svg>
  )
}

function AmexIcon() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded border border-gray-200">
      <rect width="34" height="22" rx="3" fill="#2557D6"/>
      <text x="4" y="15" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">AMEX</text>
    </svg>
  )
}

function GPay() {
  return (
    <span className="inline-flex items-center bg-white border border-gray-300 rounded px-2 py-0.5 text-[11px] font-medium text-gray-700 tracking-tight">
      <span style={{ color: "#4285F4", fontWeight: 700 }}>G</span>
      <span className="ml-0.5">Pay</span>
    </span>
  )
}

function PayPalLogoInline() {
  return (
    <svg height="20" viewBox="0 0 101 32" xmlns="http://www.w3.org/2000/svg">
      <path fill="#009cde" d="M12.237 2.819C11.237 1.614 9.437 1 7.037 1H1.219L0 9.168h4.219c1.5 0 2.6-.3 3.3-1 .7-.7 1.1-1.7 1.3-3 .2-1.4 0-2.4-.582-3.349z"/>
      <path fill="#003087" d="M37.5 1h-5.8l-3.8 24h5.8l3.8-24zM18.7 1h-5.8l-3.8 24H15l3.7-24z"/>
      <path fill="#009cde" d="M60 1h-5.8L50.4 25h5.8L60 1z"/>
    </svg>
  )
}

function LockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  )
}

function ApplePayButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-[46px] bg-black rounded-[6px] flex items-center justify-center gap-2 overflow-hidden"
      style={{ minWidth: 121 }}
    >
      <svg width="16" height="20" viewBox="0 0 814 1000" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-27.3-161.5-90c-64.4-72.2-126.1-183.7-126.1-289.3 0-186.2 120.9-284.7 239.9-284.7 61.2 0 112.1 40.5 149.9 40.5 36.3 0 93.8-42.9 164.5-42.9 25.3 0 108.2 2.9 164.5 109.2zm-234.5-161c30.9-36.4 53.2-87.1 53.2-137.9 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.1-55.1 134.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.4-71.7z"/>
      </svg>
      <span className="text-white text-[15px] font-medium"> Pay</span>
    </button>
  )
}

/* ─── Main component ───────────────────────────────────────── */

export default function OlcCheckout({
  cart,
  customer,
  shippingMethods,
  availablePaymentMethods,
  countryCode,
}: Props) {
  const stripe = useStripe()
  const elements = useElements()
  const { clientSecret, setClientSecret } = useStripeSetup()

  const stripeMethod = availablePaymentMethods.find((m) => isStripeLike(m.id))
  const paypalMethod = availablePaymentMethods.find((m) => isPaypal(m.id))
  const manualMethod = availablePaymentMethods.find(
    (m) => !isStripeLike(m.id) && !isPaypal(m.id)
  )

  /* ── form state ── */
  const [formData, setFormData] = useState({
    first_name:   cart?.shipping_address?.first_name  || customer?.first_name || "",
    last_name:    cart?.shipping_address?.last_name   || customer?.last_name  || "",
    country_code: cart?.shipping_address?.country_code || cart?.region?.countries?.[0]?.iso_2 || "",
    address_1:    cart?.shipping_address?.address_1   || "",
    address_2:    cart?.shipping_address?.address_2   || "",
    postal_code:  cart?.shipping_address?.postal_code || "",
    city:         cart?.shipping_address?.city        || "",
    phone:        cart?.shipping_address?.phone       || "",
    email:        cart?.email || customer?.email      || "",
    notes:        "",
  })

  const [selectedMethod, setSelectedMethod] = useState(
    stripeMethod?.id || paypalMethod?.id || manualMethod?.id || ""
  )
  const [visualMethod, setVisualMethod] = useState<"card" | "google_pay">("card")
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [couponOpen, setCouponOpen] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [couponError, setCouponError] = useState("")
  const [couponLoading, setCouponLoading] = useState(false)

  /* ── helpers ── */
  const field = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleMethodSelect = async (id: string) => {
    setSelectedMethod(id)
    if (isStripeLike(id) && !clientSecret) {
      try {
        const result = await initiatePaymentSession(cart, { provider_id: id })
        const session = result?.payment_collection?.payment_sessions?.find(
          (s: { status: string }) => s.status === "pending"
        )
        const secret = session?.data?.client_secret as string | undefined
        if (secret) setClientSecret(secret)
      } catch {}
    }
  }

  /* ── Google Pay express confirm ── */
  const handleExpressConfirm = async () => {
    if (!stripe || !elements) return
    setIsLoading(true)
    try {
      await prepareCart()

      let secret = clientSecret
      if (!secret) {
        const result = await initiatePaymentSession(cart, { provider_id: selectedMethod })
        const session = result?.payment_collection?.payment_sessions?.find(
          (s: { status: string }) => s.status === "pending"
        )
        secret = session?.data?.client_secret as string | undefined
        if (secret) setClientSecret(secret)
      }

      if (!secret) {
        setError("Could not initiate payment session.")
        setIsLoading(false)
        return
      }

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: secret,
        confirmParams: {
          return_url: `${window.location.origin}/${countryCode}/order/confirmed`,
        },
        redirect: "if_required",
      })

      if (error) {
        setError(error.message || "Google Pay payment failed.")
        setIsLoading(false)
        return
      }

      await placeOrder()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setIsLoading(false)
    }
  }

  /* ── address + shipping helper (used by both Stripe and PayPal paths) ── */
  const prepareCart = async () => {
    const fd = new FormData()
    fd.set("shipping_address.first_name", formData.first_name)
    fd.set("shipping_address.last_name",  formData.last_name)
    fd.set("shipping_address.address_1",  formData.address_1)
    fd.set("shipping_address.address_2",  formData.address_2)
    fd.set("shipping_address.postal_code", formData.postal_code)
    fd.set("shipping_address.city",       formData.city)
    fd.set("shipping_address.country_code", formData.country_code)
    fd.set("shipping_address.province",   "")
    fd.set("shipping_address.phone",      formData.phone)
    fd.set("email",                       formData.email)
    fd.set("same_as_billing",             "on")

    const addrErr = await setAddresses(null, fd)
    if (addrErr) throw new Error(String(addrErr))

    if (shippingMethods?.[0]?.id) {
      await setShippingMethod({
        cartId: cart.id,
        shippingMethodId: shippingMethods[0].id,
      })
    }
  }

  /* ── main Stripe submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!termsAccepted) {
      setError("Please accept the terms and conditions to proceed.")
      return
    }
    setError(null)
    setIsLoading(true)

    try {
      await prepareCart()

      if (isStripeLike(selectedMethod)) {
        if (!stripe || !elements) {
          setError("Payment provider not initialized.")
          setIsLoading(false)
          return
        }

        let secret = clientSecret
        if (!secret) {
          const result = await initiatePaymentSession(cart, { provider_id: selectedMethod })
          const session = result?.payment_collection?.payment_sessions?.find(
            (s: { status: string }) => s.status === "pending"
          )
          secret = session?.data?.client_secret as string | undefined
          if (secret) setClientSecret(secret)
        }

        if (!secret) {
          setError("Could not initiate payment session.")
          setIsLoading(false)
          return
        }

        const { error: submitError } = await elements.submit()
        if (submitError) {
          setError(submitError.message || "Payment failed.")
          setIsLoading(false)
          return
        }

        const result = await stripe.confirmPayment({
          clientSecret: secret,
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/${countryCode}/order/confirmed`,
          },
          redirect: "if_required",
        })

        if (result.error) {
          const pi = result.error.payment_intent
          if (pi?.status === "requires_capture" || pi?.status === "succeeded") {
            await placeOrder()
            return
          }
          setError(result.error.message || "Payment failed.")
          setIsLoading(false)
          return
        }

        if (
          result.paymentIntent?.status === "requires_capture" ||
          result.paymentIntent?.status === "succeeded"
        ) {
          await placeOrder()
          return
        }
      } else if (isPaypal(selectedMethod)) {
        setError("Please use the PayPal button below to complete your order.")
        setIsLoading(false)
      } else {
        await placeOrder()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setIsLoading(false)
    }
  }

  /* ── PayPal createOrder: set cart up first, then create session ── */
  const paypalCreateOrder = async () => {
    if (!termsAccepted) {
      setError("Please accept the terms and conditions to proceed.")
      throw new Error("Terms not accepted")
    }
    setError(null)
    await prepareCart()
    const result = await initiatePaymentSession(cart, {
      provider_id: paypalMethod!.id,
    })
    const session = result?.payment_collection?.payment_sessions?.find(
      (s: { status: string }) => s.status === "pending"
    )
    return session?.data?.paypalOrderId as string
  }

  const paypalOnApprove = async (
    _data: OnApproveData,
    actions: OnApproveActions
  ) => {
    setIsLoading(true)
    try {
      const auth = await actions.order?.authorize()
      if (auth?.status !== "COMPLETED") {
        setError(`Authorization failed: ${auth?.status}`)
        return
      }
      await placeOrder()
    } catch {
      setError("An error occurred during PayPal payment.")
    } finally {
      setIsLoading(false)
    }
  }

  /* ── coupon ── */
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return
    setCouponLoading(true)
    setCouponError("")
    try {
      const current = (cart.promotions || [])
        .filter((p) => p.code)
        .map((p) => p.code!)
      await applyPromotions([...current, couponCode.trim()])
      setCouponCode("")
    } catch (e) {
      setCouponError(e instanceof Error ? e.message : String(e))
    } finally {
      setCouponLoading(false)
    }
  }

  /* ── derived ── */
  const isStripeSelected = isStripeLike(selectedMethod)
  const isPaypalSelected = isPaypal(selectedMethod)
  const currency = cart.currency_code

  const placeOrderDisabled =
    isLoading ||
    !termsAccepted ||
    (isStripeSelected && !cardComplete && visualMethod !== "google_pay")

  /* ══════════════════════════════════════════════════════════ */
  /*  RENDER                                                    */
  /* ══════════════════════════════════════════════════════════ */
  return (
    <>
      {/* Express-checkout CSS injected once */}
      <style>{`
        fieldset:has(> legend.banner-title) {
          border: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        legend.banner-title {
          float: none !important;
          width: 100% !important;
          text-align: center !important;
          font-size: 12px !important;
          font-weight: 400 !important;
          color: #999 !important;
          padding: 0 0 8px 0 !important;
          margin: 0 !important;
          letter-spacing: 0.02em !important;
        }
        ul.wc_stripe_checkout_banner_gateways {
          display: flex !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          align-items: stretch !important;
          gap: 6px 10px !important;
          padding: 0 !important;
          margin: 0 0 16px 0 !important;
          list-style: none !important;
        }
        ul.wc_stripe_checkout_banner_gateways > li[style*="display: list-item"],
        ul.wc_stripe_checkout_banner_gateways > li[style*="display:list-item"] {
          flex: 1 1 161px !important;
          min-width: 121px !important;
          max-width: 100% !important;
          margin: 0 !important;
          overflow: hidden !important;
          border-radius: 6px !important;
        }
        ul.wc_stripe_checkout_banner_gateways > li[style*="display: list-item"]:first-child,
        ul.wc_stripe_checkout_banner_gateways > li[style*="display:list-item"]:first-child {
          flex-basis: 100% !important;
        }
        ul.wc_stripe_checkout_banner_gateways > li {
          position: relative !important;
          z-index: 0 !important;
        }
      `}</style>

      <form
        onSubmit={handleSubmit}
        className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-x-10 gap-y-8 items-start"
      >
        {/* ╔══════════════════════════════════════╗
            ║  LEFT COLUMN                         ║
            ╚══════════════════════════════════════╝ */}
        <div>
          {/* ── Express Checkout ── */}
          <fieldset>
            <legend className="banner-title">Express Checkout</legend>
            <ul className="wc_stripe_checkout_banner_gateways">
              {/* Google Pay / Apple Pay via Stripe ExpressCheckoutElement */}
              {stripeMethod && mounted && (
                <li style={{ display: "list-item" }}>
                  <ExpressCheckoutElement
                    onConfirm={handleExpressConfirm}
                    onReady={({ availablePaymentMethods }) => {
                      console.log("Express checkout available methods:", availablePaymentMethods)
                    }}
                    options={{
                      paymentMethods: {
                        googlePay: "always",
                        applePay: "always",
                        link: "never",
                        amazonPay: "never",
                      },
                      buttonHeight: 46,
                    }}
                  />
                </li>
              )}
              {/* PayPal express */}
              {paypalMethod && (
                <li style={{ display: "list-item" }}>
                  <PayPalButtonsComponent
                    style={{
                      layout: "horizontal",
                      color: "gold",
                      shape: "rect",
                      label: "pay",
                      height: 46,
                      tagline: false,
                    }}
                    createOrder={paypalCreateOrder}
                    onApprove={paypalOnApprove}
                    onError={(err) => setError(String(err))}
                  />
                </li>
              )}
            </ul>
          </fieldset>

          {/* ── OR divider ── */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400 font-normal">Or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* ── Billing details ── */}
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            Billing details
          </h2>

          {/* First name / Last name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <FieldLabel required>First name</FieldLabel>
              <TextInput
                name="first_name"
                value={formData.first_name}
                onChange={field}
                autoComplete="given-name"
                required
              />
            </div>
            <div>
              <FieldLabel required>Last name</FieldLabel>
              <TextInput
                name="last_name"
                value={formData.last_name}
                onChange={field}
                autoComplete="family-name"
                required
              />
            </div>
          </div>

          {/* Country */}
          <div className="mb-4">
            <FieldLabel required>Country / Region</FieldLabel>
            <div className="relative">
              <select
                name="country_code"
                value={formData.country_code}
                onChange={field}
                required
                className="w-full border border-gray-300 rounded-[3px] px-3 py-[9px] text-sm text-gray-800 focus:outline-none focus:border-gray-500 bg-white appearance-none pr-8"
              >
                <option value="" disabled>Select a country…</option>
                {cart.region?.countries?.map((c) => (
                  <option key={c.iso_2} value={c.iso_2}>{c.display_name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg className="h-4 w-4 text-gray-500" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 11L3 6h10l-5 5z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Street address */}
          <div className="mb-4">
            <FieldLabel required>Street address</FieldLabel>
            <div className="flex flex-col gap-[12px]">
              <TextInput
                name="address_1"
                value={formData.address_1}
                onChange={field}
                placeholder="House number and street name"
                autoComplete="address-line1"
                required
              />
              <TextInput
                name="address_2"
                value={formData.address_2}
                onChange={field}
                placeholder="Apartment, suite, unit, etc. (optional)"
                autoComplete="address-line2"
              />
            </div>
          </div>

          {/* Postcode / City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <FieldLabel required>Postcode / ZIP</FieldLabel>
              <TextInput
                name="postal_code"
                value={formData.postal_code}
                onChange={field}
                autoComplete="postal-code"
                required
              />
            </div>
            <div>
              <FieldLabel required>Town / City</FieldLabel>
              <TextInput
                name="city"
                value={formData.city}
                onChange={field}
                autoComplete="address-level2"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-4">
            <FieldLabel>Phone (optional)</FieldLabel>
            <TextInput
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={field}
              autoComplete="tel"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <FieldLabel required>Email address</FieldLabel>
            <TextInput
              name="email"
              type="email"
              value={formData.email}
              onChange={field}
              autoComplete="email"
              required
            />
          </div>

          {/* ── Additional information ── */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Additional information
          </h2>

          <div className="mb-4">
            <FieldLabel>Order notes (optional)</FieldLabel>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={field}
              rows={4}
              placeholder="Notes about your order, e.g. special notes for delivery."
              className="w-full border border-gray-300 rounded-[3px] px-3 py-[9px] text-sm text-gray-800 focus:outline-none focus:border-gray-500 resize-y"
            />
          </div>

          {/* ── Coupon code ── */}
          <div className="mt-2 text-sm text-gray-700">
            <span>Have a coupon?{" "}</span>
            <button
              type="button"
              onClick={() => setCouponOpen((o) => !o)}
              className="text-blue-600 underline hover:text-blue-800"
            >
              Click here to enter your code
            </button>
          </div>

          {couponOpen && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 border border-gray-300 rounded-[3px] px-3 py-[9px] text-sm focus:outline-none focus:border-gray-500"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={couponLoading}
                className="px-4 py-2 border border-gray-400 rounded-[3px] text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {couponLoading ? "Applying…" : "Apply coupon"}
              </button>
            </div>
          )}
          {couponError && (
            <p className="text-red-500 text-xs mt-1">{couponError}</p>
          )}
        </div>

        {/* ╔══════════════════════════════════════╗
            ║  RIGHT COLUMN                        ║
            ╚══════════════════════════════════════╝ */}
        <div>
          {/* ── Your order ── */}
          <h3 className="text-lg font-bold text-gray-900 mb-3">Your order</h3>
          <div className="border border-gray-200 rounded-[4px] mb-4">
            <div className="grid grid-cols-[1fr_auto] border-b border-gray-200 px-4 py-3">
              <span className="text-sm font-semibold text-gray-700">Product</span>
              <span className="text-sm font-semibold text-gray-700">Subtotal</span>
            </div>

            {/* Cart items */}
            {cart.items
              ?.sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1))
              .map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_auto] gap-2 items-center px-4 py-3 border-b border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    {item.thumbnail && (
                      <Image
                        src={item.thumbnail}
                        alt={item.title || ""}
                        width={48}
                        height={48}
                        className="rounded object-cover flex-shrink-0"
                        style={{ width: 48, height: 48 }}
                      />
                    )}
                    <span className="text-sm text-gray-800">
                      {item.title}
                      {item.variant?.title && item.variant.title !== "Default" && (
                        <span className="text-gray-500"> – {item.variant.title}</span>
                      )}
                      <span className="text-gray-500"> × {item.quantity}</span>
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
                    {convertToLocale({ amount: item.subtotal ?? 0, currency_code: currency })}
                  </span>
                </div>
              ))}

            {/* Subtotal */}
            <div className="grid grid-cols-[1fr_auto] px-4 py-3 border-b border-gray-200">
              <span className="text-sm text-gray-700">Subtotal</span>
              <span className="text-sm text-gray-700">
                {convertToLocale({ amount: cart.subtotal ?? 0, currency_code: currency })}
              </span>
            </div>

            {/* Total */}
            <div className="grid grid-cols-[1fr_auto] px-4 py-4">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-gray-900">
                {convertToLocale({ amount: cart.total ?? 0, currency_code: currency })}
              </span>
            </div>
          </div>

          {/* ── Payment methods ── */}
          <div className="border border-gray-200 rounded-[4px] divide-y divide-gray-100 mb-4">
            {/* Credit / Debit Cards */}
            {stripeMethod && (
              <div className="px-4 py-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment_method"
                      value={stripeMethod.id}
                      checked={isStripeSelected && visualMethod === "card"}
                      onChange={() => { setVisualMethod("card"); handleMethodSelect(stripeMethod.id) }}
                      className="accent-gray-800"
                    />
                    <span className="text-sm font-medium text-gray-800">
                      Credit/Debit Cards
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <VisaIcon />
                    <MastercardIcon />
                    <AmexIcon />
                  </div>
                </label>

                {isStripeSelected && visualMethod === "card" && (
                  <div className="mt-3 ml-5">
                    <a
                      href="https://link.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] text-green-700 flex items-center gap-1 mb-3 hover:underline"
                    >
                      <LockIcon size={11} />
                      Secure, fast checkout with Link ▾
                    </a>
                    <PaymentElement
                      onChange={(e) => setCardComplete(e.complete)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Google Pay (handled by PaymentElement internally) */}
            {stripeMethod && (
              <div className="px-4 py-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment_method"
                      value="google_pay"
                      checked={isStripeSelected && visualMethod === "google_pay"}
                      onChange={() => { setVisualMethod("google_pay"); handleMethodSelect(stripeMethod.id) }}
                      className="accent-gray-800"
                    />
                    <span className="text-sm font-medium text-gray-800">
                      Google Pay
                    </span>
                  </div>
                  <GPay />
                </label>
                {isStripeSelected && visualMethod === "google_pay" && (
                  <p className="mt-2 ml-5 text-xs text-gray-500">
                    Use the Google Pay button above to complete your order.
                  </p>
                )}
              </div>
            )}

            {/* PayPal */}
            {paypalMethod && (
              <div className="px-4 py-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment_method"
                      value={paypalMethod.id}
                      checked={isPaypalSelected}
                      onChange={() => setSelectedMethod(paypalMethod.id)}
                      className="accent-gray-800"
                    />
                    <span className="text-sm font-medium text-gray-800">
                      PayPal
                    </span>
                  </div>
                  <PayPalLogoInline />
                </label>
              </div>
            )}

            {/* Manual / test payment */}
            {manualMethod && !stripeMethod && !paypalMethod && (
              <div className="px-4 py-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment_method"
                    value={manualMethod.id}
                    checked={selectedMethod === manualMethod.id}
                    onChange={() => setSelectedMethod(manualMethod.id)}
                    className="accent-gray-800"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    Test Payment
                  </span>
                  <span className="text-xs text-gray-400 ml-1">(development only)</span>
                </label>
              </div>
            )}
          </div>

          {/* ── Terms ── */}
          <div className="mb-4">
            <label className="flex items-start gap-2 text-[13px] text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 accent-gray-800 flex-shrink-0"
              />
              <span>
                I have read and agree to the website{" "}
                <a
                  href="/terms-conditions"
                  target="_blank"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  terms and conditions
                </a>{" "}
                *
              </span>
            </label>
          </div>

          {/* ── CTA ── */}
          {isPaypalSelected ? (
            <PayPalButtonsComponent
              style={{
                layout: "horizontal",
                color: "gold",
                shape: "rect",
                label: "pay",
                height: 52,
                tagline: false,
              }}
              createOrder={paypalCreateOrder}
              onApprove={paypalOnApprove}
              onError={(err) => setError(String(err))}
            />
          ) : (
            <button
              type="submit"
              disabled={placeOrderDisabled}
              className="w-full flex items-center justify-center gap-2 py-[14px] px-6 rounded-[3px] text-white font-semibold text-base transition-opacity disabled:opacity-60"
              style={{ background: "#009a8e" }}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <LockIcon size={15} />
                  Place order
                </>
              )}
            </button>
          )}

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
          )}

          {/* ── Trust badges ── */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {/* Padlock security badge */}
            <span className="inline-flex items-center gap-1 border border-gray-200 rounded px-2 py-1 text-[11px] text-gray-600">
              <LockIcon size={11} />
              SSL Secure
            </span>
            <VisaIcon />
            <MastercardIcon />
            {paypalMethod && <PayPalLogoInline />}
          </div>

          {/* ── Social proof ── */}
          <div className="mt-5 p-4 bg-gray-50 rounded-[4px] text-sm">
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFA500">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="text-gray-700 font-medium ml-1">
                4.8 / 5 from 500+ verified customers
              </span>
            </div>
            <p className="text-gray-600 italic text-[13px] leading-snug mb-3">
              &ldquo;Impressive technology and great specialist oversight. I appreciated
              seeing my treatment plan immediately at the clinic. The results have been
              fantastic.&rdquo;
            </p>
            <ul className="space-y-1 text-[13px] text-gray-700">
              <li>✓ Free Worldwide shipping</li>
              <li>✓ Easy 30 days returns</li>
              <li>✓ International Warranty</li>
              <li>✓ 100% Secure Checkout</li>
            </ul>
          </div>

          {/* Coupon link on mobile (repeated below summary for mobile UX) */}
          <div className="mt-4 text-sm text-gray-700 lg:hidden">
            <span>Have a coupon?{" "}</span>
            <button
              type="button"
              onClick={() => setCouponOpen((o) => !o)}
              className="text-blue-600 underline hover:text-blue-800"
            >
              Click here to enter your code
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
