"use client"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
        currency: "EUR",
        intent: "authorize",
        components: "buttons",
      }}
    >
      <div className="w-full bg-white min-h-screen">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200">
          <div
            className="max-w-[1200px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between"
          >
            <LocalizedClientLink href="/">
              <Image
                src="/images/logo-color.webp"
                alt="OrthoLab Center"
                width={140}
                height={45}
                style={{ height: 38, width: "auto" }}
                priority
              />
            </LocalizedClientLink>
            <span className="hidden sm:block text-[15px] font-medium text-gray-700 tracking-wide">
              Checkout
            </span>
          </div>
        </header>

        {/* Step indicator */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5">
            <div className="flex items-end justify-center">
              {/* Step 1 – Shopping Cart (complete) */}
              <LocalizedClientLink
                href="/cart"
                className="flex flex-col items-center gap-1.5"
              >
                <div className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center">
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5l3.5 3.5L11 1"
                      stroke="white"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-[11px] text-gray-600 whitespace-nowrap hidden sm:block">
                  Shopping Cart
                </span>
              </LocalizedClientLink>

              {/* Connector 1→2 (complete) */}
              <div className="h-0.5 w-12 sm:w-20 bg-gray-800 mx-2 mb-[18px]" />

              {/* Step 2 – Shipping and Checkout (active) */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-semibold">
                  2
                </div>
                <span className="text-[11px] text-gray-800 font-medium whitespace-nowrap hidden sm:block">
                  Shipping and Checkout
                </span>
              </div>

              {/* Connector 2→3 (incomplete) */}
              <div className="h-0.5 w-12 sm:w-20 bg-gray-200 mx-2 mb-[18px]" />

              {/* Step 3 – Confirmation (inactive) */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-7 h-7 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center text-xs font-medium">
                  3
                </div>
                <span className="text-[11px] text-gray-400 whitespace-nowrap hidden sm:block">
                  Confirmation
                </span>
              </div>
            </div>
          </div>
        </div>

        <div data-testid="checkout-container">{children}</div>
      </div>
    </PayPalScriptProvider>
  )
}
