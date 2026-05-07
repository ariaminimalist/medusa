import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import { clx } from "@modules/common/components/ui";
import Image from "next/image";
import TrustBadges from "@modules/home/components/trust-badges";

import LocalizedClientLink from "@modules/common/components/localized-client-link";

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  });
  const productCategories = await listCategories();

  return (
    <>
      <TrustBadges />

    <footer className="bg-gray-900 text-gray-400 w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-10 xsmall:flex-row items-start justify-between py-16">
          <div className="max-w-xs">
            <LocalizedClientLink href="/">
              <Image src="/images/logo-white.webp" alt="OrthoLab Center" width={200} height={64} style={{ height: 44, width: "auto", marginBottom: 12 }} />
            </LocalizedClientLink>
            <p className="text-sm leading-relaxed">
              Trusted comfort &amp; mobility solutions. Engineered for active living.
            </p>
          </div>

          <div className="text-sm gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            <div className="flex flex-col gap-y-3">
              <span className="text-white font-semibold text-sm">Shop</span>
              <ul className="grid grid-cols-1 gap-2" data-testid="footer-categories">
                {productCategories && productCategories?.length > 0 ? (
                  productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) return null;
                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;
                    return (
                      <li className="flex flex-col gap-2" key={c.id}>
                        <LocalizedClientLink
                          className={clx("hover:text-white transition-colors", children && "font-medium")}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="hover:text-white transition-colors"
                                  href={`/categories/${child.handle}`}
                                  data-testid="category-link"
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })
                ) : (
                  <li>
                    <LocalizedClientLink className="hover:text-white transition-colors" href="/store">
                      FlexWave Massager
                    </LocalizedClientLink>
                  </li>
                )}
                {collections && collections.length > 0 &&
                  collections.slice(0, 4).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-white transition-colors"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="flex flex-col gap-y-3">
              <span className="text-white font-semibold text-sm">Company</span>
              <ul className="grid grid-cols-1 gap-2">
                <li>
                  <LocalizedClientLink href="/about" className="hover:text-white transition-colors">
                    About Us
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/get-in-touch" className="hover:text-white transition-colors">
                    Contact
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/privacy-policy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/terms-conditions" className="hover:text-white transition-colors">
                    Terms
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/refund-returns-policy" className="hover:text-white transition-colors">
                    Refund &amp; Return
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-y-3">
              <span className="text-white font-semibold text-sm">Help</span>
              <ul className="grid grid-cols-1 gap-2">
                <li>
                  <LocalizedClientLink href="/account/orders" className="hover:text-white transition-colors">
                    Track Order
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/account" className="hover:text-white transition-colors">
                    Customer Support
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/get-in-touch" className="hover:text-white transition-colors">
                    FAQ
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full py-6 border-t border-gray-800 justify-between text-xs text-gray-500">
          <span>© {new Date().getFullYear()} OrthoLab Center. All rights reserved.</span>
          <span className="hidden xsmall:block">🔒 Secure payments · PayPal · Visa · Mastercard</span>
        </div>
      </div>
    </footer>
    </>
  );
}
