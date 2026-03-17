"use client";

import { useState } from "react";

interface TopbarProps {
  title: string;
  lastUpdated?: string;
}

export default function Topbar({ title, lastUpdated = "Today at 09:14" }: TopbarProps) {
  const [period, setPeriod] = useState("This month");

  return (
    <div
      style={{
        height: "56px",
        borderBottom: "1px solid #2a2927",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        background: "#0f0e0d",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
        <h1
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#f0ede8",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h1>
        <span style={{ fontSize: "12px", color: "#7a7570" }}>
          Updated {lastUpdated}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          style={{
            background: "#1a1917",
            border: "1px solid #2a2927",
            color: "#f0ede8",
            fontSize: "13px",
            padding: "6px 10px",
            borderRadius: "6px",
            cursor: "pointer",
            outline: "none",
          }}
        >
          <option>This month</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
        <button
          style={{
            background: "transparent",
            border: "1px solid #2a2927",
            color: "#7a7570",
            fontSize: "13px",
            padding: "6px 14px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Export
        </button>
      </div>
    </div>
  );
}
