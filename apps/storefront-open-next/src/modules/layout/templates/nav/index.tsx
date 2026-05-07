import { Suspense } from "react"
import Image from "next/image"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <div style={{ background: "#0C2240", color: "#fff", textAlign: "center", padding: "8px 16px", fontSize: 13, fontWeight: 500 }}>
        🚀 Free worldwide shipping on all orders over $50
      </div>
      <header className="relative h-16 mx-auto border-b bg-white border-gray-200 duration-200">
        <nav className="content-container flex items-center justify-between w-full h-full text-sm text-gray-600">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink href="/" data-testid="nav-store-link">
              <Image src="/images/logo-color.webp" alt="OrthoLab Center" width={160} height={51} style={{ height: 38, width: "auto" }} priority />
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                href="/store"
                className="hover:text-gray-900 transition-colors"
              >
                Shop
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/about"
                className="hover:text-gray-900 transition-colors"
              >
                About
              </LocalizedClientLink>
              <LocalizedClientLink
                className="hover:text-gray-900 transition-colors"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex items-center gap-1.5 text-sm hover:text-gray-900 transition-colors"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Cart
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
