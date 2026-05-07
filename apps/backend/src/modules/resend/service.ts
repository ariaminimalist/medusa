import { AbstractNotificationProviderService } from "@medusajs/framework/utils"
import { Logger } from "@medusajs/framework/types"
import {
  ProviderSendNotificationDTO,
  ProviderSendNotificationResultsDTO,
} from "@medusajs/framework/types"
import { Resend } from "resend"
import React from "react"
import { orderPlacedEmail } from "./emails/order-placed"
import { passwordResetEmail } from "./emails/password-reset"

type ResendOptions = {
  api_key: string
  from: string
}

type InjectedDependencies = {
  logger: Logger
}

enum Templates {
  ORDER_PLACED = "order-placed",
  PASSWORD_RESET = "password-reset",
}

const templateMap: Record<string, (props: unknown) => React.ReactNode> = {
  [Templates.ORDER_PLACED]: orderPlacedEmail,
  [Templates.PASSWORD_RESET]: passwordResetEmail,
}

const subjectMap: Record<string, string> = {
  [Templates.ORDER_PLACED]: "Order Confirmed — OrthoLab Center",
  [Templates.PASSWORD_RESET]: "Reset your password — OrthoLab Center",
}

class ResendNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = "notification-resend"
  private resendClient: Resend
  private options: ResendOptions
  private logger: Logger

  constructor({ logger }: InjectedDependencies, options: ResendOptions) {
    super()
    this.resendClient = new Resend(options.api_key)
    this.options = options
    this.logger = logger
  }

  async send(
    notification: ProviderSendNotificationDTO
  ): Promise<ProviderSendNotificationResultsDTO> {
    const templateFn = templateMap[notification.template]

    if (!templateFn) {
      this.logger.error(
        `No email template found for "${notification.template}". Valid: ${Object.keys(templateMap).join(", ")}`
      )
      return {}
    }

    const { data, error } = await this.resendClient.emails.send({
      from: notification.from ?? this.options.from,
      to: [notification.to],
      subject: subjectMap[notification.template] ?? "OrthoLab Center",
      react: templateFn(notification.data) as React.ReactElement,
    })

    if (error || !data) {
      this.logger.error("Resend failed to send email", error ?? "unknown error")
      return {}
    }

    return { id: data.id }
  }
}

export default ResendNotificationProviderService
