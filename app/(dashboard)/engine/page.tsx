"use client";

const STAGES = ["QUALIFY", "PULSE", "LOOP", "CONVERT"] as const;

const STAGE_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  QUALIFY: { color: "#7c9ef5", bg: "rgba(124,158,245,0.1)", border: "rgba(124,158,245,0.25)" },
  PULSE:   { color: "#c8440f", bg: "rgba(200,68,15,0.1)",   border: "rgba(200,68,15,0.25)" },
  LOOP:    { color: "#d4913a", bg: "rgba(212,145,58,0.1)",  border: "rgba(212,145,58,0.25)" },
  CONVERT: { color: "#2a9d6e", bg: "rgba(42,157,110,0.1)", border: "rgba(42,157,110,0.25)" },
};

const cycles = [
  {
    name: "Skincare — broad interest",
    stage: "PULSE" as const,
    started: "2 Jan 2025",
    progress: 62,
    stats: [
      { label: "People qualified", value: "2,847" },
      { label: "In pulse window",  value: "842" },
      { label: "Completed cycles", value: "394" },
      { label: "New customers",    value: "18" },
    ],
    creatives: ["#c8440f", "#d4913a", "#7c9ef5"],
    rotatesIn: "3 days",
  },
  {
    name: "Wellness — lookalike 5%",
    stage: "LOOP" as const,
    started: "28 Dec 2024",
    progress: 41,
    stats: [
      { label: "People qualified", value: "1,920" },
      { label: "In pulse window",  value: "504" },
      { label: "Completed cycles", value: "218" },
      { label: "New customers",    value: "11" },
    ],
    creatives: ["#2a9d6e", "#c8440f", "#d4913a"],
    rotatesIn: "6 days",
  },
  {
    name: "Gifting — retrigger",
    stage: "QUALIFY" as const,
    started: "3 Jan 2025",
    progress: 18,
    stats: [
      { label: "People qualified", value: "890" },
      { label: "In pulse window",  value: "0" },
      { label: "Completed cycles", value: "0" },
      { label: "New customers",    value: "0" },
    ],
    creatives: ["#7c9ef5", "#2a9d6e", "#c8440f"],
    rotatesIn: "12 days",
  },
];

const activityLog = [
  { icon: "↻", text: "Creative rotated — Skincare campaign", date: "8 Jan" },
  { icon: "↻", text: "Audience expanded — Wellness campaign", date: "5 Jan" },
  { icon: "↗", text: "New cycle started — Gifting retrigger", date: "3 Jan" },
  { icon: "↻", text: "Creative rotated — Skincare campaign", date: "29 Dec" },
  { icon: "↗", text: "Budget rebalanced across 3 cycles", date: "22 Dec" },
];

export default function EnginePage() {
  return (
    <div style={{ padding: "28px 32px", maxWidth: "860px" }}>

      {/* Status bar */}
      <div
        style={{
          background: "#1a1917",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "8px",
          padding: "14px 20px",
          marginBottom: "24px",
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
          <span style={{ color: "#f0ede8", fontWeight: 500 }}>Pulse engine</span>
          {" · "}
          <span style={{ color: "#2a9d6e" }}>Active</span>
          {" · "}
          3 cycles running
          {" · "}
          1,240 people in active windows
          {" · "}
          Last optimisation{" "}
          <span style={{ color: "#f0ede8" }}>2 hours ago</span>
        </span>
      </div>

      {/* Cycle cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
        {cycles.map((cycle) => {
          const currentStageIdx = STAGES.indexOf(cycle.stage);
          const s = STAGE_STYLES[cycle.stage];

          return (
            <div
              key={cycle.name}
              style={{
                background: "#1a1917",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "8px",
                padding: "24px 28px",
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: 600, color: "#f0ede8", flex: 1 }}>
                  {cycle.name}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: s.color,
                    background: s.bg,
                    border: `1px solid ${s.border}`,
                    padding: "3px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {cycle.stage}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#2a9d6e",
                  }}
                >
                  Running
                </span>
                <span style={{ fontSize: "12px", color: "#4a4744" }}>
                  Started {cycle.started}
                </span>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  height: "4px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "2px",
                  marginBottom: "20px",
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

              {/* Stage indicators */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0",
                  marginBottom: "20px",
                }}
              >
                {STAGES.map((stage, idx) => {
                  const isCompleted = idx < currentStageIdx;
                  const isCurrent = idx === currentStageIdx;
                  const ss = STAGE_STYLES[stage];

                  return (
                    <div
                      key={stage}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flex: idx < STAGES.length - 1 ? 1 : undefined,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {/* Dot */}
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: isCompleted ? ss.color : isCurrent ? ss.color : "rgba(255,255,255,0.1)",
                            border: isCurrent ? `2px solid ${ss.color}` : "none",
                            boxSizing: "border-box",
                            flexShrink: 0,
                          }}
                          className={isCurrent ? "animate-pulse-dot" : undefined}
                        />
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: isCurrent ? 700 : 500,
                            letterSpacing: "0.06em",
                            color: isCompleted || isCurrent ? ss.color : "#4a4744",
                          }}
                        >
                          {stage}
                        </span>
                      </div>

                      {/* Connector line */}
                      {idx < STAGES.length - 1 && (
                        <div
                          style={{
                            flex: 1,
                            height: "1px",
                            background: idx < currentStageIdx
                              ? "rgba(255,255,255,0.15)"
                              : "rgba(255,255,255,0.06)",
                            margin: "0 10px",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Stats row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "12px",
                  marginBottom: "20px",
                  padding: "16px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {cycle.stats.map((stat) => (
                  <div key={stat.label}>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#f0ede8",
                        letterSpacing: "-0.02em",
                        marginBottom: "2px",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ fontSize: "11px", color: "#4a4744" }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Creative rotation */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", gap: "4px" }}>
                  {cycle.creatives.map((color, i) => (
                    <div
                      key={i}
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "3px",
                        background: color,
                        opacity: 0.7,
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: "12px", color: "#4a4744" }}>
                  Rotating in {cycle.rotatesIn}
                </span>
                <span style={{ fontSize: "12px", color: "#2a9d6e" }}>· Auto-rotation on</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity log */}
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#7a7570",
          marginBottom: "12px",
        }}
      >
        What Pulse handled automatically this month
      </div>

      <div
        style={{
          background: "#1a1917",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {activityLog.map((item, i) => (
          <div
            key={i}
            style={{
              padding: "13px 20px",
              borderBottom:
                i < activityLog.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                color: item.icon === "↻" ? "#d4913a" : "#2a9d6e",
                flexShrink: 0,
                fontWeight: 600,
              }}
            >
              {item.icon}
            </span>
            <span style={{ fontSize: "13px", color: "#f0ede8", flex: 1 }}>{item.text}</span>
            <span style={{ fontSize: "12px", color: "#4a4744", flexShrink: 0 }}>{item.date}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
