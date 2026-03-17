"use client";

import {
  LineChart,
  Line,
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const data = [
  { day: "1",  value: 1 },
  { day: "2",  value: 0 },
  { day: "3",  value: 2 },
  { day: "4",  value: 1 },
  { day: "5",  value: 3 },
  { day: "6",  value: 2 },
  { day: "7",  value: 4 },
  { day: "8",  value: 2 },
  { day: "9",  value: 3 },
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
          background: "#FFFFFF",
          border: "1px solid #E8E8E2",
          borderRadius: "6px",
          padding: "5px 10px",
          fontSize: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <span style={{ color: "#9B9B96" }}>Jan {label}: </span>
        <span style={{ color: "#C8440F", fontWeight: 600 }}>{payload[0].value}</span>
      </div>
    );
  }
  return null;
};

export default function SparklineChart() {
  return (
    <div style={{ width: "100%", height: "72px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C8440F" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#C8440F" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" hide />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#E8E8E2", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#C8440F"
            strokeWidth={2}
            fill="url(#sparkFill)"
            dot={false}
            activeDot={{ r: 3, fill: "#C8440F", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
