"use client";

import Topbar from "../../components/Topbar";

const connections = [
  {
    name: "Meta Ads",
    account: "brandname · Ad account #1234567",
    lastSync: "2 minutes ago",
    status: "connected",
    icon: "M",
    iconBg: "#1877F2",
    iconColor: "#fff",
    viewLabel: "View in Meta →",
    viewHref: "#",
  },
  {
    name: "Shopify",
    account: "brandname.myshopify.com",
    lastSync: "Live",
    status: "connected",
    icon: "S",
    iconBg: "#96bf48",
    iconColor: "#fff",
    viewLabel: "View in Shopify →",
    viewHref: "#",
  },
  {
    name: "Google Ads",
    account: "Not connected",
    lastSync: "—",
    status: "phase2",
    icon: "G",
    iconBg: "#F3F4F6",
    iconColor: "#9B9B96",
    viewLabel: null,
    viewHref: null,
  },
];

export default function ConnectionsPage() {
  return (
    <div style={{ background: "#F6F6F1", minHeight: "100%" }}>
      <Topbar title="Connections" />
      <div style={{ padding: "28px", maxWidth: "820px" }}>

        <div
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#6B6B66",
            marginBottom: "12px",
          }}
        >
          Connected accounts
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
          {connections.map((conn) => (
            <div
              key={conn.name}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E8E8E2",
                borderRadius: "12px",
                padding: "20px 24px",
                opacity: conn.status === "phase2" ? 0.6 : 1,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {/* Icon */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    background: conn.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: conn.iconColor,
                    flexShrink: 0,
                  }}
                >
                  {conn.icon}
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#1A1A18" }}>
                      {conn.name}
                    </span>
                    {conn.status === "connected" ? (
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#156639",
                          background: "#EBF7F0",
                          padding: "2px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        Connected
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#9B9B96",
                          background: "#F3F4F6",
                          padding: "2px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        Phase 2
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "13px", color: "#6B6B66" }}>{conn.account}</span>
                    {conn.status === "connected" && (
                      <span style={{ fontSize: "13px", color: "#9B9B96" }}>
                        Last sync: {conn.lastSync}
                      </span>
                    )}
                  </div>
                  {conn.name === "Shopify" && (
                    <div style={{ fontSize: "12px", color: "#9B9B96", marginTop: "5px" }}>
                      Already using Littledata or Elevar? Pulse connects in one click.
                    </div>
                  )}
                </div>

                {/* Action */}
                {conn.viewLabel && (
                  <a
                    href={conn.viewHref ?? "#"}
                    style={{
                      fontSize: "13px",
                      color: "#A33508",
                      textDecoration: "none",
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {conn.viewLabel}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Explanatory text */}
        <div
          style={{
            padding: "16px 20px",
            background: "#FFFFFF",
            border: "1px solid #E8E8E2",
            borderRadius: "12px",
            fontSize: "14px",
            color: "#6B6B66",
            lineHeight: "1.7",
          }}
        >
          Pulse uses server-side first-purchase tracking — the same standard used by the best
          ecommerce stacks. Every new customer in your feed is verified against your Shopify
          order history. You can click any card in your dashboard and confirm it yourself.
        </div>
      </div>
    </div>
  );
}
