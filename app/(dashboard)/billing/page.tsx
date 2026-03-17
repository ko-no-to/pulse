"use client";

import Topbar from "../../components/Topbar";

const invoiceHistory = [
  { period: "January 2025", customers: 47, fee: "€940", status: "Due", dueDate: "Feb 1, 2025" },
  { period: "December 2024", customers: 38, fee: "€760", status: "Paid", dueDate: "Jan 1, 2025" },
  { period: "November 2024", customers: 28, fee: "€560", status: "Paid", dueDate: "Dec 1, 2024" },
  { period: "October 2024", customers: 22, fee: "€440", status: "Paid", dueDate: "Nov 1, 2024" },
];

export default function BillingPage() {
  return (
    <div>
      <Topbar title="Billing" />
      <div style={{ padding: "28px 32px", maxWidth: "900px" }}>

        {/* Current month summary */}
        <div
          style={{
            background: "#1a1917",
            border: "1px solid #2a2927",
            borderRadius: "8px",
            padding: "28px 32px",
            marginBottom: "24px",
          }}
        >
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
            Current Period — January 2025
          </div>

          {/* Big number */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", marginBottom: "24px" }}>
            <div
              style={{
                fontSize: "56px",
                fontWeight: 800,
                color: "#c8440f",
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              €940
            </div>
            <div style={{ paddingBottom: "8px" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#d97706",
                  background: "rgba(217,119,6,0.1)",
                  border: "1px solid rgba(217,119,6,0.25)",
                  padding: "3px 8px",
                  borderRadius: "4px",
                }}
              >
                DUE FEB 1
              </span>
            </div>
          </div>

          {/* Breakdown table */}
          <div
            style={{
              border: "1px solid #2a2927",
              borderRadius: "6px",
              overflow: "hidden",
              marginBottom: "20px",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #2a2927", background: "#0f0e0d" }}>
                  <th
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#7a7570",
                    }}
                  >
                    Item
                  </th>
                  <th
                    style={{
                      padding: "10px 16px",
                      textAlign: "right",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#7a7570",
                    }}
                  >
                    Qty
                  </th>
                  <th
                    style={{
                      padding: "10px 16px",
                      textAlign: "right",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#7a7570",
                    }}
                  >
                    Unit Price
                  </th>
                  <th
                    style={{
                      padding: "10px 16px",
                      textAlign: "right",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#7a7570",
                    }}
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #2a2927" }}>
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#f0ede8" }}>
                    New first-time customers delivered
                    <div style={{ fontSize: "11px", color: "#7a7570", marginTop: "2px" }}>
                      Pulse-attributed · 60-day window · Meta + Shopify
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#f0ede8", textAlign: "right", fontWeight: 600 }}>
                    47
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#7a7570", textAlign: "right" }}>
                    €20.00
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "14px", color: "#f0ede8", textAlign: "right", fontWeight: 700 }}>
                    €940.00
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#7a7570" }}>
                    Platform fee
                  </td>
                  <td style={{ padding: "14px 16px", textAlign: "right" }} />
                  <td style={{ padding: "14px 16px", textAlign: "right" }} />
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#7a7570", textAlign: "right" }}>
                    €0
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr style={{ borderTop: "1px solid #2a2927", background: "#0f0e0d" }}>
                  <td
                    colSpan={3}
                    style={{
                      padding: "14px 16px",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#f0ede8",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Total due
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#c8440f",
                      textAlign: "right",
                    }}
                  >
                    €940.00
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#f0ede8",
                fontSize: "13px",
                fontWeight: 500,
                padding: "9px 18px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Download Invoice
            </button>
          </div>
        </div>

        {/* Invoice history */}
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
          Invoice History
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
                {["Period", "New Customers", "Amount", "Due Date", "Status", ""].map((h) => (
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
              {invoiceHistory.map((inv, i) => (
                <tr
                  key={inv.period}
                  style={{
                    borderBottom: i < invoiceHistory.length - 1 ? "1px solid #2a2927" : "none",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#222120")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "14px 20px", fontSize: "13px", fontWeight: 500, color: "#f0ede8" }}>
                    {inv.period}
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: "13px", color: "#7a7570" }}>
                    {inv.customers}
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: "13px", fontWeight: 600, color: "#f0ede8" }}>
                    {inv.fee}
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: "13px", color: "#7a7570" }}>
                    {inv.dueDate}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: inv.status === "Paid" ? "#2a9d6e" : "#d97706",
                        background:
                          inv.status === "Paid"
                            ? "rgba(42,157,110,0.1)"
                            : "rgba(217,119,6,0.1)",
                        border: `1px solid ${
                          inv.status === "Paid"
                            ? "rgba(42,157,110,0.25)"
                            : "rgba(217,119,6,0.25)"
                        }`,
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px", textAlign: "right" }}>
                    <button
                      style={{
                        background: "transparent",
                        border: "1px solid #2a2927",
                        color: "#7a7570",
                        fontSize: "11px",
                        padding: "4px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Trend note */}
        <div
          style={{
            marginTop: "16px",
            padding: "12px 16px",
            background: "rgba(42,157,110,0.05)",
            border: "1px solid rgba(42,157,110,0.2)",
            borderRadius: "6px",
            fontSize: "13px",
            color: "#2a9d6e",
            fontWeight: 500,
          }}
        >
          ↑ New customers growing 31% month over month
        </div>

        {/* Pricing note */}
        <div
          style={{
            marginTop: "10px",
            padding: "12px 16px",
            background: "#1a1917",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "6px",
            fontSize: "12px",
            color: "#7a7570",
            lineHeight: "1.6",
          }}
        >
          You are invoiced once per month for verified new customers only. Verification uses your
          Shopify first-purchase data. You can cross-check every line against your Shopify orders.
        </div>
      </div>
    </div>
  );
}
