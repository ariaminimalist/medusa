"use client"

import { isStripeLike } from "@lib/constants"
import { HttpTypes } from "@medusajs/types"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { createContext, useContext, useState } from "react"

const stripeKey =
  process.env.NEXT_PUBLIC_STRIPE_KEY ||
  process.env.NEXT_PUBLIC_MEDUSA_PAYMENTS_PUBLISHABLE_KEY

const stripePromise = stripeKey ? loadStripe(stripeKey) : null

const appearance = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#0f172a",
    fontFamily: "Inter, sans-serif",
    borderRadius: "4px",
    colorBackground: "#ffffff",
    colorText: "#0f172a",
  },
}

type StripeSetupContextType = {
  clientSecret: string | undefined
  setClientSecret: (secret: string) => void
}

export const StripeSetupContext = createContext<StripeSetupContextType>({
  clientSecret: undefined,
  setClientSecret: () => {},
})

export function useStripeSetup() {
  return useContext(StripeSetupContext)
}

type PaymentWrapperProps = {
  cart: HttpTypes.StoreCart
  children: React.ReactNode
}

const PaymentWrapper: React.FC<PaymentWrapperProps> = ({ cart, children }) => {
  const initialSecret = cart.payment_collection?.payment_sessions
    ?.find((s) => s.status === "pending" && isStripeLike(s.provider_id))
    ?.data?.client_secret as string | undefined

  const [clientSecret, setClientSecret] = useState<string | undefined>(
    initialSecret
  )

  // Always mount Elements so PaymentElement never loses context.
  // Use clientSecret mode if we have one, otherwise deferred mode.
  const elementsOptions = clientSecret
    ? { clientSecret, appearance }
    : {
        mode: "payment" as const,
        amount: cart.total ?? 0,
        currency: cart.currency_code?.toLowerCase() ?? "usd",
        appearance,
      }

  return (
    <StripeSetupContext.Provider value={{ clientSecret, setClientSecret }}>
      {stripePromise ? (
        <Elements stripe={stripePromise} options={elementsOptions}>
          {children}
        </Elements>
      ) : (
        <>{children}</>
      )}
    </StripeSetupContext.Provider>
  )
}

export default PaymentWrapper
