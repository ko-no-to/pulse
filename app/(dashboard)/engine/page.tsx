"use client";

/* ── Engine page ── */

const STAGE_STYLES: Record<string, { color: string; bg: string; border?: string }> = {
  QUALIFY: { color: "#1D5FA8", bg: "#EEF4FD" },
  PULSE:   { color: "#A33508", bg: "#FDF0EB" },
  LOOP:    { color: "#B45309", bg: "#FEF3E2" },
  CONVERT: { color: "#9B9B96", bg: "#F7F6F1", border: "1px dashed #D4D4CC" },
};

const EXPLAINER = [
  { stage: "QUALIFY", desc: "Finds people paying attention to your category" },
  { stage: "PULSE",   desc: "Builds brand memory through concentrated impressions" },
  { stage: "LOOP",    desc: "Re-engages people automatically until they're ready" },
  { stage: "CONVERT", desc: "Your existing ads close the sale — Pulse feeds them better audiences", note: "Your campaigns · Pulse doesn't run these" },
];

const CAMPAIGNS = [
  {
    name: "Skincare — broad interest", stage: "PULSE" as const, started: "12 Jan 2026", progress: 62,
    stats: [{ label: "Qualified", val: "2,847" }, { label: "In window", val: "842" }, { label: "Completed", val: "394" }, { label: "Delivered", val: "18" }],
    creatives: ["#C8440F", "#B45309", "#1D5FA8"],
  },
  {
    name: "Wellness — lookalike 5%", stage: "LOOP" as const, started: "28 Dec 2025", progress: 41,
    stats: [{ label: "Qualified", val: "1,920" }, { label: "In window", val: "504" }, { label: "Completed", val: "218" }, { label: "Delivered", val: "11" }],
    creatives: ["#1A7A4A", "#C8440F", "#B45309"],
  },
  {
    name: "Gifting — retrigger", stage: "QUALIFY" as const, started: "3 Jan 2026", progress: 18,
    stats: [{ label: "Qualified", val: "890" }, { label: "In window", val: "0" }, { label: "Completed", val: "0" }, { label: "Delivered", val: "0" }],
    creatives: ["#1D5FA8", "#1A7A4A", "#C8440F"],
  },
];

const STAGES = ["QUALIFY", "PULSE", "LOOP", "CONVERT"] as const;

const LOG = [
  { icon: "↻", text: "Creative rotated · Skincare campaign", date: "8 Jan",  color: "#B45309" },
  { icon: "↻", text: "Audience expanded · Wellness campaign", date: "5 Jan", color: "#B45309" },
  { icon: "↗", text: "New cycle started · Gifting retrigger", date: "3 Jan", color: "#1A7A4A" },
  { icon: "↻", text: "Creative rotated · Skincare campaign", date: "29 Dec", color: "#B45309" },
  { icon: "↗", text: "Budget rebalanced across 3 campaigns", date: "22 Dec", color: "#1A7A4A" },
];

function StatusBar() {
  return (
    <div style={{ background: "#FDF0EB", borderLeft: "3px solid #C8440F", borderRadius: "0 8px 8px 0", padding: "12px 20px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1A7A4A", display: "inline-block" }}/>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500, color: "#1A1A18" }}>Pulse is running</span>
      </div>
      <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#6B6B66" }}>3 campaigns active · 1,240 people in cycles · Last updated 2 min ago</span>
    </div>
  );
}

