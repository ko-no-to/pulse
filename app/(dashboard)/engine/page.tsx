"use client";

/* ── Engine page ── */

const STAGE_STYLES: Record<string, { color: string; bg: string }> = {
  QUALIFY: { color: "#1D5FA8", bg: "#EEF4FD" },
  PULSE:   { color: "#A33508", bg: "#FDF0EB" },
  LOOP:    { color: "#B45309", bg: "#FEF3E2" },
  CONVERT: { color: "#9B9B96", bg: "#F7F6F1" },
};

const EXPLAINER = [
  { stage: "QUALIFY", desc: "Finds people paying attention to your category" },
  { stage: "PULSE",   desc: "Builds brand memory through concentrated impressions" },
  { stage: "LOOP",    desc: "Re-engages people automatically until they're ready" },
  { stage: "CONVERT", desc: "Your existing ads close the sale — Pulse feeds them better audiences", note: "Your campaigns · Pulse doesn't run these" },
];

type MetaCampaign = { name: string; id: string };
type ConvertCampaign = { name: string; id: string };

const CAMPAIGNS: Array<{
  name: string;
  stage: "PULSE" | "LOOP" | "QUALIFY";
  started: string;
  progress: number;
  stats: { label: string; val: string }[];
  creatives: string[];
  metaCampaigns: MetaCampaign[];
  convertCampaigns?: ConvertCampaign[];
}> = [
  {
    name: "Skincare — broad interest",
    stage: "PULSE",
    started: "12 Jan 2026",
    progress: 62,
    stats: [
      { label: "Qualified", val: "2,847" },
      { label: "In window", val: "842" },
      { label: "Completed", val: "394" },
      { label: "Delivered", val: "18" },
    ],
    creatives: ["#C8440F", "#B45309", "#1D5FA8"],
    metaCampaigns: [
      { name: "Skincare Interest Burst — Jan 2026", id: "Meta · #8471923" },
      { name: "Skincare Retrigger — Warm Audience", id: "Meta · #8471956" },
    ],
  },
  {
    name: "Wellness — lookalike 5%",
    stage: "LOOP",
    started: "28 Dec 2025",
    progress: 41,
    stats: [
      { label: "Qualified", val: "1,920" },
      { label: "In window", val: "504" },
      { label: "Completed", val: "218" },
      { label: "Delivered", val: "11" },
    ],
    creatives: ["#1A7A4A", "#C8440F", "#B45309"],
    metaCampaigns: [
      { name: "Wellness Loop Re-entry — Dec 2025", id: "Meta · #8472104" },
    ],
  },
  {
    name: "Gifting — retrigger",
    stage: "QUALIFY",
    started: "3 Jan 2026",
    progress: 18,
    stats: [
      { label: "Qualified", val: "890" },
      { label: "In window", val: "0" },
      { label: "Completed", val: "0" },
      { label: "Delivered", val: "0" },
    ],
    creatives: ["#1D5FA8", "#1A7A4A", "#C8440F"],
    metaCampaigns: [
      { name: "Gifting Broad Interest — Jan 2026", id: "Meta · #8472231" },
    ],
  },
];

const CONVERT_CAMPAIGNS: ConvertCampaign[] = [
  { name: "Dynamic Product Ads — All Visitors", id: "Meta · #7823401" },
  { name: "Retargeting — Cart Abandonment", id: "Meta · #7823445" },
];

const STAGES = ["QUALIFY", "PULSE", "LOOP", "CONVERT"] as const;

const LOG = [
  { icon: "↻", text: "Creative rotated · Skincare campaign", date: "8 Jan",  color: "#B45309" },
  { icon: "↻", text: "Audience expanded · Wellness campaign", date: "5 Jan", color: "#B45309" },
  { icon: "↗", text: "New cycle started · Gifting retrigger", date: "3 Jan", color: "#1A7A4A" },
  { icon: "↻", text: "Creative rotated · Skincare campaign", date: "29 Dec", color: "#B45309" },
  { icon: "↗", text: "Budget rebalanced across 3 campaigns", date: "22 Dec", color: "#1A7A4A" },
];

/* ── Shared sub-components ── */

function MetaIcon({ size = 20 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.25, background: "#1877F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 11 11" fill="none">
        <path d="M6.2 10V6.1H7.6L7.8 4.4H6.2V3.3C6.2 2.8 6.4 2.5 7.1 2.5H7.9V1C7.7 1 7.2 0.9 6.6 0.9C5.3 0.9 4.4 1.7 4.4 3.1V4.4H3V6.1H4.4V10H6.2Z" fill="white"/>
      </svg>
    </div>
  );
}

