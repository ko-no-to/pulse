"use client";

import Topbar from "../../components/Topbar";

const cycles = [
  {
    name: "Skincare — broad",
    stage: "PULSE",
    audienceSize: 842,
    startDate: "Jan 9, 2025",
    progress: 62,
    cpa: "€34",
    customers: 14,
  },
  {
    name: "Gifting — seasonal",
    stage: "LOOP",
    audienceSize: 398,
    startDate: "Dec 10, 2024",
    progress: 88,
    cpa: "€41",
    customers: 9,
  },
  {
    name: "Wellness — interest",
    stage: "QUALIFY",
    audienceSize: 2100,
    startDate: "Jan 15, 2025",
    progress: 18,
    cpa: "—",
    customers: 0,
  },
  {
    name: "Core — lookalike",
    stage: "CONVERT",
    audienceSize: 620,
    startDate: "Jan 2, 2025",
    progress: 100,
    cpa: "€38",
    customers: 24,
  },
  {
    name: "Holiday — retarget",
    stage: "LOOP",
    audienceSize: 510,
    startDate: "Dec 18, 2024",
    progress: 72,
    cpa: "€44",
    customers: 11,
  },
  {
    name: "New arrivals — broad",
    stage: "PULSE",
    audienceSize: 1200,
    startDate: "Jan 12, 2025",
    progress: 40,
    cpa: "€36",
    customers: 7,
  },
];

const stageStyles: Record<string, { color: string; bg: string }> = {
  QUALIFY: { color: "#818cf8", bg: "rgba(129,140,248,0.1)" },
  PULSE: { color: "#c8440f", bg: "rgba(200,68,15,0.12)" },
  LOOP: { color: "#d97706", bg: "rgba(217,119,6,0.12)" },
  CONVERT: { color: "#2a9d6e", bg: "rgba(42,157,110,0.12)" },
};

export default function CyclesPage() {
  return (
    <div>
      <Topbar title="Cycles" />
      <div style={{ padding: "28px 32px" }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#7a7570",
                marginBottom: "2px",
              }}
            >
              All Cycles
            </div>
            <div style={{ fontSize: "13px", color: "#7a7570" }}>
              6 cycles — 3 active, 1 completed, 2 in progress
            </div>
          </div>
          <button
            style={{
              background: "#c8440f",
              border: "none",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              padding: "8px 18px",
              borderRadius: "6px",
              cursor: "pointer",
              letterSpacing: "0.01em",
            }}
          >
            + New Cycle
          </button>
        </div>

        {/* Table */}
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
                {["Cycle Name", "Stage", "Audience", "Started", "Progress", "CPA", "Customers"].map(
                  (h) => (
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
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {cycles.map((cycle, i) => {
                const style = stageStyles[cycle.stage];
                return (
                  <tr
                    key={cycle.name}
                    style={{
                      borderBottom: i < cycles.length - 1 ? "1px solid #2a2927" : "none",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#222120")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td
                      style={{
                        padding: "14px 20px",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#f0ede8",
                      }}
                    >
                      {cycle.name}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          color: style.color,
                          background: style.bg,
                          padding: "3px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        {cycle.stage}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "14px 20px",
                        fontSize: "13px",
                        color: "#7a7570",
                      }}
                    >
                      {cycle.audienceSize.toLocaleString()}
                    </td>
                    <td
                      style={{
                        padding: "14px 20px",
                        fontSize: "13px",
                        color: "#7a7570",
                      }}
                    >
                      {cycle.startDate}
                    </td>
                    <td style={{ padding: "14px 20px", minWidth: "120px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            height: "3px",
                            background: "#2a2927",
                            borderRadius: "2px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${cycle.progress}%`,
                              background: style.color,
                              borderRadius: "2px",
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#7a7570",
                            width: "32px",
                            textAlign: "right",
                          }}
                        >
                          {cycle.progress}%
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "14px 20px",
                        fontSize: "13px",
                        color: cycle.cpa === "—" ? "#7a7570" : "#f0ede8",
                        fontWeight: 500,
                      }}
                    >
                      {cycle.cpa}
                    </td>
                    <td
                      style={{
                        padding: "14px 20px",
                        fontSize: "13px",
                        color: cycle.customers > 0 ? "#2a9d6e" : "#7a7570",
                        fontWeight: 600,
                      }}
                    >
                      {cycle.customers > 0 ? cycle.customers : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
