import { en } from "./en"
import { da } from "./da"
import { de } from "./de"
import { fr } from "./fr"
import type { CheckoutTranslations } from "./types"

const localeMap: Record<string, CheckoutTranslations> = { en, da, de, fr }

const countryToLocale: Record<string, string> = {
  dk: "da",
  de: "de",
  at: "de",
  ch: "de",
  fr: "fr",
  be: "fr",
  lu: "fr",
}

export function getCheckoutContent(countryCode: string): CheckoutTranslations {
  const locale = countryToLocale[countryCode.toLowerCase()] ?? "en"
  return localeMap[locale] ?? en
}

export type { CheckoutTranslations }
