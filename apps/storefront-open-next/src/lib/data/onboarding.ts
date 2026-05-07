"use server"
import { cookies as nextCookies } from "next/headers"
import { redirect } from "next/navigation"

// Medusa v2 admin is at /app on the backend URL.
// NEXT_PUBLIC_MEDUSA_BACKEND_URL may be an internal Docker hostname (e.g., http://medusa:9000),
// so NEXT_PUBLIC_MEDUSA_ADMIN_URL is used for browser-accessible redirects.
const ADMIN_URL =
  process.env.NEXT_PUBLIC_MEDUSA_ADMIN_URL || "http://localhost:9000"

export async function resetOnboardingState(orderId: string) {
  const cookies = await nextCookies()
  cookies.set("_medusa_onboarding", "false", { maxAge: -1 })
  redirect(`${ADMIN_URL}/app/orders/${orderId}`)
}
