"use client";

const STAGES = ["QUALIFY", "PULSE", "LOOP", "CONVERT"] as const;

const STAGE_STYLES: Record<string, { color: string; bg: string }> = {
  QUALIFY: { color: "#1D5FA8", bg: "#EEF4FD" },
  PULSE:   { color: "#A33508", bg: "#FDF0EB" },
  LOOP:    { color: "#B45309", bg: "#FEF3E2" },
  CONVERT: { color: "#156639", bg: "#EBF7F0" },
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
    creatives: ["#C8440F", "#B45309", "#1D5FA8"],
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
    creatives: ["#1A7A4A", "#C8440F", "#B45309"],
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
    creatives: ["#1D5FA8", "#1A7A4A", "#C8440F"],
    rotatesIn: "12 days",
  },
];

const activityLog = [
  { icon: "↻", text: "Creative rotated — Skincare campaign", date: "8 Jan", accent: "#B45309" },
  { icon: "↻", text: "Audience expanded — Wellness campaign", date: "5 Jan", accent: "#B45309" },
  { icon: "↗", text: "New cycle started — Gifting retrigger", date: "3 Jan", accent: "#1A7A4A" },
  { icon: "↻", text: "Creative rotated — Skincare campaign", date: "29 Dec", accent: "#B45309" },
  { icon: "↗", text: "Budget rebalanced across 3 cycles", date: "22 Dec", accent: "#1A7A4A" },
];

export default function EnginePage() {
  return (
    <div style={{ padding: "28px", background: "#F6F6F1", minHeight: "100%" }}>

      {/* Status bar */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E8E8E2",
          borderRadius: "12px",
          padding: "14px 20px",
          marginBottom: "20px",
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
            background: "#1A7A4A",
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: "14px", color: "#6B6B66" }}>
          <span style={{ color: "#1A1A18", fontWeight: 500 }}>Pulse engine</span>
          {" · "}
          <span style={{ color: "#156639", fontWeight: 500 }}>Active</span>
          {" · "}
          3 cycles running
          {" · "}
          1,240 people in active windows
          {" · "}
          Last optimisation{" "}
          <span style={{ color: "#1A1A18", fontWeight: 500 }}>2 hours ago</span>
        </span>
      </div>

      {/* Cycle cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
        {cycles.map((cycle) => {
          const currentStageIdx = STAGES.indexOf(cycle.stage);
          const s = STAGE_STYLES[cycle.stage];

          return (
            <div
              key={cycle.name}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E8E8E2",
                borderRadius: "12px",
                padding: "24px 28px",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: 600, color: "#1A1A18", flex: 1 }}>
                  {cycle.name}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: s.color,
                    background: s.bg,
                    padding: "3px 10px",
                    borderRadius: "6px",
                  }}
                >
                  {cycle.stage}
                </span>
                <span style={{ fontSize: "13px", fontWeight: 500, color: "#156639" }}>Running</span>
                <span style={{ fontSize: "13px", color: "#9B9B96" }}>Started {cycle.started}</span>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  height: "6px",
                  background: "#E8E8E2",
                  borderRadius: "3px",
                  marginBottom: "20px",
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

              {/* Stage pipeline */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
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
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <div
                          className={isCurrent ? "animate-pulse-dot" : undefined}
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: isCompleted || isCurrent ? ss.color : "#D4D4CC",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: isCurrent ? 600 : 500,
                            letterSpacing: "0.05em",
                            color: isCompleted || isCurrent ? ss.color : "#9B9B96",
                          }}
                        >
                          {stage}
                        </span>
                      </div>
                      {idx < STAGES.length - 1 && (
                        <div
                          style={{
                            flex: 1,
                            height: "1px",
                            background: idx < currentStageIdx ? "#D4D4CC" : "#E8E8E2",
                            margin: "0 10px",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Stats grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "1px",
                  background: "#E8E8E2",
                  borderRadius: "8px",
                  overflow: "hidden",
                  marginBottom: "18px",
                  border: "1px solid #E8E8E2",
                }}
              >
                {cycle.stats.map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      padding: "14px 16px",
                      background: "#FAFAF7",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#1A1A18",
                        letterSpacing: "-0.02em",
                        marginBottom: "3px",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ fontSize: "11px", color: "#9B9B96" }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Creative rotation */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ display: "flex", gap: "4px" }}>
                  {cycle.creatives.map((color, i) => (
                    <div
                      key={i}
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "3px",
                        background: color,
                        opacity: 0.55,
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: "12px", color: "#9B9B96" }}>
                  Rotating in {cycle.rotatesIn}
                </span>
                <span style={{ fontSize: "12px", color: "#156639", fontWeight: 500 }}>
                  · Auto-rotation on
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity log */}
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
        What Pulse handled automatically this month
      </div>

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E8E8E2",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {activityLog.map((item, i) => (
          <div
            key={i}
            style={{
              padding: "13px 20px",
              borderBottom: i < activityLog.length - 1 ? "1px solid #E8E8E2" : "none",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAF7")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <span
              style={{
                fontSize: "15px",
                color: item.accent,
                flexShrink: 0,
                fontWeight: 600,
                width: "16px",
                textAlign: "center",
              }}
            >
              {item.icon}
            </span>
            <span style={{ fontSize: "14px", color: "#1A1A18", flex: 1 }}>{item.text}</span>
            <span style={{ fontSize: "12px", color: "#9B9B96", flexShrink: 0 }}>{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
