"use client";

import Topbar from "../../components/Topbar";

const monthlyData = [
  { month: "August 2024", new: 12, cpa: "€72", spend: "€864" },
  { month: "September 2024", new: 18, cpa: "€58", spend: "€1,044" },
  { month: "October 2024", new: 22, cpa: "€52", spend: "€1,144" },
  { month: "November 2024", new: 28, cpa: "€44", spend: "€1,232" },
  { month: "December 2024", new: 38, cpa: "€41", spend: "€1,558" },
  { month: "January 2025", new: 47, cpa: "€38", spend: "€1,786" },
];

export default function CustomersPage() {
  return (
    <div>
      <Topbar title="New Customers" />
      <div style={{ padding: "28px 32px" }}>

        {/* Hero stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          {[
            { label: "Total New Customers (6mo)", value: "165", sub: "Pulse-attributed" },
            { label: "Avg. Cost Per Customer", value: "€51", sub: "Declining month over month" },
            { label: "Total Pulse Fees (6mo)", value: "€3,300", sub: "165 × €20" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#1a1917",
                border: "1px solid #2a2927",
                borderRadius: "8px",
                padding: "22px 24px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#7a7570",
                  marginBottom: "8px",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#c8440f",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "12px", color: "#7a7570" }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Monthly table */}
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
          Monthly Breakdown
        </div>
        <div
          style={{
            background: "#1a1917",
            border: "1px solid #2a2927",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2927" }}>
                {["Month", "New Customers", "Cost Per Customer", "Ad Spend", "vs Prior Month"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 20px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#7a7570",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((row, i) => {
                const prev = i > 0 ? monthlyData[i - 1].new : null;
                const delta = prev ? row.new - prev : null;
                const pct = prev ? Math.round(((row.new - prev) / prev) * 100) : null;
                const isLatest = i === monthlyData.length - 1;
                return (
                  <tr
                    key={row.month}
                    style={{
                      borderBottom: i < monthlyData.length - 1 ? "1px solid #2a2927" : "none",
                      background: isLatest ? "rgba(200,68,15,0.04)" : "transparent",
                    }}
                  >
                    <td
                      style={{
                        padding: "14px 20px",
                        fontSize: "13px",
                        fontWeight: isLatest ? 600 : 400,
                        color: "#f0ede8",
                      }}
                    >
                      {row.month}
                      {isLatest && (
                        <span
                          style={{
                            marginLeft: "8px",
                            fontSize: "10px",
                            color: "#c8440f",
                            background: "rgba(200,68,15,0.1)",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            fontWeight: 600,
                          }}
                        >
                          Current
                        </span>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "14px 20px",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: isLatest ? "#c8440f" : "#f0ede8",
                      }}
                    >
                      {row.new}
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", color: "#f0ede8" }}>
                      {row.cpa}
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", color: "#7a7570" }}>
                      {row.spend}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      {delta !== null ? (
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#2a9d6e",
                          }}
                        >
                          +{delta} (+{pct}%)
                        </span>
                      ) : (
                        <span style={{ fontSize: "12px", color: "#7a7570" }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
