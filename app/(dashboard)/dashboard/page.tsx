"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import SparklineChart from "./SparklineChart";

const STAGE_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  QUALIFY: { color: "#7c9ef5", bg: "rgba(124,158,245,0.1)", border: "rgba(124,158,245,0.25)" },
  PULSE:   { color: "#c8440f", bg: "rgba(200,68,15,0.1)",   border: "rgba(200,68,15,0.25)" },
  LOOP:    { color: "#d4913a", bg: "rgba(212,145,58,0.1)",  border: "rgba(212,145,58,0.25)" },
  CONVERT: { color: "#2a9d6e", bg: "rgba(42,157,110,0.1)", border: "rgba(42,157,110,0.25)" },
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
  const [count, setCount] = useState(47);

  const handleNewCustomer = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const pulseFee = count * 20;

  return (
    <div style={{ padding: "28px 32px" }}>
      {/* Two-column layout */}
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>

        {/* LEFT COLUMN — 2/3 */}
        <div style={{ flex: "2", minWidth: 0 }}>

          {/* Hero metric card */}
          <div
            style={{
              background: "#1a1917",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "8px",
              padding: "28px 32px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "32px",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#7a7570",
                  marginBottom: "8px",
                }}
              >
                New customers this month
              </div>
              <div
                style={{
                  fontSize: "80px",
                  fontWeight: 800,
                  color: "#c8440f",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  marginBottom: "10px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {count}
              </div>
              <div style={{ fontSize: "13px", color: "#7a7570" }}>
                €{avgCost} avg. cost per new customer · €{pulseFee.toLocaleString()} Pulse fee this month
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
                  color: "#4a4744",
                  marginBottom: "10px",
                }}
              >
                Jan — daily
              </div>
              <SparklineChart />
            </div>
          </div>

          {/* Recent customers preview */}
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
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#7a7570",
              }}
            >
              Recent customers
            </div>
            <Link
              href="/customers"
              style={{ fontSize: "13px", color: "#c8440f", textDecoration: "none" }}
            >
              View all →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {recentCustomers.map((c) => (
              <div
                key={c.id}
                style={{
                  background: "#1a1917",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "8px",
                  padding: "14px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(42,157,110,0.12)",
                    border: "1px solid rgba(42,157,110,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="2" width="10" height="10" rx="2" stroke="#2a9d6e" strokeWidth="1.4" />
                    <path d="M5 7l1.5 1.5L9 5" stroke="#2a9d6e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "3px",
                    }}
                  >
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#f0ede8" }}>
                      {c.id}
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#2a9d6e",
                        background: "rgba(42,157,110,0.1)",
                        border: "1px solid rgba(42,157,110,0.2)",
                        padding: "1px 6px",
                        borderRadius: "3px",
                        letterSpacing: "0.06em",
                      }}
                    >
                      FIRST PURCHASE
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#f0ede8" }}>
                      {c.value}
                    </span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#7a7570" }}>
                    {c.days} days from first Pulse touch ·{" "}
                    <span style={{ color: "#4a4744" }}>{c.cycle}</span>
                  </div>
                </div>

                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: "12px", color: "#4a4744", marginBottom: "3px" }}>
                    {c.time}
                  </div>
                  <a href="#" style={{ fontSize: "12px", color: "#c8440f", textDecoration: "none" }}>
                    Verify in Shopify →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — 1/3 */}
        <div style={{ flex: "1", minWidth: 0 }}>
          <div
            style={{
              background: "#1a1917",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "8px",
              padding: "20px 24px",
            }}
          >
            {/* Engine status header */}
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
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#7a7570",
                }}
              >
                Engine status
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  className="animate-pulse-dot"
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#2a9d6e",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "12px", color: "#2a9d6e", fontWeight: 500 }}>
                  Running
                </span>
              </div>
            </div>

            {/* Cycle rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {cycles.map((cycle) => {
                const s = STAGE_COLORS[cycle.stage];
                return (
                  <div key={cycle.name}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#f0ede8",
                          flex: 1,
                          marginRight: "8px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {cycle.name}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          color: s.color,
                          background: s.bg,
                          border: `1px solid ${s.border}`,
                          padding: "2px 6px",
                          borderRadius: "3px",
                          flexShrink: 0,
                        }}
                      >
                        {cycle.stage}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div
                      style={{
                        height: "3px",
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: "2px",
                        marginBottom: "5px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${cycle.progress}%`,
                          background: s.color,
                          borderRadius: "2px",
                        }}
                      />
                    </div>

                    <div style={{ fontSize: "11px", color: "#4a4744" }}>{cycle.stat}</div>
                  </div>
                );
              })}
            </div>

            {/* Stat pills */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              {["Creative rotation in 3 days", "Next cycle starts 24 Jan"].map((pill) => (
                <div
                  key={pill}
                  style={{
                    fontSize: "11px",
                    color: "#7a7570",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    padding: "4px 10px",
                    borderRadius: "4px",
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
                fontSize: "12px",
                color: "#c8440f",
                textDecoration: "none",
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

const avgCost = 38;
