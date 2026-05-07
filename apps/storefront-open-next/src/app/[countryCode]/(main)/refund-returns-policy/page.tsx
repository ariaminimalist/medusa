import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Refund & Returns Policy — OrthoLab Center",
  description:
    "We stand behind every product we sell. If you're not happy, we'll make it right.",
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

export default function RefundReturnsPage() {
  return (
    <>
      {/* Hero */}
      <section style={S.hero} className="py-12 md:py-20 px-5 md:px-6">
        <div style={S.glow} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
          <span style={S.badge}>Returns</span>
          <h1 style={S.h1}>Refund &amp; Returns Policy</h1>
          <p style={S.subtitle}>
            We stand behind every product we sell. If you&apos;re not happy, we&apos;ll make it right.
          </p>
        </div>
      </section>

      {/* 30-Day Guarantee callout */}
      <section style={{ background: "#E0F7FA", padding: "0" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", padding: "20px 24px", background: "#F0FDFF", border: "1px solid #B2EBF2", borderRadius: 12, margin: "0 0 0", transform: "translateY(-24px)" }}>
            <div style={{ width: 48, height: 48, minWidth: 48, background: "#0097A7", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24, stroke: "#fff", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }}>
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, color: "#0C2240", marginBottom: 3 }}>
                30-Day Money-Back Guarantee
              </div>
              <div style={{ fontSize: 14, color: "#374151" }}>
                Not satisfied? Contact us within 30 days of delivery for a full refund — no hoops, no hassle.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: "#fff", padding: "48px 24px 80px" }}>
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

          {/* Our 30-Day Guarantee */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Our 30-Day Guarantee</h2>
            <p style={S.p}>
              We offer a full 30-day money-back guarantee on all orders — no hoops, no hassle.
            </p>
            <p style={S.p}>
              If you are not completely satisfied with your purchase for any reason, you may return it
              within 30 days of the delivery date for a full refund. To be eligible, items must be
              unused, in the same condition in which you received them, and in their original packaging.
            </p>
            <p style={S.p}>
              To initiate a return, contact our support team at{" "}
              <a href="mailto:support@ortholabcenter.com" style={{ color: "#0097A7" }}>
                support@ortholabcenter.com
              </a>{" "}
              with your order number and the reason for your return. We will respond within 24 hours
              with next steps.
            </p>
          </div>

          {/* Refund Processing */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Refund Processing</h2>
            <p style={S.p}>
              Once we receive and inspect your returned item, we will notify you by email whether your
              refund has been approved. If approved, a credit will be applied to your original payment
              method within 5–10 business days, depending on your bank or card issuer.
            </p>
            <p style={S.p}>
              If you haven&apos;t received your refund after 10 business days, please check with your bank
              first, then your credit card company — processing times vary. If you still haven&apos;t
              received it, contact us at{" "}
              <a href="mailto:support@ortholabcenter.com" style={{ color: "#0097A7" }}>
                support@ortholabcenter.com
              </a>
              .
            </p>
          </div>

          {/* Exchanges */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Exchanges</h2>
            <p style={S.p}>
              We replace items only if they are defective or damaged on arrival. If you received a
              faulty product, email us at{" "}
              <a href="mailto:support@ortholabcenter.com" style={{ color: "#0097A7" }}>
                support@ortholabcenter.com
              </a>{" "}
              with your order number and a photo of the damage, and we will arrange a free replacement.
            </p>
          </div>

          {/* Non-Returnable Items */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Non-Returnable Items</h2>
            <p style={S.p}>The following items are not eligible for return or refund:</p>
            <ul style={S.ul}>
              <li style={S.li}>Items returned more than 30 days after delivery</li>
              <li style={S.li}>Items that show signs of use, damage, or are not in their original packaging</li>
              <li style={S.li}>Intimate or sanitary goods for hygiene reasons</li>
              <li style={S.li}>Gift cards</li>
              <li style={S.li}>Downloadable digital products</li>
              <li style={S.li}>Select health and personal care items where noted on the product page</li>
            </ul>
          </div>

          {/* Partial Refunds */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Partial Refunds</h2>
            <p style={S.p}>
              In some situations, a partial refund may be issued at our discretion. This includes:
            </p>
            <ul style={S.ul}>
              <li style={S.li}>Items returned in a condition different from how they were received</li>
              <li style={S.li}>Items with missing accessories or original packaging components</li>
              <li style={S.li}>Returns initiated after the 30-day window but approved as a goodwill exception</li>
            </ul>
          </div>

          {/* Sale Items */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Sale Items</h2>
            <p style={S.p}>
              Only regular-priced items are eligible for a full refund. Items purchased during a
              clearance sale or marked as final sale are not eligible for return unless they arrive
              defective or damaged.
            </p>
          </div>

          {/* Gifts */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Gifts</h2>
            <p style={S.p}>
              If an item was marked as a gift at the time of purchase and shipped directly to you,
              you will receive a gift credit for the value of the returned item. If the item was not
              marked as a gift, or if the gift was shipped to the purchaser, the refund will be
              issued to the original purchaser.
            </p>
          </div>

          {/* Return Shipping */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Return Shipping</h2>
            <p style={S.p}>
              Customers are responsible for covering the cost of return shipping, unless the item
              arrived defective, damaged, or incorrect. Return shipping costs are non-refundable.
              If you receive a refund, the cost of return shipping will be deducted from your refund
              total.
            </p>
            <p style={S.p}>
              For items valued over $50, we strongly recommend using a trackable shipping service
              or purchasing shipping insurance. OrthoLab Center cannot guarantee receipt of your
              returned item without a tracking number.
            </p>
          </div>

          {/* Contact Us */}
          <div style={{ ...S.sectionWrap, marginBottom: 0 }}>
            <h2 style={S.h2}>Contact Us</h2>
            <p style={S.p}>Have a question about your order or return? We&apos;re here to help.</p>
            <div style={{ background: "#F0FDFF", border: "1px solid #B2EBF2", borderRadius: 12, padding: "20px 24px", display: "inline-flex", flexDirection: "column" as const, gap: 8 }}>
              <div style={{ fontSize: 14, color: "#374151" }}>
                <strong style={{ color: "#0C2240" }}>Email: </strong>
                <a href="mailto:support@ortholabcenter.com" style={{ color: "#0097A7" }}>
                  support@ortholabcenter.com
                </a>
              </div>
              <div style={{ fontSize: 14, color: "#374151" }}>
                <strong style={{ color: "#0C2240" }}>Response time: </strong>
                Within 24 hours, Monday – Friday, 9am–6pm EST
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
