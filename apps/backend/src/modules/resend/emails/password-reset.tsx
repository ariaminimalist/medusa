import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"
import React from "react"

type Props = {
  reset_url: string
  email: string
  actor_type: string
}

function PasswordResetEmail({ reset_url, email, actor_type }: Props) {
  const isAdmin = actor_type !== "customer"

  return (
    <Tailwind>
      <Html lang="en">
        <Head />
        <Preview>Reset your OrthoLab Center {isAdmin ? "admin" : ""} password</Preview>
        <Body className="bg-gray-50 font-sans">
          <Section className="bg-zinc-900 px-6 py-5">
            <Heading className="text-white text-xl m-0 tracking-widest uppercase">
              OrthoLab Center
            </Heading>
          </Section>

          <Container className="max-w-xl mx-auto bg-white px-8 py-8">
            <Heading className="text-2xl font-light text-zinc-800 mb-1">
              Reset your password
            </Heading>
            <Text className="text-zinc-500 mt-0 mb-6">
              We received a request to reset the password for {email}. Click the button below to set a new password. The link expires shortly, so use it soon.
            </Text>

            <Section className="text-center my-6">
              <Button
                href={reset_url}
                className="bg-zinc-900 text-white px-6 py-3 rounded text-sm font-medium no-underline"
              >
                Reset Password
              </Button>
            </Section>

            <Hr className="border-zinc-200 my-6" />

            <Text className="text-zinc-400 text-xs m-0">
              If the button doesn't work, copy and paste this link into your browser:
            </Text>
            <Text className="text-zinc-600 text-xs break-all mt-2">
              {reset_url}
            </Text>

            <Hr className="border-zinc-200 my-6" />

            <Text className="text-zinc-400 text-xs m-0">
              Didn't request this? You can safely ignore this email — your password won't change.
            </Text>
          </Container>

          <Section className="max-w-xl mx-auto px-8 py-4">
            <Text className="text-zinc-400 text-xs text-center m-0">
              Questions? Contact us at support@ortholabcenter.com
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

export const passwordResetEmail = (props: unknown) => (
  <PasswordResetEmail {...(props as Props)} />
)

export default function PreviewEmail() {
  return (
    <PasswordResetEmail
      reset_url="https://admin.ortholabcenter.com/app/reset-password?token=abc123&email=user@example.com"
      email="user@example.com"
      actor_type="user"
    />
  )
}
