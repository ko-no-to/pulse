"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

const history = [
  { period: "December 2025", customers: 38, base: 299, perf: 342, total: 641 },
  { period: "November 2025", customers: 28, base: 299, perf: 252, total: 551 },
  { period: "October 2025",  customers: 22, base: 299, perf: 198, total: 497 },
];

export default function BillingPage() {
  const [explainerOpen, setExplainerOpen] = useState(false);

  return (
    <div style={{ background: "#F0EFE9", minHeight: "100%" }}>
      <Topbar title="Billing" subtitle="January 2026"/>
      <div style={{ padding: "28px", maxWidth: 860 }}>

        {/* ── CAC CONTEXT BANNER ── */}
        <div style={{ background: "#EEF4FD", borderLeft: "3px solid #1D5FA8", borderRadius: "0 8px 8px 0", padding: "14px 20px", marginBottom: 20, fontFamily: "var(--font-ui)", fontSize: 14, color: "#1A1A18", lineHeight: 1.6 }}>
          Your performance fee of{" "}
          <span style={{ color: "#1D5FA8", fontWeight: 600 }}>€9 per new customer</span>{" "}
          was set in your Pulse Check based on your AOV of{" "}
          <span style={{ color: "#1D5FA8", fontWeight: 600 }}>€84</span>. Your blended cost of new customer acquisition is{" "}
          <span style={{ color: "#1D5FA8", fontWeight: 600 }}>€31</span> — vs an estimated{" "}
          <span style={{ color: "#1D5FA8", fontWeight: 600 }}>€91</span> on standard Meta conversion campaigns.
        </div>

        {/* ── CURRENT MONTH ── */}
        <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 12, padding: "28px 32px", marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "#1A1A18" }}>January 2026</div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#9B9B96" }}>Due 1 Feb 2026</div>
          </div>

          {/* Line items */}
          <div style={{ border: "1px solid #E8E8E2", borderRadius: 8, overflow: "hidden", marginBottom: 20 }}>
            {[
              { label: "Base fee", sub: "Monthly system operation", qty: "", unit: "", total: "€299" },
              { label: "New customers delivered", sub: "Pulse-attributed · 60-day window", qty: "47", unit: "× €9", total: "€423" },
            ].map((row, i) => (
              <div key={i} style={{ padding: "16px", borderBottom: "1px solid #E8E8E2", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "#1A1A18" }}>{row.label}</div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#9B9B96", marginTop: 2 }}>{row.sub}</div>
                </div>
                {row.qty && <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "#1A1A18" }}>{row.qty}</span>}
                {row.unit && <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "#6B6B66" }}>{row.unit}</span>}
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "#1A1A18", minWidth: 60, textAlign: "right" }}>{row.total}</span>
              </div>
            ))}
            {/* Total row */}
            <div style={{ padding: "16px", background: "#F7F6F1", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#1A1A18" }}>Total</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "#C8440F", letterSpacing: "-0.02em" }}>€722</span>
            </div>
          </div>

          <button style={{ background: "#FFFFFF", border: "1px solid #D4D4CC", color: "#1A1A18", fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500, padding: "10px 20px", borderRadius: 8, cursor: "pointer" }}>
            Download invoice
          </button>

          {/* Green verification note */}
          <div style={{ marginTop: 16, padding: "12px 16px", background: "#EBF7F0", borderRadius: 8, fontFamily: "var(--font-ui)", fontSize: 13, color: "#156639", lineHeight: 1.6 }}>
            47 new customers verified against your Shopify first-purchase data before inclusion in this invoice.
          </div>
        </div>

        {/* ── HISTORY TABLE ── */}
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B6B66", marginBottom: 10 }}>
          Previous invoices
        </div>
        <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 12, overflow: "hidden", marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          {history.map((inv, i) => (
            <div key={inv.period} style={{ padding: "14px 20px", borderBottom: i < history.length - 1 ? "1px solid #E8E8E2" : "none", display: "flex", alignItems: "center", gap: 16 }}
                 onMouseEnter={(e) => (e.currentTarget.style.background = "#F7F6F1")}
                 onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500, color: "#1A1A18", minWidth: 160 }}>{inv.period}</div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "#6B6B66", flex: 1 }}>
                {inv.customers} customers · €{inv.base} + €{inv.perf} ={" "}
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#1A1A18" }}>€{inv.total}</span>
              </div>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: "#156639", background: "#EBF7F0", padding: "2px 8px", borderRadius: 4, flexShrink: 0 }}>Paid</span>
              <button style={{ background: "transparent", border: "1px solid #E8E8E2", color: "#6B6B66", fontFamily: "var(--font-ui)", fontSize: 12, padding: "4px 12px", borderRadius: 6, cursor: "pointer", flexShrink: 0 }}>
                Download
              </button>
            </div>
          ))}
        </div>

        {/* Trend callout */}
        <div style={{ padding: "12px 16px", background: "#EBF7F0", borderRadius: 8, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500, color: "#156639", marginBottom: 12 }}>
          ↑ New customers up 31% month over month since October
        </div>

        {/* ── COLLAPSIBLE PRICING EXPLAINER ── */}
        <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <button
            onClick={() => setExplainerOpen((v) => !v)}
            style={{ width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "transparent", border: "none", cursor: "pointer" }}
          >
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "#1A1A18" }}>How Pulse pricing works</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: explainerOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
              <path d="M4 6L8 10L12 6" stroke="#9B9B96" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {explainerOpen && (
            <div style={{ padding: "0 20px 20px", fontFamily: "var(--font-ui)", fontSize: 14, color: "#6B6B66", lineHeight: 1.7, borderTop: "1px solid #E8E8E2" }}>
              <p style={{ marginTop: 16 }}>Pulse charges a fixed monthly base fee of €299, plus a performance fee per new customer delivered — set during your Pulse Check based on your AOV and LTV.</p>
              <p>You only pay the performance fee for verified new customers: people confirmed as first-time buyers in your Shopify data, within a 60-day attribution window.</p>
              <div style={{ background: "#F7F6F1", border: "1px solid #E8E8E2", borderRadius: 8, padding: "14px 16px", marginTop: 4, fontSize: 13 }}>
                <div style={{ marginBottom: 6 }}>Your AOV: <strong style={{ color: "#1A1A18" }}>€84</strong> · Meta new customer CAC benchmark: <strong style={{ color: "#1A1A18" }}>~€37</strong> (2025)</div>
                <div style={{ marginBottom: 6 }}>Your Pulse blended CAC: <strong style={{ color: "#C8440F" }}>€31</strong></div>
                <div>Saving vs standard Meta acquisition: <strong style={{ color: "#1A7A4A" }}>~€6 per customer</strong></div>
              </div>
              <p style={{ marginTop: 14 }}>As Pulse delivers more customers, your fee grows — because your revenue grows proportionally.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
