"use client";

import Topbar from "../../components/Topbar";

const connections = [
  {
    name: "Meta Ads",
    description: "Paid social — audience cycles, creative delivery",
    account: "Noïse Botanics — Act. #4812930",
    lastSync: "Today at 08:47",
    status: "connected",
    icon: "M",
    iconBg: "#1877F2",
    iconColor: "#fff",
    detail: "3 active campaigns · €2,400 monthly spend",
  },
  {
    name: "Shopify",
    description: "Order data — first-purchase attribution",
    account: "noisebotanics.myshopify.com",
    lastSync: "Today at 09:02",
    status: "connected",
    icon: "S",
    iconBg: "#96bf48",
    iconColor: "#fff",
    detail: "Orders syncing · 60-day window active",
  },
  {
    name: "Google Ads",
    description: "Search and Performance Max campaigns",
    account: "Not connected",
    lastSync: "—",
    status: "phase2",
    icon: "G",
    iconBg: "#2a2927",
    iconColor: "#7a7570",
    detail: "Coming in Phase 2",
  },
];

export default function ConnectionsPage() {
  return (
    <div>
      <Topbar title="Connections" />
      <div style={{ padding: "28px 32px", maxWidth: "860px" }}>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#7a7570",
            marginBottom: "20px",
          }}
        >
          Connected Accounts
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {connections.map((conn) => (
            <div
              key={conn.name}
              style={{
                background: "#1a1917",
                border: "1px solid #2a2927",
                borderRadius: "8px",
                padding: "22px 24px",
                opacity: conn.status === "phase2" ? 0.6 : 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", flex: 1 }}>
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "3px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "#f0ede8",
                        }}
                      >
                        {conn.name}
                      </span>
                      {conn.status === "connected" ? (
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#2a9d6e",
                            background: "rgba(42,157,110,0.1)",
                            border: "1px solid rgba(42,157,110,0.25)",
                            padding: "2px 8px",
                            borderRadius: "4px",
                          }}
                        >
                          Connected
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#7a7570",
                            background: "#1a1917",
                            border: "1px solid #2a2927",
                            padding: "2px 8px",
                            borderRadius: "4px",
                          }}
                        >
                          Phase 2
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "13px", color: "#7a7570", marginBottom: "10px" }}>
                      {conn.description}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "24px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#7a7570",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            marginBottom: "2px",
                          }}
                        >
                          Account
                        </div>
                        <div style={{ fontSize: "13px", color: "#f0ede8" }}>
                          {conn.account}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#7a7570",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            marginBottom: "2px",
                          }}
                        >
                          Last Sync
                        </div>
                        <div style={{ fontSize: "13px", color: "#f0ede8" }}>
                          {conn.lastSync}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#7a7570",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            marginBottom: "2px",
                          }}
                        >
                          Details
                        </div>
                        <div style={{ fontSize: "13px", color: conn.status === "phase2" ? "#7a7570" : "#f0ede8" }}>
                          {conn.detail}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {conn.status === "connected" && (
                  <button
                    style={{
                      background: "transparent",
                      border: "1px solid #2a2927",
                      color: "#7a7570",
                      fontSize: "12px",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    Disconnect
                  </button>
                )}
                {conn.status === "phase2" && (
                  <button
                    disabled
                    style={{
                      background: "transparent",
                      border: "1px solid #2a2927",
                      color: "#4a4744",
                      fontSize: "12px",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      cursor: "not-allowed",
                      flexShrink: 0,
                    }}
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Info note */}
        <div
          style={{
            marginTop: "24px",
            padding: "14px 18px",
            background: "#1a1917",
            border: "1px solid #2a2927",
            borderRadius: "8px",
            fontSize: "13px",
            color: "#7a7570",
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: "#f0ede8" }}>Attribution requires both Meta and Shopify.</strong>{" "}
          Pulse cross-references Meta ad touch events with Shopify first-order dates within a 60-day
          window to attribute new customers.
        </div>
      </div>
    </div>
  );
}