function StagePipeline({ currentStage }: { currentStage: typeof STAGES[number] }) {
  const idx = STAGES.indexOf(currentStage);
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
      {STAGES.map((stage, i) => {
        const completed = i < idx;
        const current   = i === idx;
        const isConvert = stage === "CONVERT";
        const s = STAGE_STYLES[stage];

        return (
          <div key={stage} style={{ display: "flex", alignItems: "center", flex: i < STAGES.length - 1 ? 1 : undefined }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, position: "relative" }}>
              {/* Node */}
              <div
                className={current ? "pulse-dot" : undefined}
                style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: completed ? "#C8440F" : isConvert ? "#F7F6F1" : current ? "#FFFFFF" : "#FFFFFF",
                  border: completed ? "none" : isConvert ? "1px dashed #D4D4CC" : current ? `2px solid #C8440F` : "2px solid #E8E8E2",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                {completed && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {current && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C8440F" }}/>}
              </div>
              {/* Label */}
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: completed ? 500 : current ? 600 : 400, letterSpacing: "0.05em", color: completed || current ? (isConvert ? "#9B9B96" : s.color) : "#9B9B96", textAlign: "center", whiteSpace: "nowrap" }}>
                {stage}
                {isConvert && <div style={{ fontStyle: "italic", fontSize: 9 }}>(your campaigns)</div>}
              </div>
            </div>
            {/* Connector */}
            {i < STAGES.length - 1 && (
              <div style={{ flex: 1, height: 2, background: completed ? "#C8440F" : "#E8E8E2", margin: "0 6px", marginBottom: 18 }}/>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function EnginePage() {
  return (
    <div style={{ padding: "28px", background: "#F0EFE9", minHeight: "100%" }}>
      <StatusBar />

      {/* Thesis line */}
      <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontStyle: "italic", color: "#6B6B66", textAlign: "center", marginBottom: 28 }}>
        Running in the background. Nothing to manage.
      </div>

      {/* ── FOUR-STAGE EXPLAINER ROW ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
        {EXPLAINER.map(({ stage, desc, note }) => {
          const s = STAGE_STYLES[stage];
          const isConvert = stage === "CONVERT";
          return (
            <div key={stage} style={{ background: isConvert ? "#F7F6F1" : "#FFFFFF", border: isConvert ? "1px dashed #D4D4CC" : "1px solid #E8E8E2", borderRadius: 12, padding: "20px 20px", boxShadow: isConvert ? "none" : "0 1px 3px rgba(0,0,0,0.04)" }}>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: s.color, background: s.bg, padding: "3px 10px", borderRadius: 6, display: "inline-block", marginBottom: 12 }}>{stage}</span>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: isConvert ? "#9B9B96" : "#6B6B66", lineHeight: 1.5 }}>{desc}</div>
              {note && <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontStyle: "italic", color: "#9B9B96", marginTop: 8 }}>{note}</div>}
            </div>
          );
        })}
      </div>

      {/* ── ACTIVE CAMPAIGNS ── */}
      <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B6B66", marginBottom: 12 }}>
        Active campaigns
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
        {CAMPAIGNS.map((c) => {
          const s = STAGE_STYLES[c.stage];
          return (
            <div key={c.name} style={{ background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 12, padding: "24px 28px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 600, color: "#1A1A18", flex: 1 }}>{c.name}</span>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: s.color, background: s.bg, padding: "3px 10px", borderRadius: 6 }}>{c.stage}</span>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: "#156639", display: "flex", alignItems: "center", gap: 5 }}>
                  <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#1A7A4A", display: "inline-block" }}/>
                  Running
                </span>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#9B9B96" }}>Started {c.started}</span>
              </div>

              {/* Stage pipeline */}
              <StagePipeline currentStage={c.stage}/>

              {/* Progress bar */}
              <div style={{ height: 6, background: "#E8E8E2", borderRadius: 3, overflow: "hidden", marginBottom: 18 }}>
                <div style={{ height: "100%", width: `${c.progress}%`, background: "#C8440F", borderRadius: 3 }}/>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "#E8E8E2", borderRadius: 8, overflow: "hidden", border: "1px solid #E8E8E2", marginBottom: 18 }}>
                {c.stats.map((s) => (
                  <div key={s.label} style={{ padding: "14px 16px", background: "#F7F6F1" }}>
                    <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9B9B96", marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontFamily: "var(--font-ui)", fontSize: 20, fontWeight: 600, color: "#1A1A18", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{s.val}</div>
                  </div>
                ))}
              </div>

              {/* Creative rotation */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {c.creatives.map((col, i) => (
                    <div key={i} style={{ width: 20, height: 20, borderRadius: 4, background: col, opacity: 0.6 }}/>
                  ))}
                </div>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#6B6B66" }}>Auto-rotating · Next rotation in 3 days</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── AUTOMATED ACTIONS LOG ── */}
      <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "#1A1A18", marginBottom: 12 }}>
        Handled automatically this month
      </div>
      <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        {LOG.map((item, i) => (
          <div key={i} style={{ padding: "13px 20px", borderBottom: i < LOG.length - 1 ? "1px solid #E8E8E2" : "none", display: "flex", alignItems: "center", gap: 12 }}
               onMouseEnter={(e) => (e.currentTarget.style.background = "#F7F6F1")}
               onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            {/* Icon pill */}
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: item.color, background: item.color === "#1A7A4A" ? "#EBF7F0" : "#FEF3E2", padding: "2px 8px", borderRadius: 4, flexShrink: 0, minWidth: 24, textAlign: "center" }}>
              {item.icon}
            </span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#1A1A18", flex: 1 }}>{item.text}</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#9B9B96", flexShrink: 0 }}>{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
