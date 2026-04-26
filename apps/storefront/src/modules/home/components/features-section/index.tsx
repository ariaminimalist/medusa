"use client"

const features = [
  {
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28, fill: "#0097A7" }}>
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 14.93V17a1 1 0 01-2 0v-.07A8.001 8.001 0 014 9a1 1 0 012 0 6 6 0 006 6 6 6 0 006-6 1 1 0 012 0 8.001 8.001 0 01-7 7.93z" />
      </svg>
    ),
    title: "Therapeutic Heat",
    desc: "3 adjustable heat levels gently warm stiff joints and promote blood circulation for deep, lasting relief.",
  },
  {
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28, fill: "#0097A7" }}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
      </svg>
    ),
    title: "360° Air Compression",
    desc: "Clinically-inspired air chambers inflate and deflate to simulate professional lymphatic massage therapy.",
  },
  {
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28, fill: "#0097A7" }}>
        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
      </svg>
    ),
    title: "Pre-Set Massage Programs",
    desc: "Choose from targeted massage programs designed for post-workout recovery, daily comfort, or targeted pain relief.",
  },
  {
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28, fill: "#0097A7" }}>
        <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
      </svg>
    ),
    title: "Long-Lasting Battery",
    desc: "2000mAh rechargeable battery — USB-C fast charge. Use it all week on a single charge.",
  },
]

const FeaturesSection = () => (
  <section style={{ background: "#FAF7F3" }} className="py-16 lg:py-24">
    <div style={{ maxWidth: 1160, margin: "0 auto" }} className="px-5 md:px-6">
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#007D8C", background: "#E0F7FA", padding: "5px 14px", borderRadius: 99, marginBottom: 14 }}>
          3-in-1 Technology
        </span>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 3.8vw, 44px)", fontWeight: 800, color: "#0C2240", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 14, marginTop: 0 }}>
          Everything Your Ankles Need
        </h2>
        <p style={{ fontSize: 16.5, color: "#64748B", maxWidth: 560, margin: "0 auto" }}>
          Professional recovery tech — distilled into one compact, easy-to-use device.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map(f => (
          <div key={f.title} style={{ background: "#fff", border: "1px solid #B2EBF2", borderRadius: 16, padding: "28px 24px", boxShadow: "0 1px 3px rgba(12,34,64,.06), 0 2px 8px rgba(12,34,64,.06)", transition: "box-shadow .25s, transform .25s, border-color .25s" }}
            onMouseOver={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 8px 32px rgba(12,34,64,.12)"; el.style.transform = "translateY(-3px)"; el.style.borderColor = "#0097A7" }}
            onMouseOut={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 1px 3px rgba(12,34,64,.06), 0 2px 8px rgba(12,34,64,.06)"; el.style.transform = "translateY(0)"; el.style.borderColor = "#B2EBF2" }}>
            <div style={{ width: 56, height: 56, background: "#E0F7FA", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              {f.svg}
            </div>
            <h4 style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700, color: "#0C2240", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 6, marginTop: 0 }}>
              {f.title}
            </h4>
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.55, margin: 0 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default FeaturesSection
