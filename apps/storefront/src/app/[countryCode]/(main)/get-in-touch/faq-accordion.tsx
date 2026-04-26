"use client"

import { useState } from "react"

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard delivery takes 5–10 business days. Expedited options are available at checkout. All orders over $50 ship free worldwide. You'll receive a tracking number by email as soon as your order ships.",
  },
  {
    q: "Can I return the product if I'm not satisfied?",
    a: "Absolutely. We offer a 30-day money-back guarantee on all orders. Simply email support@ortholabcenter.com with your order number and we'll guide you through the process. No hassle, no hoops.",
  },
  {
    q: "Is the massager compatible with all foot sizes?",
    a: "Yes — the OLC FlexWave is designed to fit both left and right feet and comfortably accommodates US sizes 5–12 (EU 35–46). The flexible air chamber automatically adjusts to your ankle shape.",
  },
  {
    q: "How do I charge the device?",
    a: "The FlexWave charges via a standard USB-C cable, which is included in the box. A full charge takes approximately 2 hours and provides up to 2 hours of continuous use at the highest setting.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes, every FlexWave comes with a 1-year manufacturer's warranty covering defects in materials and workmanship. If you experience any issues within the warranty period, contact us and we'll replace or repair it free of charge.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, and other local payment methods depending on your region. All transactions are secured with SSL encryption.",
  },
]

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {faqs.map((item, i) => (
        <div
          key={i}
          style={{
            border: "1px solid",
            borderColor: open === i ? "#B2EBF2" : "#E2EAF4",
            borderRadius: 12,
            overflow: "hidden",
            transition: "border-color .2s",
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              padding: "18px 22px",
              background: open === i ? "#F0FDFF" : "#fff",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              transition: "background .2s",
            }}
          >
            <span style={{
              fontFamily: "var(--font-heading)", fontWeight: 700,
              fontSize: 15, color: "#0C2240", lineHeight: 1.4,
            }}>
              {item.q}
            </span>
            <svg
              viewBox="0 0 24 24" fill="none"
              style={{
                width: 18, height: 18, minWidth: 18,
                stroke: "#0097A7", strokeWidth: 2.5,
                strokeLinecap: "round", strokeLinejoin: "round",
                transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform .25s",
              }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {open === i && (
            <div style={{ padding: "0 22px 18px", background: "#F0FDFF" }}>
              <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, margin: 0 }}>
                {item.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
