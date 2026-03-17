"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Aug", new: 12, returning: 41 },
  { month: "Sep", new: 18, returning: 44 },
  { month: "Oct", new: 22, returning: 49 },
  { month: "Nov", new: 28, returning: 52 },
  { month: "Dec", new: 38, returning: 58 },
  { month: "Jan", new: 47, returning: 61 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#1a1917",
          border: "1px solid #2a2927",
          borderRadius: "6px",
          padding: "10px 14px",
          fontSize: "13px",
        }}
      >
        <div style={{ color: "#7a7570", marginBottom: "6px", fontWeight: 600 }}>{label}</div>
        {payload.map((entry: any) => (
          <div key={entry.name} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: entry.fill, display: "inline-block" }} />
            <span style={{ color: "#7a7570", textTransform: "capitalize" }}>{entry.name}:</span>
            <span style={{ color: "#f0ede8", fontWeight: 600 }}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function CustomerChart() {
  return (
    <div
      style={{
        background: "#1a1917",
        border: "1px solid #2a2927",
        borderRadius: "8px",
        padding: "24px",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#7a7570",
            marginBottom: "4px",
          }}
        >
          Customer Acquisition
        </div>
        <div style={{ fontSize: "14px", color: "#f0ede8", fontWeight: 500 }}>
          New vs Returning — Last 6 Months
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="28%" barGap={3}>
          <CartesianGrid vertical={false} stroke="#2a2927" strokeDasharray="0" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#7a7570", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#7a7570", fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="new" name="new" fill="#c8440f" radius={[3, 3, 0, 0]} />
          <Bar dataKey="returning" name="returning" fill="#2a2927" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", gap: "20px", marginTop: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: "#c8440f", display: "inline-block" }} />
          <span style={{ fontSize: "12px", color: "#7a7570" }}>New customers</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: "#2a2927", display: "inline-block", border: "1px solid #3a3836" }} />
          <span style={{ fontSize: "12px", color: "#7a7570" }}>Returning customers</span>
        </div>
      </div>
    </div>
  );
}
