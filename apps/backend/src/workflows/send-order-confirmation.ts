import { createWorkflow, when, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { sendNotificationStep } from "./steps/send-notification"

type WorkflowInput = { id: string }

export const sendOrderConfirmationWorkflow = createWorkflow(
  "send-order-confirmation",
  ({ id }: WorkflowInput) => {
    const { data: orders } = useQueryGraphStep({
      entity: "order",
      fields: [
        "id",
        "display_id",
        "email",
        "currency_code",
        "total",
        "subtotal",
        "shipping_total",
        "tax_total",
        "items.*",
        "shipping_address.*",
        "customer.*",
      ],
      filters: { id },
      options: { throwIfKeyNotFound: true },
    })

    const notification = when({ orders }, ({ orders }) => !!orders[0]?.email).then(() => {
      return sendNotificationStep([
        {
          to: orders[0].email!,
          channel: "email",
          template: "order-placed",
          data: { order: orders[0] },
        },
      ])
    })

    return new WorkflowResponse({ notification })
  }
)
