"use client";

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
    iconBg: "#222120",
    iconColor: "#4a4744",
    viewLabel: null,
    viewHref: null,
  },
];

export default function ConnectionsPage() {
  return (
    <div style={{ padding: "28px 32px", maxWidth: "820px" }}>
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#7a7570",
          marginBottom: "20px",
        }}
      >
        Connected Accounts
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {connections.map((conn) => (
          <div
            key={conn.name}
            style={{
              background: "#1a1917",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "8px",
              padding: "20px 24px",
              opacity: conn.status === "phase2" ? 0.5 : 1,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
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
                    marginBottom: "4px",
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
                        color: "#4a4744",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      Coming in Phase 2
                    </span>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#7a7570" }}>
                    {conn.account}
                  </span>
                  {conn.status === "connected" && (
                    <span style={{ fontSize: "13px", color: "#4a4744" }}>
                      Last sync: {conn.lastSync}
                    </span>
                  )}
                </div>
              </div>

              {/* Action */}
              {conn.viewLabel && (
                <a
                  href={conn.viewHref ?? "#"}
                  style={{
                    fontSize: "13px",
                    color: "#c8440f",
                    textDecoration: "none",
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
          marginTop: "24px",
          padding: "16px 20px",
          background: "#1a1917",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "8px",
          fontSize: "13px",
          color: "#7a7570",
          lineHeight: "1.7",
        }}
      >
        Pulse reads first-purchase data from Shopify and cross-references Meta ad touches.
        You can verify any customer in the feed by clicking{" "}
        <span style={{ color: "#c8440f" }}>'View in Shopify'</span>
        {" "}on their card.
      </div>
    </div>
  );
}
