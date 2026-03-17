"use client";

import { useState, useCallback } from "react";
import SparklineChart from "./SparklineChart";
import CustomerFeed from "./CustomerFeed";

export default function DashboardPage() {
  const [count, setCount] = useState(47);

  const handleNewCustomer = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const pulseFee = count * 20;
  const avgCost = 38;

  return (
    <div style={{ padding: "28px 32px", maxWidth: "960px" }}>
      {/* Hero counter card */}
      <div
        style={{
          background: "#1a1917",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "8px",
          padding: "28px 32px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {/* Counter */}
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
            €{pulseFee.toLocaleString()} in Pulse fees · €{avgCost} avg. cost per new customer
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

      {/* Feed header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
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
          Live customer feed
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "#4a4744",
          }}
        >
          New purchases appear here in real time
        </div>
      </div>

      {/* Customer feed */}
      <CustomerFeed onNewCustomer={handleNewCustomer} />

      {/* Status bar */}
      <div
        style={{
          marginTop: "20px",
          padding: "12px 16px",
          background: "#1a1917",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          className="animate-pulse-dot"
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#2a9d6e",
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: "13px", color: "#7a7570" }}>
          <span style={{ color: "#2a9d6e", fontWeight: 600 }}>Pulse is running</span>
          {" · "}
          1,240 people in active cycles
          {" · "}
          Next creative rotation in{" "}
          <span style={{ color: "#f0ede8" }}>3 days</span>
        </span>
      </div>
    </div>
  );
}
