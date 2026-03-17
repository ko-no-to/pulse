"use client";

import { useState } from "react";
import Link from "next/link";
import SparklineChart from "./SparklineChart";

const STAGE_STYLES: Record<string, { color: string; bg: string }> = {
  QUALIFY: { color: "#1D5FA8", bg: "#EEF4FD" },
  PULSE:   { color: "#A33508", bg: "#FDF0EB" },
  LOOP:    { color: "#B45309", bg: "#FEF3E2" },
  CONVERT: { color: "#156639", bg: "#EBF7F0" },
};

const cycles = [
  { name: "Skincare — broad interest", stage: "PULSE",   progress: 62, stat: "842 people in window" },
  { name: "Wellness — lookalike 5%",   stage: "LOOP",    progress: 41, stat: "394 completed cycles" },
  { name: "Gifting — retrigger",        stage: "QUALIFY", progress: 18, stat: "2,847 people qualified" },
];

const recentCustomers = [
  { id: "#4821", value: "€84",  days: 18, cycle: "Skincare — broad interest", time: "Today, 14:32" },
  { id: "#4820", value: "€112", days: 22, cycle: "Wellness — lookalike 5%",   time: "Today, 11:47" },
  { id: "#4819", value: "€67",  days: 14, cycle: "Skincare — broad interest", time: "Today, 09:15" },
];

export default function DashboardPage() {
  const [count] = useState(47);
  const pulseFee = count * 20;

  return (
    <div style={{ padding: "28px", background: "#F6F6F1", minHeight: "100%" }}>
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>

        {/* LEFT COLUMN — 2/3 */}
        <div style={{ flex: "2", minWidth: 0, display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Hero metric card */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8E8E2",
              borderRadius: "12px",
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              gap: "32px",
            }}
          >
            <div style={{ flex: 1 }}>
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
                New customers this month
              </div>
              <div
                style={{
                  fontSize: "56px",
                  fontWeight: 700,
                  color: "#C8440F",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  marginBottom: "10px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {count}
              </div>
              <div style={{ fontSize: "14px", color: "#6B6B66" }}>
                €38 avg. cost per new customer · €{pulseFee.toLocaleString()} Pulse fee this month
              </div>
            </div>

            {/* Sparkline */}
            <div style={{ width: "200px", flexShrink: 0 }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#9B9B96",
                  marginBottom: "10px",
                }}
              >
                Jan — daily
              </div>
              <SparklineChart />
            </div>
          </div>

          {/* Recent customers */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#6B6B66",
                }}
              >
                Recent customers
              </div>
              <Link
                href="/customers"
                style={{ fontSize: "13px", color: "#A33508", textDecoration: "none", fontWeight: 500 }}
              >
                View all →
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {recentCustomers.map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E8E8E2",
                    borderRadius: "12px",
                    padding: "14px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EBF7F0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="2" y="2" width="10" height="10" rx="2" stroke="#1A7A4A" strokeWidth="1.4" />
                      <path d="M4.5 7L6 8.5L9.5 5" stroke="#1A7A4A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "#1A1A18" }}>{c.id}</span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          color: "#156639",
                          background: "#EBF7F0",
                          padding: "2px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        First purchase
                      </span>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "#1A1A18" }}>{c.value}</span>
                    </div>
                    <div style={{ fontSize: "13px", color: "#6B6B66" }}>
                      {c.days} days from first Pulse touch ·{" "}
                      <span style={{ color: "#9B9B96" }}>{c.cycle}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: "12px", color: "#9B9B96", marginBottom: "3px" }}>{c.time}</div>
                    <a href="#" style={{ fontSize: "13px", color: "#A33508", textDecoration: "none" }}>
                      Verify in Shopify →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — 1/3 */}
        <div style={{ flex: "1", minWidth: 0 }}>
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8E8E2",
              borderRadius: "12px",
              padding: "20px 22px",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
                }}
              >
                Engine status
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span
                  className="animate-pulse-dot"
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#1A7A4A",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "12px", color: "#156639", fontWeight: 500 }}>Running</span>
              </div>
            </div>

            {/* Cycle rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {cycles.map((cycle) => {
                const s = STAGE_STYLES[cycle.stage];
                return (
                  <div key={cycle.name}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "7px",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "#1A1A18",
                          flex: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {cycle.name}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          color: s.color,
                          background: s.bg,
                          padding: "2px 8px",
                          borderRadius: "4px",
                          flexShrink: 0,
                        }}
                      >
                        {cycle.stage}
                      </span>
                    </div>

                    <div
                      style={{
                        height: "6px",
                        background: "#E8E8E2",
                        borderRadius: "3px",
                        marginBottom: "5px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${cycle.progress}%`,
                          background: "#C8440F",
                          borderRadius: "3px",
                        }}
                      />
                    </div>
                    <div style={{ fontSize: "12px", color: "#9B9B96" }}>{cycle.stat}</div>
                  </div>
                );
              })}
            </div>

            {/* Stat pills */}
            <div style={{ display: "flex", gap: "6px", marginTop: "20px", flexWrap: "wrap" }}>
              {["Creative rotation in 3 days", "Next cycle starts 24 Jan"].map((pill) => (
                <div
                  key={pill}
                  style={{
                    fontSize: "11px",
                    color: "#6B6B66",
                    background: "#FAFAF7",
                    border: "1px solid #E8E8E2",
                    padding: "4px 10px",
                    borderRadius: "6px",
                  }}
                >
                  {pill}
                </div>
              ))}
            </div>

            <Link
              href="/engine"
              style={{
                display: "block",
                marginTop: "16px",
                fontSize: "13px",
                color: "#A33508",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              View engine details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
