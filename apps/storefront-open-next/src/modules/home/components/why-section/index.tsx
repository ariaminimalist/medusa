"use client"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type { WhyContent } from "@content/homepage/types"

const CheckSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} style={{ width: 14, height: 14, stroke: "#fff", flexShrink: 0 }}>
    <path d="M5 13l4 4L19 7" />
  </svg>
)

const WhySection = ({ content }: { content: WhyContent }) => (
  <section style={{ background: "#FAF7F3" }} className="py-16 lg:py-24">
    <div style={{ maxWidth: 1160, margin: "0 auto" }} className="px-5 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16" style={{ alignItems: "center" }}>
        <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 36px rgba(10,22,40,0.12)" }}>
          <Image src="/images/recovery.webp" alt="Active person recovering with FlexWave" width={1365} height={768} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>

        <div>
          <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#007D8C", background: "#E0F7FA", padding: "5px 14px", borderRadius: 99, marginBottom: 14 }}>{content.tag}</span>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 3.8vw, 44px)", fontWeight: 800, color: "#0C2240", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 16, marginTop: 0 }}>{content.heading}</h2>
          <p style={{ color: "#374151", lineHeight: 1.72, marginBottom: 28, fontSize: 16 }}>{content.body}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
            {content.checks.map(c => (
              <div key={c.bold} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 22, height: 22, background: "#0097A7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <CheckSVG />
                </div>
                <span style={{ color: "#374151", fontSize: 15, lineHeight: 1.6 }}>
                  <strong style={{ color: "#0C2240" }}>{c.bold}</strong>{c.rest}
                </span>
              </div>
            ))}
          </div>

          <LocalizedClientLink href="/store">
            <button style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, background: "#E85D04", color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", cursor: "pointer", boxShadow: "0 4px 16px rgba(232,93,4,.30)", transition: "transform .2s, box-shadow .2s, background .15s", letterSpacing: "0.01em" }}
              onMouseOver={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "#C24901"; b.style.transform = "translateY(-2px)" }}
              onMouseOut={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "#E85D04"; b.style.transform = "translateY(0)" }}>
              {content.buttonText}
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  </section>
)

export default WhySection
