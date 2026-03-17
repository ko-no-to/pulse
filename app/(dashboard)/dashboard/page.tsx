"use client";

import Topbar from "../../components/Topbar";
import CustomerChart from "./CustomerChart";

const cycles = [
  {
    name: "Skincare — broad",
    stage: "PULSE",
    audience: "842 in window",
    day: 8,
    total: 14,
    progress: 62,
  },
  {
    name: "Gifting — seasonal",
    stage: "LOOP",
    audience: "398 re-entering",
    day: 22,
    total: 28,
    progress: 88,
  },
  {
    name: "Wellness — interest",
    stage: "QUALIFY",
    audience: "2,100 filtering",
    day: 2,
    total: 7,
    progress: 18,
  },
];

const stageStyles: Record<string, { color: string; bg: string }> = {
  QUALIFY: { color: "#818cf8", bg: "rgba(129,140,248,0.1)" },
  PULSE: { color: "#c8440f", bg: "rgba(200,68,15,0.12)" },
  LOOP: { color: "#d97706", bg: "rgba(217,119,6,0.12)" },
  CONVERT: { color: "#2a9d6e", bg: "rgba(42,157,110,0.12)" },
};

export default function DashboardPage() {
  return (
    <div>
      <Topbar title="Dashboard" />

      <div style={{ padding: "28px 32px", maxWidth: "1400px" }}>
        {/* Notice banner */}
        <div
          style={{
            background: "rgba(200, 68, 15, 0.08)",
            border: "1px solid rgba(200, 68, 15, 0.3)",
            borderRadius: "8px",
            padding: "12px 18px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#c8440f",
              flexShrink: 0,
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: "13px", color: "#f0ede8" }}>
            <strong style={{ color: "#c8440f" }}>Cycle 3 is running.</strong>{" "}
            1,240 people are currently in active pulse windows. Next creative rotation in{" "}
            <strong style={{ color: "#f0ede8" }}>3 days.</strong>
          </span>
        </div>

        {/* Hero metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1px",
            background: "#2a2927",
            border: "1px solid #2a2927",
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "24px",
          }}
        >
          {/* New customers */}
          <div style={{ background: "#1a1917", padding: "28px 32px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#7a7570",
                marginBottom: "10px",
              }}
            >
              New Customers This Month
            </div>
            <div
              style={{
                fontSize: "64px",
                fontWeight: 800,
                color: "#c8440f",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                marginBottom: "8px",
              }}
            >
              47
            </div>
            <div style={{ fontSize: "12px", color: "#7a7570" }}>
              Jan 1 – Jan 31, 2025
            </div>
          </div>

          {/* Cost per customer */}
          <div style={{ background: "#1a1917", padding: "28px 32px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#7a7570",
                marginBottom: "10px",
              }}
            >
              Cost Per New Customer
            </div>
            <div
              style={{
                fontSize: "64px",
                fontWeight: 800,
                color: "#f0ede8",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                marginBottom: "8px",
              }}
            >
              €38
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  fontSize: "11px",
                  color: "#2a9d6e",
                  background: "rgba(42,157,110,0.1)",
                  border: "1px solid rgba(42,157,110,0.2)",
                  padding: "2px 7px",
                  borderRadius: "4px",
                  fontWeight: 600,
                }}
              >
                −58%
              </span>
              <span style={{ fontSize: "12px", color: "#7a7570" }}>
                vs €91 on conversion ads
              </span>
            </div>
          </div>

          {/* Pulse fee */}
          <div style={{ background: "#1a1917", padding: "28px 32px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#7a7570",
                marginBottom: "10px",
              }}
            >
              Pulse Fee This Month
            </div>
            <div
              style={{
                fontSize: "64px",
                fontWeight: 800,
                color: "#f0ede8",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                marginBottom: "8px",
              }}
            >
              €940
            </div>
            <div style={{ fontSize: "12px", color: "#7a7570" }}>
              47 customers × €20 per customer
            </div>
          </div>
        </div>

        {/* Chart + Cycles */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {/* Bar chart */}
          <CustomerChart />

          {/* Active cycles */}
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#7a7570",
                marginBottom: "12px",
              }}
            >
              Active Cycles
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {cycles.map((cycle) => {
                const style = stageStyles[cycle.stage];
                return (
                  <div
                    key={cycle.name}
                    style={{
                      background: "#1a1917",
                      border: "1px solid #2a2927",
                      borderRadius: "8px",
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "10px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#f0ede8",
                            marginBottom: "2px",
                          }}
                        >
                          {cycle.name}
                        </div>
                        <div style={{ fontSize: "11px", color: "#7a7570" }}>
                          {cycle.audience}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          color: style.color,
                          background: style.bg,
                          padding: "2px 7px",
                          borderRadius: "4px",
                        }}
                      >
                        {cycle.stage}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "6px",
                      }}
                    >
                      <span style={{ fontSize: "11px", color: "#7a7570" }}>
                        Day {cycle.day} of {cycle.total}
                      </span>
                      <span style={{ fontSize: "11px", color: "#7a7570" }}>
                        {cycle.progress}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: "3px",
                        background: "#2a2927",
                        borderRadius: "2px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${cycle.progress}%`,
                          background: style.color,
                          borderRadius: "2px",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Attribution + Connections */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          {/* Attribution summary */}
          <div
            style={{
              background: "#1a1917",
              border: "1px solid #2a2927",
              borderRadius: "8px",
              padding: "24px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#7a7570",
                marginBottom: "16px",
              }}
            >
              Attribution Summary
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  ["Pulse-attributed new customers", "47"],
                  ["Verified first purchases (Shopify)", "47"],
                  ["Avg. days from first touch to purchase", "18 days"],
                  ["Attribution window", "60 days"],
                  ["Data sources", "Meta · Shopify"],
                ].map(([label, value], i, arr) => (
                  <tr
                    key={label}
                    style={{
                      borderBottom: i < arr.length - 1 ? "1px solid #2a2927" : "none",
                    }}
                  >
                    <td
                      style={{
                        padding: "10px 0",
                        fontSize: "13px",
                        color: "#7a7570",
                      }}
                    >
                      {label}
                    </td>
                    <td
                      style={{
                        padding: "10px 0",
                        fontSize: "13px",
                        color: "#f0ede8",
                        fontWeight: 500,
                        textAlign: "right",
                      }}
                    >
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Connections */}
          <div
            style={{
              background: "#1a1917",
              border: "1px solid #2a2927",
              borderRadius: "8px",
              padding: "24px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#7a7570",
                marginBottom: "16px",
              }}
            >
              Connections
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                {
                  name: "Meta Ads",
                  account: "Noïse Botanics — Act. #4812930",
                  status: "Connected",
                  icon: "M",
                  iconBg: "#1877F2",
                },
                {
                  name: "Shopify",
                  account: "noisebotanics.myshopify.com",
                  status: "Connected",
                  icon: "S",
                  iconBg: "#96bf48",
                },
                {
                  name: "Google Ads",
                  account: "Not connected",
                  status: "Phase 2",
                  icon: "G",
                  iconBg: "#2a2927",
                },
              ].map((conn) => (
                <div
                  key={conn.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 12px",
                    background: "#0f0e0d",
                    border: "1px solid #2a2927",
                    borderRadius: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "6px",
                      background: conn.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {conn.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", fontWeight: 500, color: "#f0ede8" }}>
                      {conn.name}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#7a7570",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {conn.account}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.03em",
                      color:
                        conn.status === "Connected"
                          ? "#2a9d6e"
                          : "#7a7570",
                      background:
                        conn.status === "Connected"
                          ? "rgba(42,157,110,0.1)"
                          : "#1a1917",
                      border: `1px solid ${conn.status === "Connected" ? "rgba(42,157,110,0.25)" : "#2a2927"}`,
                      padding: "2px 8px",
                      borderRadius: "4px",
                      flexShrink: 0,
                    }}
                  >
                    {conn.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
