"use client"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type { HeroContent } from "@content/homepage/types"

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0" style={{ stroke: "#0097A7" }}>
    <path d="M5 13l4 4L19 7" />
  </svg>
)

const Hero = ({ content }: { content: HeroContent }) => (
  <section style={{ backgroundImage: "linear-gradient(180deg, rgba(16,144,235,0.37) 0%, rgb(255,255,255) 100%)" }}>
    <div style={{ maxWidth: 1160, margin: "0 auto" }} className="px-5 md:px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14" style={{ alignItems: "center" }}>

        <div className="order-first md:order-last" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: 480 }}>
            <Image src="/images/hero-product.webp" alt="OLC FlexWave Ankle Massager" width={1000} height={1000} style={{ width: "100%", height: "auto", objectFit: "contain" }} priority />
          </div>
        </div>

        <div className="order-last md:order-first">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#E0F7FA", border: "1px solid #B2EBF2", borderRadius: 99, padding: "7px 16px", marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, background: "#0097A7", borderRadius: "50%", display: "inline-block", animation: "olc-pulse 2s infinite" }} />
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, color: "#007D8C", letterSpacing: "0.01em" }}>{content.badgeText}</span>
          </div>

          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 5.5vw, 62px)", fontWeight: 900, color: "#0C2240", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 20, marginTop: 0 }}>
            {content.headline}{" "}
            <em style={{ fontStyle: "normal", color: "#0097A7" }}>{content.headlineAccent}</em>
          </h1>

          <p style={{ color: "#374151", fontSize: "clamp(15px, 1.8vw, 17.5px)", lineHeight: 1.7, marginBottom: 32, maxWidth: 440 }}>{content.subheadline}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 36 }}>
            <LocalizedClientLink href="/store">
              <button style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, background: "#E85D04", color: "#fff", border: "none", borderRadius: 10, padding: "17px 36px", cursor: "pointer", boxShadow: "0 4px 16px rgba(232,93,4,.30)", transition: "transform .2s, box-shadow .2s, background .15s", letterSpacing: "0.01em" }}
                onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = "#C24901"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)" }}
                onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = "#E85D04"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)" }}>
                {content.ctaPrimaryText}
              </button>
            </LocalizedClientLink>
            <LocalizedClientLink href="#how-it-works">
              <button style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, background: "transparent", color: "#0C2240", border: "2px solid #0097A7", borderRadius: 10, padding: "15px 36px", cursor: "pointer", transition: "transform .2s, color .15s, border-color .15s", letterSpacing: "0.01em" }}
                onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.color = "#0097A7"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)" }}
                onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.color = "#0C2240"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)" }}>
                {content.ctaSecondaryText}
              </button>
            </LocalizedClientLink>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#64748B", fontSize: 13.5, marginBottom: 20, flexWrap: "wrap" }}>
            <span style={{ color: "#F59E0B", fontSize: 15, letterSpacing: 1 }}>★★★★★</span>
            <strong style={{ color: "#0C2240" }}>{content.ratingText}</strong>
            <span>from {content.reviewCount} verified reviews</span>
          </div>

          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {content.trustBullets.map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 500, color: "#64748B" }}>
                <CheckIcon />{t}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </section>
)

export default Hero
