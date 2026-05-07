import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Privacy Policy — OrthoLab Center",
  description:
    "How we collect, use, and protect your personal information.",
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

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section style={S.hero} className="py-12 md:py-20 px-5 md:px-6">
        <div style={S.glow} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
          <span style={S.badge}>Privacy</span>
          <h1 style={S.h1}>Privacy Policy</h1>
          <p style={S.subtitle}>
            How we collect, use, and protect your personal information.
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

          {/* Who We Are */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Who We Are</h2>
            <p style={S.p}>
              OrthoLab Center (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website at ortholabcenter.com.
              We sell orthopedic wellness products, including the OLC FlexWave Massager, directly to
              consumers worldwide. This Privacy Policy explains what personal data we collect, why we
              collect it, and how we use and protect it.
            </p>
          </div>

          {/* Information We Collect */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Information We Collect</h2>
            <p style={S.p}>
              We collect information you provide directly when you place an order, create an account,
              or contact us. This includes:
            </p>
            <ul style={S.ul}>
              <li style={S.li}>Name, email address, and phone number</li>
              <li style={S.li}>Billing and shipping address</li>
              <li style={S.li}>Payment information (processed securely by our payment provider — we do not store card details)</li>
              <li style={S.li}>Order history and product preferences</li>
              <li style={S.li}>Messages you send to our support team</li>
            </ul>
            <p style={S.p}>
              We also automatically collect certain technical information when you visit our site,
              including your IP address, browser type, referring URL, and pages viewed. This is
              collected via cookies and similar technologies.
            </p>
          </div>

          {/* How We Use Your Information */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>How We Use Your Information</h2>
            <p style={S.p}>We use the information we collect to:</p>
            <ul style={S.ul}>
              <li style={S.li}>Process and fulfill your orders, and send order confirmations and shipping updates</li>
              <li style={S.li}>Respond to your customer service requests and inquiries</li>
              <li style={S.li}>Send transactional emails related to your purchases</li>
              <li style={S.li}>Send promotional emails and special offers, if you have opted in (you may unsubscribe at any time)</li>
              <li style={S.li}>Improve our website, products, and overall shopping experience</li>
              <li style={S.li}>Detect and prevent fraud or unauthorized transactions</li>
              <li style={S.li}>Comply with legal obligations</li>
            </ul>
          </div>

          {/* Cookies */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Cookies</h2>
            <p style={S.p}>
              We use cookies — small text files stored on your device — to keep your shopping cart
              active, remember your preferences, and understand how visitors use our site. Cookies
              we use include:
            </p>
            <ul style={S.ul}>
              <li style={S.li}><strong>Essential cookies:</strong> Required for the site to function (e.g., cart and session cookies).</li>
              <li style={S.li}><strong>Analytics cookies:</strong> Help us understand traffic patterns and improve our site (e.g., Google Analytics).</li>
              <li style={S.li}><strong>Marketing cookies:</strong> Used to show you relevant ads on other platforms, if you have consented.</li>
            </ul>
            <p style={S.p}>
              You can control or disable cookies through your browser settings at any time. Note that
              disabling certain cookies may affect site functionality.
            </p>
          </div>

          {/* Third-Party Services */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Third-Party Services</h2>
            <p style={S.p}>
              We use trusted third-party services to operate our store. These providers may process
              your data on our behalf under their own privacy policies:
            </p>
            <ul style={S.ul}>
              <li style={S.li}><strong>Payment processors</strong> (e.g., Stripe, PayPal) — for secure transaction handling</li>
              <li style={S.li}><strong>Shipping carriers</strong> — to deliver your order and provide tracking</li>
              <li style={S.li}><strong>Email platforms</strong> — to send order confirmations and marketing emails</li>
              <li style={S.li}><strong>Analytics providers</strong> (e.g., Google Analytics) — to measure site performance</li>
            </ul>
            <p style={S.p}>
              Our site may also contain embedded content from third parties (such as videos or social
              media widgets). Embedded content behaves as if you have visited those third-party
              websites directly and may collect data, use cookies, or track your interaction.
            </p>
          </div>

          {/* Data Sharing */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Data Sharing</h2>
            <p style={S.p}>
              We do not sell, rent, or trade your personal information to third parties for their own
              marketing purposes. We share your data only as necessary to fulfill your order or
              operate our business (as described above), or when required by law.
            </p>
          </div>

          {/* Data Retention */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Data Retention</h2>
            <p style={S.p}>
              We retain your order information for as long as necessary to fulfill our legal and
              accounting obligations, typically up to 7 years. If you have an account, your profile
              data is kept until you request deletion. Support communications are kept for up to
              3 years.
            </p>
          </div>

          {/* Your Rights */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Your Rights</h2>
            <p style={S.p}>
              Depending on your location, you may have the right to:
            </p>
            <ul style={S.ul}>
              <li style={S.li}>Access a copy of the personal data we hold about you</li>
              <li style={S.li}>Request correction of inaccurate or incomplete data</li>
              <li style={S.li}>Request deletion of your personal data (subject to legal retention requirements)</li>
              <li style={S.li}>Opt out of marketing emails at any time via the unsubscribe link in any email</li>
              <li style={S.li}>Lodge a complaint with your local data protection authority</li>
            </ul>
            <p style={S.p}>
              To exercise any of these rights, please email us at{" "}
              <a href="mailto:support@ortholabcenter.com" style={{ color: "#0097A7" }}>
                support@ortholabcenter.com
              </a>
              . We will respond within 30 days.
            </p>
          </div>

          {/* Security */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Security</h2>
            <p style={S.p}>
              We implement industry-standard security measures including SSL encryption, secure
              payment processing, and restricted access to personal data. While no method of
              transmission over the internet is 100% secure, we take all reasonable steps to
              protect your information.
            </p>
          </div>

          {/* Children's Privacy */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Children&apos;s Privacy</h2>
            <p style={S.p}>
              Our website is not directed to children under the age of 13. We do not knowingly
              collect personal information from children. If you believe we have inadvertently
              collected such information, please contact us immediately.
            </p>
          </div>

          {/* Changes to This Policy */}
          <div style={S.sectionWrap}>
            <h2 style={S.h2}>Changes to This Policy</h2>
            <p style={S.p}>
              We may update this Privacy Policy from time to time to reflect changes in our practices
              or for legal reasons. When we do, we will revise the &ldquo;Last updated&rdquo; date at the top of
              this page. We encourage you to review this page periodically.
            </p>
          </div>

          {/* Contact Us */}
          <div style={{ ...S.sectionWrap, marginBottom: 0 }}>
            <h2 style={S.h2}>Contact Us</h2>
            <p style={S.p}>
              If you have any questions about this Privacy Policy or how we handle your data,
              please reach out:
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
