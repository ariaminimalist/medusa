const testimonials = [
  {
    initials: "SJ",
    name: "Sarah Johnson",
    role: "Active Professional, New York",
    text: "Managing ankle stiffness after long days on my feet has always been a challenge, but this massager has been a true life-changer. The soothing heat and targeted air pressure settings provide lasting comfort I notice immediately.",
  },
  {
    initials: "DM",
    name: "David Matthews",
    role: "Amateur Runner, Boston",
    text: "My ankle fatigue after long runs used to slow me down significantly. This massager has reduced my recovery time noticeably — the 360° compression feels incredible and I get back to full performance much faster.",
  },
  {
    initials: "LR",
    name: "Lisa Rodriguez",
    role: "Nurse, Chicago",
    text: "I was skeptical at first — but after a week of daily use, the difference in my morning stiffness is remarkable. Simple to charge, easy to use, and the digital display makes it feel genuinely premium. Worth every penny.",
  },
]

const VerifiedSVG = () => (
  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4L19 7" />
  </svg>
)

const Testimonials = () => (
  <section style={{ background: "#fff" }} className="py-16 lg:py-24">
    <div style={{ maxWidth: 1160, margin: "0 auto" }} className="px-5 md:px-6">
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#007D8C", background: "#E0F7FA", padding: "5px 14px", borderRadius: 99, marginBottom: 14 }}>
          Real Results
        </span>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 3.8vw, 44px)", fontWeight: 800, color: "#0C2240", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 14, marginTop: 0 }}>
          Customers Who Never Looked Back
        </h2>
        <p style={{ fontSize: 16.5, color: "#64748B", maxWidth: 560, margin: "0 auto" }}>
          Over 2,300 people have made the FlexWave part of their daily routine.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map(t => (
          <div key={t.name} style={{ background: "#FAF7F3", border: "1px solid #E2EAF4", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ color: "#F59E0B", fontSize: 18, letterSpacing: 3 }}>★★★★★</div>
            <p style={{ color: "#374151", fontSize: 14.5, lineHeight: 1.65, margin: 0, flex: 1 }}>
              &ldquo;{t.text}&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid #E2EAF4" }}>
              <div style={{ width: 42, height: 42, background: "#0C2240", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.initials}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 700, color: "#0C2240" }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "#64748B", marginTop: 1 }}>{t.role}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#E0F7FA", borderRadius: 99, padding: "4px 10px" }}>
                <span style={{ color: "#0097A7" }}><VerifiedSVG /></span>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#007D8C" }}>Verified</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Testimonials
