"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const HoverCard = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{ background: "#fff", border: "1px solid #E2EAF4", borderRadius: 16, padding: "32px 26px", boxShadow: "0 1px 3px rgba(12,34,64,.06), 0 2px 8px rgba(12,34,64,.06)", transition: "box-shadow .25s, transform .25s, border-color .25s" }}
    onMouseOver={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 4px 12px rgba(12,34,64,.08), 0 1px 3px rgba(12,34,64,.05)"; el.style.transform = "translateY(-3px)"; el.style.borderColor = "#B2EBF2" }}
    onMouseOut={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 1px 3px rgba(12,34,64,.06), 0 2px 8px rgba(12,34,64,.06)"; el.style.transform = "translateY(0)"; el.style.borderColor = "#E2EAF4" }}
  >
    {children}
  </div>
)

export const PrimaryCtaButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <LocalizedClientLink href={href}>
    <button
      style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, background: "#E85D04", color: "#fff", border: "none", borderRadius: 10, padding: "15px 32px", cursor: "pointer", boxShadow: "0 4px 16px rgba(232,93,4,.30)", transition: "transform .2s, background .15s", letterSpacing: "0.01em" }}
      onMouseOver={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "#C24901"; b.style.transform = "translateY(-2px)" }}
      onMouseOut={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "#E85D04"; b.style.transform = "translateY(0)" }}
    >
      {children}
    </button>
  </LocalizedClientLink>
)

export const WhiteCtaButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <LocalizedClientLink href={href}>
    <button
      style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, background: "#fff", color: "#0C2240", border: "none", borderRadius: 10, padding: "17px 40px", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,.20)", transition: "transform .2s, background .15s", letterSpacing: "0.01em" }}
      onMouseOver={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "#F0FDFF"; b.style.transform = "translateY(-2px)" }}
      onMouseOut={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "#fff"; b.style.transform = "translateY(0)" }}
    >
      {children}
    </button>
  </LocalizedClientLink>
)
