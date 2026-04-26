import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { FaqAccordion } from "./faq-accordion"

export const metadata: Metadata = {
  title: "Get in Touch — OrthoLab Center",
  description:
    "Our team responds within 24 hours, Monday – Friday, 9am–6pm EST. We're real humans who care about your experience.",
}

export default function GetInTouchPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-12 md:py-20 px-5 md:px-6" style={{
        background: "linear-gradient(130deg, #071628 0%, #0C2240 55%, #163556 100%)",
        paddingBottom: "96px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}>
        <div style={{
          position: "absolute", top: "-30%", left: "50%",
          transform: "translateX(-50%)",
          width: "60%", height: "160%",
          background: "radial-gradient(ellipse, rgba(0,151,167,.18) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
          <span style={{
            display: "inline-block",
            fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: "#67D4DC", background: "rgba(0,151,167,.2)",
            padding: "5px 14px", borderRadius: 99, marginBottom: 20,
          }}>
            Support
          </span>
          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(28px, 4.5vw, 52px)",
            fontWeight: 900, color: "#fff",
            letterSpacing: "-0.02em", lineHeight: 1.15,
            marginBottom: 16, marginTop: 0,
          }}>
            Get in Touch
          </h1>
          <p style={{
            color: "rgba(255,255,255,.65)", fontSize: 17, lineHeight: 1.7,
            maxWidth: 520, margin: "0 auto",
          }}>
            Our team responds within 24 hours, Monday – Friday, 9am–6pm EST.
            We&apos;re real humans who care about your experience.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section style={{ background: "#FAF7F3", padding: "0 24px 64px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            transform: "translateY(-40px)",
          }}>

            {/* Email Support Card */}
            <div style={{
              background: "#fff",
              borderRadius: 20,
              padding: "36px 32px",
              boxShadow: "0 8px 40px rgba(12,34,64,.10), 0 2px 8px rgba(12,34,64,.06)",
              border: "1px solid #E2EAF4",
            }}>
              <div style={{
                width: 52, height: 52, background: "#E0F7FA", borderRadius: 14,
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
              }}>
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24, stroke: "#0097A7", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }}>
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 style={{
                fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 800,
                color: "#0C2240", marginBottom: 8, marginTop: 0,
              }}>
                Email Support
              </h2>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65, marginBottom: 20 }}>
                For orders, questions, and anything else — we&apos;ve got you covered.
              </p>
              <a
                href="mailto:support@ortholabcenter.com"
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-heading)", fontWeight: 700,
                  fontSize: 15, color: "#0097A7",
                  textDecoration: "none",
                  marginBottom: 12,
                }}
              >
                support@ortholabcenter.com
              </a>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                fontSize: 13, color: "#64748B",
              }}>
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14, stroke: "#22C55E", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Avg. response under 24 hours
              </div>
            </div>

            {/* Track Your Order Card */}
            <div style={{
              background: "#fff",
              borderRadius: 20,
              padding: "36px 32px",
              boxShadow: "0 8px 40px rgba(12,34,64,.10), 0 2px 8px rgba(12,34,64,.06)",
              border: "1px solid #E2EAF4",
            }}>
              <div style={{
                width: 52, height: 52, background: "#E0F7FA", borderRadius: 14,
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
              }}>
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24, stroke: "#0097A7", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }}>
                  <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h2 style={{
                fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 800,
                color: "#0C2240", marginBottom: 8, marginTop: 0,
              }}>
                Track Your Order
              </h2>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65, marginBottom: 24 }}>
                Check the live status of your shipment anytime, from anywhere.
              </p>
              <LocalizedClientLink href="/account/orders">
                <button style={{
                  fontFamily: "var(--font-heading)", fontWeight: 700,
                  fontSize: 14, background: "#0097A7", color: "#fff",
                  border: "none", borderRadius: 9, padding: "12px 24px",
                  cursor: "pointer", letterSpacing: "0.01em",
                  boxShadow: "0 4px 14px rgba(0,151,167,.30)",
                  transition: "background .15s, transform .2s",
                  marginBottom: 12,
                }}>
                  Track My Order
                </button>
              </LocalizedClientLink>
              <div style={{ fontSize: 13, color: "#64748B" }}>
                Update Order Status
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#fff", padding: "72px 24px 80px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{
              display: "inline-block",
              fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700,
              textTransform: "uppercase" as const, letterSpacing: "0.12em",
              color: "#007D8C", background: "#E0F7FA",
              padding: "5px 14px", borderRadius: 99, marginBottom: 16,
            }}>
              Quick Answers
            </span>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(24px, 3.5vw, 40px)",
              fontWeight: 800, color: "#0C2240",
              letterSpacing: "-0.02em", lineHeight: 1.2,
              margin: 0,
            }}>
              Frequently Asked Questions
            </h2>
          </div>

          <FaqAccordion />

          {/* Still need help? */}
          <div style={{
            marginTop: 52, textAlign: "center",
            padding: "32px 24px",
            background: "#F8FAFC", borderRadius: 16,
            border: "1px solid #E2EAF4",
          }}>
            <p style={{ fontSize: 15, color: "#374151", marginBottom: 16, marginTop: 0 }}>
              Still have a question? Our support team is here for you.
            </p>
            <a
              href="mailto:support@ortholabcenter.com"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-heading)", fontWeight: 700,
                fontSize: 14, background: "#0C2240", color: "#fff",
                textDecoration: "none",
                borderRadius: 9, padding: "12px 28px",
                letterSpacing: "0.01em",
              }}
            >
              Email Us
            </a>
          </div>

        </div>
      </section>

    </>
  )
}
