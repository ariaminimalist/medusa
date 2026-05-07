import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import OlcCheckout from "@modules/checkout/templates/olc-checkout"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout",
}

export default async function Checkout({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  const cart = await retrieveCart()
  if (!cart) return notFound()

  const [customer, shippingMethods, paymentMethods] = await Promise.all([
    retrieveCustomer(),
    listCartShippingMethods(cart.id),
    listCartPaymentMethods(cart.region?.id ?? ""),
  ])

  return (
    <PaymentWrapper cart={cart}>
      <OlcCheckout
        cart={cart}
        customer={customer}
        shippingMethods={shippingMethods ?? []}
        availablePaymentMethods={paymentMethods ?? []}
        countryCode={countryCode}
      />
    </PaymentWrapper>
  )
}
