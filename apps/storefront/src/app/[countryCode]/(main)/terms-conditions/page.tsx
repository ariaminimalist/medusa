import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Terms & Conditions — OrthoLab Center",
  description:
    "Please read these terms carefully before using our website or placing an order.",
}

const S = {
  hero: {
    background: "linear-gradient(130deg, #071628 0%, #0C2240 55%, #163556 100%)",
    position: "relative" as const,
    overflow: "hidden" as const,
    textAlign: "center" as const,
  },
  glow: {
    position: "absolute" as const, top: "-30%", left: "50%",
    transform: "translateX(-50%)",
    width: "60%", height: "160%",
    background: "radial-gradient(ellipse, rgba(0,151,167,.18) 0%, transparent 65%)",
    pointerEvents: "none" as const,
  },
  badge: {
    display: "inline-block" as const,
    fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700,
    textTransform: "uppercase" as const, letterSpacing: "0.12em",
    color: "#67D4DC", background: "rgba(0,151,167,.2)",
    padding: "5px 14px", borderRadius: 99, marginBottom: 20,
  },
  h1: {
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(28px, 4.5vw, 48px)",
    fontWeight: 900, color: "#fff",
    letterSpacing: "-0.02em", lineHeight: 1.15,
    marginBottom: 14, marginTop: 0,
  },
  subtitle: {
    color: "rgba(255,255,255,.65)", fontSize: 17, lineHeight: 1.7,
    maxWidth: 540, margin: "0 auto",
  },
  meta: {
    display: "flex" as const, flexWrap: "wrap" as const, gap: 8,
    alignItems: "center", padding: "12px 20px",
    background: "#F8FAFC", borderRadius: 10, marginBottom: 52,
    fontSize: 13, color: "#64748B", border: "1px solid #E2EAF4",
  },
  sectionWrap: { marginBottom: 44 },
  h2: {
    fontFamily: "var(--font-heading)", fontSize: 19, fontWeight: 800,
    color: "#0C2240", marginBottom: 12, marginTop: 0,
    paddingBottom: 10, borderBottom: "2px solid #E0F7FA",
  },
  p: { fontSize: 15, color: "#374151", lineHeight: 1.78, margin: "0 0 12px" },
  ul: { paddingLeft: 22, margin: "8px 0 12px", display: "flex" as const, flexDirection: "column" as const, gap: 6 },
  li: { fontSize: 15, color: "#374151", lineHeight: 1.7 },
}

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section style={S.hero} className="py-12 md:py-20 px-5 md:px-6">
        <div style={S.glow} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
          <span style={S.badge}>Legal</span>
          <h1 style={S.h1}>Terms &amp; Conditions</h1>
          <p style={S.subtitle}>
            Please read these terms carefully before using our website or placing an order.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: "#fff", padding: "72px 24px 80px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>

          {/* Meta row */}
          <div style={S.meta}>
            <span>Last updated: April 16, 2026</span>
            <span style={{ color: "#CBD5E1" }}>·</span>
            <span>OrthoLab Center</span>
            <span style={{ color: "#CBD5E1" }}>·</span>
            <a href="mailto:support@ortholabcenter.com" style={{ color: "#0097A7", textDecoration: "none" }}>
              support@ortholabcenter.com
            </a>
          </div>

          {/* Acceptance of Terms */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Acceptance of Terms</h2>
            <p style={S.p}>
              By accessing or using the OrthoLab Center website at ortholabcenter.com
              (&ldquo;the Site&rdquo;) or purchasing any of our products, you agree to be bound by
              these Terms &amp; Conditions. If you do not agree with any part of these terms, please
              do not use the Site or place an order.
            </p>
            <p style={S.p}>
              We reserve the right to modify these terms at any time. Continued use of the Site after
              changes are posted constitutes your acceptance of the updated terms.
            </p>
          </div>

          {/* Use of the Site */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Use of the Site</h2>
            <p style={S.p}>
              This Site is made available for your personal, non-commercial use only. You agree not to:
            </p>
            <ul style={S.ul}>
              <li style={S.li}>Copy, reproduce, republish, upload, post, transmit, or distribute any content from this Site without our prior written consent</li>
              <li style={S.li}>Use the Site for any unlawful purpose or in violation of any applicable regulations</li>
              <li style={S.li}>Attempt to gain unauthorized access to any part of the Site or its related systems</li>
              <li style={S.li}>Use automated tools, scrapers, or bots to extract content or data from the Site</li>
              <li style={S.li}>Impersonate any person or entity, or misrepresent your affiliation with any person or entity</li>
            </ul>
          </div>

          {/* Intellectual Property */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Intellectual Property</h2>
            <p style={S.p}>
              All content on this Site — including text, images, graphics, logos, product descriptions,
              and audio — is the property of OrthoLab Center and is protected by applicable copyright
              and trademark laws. All brand names, logos, and trademarks displayed on the Site belong
              to OrthoLab Center or their respective owners.
            </p>
            <p style={S.p}>
              No content from this Site may be used, reproduced, or distributed for commercial
              purposes without our express written permission.
            </p>
          </div>

          {/* Products & Orders */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Products &amp; Orders</h2>
            <p style={S.p}>
              We reserve the right to limit quantities, refuse service, or cancel orders at our sole
              discretion. We make every effort to display product colors, descriptions, and
              specifications accurately, but we do not guarantee that your device&apos;s display will
              reflect the exact appearance of our products.
            </p>
            <p style={S.p}>
              Prices are subject to change without notice. We reserve the right to correct any pricing
              errors and will contact you before processing an order affected by such an error.
            </p>
          </div>

          {/* Payment */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Payment</h2>
            <p style={S.p}>
              All orders must be paid in full at the time of purchase. We accept major credit and debit
              cards (Visa, Mastercard, American Express) and PayPal. All transactions are processed
              securely through our payment provider. OrthoLab Center does not store your full card
              details.
            </p>
            <p style={S.p}>
              By placing an order, you represent that you are authorized to use the payment method
              provided and that the billing information you supply is accurate.
            </p>
          </div>

          {/* Shipping & Delivery */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Shipping &amp; Delivery</h2>
            <p style={S.p}>
              We ship worldwide. Estimated delivery times are provided at checkout and are for guidance
              only — actual delivery may vary due to factors beyond our control, including customs
              processing, carrier delays, or local holidays. OrthoLab Center is not responsible for
              delays caused by third-party carriers or customs authorities.
            </p>
            <p style={S.p}>
              Risk of loss and title for products pass to you upon delivery to the carrier.
            </p>
          </div>

          {/* Returns & Refunds */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Returns &amp; Refunds</h2>
            <p style={S.p}>
              We offer a 30-day money-back guarantee on all orders. If you are not satisfied with your
              purchase for any reason, contact us at{" "}
              <a href="mailto:support@ortholabcenter.com" style={{ color: "#0097A7" }}>
                support@ortholabcenter.com
              </a>{" "}
              within 30 days of delivery and we will arrange a refund or replacement.
            </p>
            <p style={S.p}>
              Products must be returned in their original packaging. Return shipping costs are the
              responsibility of the customer unless the item was defective or incorrectly shipped.
            </p>
          </div>

          {/* Warranty */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Warranty</h2>
            <p style={S.p}>
              Every OrthoLab Center product comes with a 1-year manufacturer&apos;s warranty covering
              defects in materials and workmanship under normal use. This warranty does not cover
              damage caused by misuse, accidents, unauthorized modifications, or normal wear and tear.
            </p>
            <p style={S.p}>
              To make a warranty claim, contact us with your order number and a description of the
              issue. We will repair or replace the product at our discretion.
            </p>
          </div>

          {/* Disclaimer of Warranties */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Disclaimer of Warranties</h2>
            <p style={S.p}>
              OrthoLab Center makes no representations or warranties regarding the accuracy,
              reliability, or completeness of any content on this Site. The Site and its content are
              provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind,
              either express or implied.
            </p>
            <p style={S.p}>
              Our products are intended for general wellness and comfort purposes and are not medical
              devices. They are not intended to diagnose, treat, cure, or prevent any medical
              condition. Consult a qualified healthcare professional before use if you have any medical
              concerns.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Limitation of Liability</h2>
            <p style={S.p}>
              To the fullest extent permitted by applicable law, OrthoLab Center shall not be liable
              for any indirect, incidental, special, consequential, or punitive damages arising from
              your use of the Site or purchase of our products, even if we have been advised of the
              possibility of such damages.
            </p>
            <p style={S.p}>
              Our total liability to you for any claim arising from these terms or your use of our
              products shall not exceed the amount you paid for the product giving rise to the claim.
            </p>
          </div>

          {/* Third-Party Links */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Third-Party Links</h2>
            <p style={S.p}>
              The Site may contain links to third-party websites. These links are provided for your
              convenience only. OrthoLab Center has no control over the content of those sites and
              accepts no responsibility for them or for any loss or damage that may arise from your
              use of them.
            </p>
          </div>

          {/* User Communications */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>User Communications</h2>
            <p style={S.p}>
              Any material, feedback, or suggestions you submit to us via email or through the Site
              will be treated as non-confidential. By submitting content, you grant OrthoLab Center
              a non-exclusive, royalty-free, perpetual right to use, reproduce, and publish that
              content for any purpose, without compensation to you.
            </p>
          </div>

          {/* Governing Law */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Governing Law</h2>
            <p style={S.p}>
              These Terms &amp; Conditions are governed by and construed in accordance with the laws
              of the United States. Any disputes arising in connection with these terms shall be
              subject to the exclusive jurisdiction of the courts located in the United States. If
              you are accessing the Site from outside the United States, you are responsible for
              compliance with local laws.
            </p>
          </div>

          {/* Severability */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Severability</h2>
            <p style={S.p}>
              If any provision of these terms is found to be unlawful, void, or unenforceable, that
              provision will be deemed severable and will not affect the validity and enforceability
              of the remaining provisions.
            </p>
          </div>

          {/* Contact Us */}
          <div style={{ ...S.sectionWrap, marginBottom: 0 }}>
            <h2 style={S.h2}>Contact Us</h2>
            <p style={S.p}>
              If you have any questions about these Terms &amp; Conditions, please contact us:
            </p>
            <div style={{ background: "#F0FDFF", border: "1px solid #B2EBF2", borderRadius: 12, padding: "20px 24px", display: "inline-flex", flexDirection: "column" as const, gap: 8 }}>
              <div style={{ fontSize: 14, color: "#374151" }}>
                <strong style={{ color: "#0C2240" }}>Email: </strong>
                <a href="mailto:support@ortholabcenter.com" style={{ color: "#0097A7" }}>
                  support@ortholabcenter.com
                </a>
              </div>
              <div style={{ fontSize: 14, color: "#374151" }}>
                <strong style={{ color: "#0C2240" }}>Website: </strong>
                <LocalizedClientLink href="/" style={{ color: "#0097A7" }}>
                  ortholabcenter.com
                </LocalizedClientLink>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
