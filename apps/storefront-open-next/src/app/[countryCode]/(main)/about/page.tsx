import { Metadata } from "next"
import Image from "next/image"
import { PrimaryCtaButton, WhiteCtaButton, HoverCard } from "./cta-button"

export const metadata: Metadata = {
  title: "About Us — OrthoLab Center",
  description:
    "OrthoLab Center bridges the gap between clinical-grade orthopedic care and everyday comfort. Learn our mission, values, and the people behind the FlexWave.",
}

const stats = [
  { num: "2,300+", lbl: "Customers Helped" },
  { num: "5+",     lbl: "Years of Innovation" },
  { num: "4.9★",   lbl: "Average Rating" },
  { num: "30-Day", lbl: "Money-Back" },
]

const checks = [
  { bold: "Anatomical Design", rest: " — contoured to mirror your body's natural mechanics." },
  { bold: "Premium Materials", rest: " — moisture-wicking fabrics that stay comfortable all day." },
  { bold: "Tested by Athletes", rest: " — validated in real-world, high-impact conditions." },
  { bold: "Satisfaction Guaranteed", rest: " — if it doesn't help, we make it right." },
]

const values = [
  {
    icon: "🎯",
    title: "Anatomical Precision",
    desc: "Devices contoured to mirror the body's natural mechanics — because fit determines effectiveness.",
  },
  {
    icon: "❤️",
    title: "Customer-First Recovery",
    desc: "Your pain relief is our primary success metric — not units sold. If it doesn't help, we make it right.",
  },
  {
    icon: "🔬",
    title: "Evidence-Based Design",
    desc: "Every feature we include is backed by research in physical therapy and sports medicine — not gimmicks or fads.",
  },
  {
    icon: "🌍",
    title: "Accessible Quality",
    desc: "Professional-grade gear shouldn't be exclusive. We believe everyone deserves access to the tools that help them live actively.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── About Hero — centered, dark navy gradient ── */}
      <section className="py-16 md:py-24 px-5 md:px-6" style={{
        background: "linear-gradient(130deg, #071628 0%, #0C2240 55%, #163556 100%)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}>
        {/* radial glow overlay */}
        <div style={{
          position: "absolute", top: "-30%", left: "50%",
          transform: "translateX(-50%)",
          width: "60%", height: "160%",
          background: "radial-gradient(ellipse, rgba(0,151,167,.18) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#67D4DC", background: "rgba(0,151,167,.2)", padding: "5px 14px", borderRadius: 99, marginBottom: 24 }}>
            Our Story
          </span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 18, marginTop: 0 }}>
            Restoring Mobility,{" "}
            <em style={{ fontStyle: "normal", color: "#0097A7" }}>One Step at a Time.</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,.65)", fontSize: 18, lineHeight: 1.75, maxWidth: 560, margin: "0 auto 36px" }}>
            We bridge the gap between clinical-grade orthopedic care and everyday comfort. Pain shouldn't define your lifestyle — and we've spent over half a decade making sure it doesn't have to.
          </p>
          <PrimaryCtaButton href="/store">Shop the FlexWave</PrimaryCtaButton>
        </div>
      </section>

      {/* ── Mission — two-col: image left, copy + stats right ── */}
      <section style={{ background: "#fff" }} className="py-16 lg:py-24 px-5 md:px-6">
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16" style={{ alignItems: "center" }}>

            {/* Image */}
            <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 60px rgba(12,34,64,.16), 0 4px 16px rgba(12,34,64,.08)", aspectRatio: "4/3", background: "#FAF7F3" }}>
              <Image
                src="/images/about-hero.jpg"
                alt="OrthoLab team helping customers"
                width={1200}
                height={900}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                priority
              />
            </div>

            {/* Copy */}
            <div>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#007D8C", background: "#E0F7FA", padding: "5px 14px", borderRadius: 99, marginBottom: 16 }}>
                Our Mission
              </span>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 3.8vw, 44px)", fontWeight: 800, color: "#0C2240", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 16, marginTop: 0 }}>
                We Design Solutions, Not Just Products.
              </h2>
              <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.75, marginBottom: 28 }}>
                Every product we bring to market is vetted for anatomical accuracy, ease of use, and long-term durability. Over half a decade of orthopedic wellness dedication — and 2,300+ customers who can feel the difference.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4" style={{ border: "1px solid #E2EAF4", borderRadius: 12, overflow: "hidden" }}>
                {stats.map((s, i) => (
                  <div key={s.lbl} className={i % 2 !== 1 ? "border-r border-gray-100" : i < 2 ? "border-b border-gray-100 md:border-b-0 md:border-r" : ""} style={{ textAlign: "center", padding: "20px 10px", background: "#fff" }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 900, color: "#0097A7", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 5 }}>
                      {s.num}
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "#64748B", textTransform: "uppercase" as const, letterSpacing: "0.07em" }}>
                      {s.lbl}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Philosophy — two-col reversed: copy left, image right ── */}
      <section style={{ background: "#FAF7F3" }} className="py-16 lg:py-24 px-5 md:px-6">
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16" style={{ alignItems: "center" }}>

            {/* Copy — first in DOM so it shows on top on mobile */}
            <div>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#007D8C", background: "#E0F7FA", padding: "5px 14px", borderRadius: 99, marginBottom: 16 }}>
                Our Philosophy
              </span>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 3.8vw, 44px)", fontWeight: 800, color: "#0C2240", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 16, marginTop: 0 }}>
                Quality You Can Feel From the First Use.
              </h2>
              <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.75, marginBottom: 20 }}>
                We hold our products to uncompromising standards. Our design process is rooted in human biomechanics — not marketing trends. If a feature doesn't serve your recovery, it doesn't make the cut.
              </p>

              {/* Check list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {checks.map(c => (
                  <div key={c.bold} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15, color: "#374151" }}>
                    <div style={{ width: 22, height: 22, minWidth: 22, background: "#0097A7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                      <svg viewBox="0 0 24 24" fill="none" style={{ width: 11, height: 11, stroke: "#fff", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }}>
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span><strong style={{ color: "#0C2240" }}>{c.bold}</strong>{c.rest}</span>
                  </div>
                ))}
              </div>

              <PrimaryCtaButton href="/store">Shop the FlexWave</PrimaryCtaButton>
            </div>

            {/* Image — second in DOM, appears right on desktop */}
            <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 60px rgba(12,34,64,.16), 0 4px 16px rgba(12,34,64,.08)", aspectRatio: "4/3", background: "#E0F7FA" }}>
              <Image
                src="/images/about-quality.jpg"
                alt="OrthoLab quality craftsmanship"
                width={1200}
                height={900}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section style={{ background: "#fff" }} className="py-16 lg:py-24 px-5 md:px-6">
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#007D8C", background: "#E0F7FA", padding: "5px 14px", borderRadius: 99, marginBottom: 16 }}>
              What We Stand For
            </span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 3.8vw, 44px)", fontWeight: 800, color: "#0C2240", letterSpacing: "-0.02em", lineHeight: 1.2, margin: 0 }}>
              Our Core Values
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {values.map(v => (
              <HoverCard key={v.title}>
                <div style={{ width: 56, height: 56, background: "#E0F7FA", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, fontSize: 26 }}>
                  {v.icon}
                </div>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 800, color: "#0C2240", marginBottom: 8, marginTop: 0 }}>{v.title}</h4>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner — orange gradient ── */}
      <section style={{ background: "linear-gradient(135deg, #C24901 0%, #E85D04 50%, #F07020 100%)", position: "relative", overflow: "hidden" }}>
        {/* radial glow */}
        <div style={{ position: "absolute", top: "-50%", right: "-10%", width: "60%", height: "200%", background: "radial-gradient(ellipse, rgba(255,255,255,.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ textAlign: "center", padding: "80px 24px", position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "rgba(255,255,255,.95)", background: "rgba(255,255,255,.2)", padding: "5px 14px", borderRadius: 99, marginBottom: 20 }}>
            Ready to Feel Better?
          </span>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 3.8vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 16, marginTop: 0 }}>
            Experience OrthoLab Quality Today.
          </h2>
          <p style={{ color: "rgba(255,255,255,.85)", fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
            Join 2,300+ customers who've made the FlexWave part of their daily routine. 53% off — today only.
          </p>
          <WhiteCtaButton href="/store">Shop the FlexWave</WhiteCtaButton>
          <p style={{ color: "rgba(255,255,255,.6)", fontSize: 13, marginTop: 16 }}>
            <span style={{ marginRight: 8 }}>Free worldwide shipping ·</span>
            <span style={{ marginRight: 8 }}>30-day returns ·</span>
            <span>Secure checkout</span>
          </p>
        </div>
      </section>
    </>
  )
}
