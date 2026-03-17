"use client";

import Topbar from "../../components/Topbar";

/* ── SVG brand icons ── */
function MetaLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#1877F2"/>
      <path d="M17.12 24V17.16H19.48L19.84 14.4H17.12V12.6C17.12 11.76 17.36 11.2 18.56 11.2H19.92V8.72C19.68 8.68 18.8 8.6 17.76 8.6C15.64 8.6 14.2 9.88 14.2 12.28V14.4H11.84V17.16H14.2V24H17.12Z" fill="white"/>
    </svg>
  );
}

function ShopifyLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#96BF48"/>
      <path d="M21.6 10.4C21.6 10.4 21.2 10.2 20.8 10.2C20.4 10.2 20 10.4 20 10.4L19.6 8.8C19.4 8 18.8 7.6 18 7.6C17.2 7.6 16.4 8.2 16 8.8L15.2 11.2C14 11.6 13.2 12 13.2 12L10.8 24H22.4L24 10.8L21.6 10.4ZM18 9.2C18.4 9.2 18.6 9.4 18.8 9.8L19.2 11.2C18.8 11.4 18.2 11.6 17.6 11.8L18.4 9.6C18.2 9.4 18 9.2 18 9.2ZM16 15.6C16.4 15.6 16.8 16 16.8 16.4C16.8 16.8 16.4 17.2 16 17.2C15.6 17.2 15.2 16.8 15.2 16.4C15.2 16 15.6 15.6 16 15.6Z" fill="white"/>
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#F3F4F6"/>
      <text x="16" y="21" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700" fill="#9B9B96">G</text>
    </svg>
  );
}

const connections = [
  {
    key: "meta",
    logo: <MetaLogo/>,
    name: "Meta Ads",
    account: "Noïse Botanics · Ad account #8471923",
    syncLabel: "Last sync: 2 minutes ago",
    status: "connected",
    viewLabel: "View in Meta →",
  },
  {
    key: "shopify",
    logo: <ShopifyLogo/>,
    name: "Shopify",
    account: "noisebotanics.myshopify.com",
    syncLabel: "Last sync: Live",
    status: "connected",
    viewLabel: "View in Shopify →",
    note: "Already using Littledata or Elevar? Pulse connects in one click.",
  },
  {
    key: "google",
    logo: <GoogleLogo/>,
    name: "Google Ads",
    account: "Not connected",
    syncLabel: null,
    status: "phase2",
    viewLabel: null,
    phase2Label: "Coming in Phase 2 · Join waitlist →",
  },
];

export default function ConnectionsPage() {
  return (
    <div style={{ background: "#F0EFE9", minHeight: "100%" }}>
      <Topbar title="Connections"/>
      <div style={{ padding: "28px", maxWidth: 760 }}>

        <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B6B66", marginBottom: 12 }}>
          Connected accounts
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {connections.map((c) => (
            <div key={c.key} style={{ background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 12, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", opacity: c.status === "phase2" ? 0.65 : 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ flexShrink: 0 }}>{c.logo}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 600, color: c.status === "phase2" ? "#6B6B66" : "#1A1A18" }}>{c.name}</span>
                    {c.status === "connected" && (
                      <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: "#156639", background: "#EBF7F0", padding: "2px 8px", borderRadius: 4 }}>Connected</span>
                    )}
                    {c.status === "phase2" && (
                      <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: "#9B9B96", background: "#F3F4F6", padding: "2px 8px", borderRadius: 4 }}>Phase 2</span>
                    )}
                  </div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#6B6B66" }}>{c.account}</div>
                  {c.syncLabel && <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#9B9B96", marginTop: 2 }}>{c.syncLabel}</div>}
                  {c.note && <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#9B9B96", marginTop: 4 }}>{c.note}</div>}
                  {c.phase2Label && (
                    <a href="#" style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#A33508", textDecoration: "none", marginTop: 4, display: "inline-block" }}>{c.phase2Label}</a>
                  )}
                </div>
                <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 10 }}>
                  {c.viewLabel && (
                    <a href="#" style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: "#A33508", textDecoration: "none" }}>{c.viewLabel}</a>
                  )}
                  {c.status === "connected" && (
                    <button style={{ background: "#FFFFFF", border: "1px solid #D4D4CC", color: "#1A1A18", fontFamily: "var(--font-ui)", fontSize: 13, padding: "6px 14px", borderRadius: 8, cursor: "pointer" }}>
                      Disconnect
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explainer */}
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#6B6B66", lineHeight: 1.75, maxWidth: 560 }}>
          <p style={{ margin: "0 0 12px" }}>Pulse uses server-side first-purchase tracking — the same standard used by leading ecommerce stacks. Every new customer in your feed is verified against your Shopify order history before counting toward your invoice. You can verify any entry yourself.</p>
          <p style={{ margin: 0 }}>Already using Littledata or Elevar? Pulse connects in one click.</p>
        </div>
      </div>
    </div>
  );
}