function StatusBar() {
  return (
    <div style={{ background: "#FDF0EB", borderLeft: "3px solid #C8440F", borderRadius: "0 8px 8px 0", padding: "12px 20px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div
                className={current ? "pulse-dot" : undefined}
                style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: completed ? "#C8440F" : "#FFFFFF",
                  border: completed ? "none" : isConvert ? "1px dashed #D4D4CC" : current ? "2px solid #C8440F" : "2px solid #E8E8E2",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}
              >
                {completed && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                {current && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C8440F" }}/>}
              </div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: current ? 600 : 400, letterSpacing: "0.05em", color: completed || current ? (isConvert ? "#9B9B96" : s.color) : "#9B9B96", textAlign: "center", whiteSpace: "nowrap" }}>
                {stage}
                {isConvert && <div style={{ fontStyle: "italic", fontSize: 9 }}>(your campaigns)</div>}
              </div>
            </div>
            {i < STAGES.length - 1 && (
              <div style={{ flex: 1, height: 2, background: completed ? "#C8440F" : "#E8E8E2", margin: "0 6px", marginBottom: 18 }}/>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CampaignRow({ name, id }: { name: string; id: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #E8E8E2" }}>
      <MetaIcon size={20}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: "#1A1A18", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#9B9B96", marginTop: 1 }}>{id}</div>
      </div>
      <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: "#156639", background: "#EBF7F0", padding: "2px 8px", borderRadius: 4, flexShrink: 0 }}>Running</span>
      <a href="#" target="_blank" rel="noreferrer" style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#A33508", textDecoration: "none", flexShrink: 0 }}>View in Meta →</a>
    </div>
  );
}

function ConvertRow({ name, id }: { name: string; id: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #E8E8E2" }}>
      <MetaIcon size={20}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: "#6B6B66", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#9B9B96", marginTop: 1 }}>{id}</div>
      </div>
      <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: "#6B6B66", background: "#F3F4F6", padding: "2px 8px", borderRadius: 4, flexShrink: 0 }}>Active</span>
      <a href="#" target="_blank" rel="noreferrer" style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#A33508", textDecoration: "none", flexShrink: 0 }}>View in Meta →</a>
    </div>
  );
}

export default function EnginePage() {
  return (
    <div style={{ padding: "28px", background: "#F0EFE9", minHeight: "100%" }}>
      <StatusBar/>

      {/* ── PAGE HEADING ── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#1A1A18", marginBottom: 4 }}>
          New customer engine
        </div>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "#6B6B66" }}>
          Meta Ads · 3 campaigns running
        </div>
      </div>

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
            <div key={stage} style={{ background: isConvert ? "#F7F6F1" : "#FFFFFF", border: isConvert ? "1px dashed #D4D4CC" : "1px solid #E8E8E2", borderRadius: 12, padding: "20px", boxShadow: isConvert ? "none" : "0 1px 3px rgba(0,0,0,0.04)" }}>
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

              <StagePipeline currentStage={c.stage}/>

              {/* Progress bar */}
              <div style={{ height: 6, background: "#E8E8E2", borderRadius: 3, overflow: "hidden", marginBottom: 18 }}>
                <div style={{ height: "100%", width: `${c.progress}%`, background: "#C8440F", borderRadius: 3 }}/>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "#E8E8E2", borderRadius: 8, overflow: "hidden", border: "1px solid #E8E8E2", marginBottom: 18 }}>
                {c.stats.map((st) => (
                  <div key={st.label} style={{ padding: "14px 16px", background: "#F7F6F1" }}>
                    <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9B9B96", marginBottom: 4 }}>{st.label}</div>
                    <div style={{ fontFamily: "var(--font-ui)", fontSize: 20, fontWeight: 600, color: "#1A1A18", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{st.val}</div>
                  </div>
                ))}
              </div>

              {/* Creative rotation */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {c.creatives.map((col, i) => (
                    <div key={i} style={{ width: 20, height: 20, borderRadius: 4, background: col, opacity: 0.6 }}/>
                  ))}
                </div>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#6B6B66" }}>Auto-rotating · Next rotation in 3 days</span>
              </div>

              {/* ── CAMPAIGNS RUNNING THIS STAGE ── */}
              <div style={{ borderTop: "1px solid #E8E8E2", paddingTop: 16 }}>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9B9B96", marginBottom: 4 }}>
                  Running now
                </div>
                <div>
                  {c.metaCampaigns.map((mc) => (
                    <CampaignRow key={mc.id} name={mc.name} id={mc.id}/>
                  ))}
                  {/* Remove the last border */}
                  <style>{`.cr-last { border-bottom: none !important; }`}</style>
                </div>
              </div>
            </div>
          );
        })}

        {/* CONVERT card */}
        <div style={{ background: "#F7F6F1", border: "1px dashed #D4D4CC", borderRadius: 12, padding: "24px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 600, color: "#6B6B66", flex: 1 }}>Convert stage</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: "#9B9B96", background: "#F7F6F1", border: "1px solid #E8E8E2", padding: "3px 10px", borderRadius: 6 }}>CONVERT</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontStyle: "italic", color: "#9B9B96" }}>Your campaigns · Pulse doesn't run these</span>
          </div>

          {/* Your conversion campaigns */}
          <div style={{ borderTop: "1px solid #E8E8E2", paddingTop: 16 }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontStyle: "italic", color: "#9B9B96", marginBottom: 8 }}>
              Your conversion campaigns (not managed by Pulse)
            </div>
            <div>
              {CONVERT_CAMPAIGNS.map((cc) => (
                <ConvertRow key={cc.id} name={cc.name} id={cc.id}/>
              ))}
            </div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontStyle: "italic", color: "#9B9B96", marginTop: 12 }}>
              Pulse feeds warmer audiences into these. You manage them — we just make them perform better.
            </div>
          </div>
        </div>
      </div>

      {/* ── AUTOMATED ACTIONS LOG ── */}
      <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "#1A1A18", marginBottom: 12 }}>
        Handled automatically this month
      </div>
      <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", marginBottom: 32 }}>
        {LOG.map((item, i) => (
          <div key={i} style={{ padding: "13px 20px", borderBottom: i < LOG.length - 1 ? "1px solid #E8E8E2" : "none", display: "flex", alignItems: "center", gap: 12 }}
               onMouseEnter={(e) => (e.currentTarget.style.background = "#F7F6F1")}
               onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: item.color, background: item.color === "#1A7A4A" ? "#EBF7F0" : "#FEF3E2", padding: "2px 8px", borderRadius: 4, flexShrink: 0, minWidth: 24, textAlign: "center" }}>
              {item.icon}
            </span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#1A1A18", flex: 1 }}>{item.text}</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#9B9B96", flexShrink: 0 }}>{item.date}</span>
          </div>
        ))}
      </div>

      {/* ── AD NETWORK EXPANSION PANEL ── */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 16, fontWeight: 600, color: "#1A1A18", marginBottom: 6 }}>
          Your new customer engine
        </div>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "#6B6B66", marginBottom: 20, lineHeight: 1.6 }}>
          Add more ad networks to reach new customers across more channels. Same engine logic. Same Shopify verification.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>

        {/* Meta — connected */}
        <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ padding: "20px 20px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <MetaIcon size={28}/>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "#1A1A18" }}>Meta Ads</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: "#156639", background: "#EBF7F0", padding: "2px 8px", borderRadius: 4, marginLeft: "auto" }}>Connected</span>
            </div>
            <div style={{ height: 1, background: "#E8E8E2", margin: "0 -20px 14px" }}/>
            <div style={{ display: "flex", gap: 16 }}>
              {[["3 campaigns", ""], ["1,240 in cycles", ""], ["47 delivered", ""]].map(([label]) => (
                <div key={label} style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#6B6B66" }}>{label}</div>
              ))}
            </div>
          </div>
          <div style={{ padding: "10px 20px 16px" }}>
            <a href="#" style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: "#A33508", textDecoration: "none" }}>Manage →</a>
          </div>
        </div>

        {/* Google Ads — coming soon */}
        <div style={{ background: "#F7F6F1", border: "1px dashed #D4D4CC", borderRadius: 12, padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "#F3F4F6", border: "1px solid #E8E8E2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 700, color: "#9B9B96" }}>G</span>
            </div>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "#9B9B96" }}>Google Ads</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: "#9B9B96", background: "#F3F4F6", padding: "2px 8px", borderRadius: 4, marginLeft: "auto" }}>Phase 2</span>
          </div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#9B9B96", lineHeight: 1.55, marginBottom: 16 }}>
            Reach buyers actively searching your category. Same Qualify → Pulse → Loop logic, different audience pool.
          </div>
          <a href="#" style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: "#A33508", textDecoration: "none" }}>Join waitlist →</a>
        </div>

        {/* TikTok — coming soon */}
        <div style={{ background: "#F7F6F1", border: "1px dashed #D4D4CC", borderRadius: 12, padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "#F3F4F6", border: "1px solid #E8E8E2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, color: "#9B9B96" }}>TT</span>
            </div>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "#9B9B96" }}>TikTok Ads</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: "#9B9B96", background: "#F3F4F6", padding: "2px 8px", borderRadius: 4, marginLeft: "auto" }}>Phase 3</span>
          </div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#9B9B96", lineHeight: 1.55, marginBottom: 16 }}>
            Reach new audiences through video-first discovery. Best for visual products with repeat purchase potential.
          </div>
          <a href="#" style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: "#A33508", textDecoration: "none" }}>Join waitlist →</a>
        </div>
      </div>
    </div>
  );
}
