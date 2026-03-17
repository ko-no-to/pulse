"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const data = [
  { day: "1", value: 1 },
  { day: "2", value: 0 },
  { day: "3", value: 2 },
  { day: "4", value: 1 },
  { day: "5", value: 3 },
  { day: "6", value: 2 },
  { day: "7", value: 4 },
  { day: "8", value: 2 },
  { day: "9", value: 3 },
  { day: "10", value: 5 },
  { day: "11", value: 2 },
  { day: "12", value: 4 },
  { day: "13", value: 3 },
  { day: "14", value: 6 },
  { day: "15", value: 3 },
  { day: "16", value: 2 },
  { day: "17", value: 4 },
  { day: "18", value: 5 },
  { day: "19", value: 3 },
  { day: "20", value: 6 },
  { day: "21", value: 4 },
  { day: "22", value: 5 },
  { day: "23", value: 3 },
  { day: "24", value: 4 },
  { day: "25", value: 6 },
  { day: "26", value: 4 },
  { day: "27", value: 5 },
  { day: "28", value: 3 },
  { day: "29", value: 4 },
  { day: "30", value: 3 },
  { day: "31", value: 4 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#1a1917",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "4px",
          padding: "6px 10px",
          fontSize: "12px",
        }}
      >
        <span style={{ color: "#7a7570" }}>Jan {label}: </span>
        <span style={{ color: "#c8440f", fontWeight: 600 }}>
          {payload[0].value}
        </span>
      </div>
    );
  }
  return null;
};

export default function SparklineChart() {
  return (
    <div style={{ width: "100%", height: "72px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" hide />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#c8440f"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3, fill: "#c8440f", strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
