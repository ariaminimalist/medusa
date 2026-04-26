"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const CtaSection = () => (
  <section style={{ background: "#EB630D" }} className="py-16 lg:py-24 px-5 md:px-6">
    <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
      <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#fff", background: "rgba(255,255,255,0.25)", padding: "5px 14px", borderRadius: 99, marginBottom: 20 }}>
        Limited Time Offer
      </span>
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 3.8vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 16, marginTop: 0 }}>
        Don&apos;t Let Pain Define Your Day.
      </h2>
      <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
        Join 2,300+ people who&apos;ve already made recovery a daily habit. Today only — 53% off the regular price.
      </p>
      <LocalizedClientLink href="/store">
        <button style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, background: "#fff", color: "#0C2240", border: "none", borderRadius: 10, padding: "17px 40px", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,.20)", transition: "transform .2s, box-shadow .2s, background .15s", letterSpacing: "0.01em" }}
          onMouseOver={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "#F0FDFF"; b.style.transform = "translateY(-2px)" }}
          onMouseOut={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "#fff"; b.style.transform = "translateY(0)" }}>
          Get the FlexWave — $69.99
        </button>
      </LocalizedClientLink>
      <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 20, flexWrap: "wrap" }}>
        {["Free worldwide shipping", "30-day returns", "Secure checkout"].map(t => (
          <span key={t} style={{ fontSize: 12.5, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>✓ {t}</span>
        ))}
      </div>
    </div>
  </section>
)

export default CtaSection
