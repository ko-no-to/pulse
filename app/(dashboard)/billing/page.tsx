"use client";

import Topbar from "../../components/Topbar";

const invoiceHistory = [
  { period: "January 2025",  customers: 47, fee: "€940", status: "Due",  dueDate: "Feb 1, 2025" },
  { period: "December 2024", customers: 38, fee: "€760", status: "Paid", dueDate: "Jan 1, 2025" },
  { period: "November 2024", customers: 28, fee: "€560", status: "Paid", dueDate: "Dec 1, 2024" },
  { period: "October 2024",  customers: 22, fee: "€440", status: "Paid", dueDate: "Nov 1, 2024" },
];

export default function BillingPage() {
  return (
    <div style={{ background: "#F6F6F1", minHeight: "100%" }}>
      <Topbar title="Billing" />
      <div style={{ padding: "28px", maxWidth: "860px" }}>

        {/* Current period card */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E8E8E2",
            borderRadius: "12px",
            padding: "28px 32px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#6B6B66",
              marginBottom: "20px",
            }}
          >
            Current Period — January 2025
          </div>

          {/* Amount + status */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "14px", marginBottom: "24px" }}>
            <div
              style={{
                fontSize: "48px",
                fontWeight: 700,
                color: "#C8440F",
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              €940
            </div>
            <div style={{ paddingBottom: "8px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#B45309",
                  background: "#FEF3E2",
                  padding: "3px 10px",
                  borderRadius: "6px",
                }}
              >
                Due Feb 1
              </span>
            </div>
          </div>

          {/* Invoice table */}
          <div
            style={{
              border: "1px solid #E8E8E2",
              borderRadius: "8px",
              overflow: "hidden",
              marginBottom: "20px",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E8E8E2", background: "#FAFAF7" }}>
                  {["Item", "Qty", "Unit Price", "Total"].map((h, i) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 16px",
                        textAlign: i === 0 ? "left" : "right",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#6B6B66",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #E8E8E2" }}>
                  <td style={{ padding: "16px", fontSize: "14px", color: "#1A1A18" }}>
                    New first-time customers delivered
                    <div style={{ fontSize: "12px", color: "#9B9B96", marginTop: "2px" }}>
                      Pulse-attributed · 60-day window · Meta + Shopify
                    </div>
                  </td>
                  <td style={{ padding: "16px", fontSize: "14px", color: "#1A1A18", textAlign: "right", fontWeight: 600 }}>47</td>
                  <td style={{ padding: "16px", fontSize: "14px", color: "#6B6B66", textAlign: "right" }}>€20.00</td>
                  <td style={{ padding: "16px", fontSize: "14px", color: "#1A1A18", textAlign: "right", fontWeight: 700 }}>€940.00</td>
                </tr>
                <tr>
                  <td style={{ padding: "16px", fontSize: "14px", color: "#9B9B96" }}>Platform fee</td>
                  <td colSpan={2} />
                  <td style={{ padding: "16px", fontSize: "14px", color: "#9B9B96", textAlign: "right" }}>€0</td>
                </tr>
              </tbody>
              <tfoot>
                <tr style={{ borderTop: "1px solid #E8E8E2", background: "#FAFAF7" }}>
                  <td
                    colSpan={3}
                    style={{
                      padding: "14px 16px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#1A1A18",
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
                      fontWeight: 700,
                      color: "#C8440F",
                      textAlign: "right",
                    }}
                  >
                    €940.00
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <button
            style={{
              background: "#FFFFFF",
              border: "1px solid #D4D4CC",
              color: "#1A1A18",
              fontSize: "14px",
              fontWeight: 500,
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Download Invoice
          </button>
        </div>

        {/* Invoice history */}
        <div
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#6B6B66",
            marginBottom: "10px",
          }}
        >
          Invoice History
        </div>

        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E8E8E2",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "16px",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #E8E8E2", background: "#FAFAF7" }}>
                {["Period", "New Customers", "Amount", "Due Date", "Status", ""].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "11px 20px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#6B6B66",
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
                  style={{ borderBottom: i < invoiceHistory.length - 1 ? "1px solid #E8E8E2" : "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAF7")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "14px 20px", fontSize: "14px", fontWeight: 500, color: "#1A1A18" }}>
                    {inv.period}
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: "14px", color: "#6B6B66" }}>
                    {inv.customers}
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: "14px", fontWeight: 600, color: "#1A1A18" }}>
                    {inv.fee}
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: "14px", color: "#6B6B66" }}>
                    {inv.dueDate}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: inv.status === "Paid" ? "#156639" : "#B45309",
                        background: inv.status === "Paid" ? "#EBF7F0" : "#FEF3E2",
                        padding: "3px 10px",
                        borderRadius: "6px",
                      }}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px", textAlign: "right" }}>
                    <button
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #E8E8E2",
                        color: "#6B6B66",
                        fontSize: "12px",
                        padding: "4px 12px",
                        borderRadius: "6px",
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
            padding: "12px 16px",
            background: "#EBF7F0",
            border: "1px solid #1A7A4A",
            borderRadius: "8px",
            fontSize: "14px",
            color: "#156639",
            fontWeight: 500,
            marginBottom: "10px",
          }}
        >
          ↑ New customers growing 31% month over month
        </div>

        {/* Pricing note */}
        <div
          style={{
            padding: "12px 16px",
            background: "#FFFFFF",
            border: "1px solid #E8E8E2",
            borderRadius: "8px",
            fontSize: "13px",
            color: "#9B9B96",
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
