const ShippingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#0097A7" strokeWidth={1.8} style={{ width: 36, height: 36 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
)
const ReturnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#0097A7" strokeWidth={1.8} style={{ width: 36, height: 36 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)
const WarrantyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#0097A7" strokeWidth={1.8} style={{ width: 36, height: 36 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#0097A7" strokeWidth={1.8} style={{ width: 36, height: 36 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

const badges = [
  { Icon: ShippingIcon, title: "Free Worldwide Shipping", desc: "On all orders above $50" },
  { Icon: ReturnIcon, title: "Easy 30 Days Returns", desc: "30 days money back guarantee" },
  { Icon: WarrantyIcon, title: "International Warranty", desc: "Offered in the country of usage" },
  { Icon: LockIcon, title: "100% Secure Checkout", desc: "PayPal / MasterCard / Visa" },
]

const TrustBadges = () => (
  <section style={{ background: "#fff", borderTop: "1px solid #E2EAF4", borderBottom: "1px solid #E2EAF4" }} className="py-8 px-5 md:px-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ maxWidth: 1160, margin: "0 auto" }}>
      {badges.map(({ Icon, title, desc }) => (
        <div key={title} style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flexShrink: 0 }}><Icon /></div>
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, color: "#0C2240", marginBottom: 2 }}>{title}</div>
            <div style={{ fontSize: 12, color: "#64748B" }}>{desc}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
)

export default TrustBadges
