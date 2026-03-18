"use client";

import { useState } from "react";

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

function MetaIcon({ size = 20 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.25, background: "#1877F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 10 10" fill="none">
        <path d="M5.8 9.5V5.6H7L7.2 4H5.8V3C5.8 2.5 6 2.2 6.7 2.2H7.3V0.8C7.1 0.8 6.7 0.7 6.2 0.7C4.9 0.7 4.1 1.5 4.1 2.8V4H2.7V5.6H4.1V9.5H5.8Z" fill="white"/>
      </svg>
    </div>
  );
}

function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.25, background: "#000000", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 18 18" fill="none">
        <path d="M14.5 3.8C13.6 3.8 12.8 3.4 12.3 2.8V2H9.8V11.5C9.8 12.4 9.1 13.2 8.1 13.2C7.1 13.2 6.4 12.4 6.4 11.5C6.4 10.5 7.1 9.8 8.1 9.8C8.4 9.8 8.6 9.9 8.8 10V7.4C8.6 7.4 8.3 7.3 8.1 7.3C5.7 7.3 3.8 9.2 3.8 11.5C3.8 13.9 5.7 15.8 8.1 15.8C10.4 15.8 12.3 13.9 12.3 11.5V7.2C13.2 7.8 14.3 8.1 15.4 8.1V5.6C15.1 5.6 14.8 5.5 14.5 5.3V3.8Z" fill="white"/>
      </svg>
    </div>
  );
}

function ShopifyIcon({ size = 20 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.25, background: "#96BF48", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 20 20" fill="none">
        <path d="M13.8 3.2C13.8 3.2 13.6 3.2 13.3 3.3L12.8 1.9C12.6 1.3 12 0.9 11.3 0.9C11.3 0.9 11.1 0.9 11 0.9C10.9 0.7 10.6 0.5 10.2 0.5C8.8 0.5 8.1 1.7 7.9 2.4C7.2 2.6 6.6 2.8 6.6 2.8L5.3 14.5L12.9 16L16.3 15.2L14.4 3.3C14.2 3.2 14 3.2 13.8 3.2ZM11.1 1.3C11.4 1.3 11.6 1.5 11.7 1.8L10.3 2.2C10.5 1.6 10.8 1.3 11.1 1.3ZM10 2.9C10.2 2.2 10.6 1.6 11.1 1.4L11.9 3.5L10 2.9ZM7.8 12.6L6.9 7.8L9.5 9.3L7.8 12.6Z" fill="white"/>
      </svg>
    </div>
  );
}

const BILLING_HISTORY = [
  { period: "December 2025", customers: 38, total: 641 },
  { period: "November 2025", customers: 28, total: 551 },
  { period: "October 2025",  customers: 22, total: 497 },
];

export default function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const [tab, setTab] = useState<"connections" | "billing">("connections");
  const [pricingOpen, setPricingOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.18)", zIndex: 40 }}
        />
      )}

      {/* Panel */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: 380,
        background: "var(--surface)",
        borderLeft: "1px solid var(--border)",
        zIndex: 50,
        transform: open ? "translateX(0)" : "translateX(380px)",
        transition: "transform 0.22s ease",
        display: "flex", flexDirection: "column",
        overflowY: "auto",
      }}>

        {/* Header */}
        <div style={{ padding: "20px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: 0 }}>
          <div style={{ display: "flex", gap: 24 }}>
            {(["connections", "billing"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: "none", border: "none", padding: "0 0 14px",
                  fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: tab === t ? 500 : 400,
                  color: tab === t ? "var(--ink)" : "var(--muted)",
                  borderBottom: tab === t ? "2px solid var(--accent)" : "2px solid transparent",
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", padding: "0 0 14px", color: "var(--subtle)", cursor: "pointer" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div style={{ padding: "24px" }}>

          {tab === "connections" && (
            <div>
              {/* Network connections */}
              {[
                {
                  icon: <MetaIcon size={24}/>,
                  name: "Meta Ads",
                  sub: "Noïse Botanics · #8471923",
                  status: "Connected",
                  statusColor: "var(--green-text)",
                  link: "View in Meta →",
                },
                {
                  icon: <GoogleIcon size={24}/>,
                  name: "Google Ads",
                  sub: "Expand to Google Search",
                  status: "Phase 2",
                  statusColor: "var(--subtle)",
                  link: "Join waitlist →",
                },
                {
                  icon: <TikTokIcon size={24}/>,
                  name: "TikTok Ads",
                  sub: "Video-first discovery",
                  status: "Phase 3",
                  statusColor: "var(--subtle)",
                  link: "Join waitlist →",
                },
              ].map((conn, i, arr) => (
                <div key={conn.name} style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 16, marginBottom: 16, borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                  {conn.icon}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>{conn.name}</div>
                    <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--subtle)", marginTop: 1 }}>{conn.sub}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, fontWeight: 500, color: conn.statusColor }}>{conn.status}</div>
                    <a href="#" style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--accent-text)", textDecoration: "none" }}>{conn.link}</a>
                  </div>
                </div>
              ))}

              {/* Shopify separator */}
              <div style={{ marginTop: 8, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <ShopifyIcon size={24}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>Shopify</div>
                    <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--subtle)", marginTop: 1 }}>noisebotanics.myshopify.com</div>
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, fontWeight: 500, color: "var(--green-text)" }}>Connected</div>
                </div>
              </div>

              {/* Note */}
              <p style={{ marginTop: 20, fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--subtle)", lineHeight: 1.6 }}>
                Pulse reads first-purchase data from Shopify and cross-references Meta ad touches within a 60-day window.
              </p>
            </div>
          )}

          {tab === "billing" && (
            <div>
              {/* Current month */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 14 }}>January 2026</div>
                <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
                  {[
                    { label: "Base fee", value: "€299" },
                    { label: "47 customers × €9", value: "€423" },
                  ].map((row, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--muted)" }}>{row.label}</span>
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>{row.value}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "var(--bg)" }}>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>Total</span>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>€722</span>
                  </div>
                </div>
                <a href="#" style={{ display: "block", marginTop: 10, fontFamily: "var(--font-inter)", fontSize: 13, color: "var(--accent-text)", textDecoration: "none" }}>Download invoice →</a>
              </div>

              {/* History */}
              <div style={{ fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--subtle)", marginBottom: 10 }}>
                Previous
              </div>
              <div>
                {BILLING_HISTORY.map((inv, i) => (
                  <div key={inv.period} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: i < BILLING_HISTORY.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <span style={{ flex: 1, fontFamily: "var(--font-inter)", fontSize: 13, color: "var(--muted)" }}>{inv.period}</span>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "var(--muted)", marginRight: 12 }}>€{inv.total}</span>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--green-text)" }}>Paid ✓</span>
                  </div>
                ))}
              </div>

              {/* Pricing explainer */}
              <div style={{ marginTop: 20, border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
                <button
                  onClick={() => setPricingOpen((v) => !v)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "none", border: "none", cursor: "pointer" }}
                >
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "var(--muted)" }}>How pricing works</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: pricingOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
                    <path d="M3 5L7 9L11 5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {pricingOpen && (
                  <div style={{ padding: "0 16px 16px", fontFamily: "var(--font-inter)", fontSize: 13, color: "var(--muted)", lineHeight: 1.65, borderTop: "1px solid var(--border)" }}>
                    <p style={{ marginTop: 12 }}>€299/month covers system operation. The €9 per-customer fee is set during your Pulse Check based on your AOV and LTV — you only pay for verified new customers confirmed in Shopify within a 60-day window.</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
