"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── count-up hook ─────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 700, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(ease * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return value;
}

/* ─── Network icons ─────────────────────────────────────────────────── */
function MetaIcon({ size = 20 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: Math.round(size * 0.25), background: "#1877F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 10 10" fill="none">
        <path d="M5.8 9.5V5.6H7L7.2 4H5.8V3C5.8 2.5 6 2.2 6.7 2.2H7.3V0.8C7.1 0.8 6.7 0.7 6.2 0.7C4.9 0.7 4.1 1.5 4.1 2.8V4H2.7V5.6H4.1V9.5H5.8Z" fill="white"/>
      </svg>
    </div>
  );
}

function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: Math.round(size * 0.25), background: "#000000", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 18 18" fill="none">
        <path d="M14.5 3.8C13.6 3.8 12.8 3.4 12.3 2.8V2H9.8V11.5C9.8 12.4 9.1 13.2 8.1 13.2C7.1 13.2 6.4 12.4 6.4 11.5C6.4 10.5 7.1 9.8 8.1 9.8C8.4 9.8 8.6 9.9 8.8 10V7.4C8.6 7.4 8.3 7.3 8.1 7.3C5.7 7.3 3.8 9.2 3.8 11.5C3.8 13.9 5.7 15.8 8.1 15.8C10.4 15.8 12.3 13.9 12.3 11.5V7.2C13.2 7.8 14.3 8.1 15.4 8.1V5.6C15.1 5.6 14.8 5.5 14.5 5.3V3.8Z" fill="white"/>
      </svg>
    </div>
  );
}

/* ─── Stage stepper ─────────────────────────────────────────────────── */
const STAGE_ORDER = ["QUALIFY", "PULSE", "LOOP", "CONVERT"] as const;
type Stage = typeof STAGE_ORDER[number];

const STAGE_BADGES: Record<Stage, { bg: string; color: string }> = {
  QUALIFY: { bg: "var(--blue-bg)",   color: "var(--blue)" },
  PULSE:   { bg: "var(--accent-bg)", color: "var(--accent-text)" },
  LOOP:    { bg: "var(--amber-bg)",  color: "var(--amber)" },
  CONVERT: { bg: "#F3F4F6",          color: "var(--subtle)" },
};

function StageBadge({ stage }: { stage: Stage }) {
  const s = STAGE_BADGES[stage];
  return (
    <span style={{ fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 500, color: s.color, background: s.bg, padding: "2px 8px", borderRadius: 4 }}>
      {stage}
    </span>
  );
}

