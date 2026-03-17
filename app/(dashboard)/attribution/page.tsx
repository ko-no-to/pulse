"use client";

import Topbar from "../../components/Topbar";

const attributionData = [
  { id: "#4821", firstTouch: "Jan 2, 2025", firstPurchase: "Jan 14, 2025", days: 12, orderValue: "€68", status: "Attributed" },
  { id: "#4734", firstTouch: "Dec 28, 2024", firstPurchase: "Jan 8, 2025", days: 11, orderValue: "€124", status: "Attributed" },
  { id: "#4819", firstTouch: "Jan 4, 2025", firstPurchase: "Jan 20, 2025", days: 16, orderValue: "€54", status: "Attributed" },
  { id: "#4801", firstTouch: "Dec 31, 2024", firstPurchase: "Jan 17, 2025", days: 17, orderValue: "€89", status: "Attributed" },
  { id: "#4788", firstTouch: "Dec 25, 2024", firstPurchase: "Jan 11, 2025", days: 17, orderValue: "€112", status: "Attributed" },
  { id: "#4823", firstTouch: "Jan 6, 2025", firstPurchase: "Jan 24, 2025", days: 18, orderValue: "€76", status: "Attributed" },
  { id: "#4756", firstTouch: "Dec 22, 2024", firstPurchase: "Jan 3, 2025", days: 12, orderValue: "€58", status: "Attributed" },
  { id: "#4812", firstTouch: "Jan 3, 2025", firstPurchase: "Jan 22, 2025", days: 19, orderValue: "€143", status: "Attributed" },
  { id: "#4830", firstTouch: "Jan 9, 2025", firstPurchase: "Jan 28, 2025", days: 19, orderValue: "€92", status: "Attributed" },
  { id: "#4835", firstTouch: "Jan 10, 2025", firstPurchase: "Jan 29, 2025", days: 19, orderValue: "€67", status: "Attributed" },
  { id: "#4838", firstTouch: "Jan 11, 2025", firstPurchase: "—", days: "—", orderValue: "—", status: "Pending" },
  { id: "#4841", firstTouch: "Jan 13, 2025", firstPurchase: "—", days: "—", orderValue: "—", status: "Pending" },
];

export default function AttributionPage() {
  return (
    <div>
      <Topbar title="Attribution Log" />
      <div style={{ padding: "28px 32px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#7a7570",
                marginBottom: "2px",
              }}
            >
              Attribution Log
            </div>
            <div style={{ fontSize: "13px", color: "#7a7570" }}>
              Showing 12 records · 60-day attribution window · Anonymised
            </div>
          </div>
          <button
            style={{
              background: "transparent",
              border: "1px solid #2a2927",
              color: "#7a7570",
              fontSize: "13px",
              fontWeight: 500,
              padding: "7px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ fontSize: "11px" }}>↓</span>
            Export CSV
          </button>
        </div>

        {/* Table */}
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
                {[
                  "Customer ID",
                  "First Touch",
                  "First Purchase",
                  "Days to Convert",
                  "Order Value",
                  "Status",
                ].map((h) => (
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
              {attributionData.map((row, i) => (
                <tr
                  key={row.id}
                  style={{
                    borderBottom:
                      i < attributionData.length - 1 ? "1px solid #2a2927" : "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#222120")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td
                    style={{
                      padding: "12px 20px",
                      fontSize: "13px",
                      fontFamily: "var(--font-geist-mono), monospace",
                      color: "#f0ede8",
                    }}
                  >
                    {row.id}
                  </td>
                  <td
                    style={{
                      padding: "12px 20px",
                      fontSize: "13px",
                      color: "#7a7570",
                    }}
                  >
                    {row.firstTouch}
                  </td>
                  <td
                    style={{
                      padding: "12px 20px",
                      fontSize: "13px",
                      color: row.firstPurchase === "—" ? "#4a4744" : "#7a7570",
                    }}
                  >
                    {row.firstPurchase}
                  </td>
                  <td
                    style={{
                      padding: "12px 20px",
                      fontSize: "13px",
                      color: row.days === "—" ? "#4a4744" : "#f0ede8",
                      fontWeight: row.days === "—" ? 400 : 500,
                    }}
                  >
                    {row.days === "—" ? "—" : `${row.days} days`}
                  </td>
                  <td
                    style={{
                      padding: "12px 20px",
                      fontSize: "13px",
                      color: row.orderValue === "—" ? "#4a4744" : "#f0ede8",
                      fontWeight: row.orderValue === "—" ? 400 : 500,
                    }}
                  >
                    {row.orderValue}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.03em",
                        color:
                          row.status === "Attributed" ? "#2a9d6e" : "#d97706",
                        background:
                          row.status === "Attributed"
                            ? "rgba(42,157,110,0.1)"
                            : "rgba(217,119,6,0.1)",
                        border: `1px solid ${
                          row.status === "Attributed"
                            ? "rgba(42,157,110,0.25)"
                            : "rgba(217,119,6,0.25)"
                        }`,
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary footer */}
        <div
          style={{
            marginTop: "16px",
            padding: "12px 20px",
            background: "#1a1917",
            border: "1px solid #2a2927",
            borderRadius: "8px",
            display: "flex",
            gap: "32px",
          }}
        >
          {[
            ["Total attributed", "10"],
            ["Pending", "2"],
            ["Avg. order value", "€88.30"],
            ["Avg. days to convert", "18 days"],
          ].map(([label, val]) => (
            <div key={label}>
              <div style={{ fontSize: "11px", color: "#7a7570", marginBottom: "2px" }}>
                {label}
              </div>
              <div style={{ fontSize: "14px", color: "#f0ede8", fontWeight: 600 }}>
                {val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
