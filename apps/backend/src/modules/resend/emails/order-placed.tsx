import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"
import React from "react"

type OrderItem = {
  id: string
  title: string
  quantity: number
  unit_price: number
  thumbnail?: string
}

type Address = {
  first_name?: string
  last_name?: string
  address_1?: string
  city?: string
  postal_code?: string
  country_code?: string
}

type Order = {
  display_id: number
  currency_code: string
  total: number
  subtotal: number
  shipping_total: number
  tax_total: number
  items?: OrderItem[]
  shipping_address?: Address
  customer?: { first_name?: string; last_name?: string }
  email?: string
}

type Props = {
  order: Order
}

function fmt(amount: number, currency: string) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  }).format(amount)
}

function OrderPlacedEmail({ order }: Props) {
  const firstName =
    order.customer?.first_name ||
    order.shipping_address?.first_name ||
    "Customer"

  const currency = order.currency_code?.toUpperCase() ?? "USD"

  return (
    <Tailwind>
      <Html lang="en">
        <Head />
        <Preview>Your OrthoLab Center order #{order.display_id} is confirmed.</Preview>
        <Body className="bg-gray-50 font-sans">
          {/* Header */}
          <Section className="bg-zinc-900 px-6 py-5">
            <Heading className="text-white text-xl m-0 tracking-widest uppercase">
              OrthoLab Center
            </Heading>
          </Section>

          <Container className="max-w-xl mx-auto bg-white px-8 py-8">
            <Heading className="text-2xl font-light text-zinc-800 mb-1">
              Thank you, {firstName}.
            </Heading>
            <Text className="text-zinc-500 mt-0 mb-6">
              Order #{order.display_id} is confirmed and being prepared.
            </Text>

            <Hr className="border-zinc-200 mb-6" />

            {/* Items */}
            {order.items?.map((item) => (
              <Row key={item.id} className="mb-4">
                <Column className="w-full">
                  <Text className="font-medium text-zinc-800 m-0">{item.title}</Text>
                  <Text className="text-zinc-400 text-sm m-0">
                    Qty {item.quantity} × {fmt(item.unit_price, currency)}
                  </Text>
                </Column>
                <Column align="right" className="whitespace-nowrap">
                  <Text className="text-zinc-800 m-0">
                    {fmt(item.unit_price * item.quantity, currency)}
                  </Text>
                </Column>
              </Row>
            ))}

            <Hr className="border-zinc-200 my-4" />

            {/* Totals */}
            <Row className="mb-1">
              <Column><Text className="text-zinc-500 m-0">Subtotal</Text></Column>
              <Column align="right"><Text className="text-zinc-800 m-0">{fmt(order.subtotal, currency)}</Text></Column>
            </Row>
            <Row className="mb-1">
              <Column><Text className="text-zinc-500 m-0">Shipping</Text></Column>
              <Column align="right"><Text className="text-zinc-800 m-0">{fmt(order.shipping_total, currency)}</Text></Column>
            </Row>
            <Row className="mb-4">
              <Column><Text className="text-zinc-500 m-0">Tax</Text></Column>
              <Column align="right"><Text className="text-zinc-800 m-0">{fmt(order.tax_total, currency)}</Text></Column>
            </Row>
            <Row>
              <Column><Text className="font-semibold text-zinc-800 m-0">Total</Text></Column>
              <Column align="right"><Text className="font-semibold text-zinc-800 m-0">{fmt(order.total, currency)}</Text></Column>
            </Row>

            <Hr className="border-zinc-200 my-6" />

            {/* Shipping address */}
            {order.shipping_address && (
              <>
                <Heading className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                  Ships To
                </Heading>
                <Text className="text-zinc-600 m-0">
                  {order.shipping_address.first_name} {order.shipping_address.last_name}
                </Text>
                <Text className="text-zinc-600 m-0">{order.shipping_address.address_1}</Text>
                <Text className="text-zinc-600 m-0">
                  {order.shipping_address.city}, {order.shipping_address.postal_code}
                </Text>
                <Text className="text-zinc-600 m-0">
                  {order.shipping_address.country_code?.toUpperCase()}
                </Text>
              </>
            )}
          </Container>

          {/* Footer */}
          <Section className="max-w-xl mx-auto px-8 py-4">
            <Text className="text-zinc-400 text-xs text-center m-0">
              Questions? Reply to this email or contact us at support@ortholabcenter.com
            </Text>
            <Text className="text-zinc-300 text-xs text-center mt-2 mb-0">
              © OrthoLab Center
            </Text>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  )
}

export const orderPlacedEmail = (props: unknown) => (
  <OrderPlacedEmail {...(props as Props)} />
)

export default function Preview() {
  return (
    <OrderPlacedEmail
      order={{
        display_id: 1001,
        currency_code: "usd",
        total: 8900,
        subtotal: 7500,
        shipping_total: 900,
        tax_total: 500,
        customer: { first_name: "Jane" },
        email: "jane@example.com",
        shipping_address: {
          first_name: "Jane",
          last_name: "Doe",
          address_1: "123 Main St",
          city: "Copenhagen",
          postal_code: "1000",
          country_code: "dk",
        },
        items: [
          { id: "1", title: "Orthopedic Insole Pro", quantity: 2, unit_price: 3750 },
          { id: "2", title: "Gel Heel Cup", quantity: 1, unit_price: 1500 },
        ],
      }}
    />
  )
}
