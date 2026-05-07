import type { ProcessContent } from "@content/homepage/types"

const ProcessSection = ({ content }: { content: ProcessContent }) => (
  <section id="how-it-works" style={{ background: "#fff" }} className="py-16 lg:py-24">
    <div style={{ maxWidth: 1160, margin: "0 auto" }} className="px-5 md:px-6">
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#007D8C", background: "#E0F7FA", padding: "5px 14px", borderRadius: 99, marginBottom: 14 }}>{content.tag}</span>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 3.8vw, 44px)", fontWeight: 800, color: "#0C2240", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 14, marginTop: 0 }}>{content.heading}</h2>
        <p style={{ fontSize: 16.5, color: "#64748B", maxWidth: 560, margin: "0 auto" }}>{content.subheading}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8" style={{ position: "relative" }}>
        <div className="hidden md:block" style={{ position: "absolute", top: 36, left: "16.66%", right: "16.66%", height: 2, background: "linear-gradient(90deg, #B2EBF2, #0097A7, #B2EBF2)", zIndex: 0 }} />
        {content.steps.map((s, i) => (
          <div key={s.title} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{ width: 72, height: 72, background: "#0097A7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 4px 16px rgba(0,151,167,.25)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 26, fontWeight: 900, color: "#fff" }}>{i + 1}</span>
            </div>
            <h4 style={{ fontFamily: "var(--font-heading)", fontSize: 17, fontWeight: 700, color: "#0C2240", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 10, marginTop: 0 }}>{s.title}</h4>
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default ProcessSection
