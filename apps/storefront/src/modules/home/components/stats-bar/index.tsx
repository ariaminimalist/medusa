const stats = [
  { main: "2,300", accent: "+", label: "Happy Customers" },
  { main: "4.9", accent: "★", label: "Average Rating" },
  { main: "30", accent: "-day", label: "Money-Back Guarantee" },
  { main: "15", accent: "min", label: "Daily for Relief" },
]

const borderClass = [
  "border-r border-b border-gray-100 md:border-b-0",
  "border-b border-gray-100 md:border-b-0 md:border-r",
  "border-r border-gray-100",
  "",
]

const StatsBar = () => (
  <section style={{ borderTop: "1px solid #E2EAF4", borderBottom: "1px solid #E2EAF4", background: "#fff" }}>
    <div className="grid grid-cols-2 md:grid-cols-4" style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
      {stats.map((s, i) => (
        <div key={s.label} className={borderClass[i]} style={{ textAlign: "center", padding: "28px 16px" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 900, color: "#0C2240", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            <span>{s.main}</span>
            <span style={{ fontSize: "0.6em", color: "#C24901" }}>{s.accent}</span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 500, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 4 }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  </section>
)

export default StatsBar
