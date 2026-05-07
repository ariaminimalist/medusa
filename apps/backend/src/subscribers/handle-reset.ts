import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

export default async function resetPasswordTokenHandler({
  event: {
    data: { entity_id: email, token, actor_type },
  },
  container,
}: SubscriberArgs<{ entity_id: string; token: string; actor_type: string }>) {
  const notificationModuleService = container.resolve(Modules.NOTIFICATION)

  const adminBackendUrl =
    process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
  const storefrontUrl =
    process.env.MEDUSA_STOREFRONT_URL || "http://localhost:8000"

  const urlPrefix =
    actor_type === "customer"
      ? `${storefrontUrl}/account/reset-password`
      : `${adminBackendUrl}/app/reset-password`

  const reset_url = `${urlPrefix}?token=${token}&email=${encodeURIComponent(email)}`

  await notificationModuleService.createNotifications({
    to: email,
    channel: "email",
    template: "password-reset",
    data: {
      reset_url,
      email,
      actor_type,
    },
  })
}

export const config: SubscriberConfig = {
  event: "auth.password_reset",
}
