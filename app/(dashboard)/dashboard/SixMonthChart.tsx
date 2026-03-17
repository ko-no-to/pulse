"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Aug", value: 12 },
  { month: "Sep", value: 18 },
  { month: "Oct", value: 22 },
  { month: "Nov", value: 28 },
  { month: "Dec", value: 38 },
  { month: "Jan", value: 47 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 8, padding: "7px 12px", fontSize: 13, fontFamily: "var(--font-ui)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <span style={{ color: "#9B9B96" }}>{label}: </span>
        <span style={{ color: "#C8440F", fontWeight: 600 }}>{payload[0].value} customers</span>
      </div>
    );
  }
  return null;
};

export default function SixMonthChart() {
  return (
    <div style={{ width: "100%", height: 140 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="smcFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C8440F" stopOpacity={0.1}/>
              <stop offset="100%" stopColor="#C8440F" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="month" tick={{ fontFamily: "var(--font-ui)", fontSize: 12, fill: "#9B9B96" }} axisLine={false} tickLine={false}/>
          <YAxis hide/>
          <Tooltip content={<CustomTooltip/>} cursor={{ stroke: "#E8E8E2", strokeWidth: 1 }}/>
          <Area type="monotone" dataKey="value" stroke="#C8440F" strokeWidth={2} fill="url(#smcFill)" dot={false} activeDot={{ r: 4, fill: "#C8440F", strokeWidth: 0 }}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