function StageStepper({ current }: { current: Stage }) {
  const currentIdx = STAGE_ORDER.indexOf(current);
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 0, margin: "14px 0" }}>
      {STAGE_ORDER.map((stage, i) => {
        const completed = i < currentIdx;
        const active    = i === currentIdx;
        const isConvert = stage === "CONVERT";
        const label     = isConvert ? "CONVERT\n(yours)" : stage;
        return (
          <div key={stage} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
              {/* Node */}
              <div style={{ position: "relative" }}>
                <div style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: completed ? "var(--accent)" : "var(--surface)",
                  border: completed ? "none" : isConvert
                    ? "1.5px dashed var(--subtle)"
                    : active ? "1.5px solid var(--accent)" : "1.5px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {completed && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5L3.2 5.7L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {active && (
                    <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "block" }}/>
                  )}
                </div>
              </div>
              {/* Label */}
              <div style={{
                fontFamily: "var(--font-inter)", fontSize: 10, marginTop: 5, textAlign: "center", whiteSpace: "pre-line",
                color: completed ? "var(--accent)" : active ? "var(--ink)" : "var(--subtle)",
                fontWeight: active ? 500 : 400,
                fontStyle: isConvert ? "italic" : "normal",
              }}>
                {label}
              </div>
            </div>
            {/* Connector */}
            {i < STAGE_ORDER.length - 1 && (
              <div style={{ height: 1.5, flex: 0.8, background: completed ? "var(--accent)" : "var(--border)", marginTop: 8 }}/>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Campaign data ─────────────────────────────────────────────────── */
type CampaignData = {
  name: string;
  stage: Stage;
  metrics: { label: string; value: string }[];
  adCount: number;
  nextRotation: string;
};

const CAMPAIGNS: CampaignData[] = [
  {
    name: "Skincare — broad interest",
    stage: "PULSE",
    metrics: [
      { label: "Frequency", value: "6.2×" },
      { label: "Reach",     value: "842" },
      { label: "Rotations", value: "3" },
    ],
    adCount: 3, nextRotation: "3 days",
  },
  {
    name: "Wellness — lookalike 5%",
    stage: "LOOP",
    metrics: [
      { label: "Re-entries", value: "124" },
      { label: "Avg days",   value: "8.3" },
      { label: "Delivered",  value: "11" },
    ],
    adCount: 4, nextRotation: "6 days",
  },
  {
    name: "Gifting — retrigger",
    stage: "QUALIFY",
    metrics: [
      { label: "Reach",     value: "2,847" },
      { label: "CPM",       value: "€4.12" },
      { label: "Qualified", value: "890" },
    ],
    adCount: 3, nextRotation: "8 days",
  },
];

const ACTIONS = [
  { icon: "↻", text: "Creative rotated · Skincare campaign", date: "8 Jan" },
  { icon: "↗", text: "New cycle · Gifting campaign",         date: "3 Jan" },
  { icon: "↻", text: "Audience expanded · Wellness",         date: "5 Jan" },
];

/* ─── CampaignCard ──────────────────────────────────────────────────── */
function CampaignCard({ c }: { c: CampaignData }) {
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      padding: "20px 24px",
      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    }}>
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <MetaIcon size={20}/>
        <span style={{ flex: 1, fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>{c.name}</span>
        <StageBadge stage={c.stage}/>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginLeft: 8 }}>
          <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", display: "inline-block" }}/>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--green-text)" }}>Running</span>
        </div>
      </div>

      {/* Stage stepper */}
      <StageStepper current={c.stage}/>

      {/* Metric chips */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {c.metrics.map((m) => (
          <div key={m.label} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 4, padding: "4px 10px" }}>
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, fontWeight: 600, color: "var(--ink)", lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 10, color: "var(--subtle)", marginTop: 2 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--subtle)" }}>
          {c.adCount} ads rotating · Next rotation in {c.nextRotation}
        </span>
        <a href="#" style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--accent-text)", textDecoration: "none" }}>
          View in Meta →
        </a>
      </div>
    </div>
  );
}

/* ─── Add Campaign Modal ────────────────────────────────────────────── */
const STAGE_LABELS: Record<Stage, string> = {
  QUALIFY: "Qualify — find new audiences",
  PULSE:   "Pulse — build brand memory",
  LOOP:    "Loop — re-engage until ready",
  CONVERT: "Convert — your existing ads",
};

function AddCampaignModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedStage, setSelectedStage] = useState<Stage>("QUALIFY");

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, width: 440, padding: "32px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>

        {step === 1 && (
          <>
            <h2 style={{ fontFamily: "var(--font-inter)", fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 6 }}>Add a campaign</h2>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>Choose your ad network.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: <MetaIcon size={24}/>, name: "Meta Ads", action: "Connect", available: true },
                { icon: <GoogleIcon size={24}/>, name: "Google Ads", action: "Phase 2 — Join waitlist", available: false },
                { icon: <TikTokIcon size={24}/>, name: "TikTok Ads", action: "Phase 3 — Join waitlist", available: false },
              ].map((n) => (
                <div key={n.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", border: "1px solid var(--border)", borderRadius: 8 }}>
                  {n.icon}
                  <span style={{ flex: 1, fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 500, color: n.available ? "var(--ink)" : "var(--subtle)" }}>{n.name}</span>
                  <button
                    onClick={() => n.available && setStep(2)}
                    style={{ fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: n.available ? 500 : 400, color: n.available ? "var(--accent-text)" : "var(--subtle)", background: "none", border: "none", cursor: n.available ? "pointer" : "default" }}
                  >
                    {n.action}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <MetaIcon size={28}/>
              <h2 style={{ fontFamily: "var(--font-inter)", fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>Connect your Meta Ads account</h2>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--muted)", marginBottom: 24, lineHeight: 1.6 }}>
              Pulse will create campaigns alongside any existing ones. Your current ads are untouched.
            </p>
            <button
              onClick={() => setStep(3)}
              style={{ width: "100%", padding: "12px", background: "var(--accent)", color: "#FFFFFF", border: "none", borderRadius: 8, fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 500, cursor: "pointer" }}
            >
              Connect via Meta →
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={{ fontFamily: "var(--font-inter)", fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 6 }}>Choose a stage</h2>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--muted)", marginBottom: 20 }}>Which part of the cycle should this campaign run?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              {(STAGE_ORDER as readonly Stage[]).map((s) => (
                <label key={s} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: `1.5px solid ${selectedStage === s ? "var(--accent)" : "var(--border)"}`, borderRadius: 8, cursor: "pointer", background: selectedStage === s ? "var(--accent-bg)" : "var(--surface)" }}>
                  <input type="radio" name="stage" value={s} checked={selectedStage === s} onChange={() => setSelectedStage(s)} style={{ accentColor: "var(--accent)" }}/>
                  <div>
                    <StageBadge stage={s}/>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "var(--muted)", marginLeft: 8 }}>{STAGE_LABELS[s]}</span>
                  </div>
                </label>
              ))}
            </div>
            <button
              onClick={() => setStep(4)}
              style={{ width: "100%", padding: "12px", background: "var(--accent)", color: "#FFFFFF", border: "none", borderRadius: 8, fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 500, cursor: "pointer" }}
            >
              Add to {selectedStage} →
            </button>
          </>
        )}

        {step === 4 && (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--green-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="22" height="17" viewBox="0 0 22 17" fill="none">
                <path d="M1 9L7.5 15.5L21 1.5" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 style={{ fontFamily: "var(--font-inter)", fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 6 }}>Campaign added to {selectedStage}</h2>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>It will appear in your dashboard once active.</p>
            <button onClick={onClose} style={{ padding: "10px 24px", background: "var(--accent)", color: "#FFFFFF", border: "none", borderRadius: 8, fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
              Done
            </button>
          </div>
        )}

        {step !== 4 && (
          <button onClick={onClose} style={{ marginTop: 16, background: "none", border: "none", fontFamily: "var(--font-inter)", fontSize: 13, color: "var(--subtle)", cursor: "pointer", display: "block" }}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Customer data ─────────────────────────────────────────────────── */
type Customer = { id: string; initials: string; value: string; days: number; cycle: string; time: string; isNew?: boolean; };
const CYCLES = ["Skincare — broad", "Wellness — lookalike", "Gifting — retrigger"];
const SEED: Customer[] = [
  { id: "#4821", initials: "LC", value: "€84",  days: 18, cycle: CYCLES[0], time: "Today, 14:32" },
  { id: "#4820", initials: "AM", value: "€145", days: 22, cycle: CYCLES[1], time: "Today, 11:47" },
  { id: "#4819", initials: "SB", value: "€67",  days: 14, cycle: CYCLES[0], time: "Today, 09:15" },
  { id: "#4818", initials: "TP", value: "€164", days: 31, cycle: CYCLES[2], time: "Yesterday, 21:04" },
  { id: "#4817", initials: "KR", value: "€52",  days: 9,  cycle: CYCLES[0], time: "Yesterday, 16:22" },
  { id: "#4816", initials: "JN", value: "€88",  days: 34, cycle: CYCLES[1], time: "Yesterday, 13:55" },
  { id: "#4815", initials: "MV", value: "€73",  days: 19, cycle: CYCLES[0], time: "Jan 14, 10:31" },
  { id: "#4814", initials: "DW", value: "€120", days: 26, cycle: CYCLES[2], time: "Jan 14, 08:44" },
  { id: "#4813", initials: "EH", value: "€62",  days: 12, cycle: CYCLES[1], time: "Jan 13, 19:17" },
  { id: "#4812", initials: "FC", value: "€156", days: 28, cycle: CYCLES[0], time: "Jan 13, 15:02" },
];

let nextId = 4822;
const INIT_PAIRS = ["AK","BM","CL","DT","EP","FG","HJ","IN","KO","LR","MS","NW"];
const VALS = [52,62,67,73,79,84,88,120,134,145,156,164];
const DAYS = [8,9,11,14,16,18,20,22,25,28,31,34];

function genCustomer(): Customer {
  const now = new Date();
  const id = nextId++;
  return {
    id: `#${id}`,
    initials: INIT_PAIRS[id % INIT_PAIRS.length],
    value: `€${VALS[id % VALS.length]}`,
    days: DAYS[id % DAYS.length],
    cycle: CYCLES[id % CYCLES.length],
    time: `Today, ${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`,
    isNew: true,
  };
}

/* ─── CustomerCard ──────────────────────────────────────────────────── */
function CustomerCard({ c }: { c: Customer }) {
  return (
    <div style={{
      background: "var(--surface)",
      border: c.isNew ? "1px solid var(--green)" : "1px solid var(--border)",
      borderRadius: 8,
      padding: "14px 18px",
      transition: "border-color 4s ease, box-shadow 0.15s ease",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.07)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Row 1 */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 600, color: "#FFFFFF", flexShrink: 0 }}>
          {c.initials}
        </div>
        <span style={{ flex: 1, fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>Customer {c.id}</span>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{c.value}</div>
          <div style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--subtle)" }}>{c.time}</div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--border)", margin: "10px 0" }}/>

      {/* Row 2 */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 500, color: "var(--green-text)", background: "var(--green-bg)", padding: "2px 7px", borderRadius: 3 }}>First purchase</span>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--subtle)", background: "var(--bg)", border: "1px solid var(--border)", padding: "2px 7px", borderRadius: 3 }}>{c.cycle}</span>
        <span style={{ flex: 1 }}/>
        <a href="#" style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--accent-text)", textDecoration: "none" }}>Verify in Shopify →</a>
      </div>

      {/* Row 3 */}
      <div style={{ marginTop: 6, fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--subtle)" }}>
        {c.days} days from first touch to purchase
      </div>
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────────────────── */
const PERIODS = ["This month", "Last 3M", "All time"];

export default function DashboardPage() {
  const [period, setPeriod] = useState("This month");
  const [addOpen, setAddOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>(SEED);
  const [count, setCount] = useState(47);

  const newCustomers = useCountUp(47, 700);
  const cac          = useCountUp(31, 600, 80);
  const fee          = useCountUp(722, 650, 160);

  /* clear isNew after 4s */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    customers.forEach((c) => {
      if (c.isNew) {
        timers.push(setTimeout(() => {
          setCustomers((prev) => prev.map((p) => p.id === c.id ? { ...p, isNew: false } : p));
        }, 4000));
      }
    });
    return () => timers.forEach(clearTimeout);
  }, [customers]);

  /* live arrival */
  useEffect(() => {
    function sched(): ReturnType<typeof setTimeout> {
      return setTimeout(() => {
        setCustomers((prev) => [genCustomer(), ...prev]);
        setCount((n) => n + 1);
        sched();
      }, 60000 + Math.random() * 30000);
    }
    const t = sched();
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100%" }}>

      {/* ── TOPBAR ── */}
      <div style={{
        height: 52, background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center",
        padding: "0 24px", gap: 12,
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <span style={{ flex: 1, fontFamily: "var(--font-inter)", fontSize: 15, fontWeight: 500, color: "var(--ink)" }}>
          Good morning, Noïse
        </span>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter)", fontSize: 12, fontWeight: 600, color: "#FFFFFF" }}>
          NB
        </div>
      </div>

      <div style={{ padding: "24px" }}>

        {/* ── METRICS ROW ── */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16, marginBottom: 28 }}>

          {/* Card 1 — primary */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderLeft: "3px solid var(--accent)", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--subtle)", marginBottom: 10 }}>
              New customers
            </div>
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 44, fontWeight: 600, color: "var(--accent)", lineHeight: 1, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
              {newCustomers}
            </div>
            <div style={{ marginTop: 10 }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, fontWeight: 500, color: "var(--green-text)", background: "var(--green-bg)", padding: "2px 9px", borderRadius: 4 }}>
                ↑ 31% vs last month
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--subtle)", marginBottom: 10 }}>
              Cost per new customer
            </div>
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 32, fontWeight: 600, color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
              €{cac}
            </div>
            <div style={{ marginTop: 8, fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--subtle)" }}>vs €91 on Meta</div>
          </div>

          {/* Card 3 */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--subtle)", marginBottom: 10 }}>
              Fee this month
            </div>
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 32, fontWeight: 600, color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
              €{fee}
            </div>
            <div style={{ marginTop: 8, fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--subtle)" }}>€299 base + €423 results</div>
          </div>
        </div>

        {/* ── CAMPAIGNS ── */}
        <div style={{ fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--subtle)", marginBottom: 12 }}>
          Campaigns
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 12 }}>
          {CAMPAIGNS.map((c) => <CampaignCard key={c.name} c={c}/>)}
        </div>

        {/* Add campaign button */}
        <button
          onClick={() => setAddOpen(true)}
          style={{ width: "100%", padding: "14px", border: "1px dashed var(--border)", borderRadius: 8, background: "none", fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 500, color: "var(--muted)", cursor: "pointer", marginBottom: 28 }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent-text)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
        >
          + Add campaign
        </button>

        {/* ── AUTOMATED ACTIONS ── */}
        <div style={{ fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--subtle)", marginBottom: 10 }}>
          Handled automatically this month
        </div>
        <div style={{ marginBottom: 28 }}>
          {ACTIONS.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", padding: "8px 0", borderBottom: i < ACTIONS.length - 1 ? "1px solid var(--border)" : "none" }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "var(--muted)", flex: 1 }}>
                {a.icon} {a.text}
              </span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--subtle)" }}>{a.date}</span>
            </div>
          ))}
        </div>

        {/* ── SECTION DIVIDER ── */}
        <div style={{ display: "flex", alignItems: "center", margin: "0 0 20px" }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }}/>
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 16px" }}>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--subtle)" }}>New customers</span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>
              {count} this month
            </span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  fontFamily: "var(--font-inter)", fontSize: 12, padding: "4px 10px",
                  border: `1px solid ${period === p ? "var(--border)" : "transparent"}`,
                  borderRadius: 5,
                  background: period === p ? "var(--surface)" : "transparent",
                  color: period === p ? "var(--ink)" : "var(--muted)",
                  cursor: "pointer",
                }}
              >{p}</button>
            ))}
          </div>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }}/>
        </div>

        {/* ── CUSTOMER FEED ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          <AnimatePresence initial={false}>
            {customers.map((c) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <CustomerCard c={c}/>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <p style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--subtle)", textAlign: "center", maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.65 }}>
          Every customer verified against Shopify first-purchase data. Click &lsquo;Verify in Shopify&rsquo; to confirm any entry.
        </p>

      </div>

      {/* Add campaign modal */}
      {addOpen && <AddCampaignModal onClose={() => setAddOpen(false)}/>}

    </div>
  );
}
