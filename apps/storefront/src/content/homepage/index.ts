import { en } from "./en"
import { da } from "./da"
import { de } from "./de"
import { fr } from "./fr"
import type { HomepageContent } from "./types"

const localeMap: Record<string, HomepageContent> = { en, da, de, fr }

const countryToLocale: Record<string, string> = {
  dk: "da",
  de: "de",
  at: "de",
  ch: "de",
  fr: "fr",
  be: "fr",
  lu: "fr",
}

export function getHomepageContent(countryCode: string): HomepageContent {
  const locale = countryToLocale[countryCode.toLowerCase()] ?? "en"
  return localeMap[locale] ?? en
}

export type { HomepageContent }
