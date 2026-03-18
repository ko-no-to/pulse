"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── design tokens (inlined for fast access) ── */
const T = {
  ink: "#1A1A18",
  muted: "#6B6B66",
  subtle: "#9B9B96",
  surface: "#FFFFFF",
  surface2: "#F7F7F5",
  surface3: "#EFEFEC",
  border: "#E5E5E0",
  borderStrong: "#CECEC7",
  accent: "#C8440F",
  accentLight: "#FDF0EB",
  accentText: "#A33508",
  green: "#1A7A4A",
  greenLight: "#EBF7F0",
  greenText: "#156639",
  amber: "#B45309",
  amberLight: "#FEF3E2",
  blue: "#1D5FA8",
  blueLight: "#EEF4FD",
};

/* ── stage colour map ── */
const STAGE_STYLES: Record<string, { color: string; bg: string }> = {
  QUALIFY: { color: T.blue,    bg: T.blueLight },
  PULSE:   { color: T.accentText, bg: T.accentLight },
  LOOP:    { color: T.amber,   bg: T.amberLight },
  CONVERT: { color: T.subtle,  bg: T.surface3 },
};

/* ── count-up hook ── */
function useCountUp(target: number, duration: number, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(ease * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, duration, delay]);
  return value;
}

/* ── SVG brand icons ── */
function MetaIcon({ size = 20 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.25, background: "#1877F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 11 11" fill="none">
        <path d="M6.2 10V6.1H7.6L7.8 4.4H6.2V3.3C6.2 2.8 6.4 2.5 7.1 2.5H7.9V1C7.7 1 7.2 0.9 6.6 0.9C5.3 0.9 4.4 1.7 4.4 3.1V4.4H3V6.1H4.4V10H6.2Z" fill="white"/>
      </svg>
    </div>
  );
}

function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.25, background: "#000000", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 20 20" fill="none">
        <path d="M16.5 4.5C15.5 4.5 14.5 4 14 3H11V13.5C11 14.6 10.1 15.5 9 15.5C7.9 15.5 7 14.6 7 13.5C7 12.4 7.9 11.5 9 11.5C9.3 11.5 9.6 11.6 9.8 11.7V8.6C9.5 8.5 9.3 8.5 9 8.5C6.2 8.5 4 10.7 4 13.5C4 16.3 6.2 18.5 9 18.5C11.8 18.5 14 16.3 14 13.5V8.8C15.1 9.5 16.3 9.9 17.5 9.9V7C17 7 16.7 6.9 16.5 6.7V4.5Z" fill="white"/>
      </svg>
    </div>
  );
}

/* ── hero sparkline ── */
function HeroSparkline() {
  const data = [12, 18, 22, 28, 38, 47];
  const max = Math.max(...data);
  const W = 160, H = 56;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - (v / max) * H * 0.9 - 2}`).join(" ");
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="hsg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.accent} stopOpacity="0.15"/>
          <stop offset="100%" stopColor={T.accent} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={T.accent} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={pts}/>
      <polygon fill="url(#hsg)" points={`0,${H} ${pts} ${W},${H}`}/>
    </svg>
  );
}

/* ── campaign data ── */
const CAMPAIGNS = [
  {
    name: "Skincare — broad interest",
    stage: "PULSE" as const,
    started: "12 Jan 2026",
    progress: 62,
    stats: [
      { label: "Qualified", val: "2,847" },
      { label: "In window", val: "842" },
      { label: "Completed", val: "394" },
      { label: "Delivered", val: "18" },
    ],
    metrics: [
      { label: "Frequency", val: "6.2×" },
      { label: "Reach", val: "842" },
    ],
    creatives: [T.accent, T.amber, T.blue],
    metaCampaigns: [
      { name: "Skincare Interest Burst — Jan 2026", id: "Meta · #8471923" },
      { name: "Skincare Retrigger — Warm Audience", id: "Meta · #8471956" },
    ],
  },
  {
    name: "Wellness — lookalike 5%",
    stage: "LOOP" as const,
    started: "28 Dec 2025",
    progress: 41,
    stats: [
      { label: "Qualified", val: "1,920" },
      { label: "In window", val: "504" },
      { label: "Completed", val: "218" },
      { label: "Delivered", val: "11" },
    ],
    metrics: [
      { label: "Re-entries", val: "124" },
      { label: "Avg days", val: "8.3" },
    ],
    creatives: [T.green, T.accent, T.amber],
    metaCampaigns: [
      { name: "Wellness Loop Re-entry — Dec 2025", id: "Meta · #8472104" },
    ],
  },
  {
    name: "Gifting — retrigger",
    stage: "QUALIFY" as const,
    started: "3 Jan 2026",
    progress: 18,
    stats: [
      { label: "Qualified", val: "890" },
      { label: "In window", val: "0" },
      { label: "Completed", val: "0" },
      { label: "Delivered", val: "0" },
    ],
    metrics: [
      { label: "Reach", val: "2,847" },
      { label: "CPM", val: "€4.12" },
    ],
    creatives: [T.blue, T.green, T.accent],
    metaCampaigns: [
      { name: "Gifting Broad Interest — Jan 2026", id: "Meta · #8472231" },
    ],
  },
];

const CONVERT_CAMPAIGNS = [
  { name: "Dynamic Product Ads — All Visitors", id: "Meta · #7823401" },
  { name: "Retargeting — Cart Abandonment", id: "Meta · #7823445" },
];

const LOG = [
  { icon: "↻", text: "Creative rotated · Skincare", date: "8 Jan",  color: T.amber },
  { icon: "↻", text: "Audience expanded · Wellness", date: "5 Jan", color: T.amber },
  { icon: "↗", text: "New cycle · Gifting retrigger", date: "3 Jan", color: T.green },
  { icon: "↻", text: "Creative rotated · Skincare", date: "29 Dec", color: T.amber },
  { icon: "↗", text: "Budget rebalanced · 3 campaigns", date: "22 Dec", color: T.green },
];

/* ── customer data ── */
const SPRING_ANIM = { type: "spring" as const, stiffness: 280, damping: 22 };

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
  { id: "#4811", initials: "OL", value: "€79",  days: 21, cycle: CYCLES[2], time: "Jan 13, 11:38" },
  { id: "#4810", initials: "RD", value: "€134", days: 33, cycle: CYCLES[1], time: "Jan 12, 22:09" },
];

let nextId = 4822;
function genCustomer(): Customer {
  const vals = [52, 62, 67, 73, 79, 84, 88, 120, 134, 145, 156, 164];
  const days = [8, 9, 11, 14, 16, 18, 20, 22, 25, 28, 31, 34];
  const initPairs = ["AK","BM","CL","DT","EP","FG","HJ","IN","KO","LR","MS","NW"];
  const now = new Date();
  const id = nextId++;
  return {
    id: `#${id}`,
    initials: initPairs[Math.floor(Math.random() * initPairs.length)],
    value: `€${vals[Math.floor(Math.random() * vals.length)]}`,
    days: days[Math.floor(Math.random() * days.length)],
    cycle: CYCLES[Math.floor(Math.random() * CYCLES.length)],
    time: `Today, ${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`,
    isNew: true,
  };
}

const PERIODS = ["This month", "Last 3M", "All time"];

/* ── campaign card component ── */
function CampaignCard({ c }: { c: typeof CAMPAIGNS[number] }) {
  const s = STAGE_STYLES[c.stage];
  return (
    <div style={{
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 12,
      padding: "20px",
      width: 320,
      flexShrink: 0,
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14, gap: 8 }}>
        <div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: T.ink, marginBottom: 4 }}>{c.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, color: s.color, background: s.bg, padding: "2px 8px", borderRadius: 4 }}>{c.stage}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500, color: T.greenText }}>
              <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: T.green, display: "inline-block" }}/>
              Running
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: T.surface3, borderRadius: 2, overflow: "hidden", marginBottom: 12 }}>
        <div style={{ height: "100%", width: `${c.progress}%`, background: T.accent, borderRadius: 2 }}/>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        {c.stats.map((st) => (
          <div key={st.label} style={{ background: T.surface2, borderRadius: 8, padding: "10px 12px" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: T.subtle, marginBottom: 3 }}>{st.label}</div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 17, fontWeight: 600, color: T.ink, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{st.val}</div>
          </div>
        ))}
      </div>

      {/* Inline metric chips */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {c.metrics.map((m) => (
          <span key={m.label} style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: T.muted, background: T.surface3, border: `1px solid ${T.border}`, borderRadius: 20, padding: "3px 10px" }}>
            {m.label}: <strong style={{ color: T.ink, fontWeight: 600 }}>{m.val}</strong>
          </span>
        ))}
      </div>

      {/* Meta campaigns */}
      <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: T.subtle, marginBottom: 8 }}>Running now</div>
        {c.metaCampaigns.map((mc) => (
          <div key={mc.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <MetaIcon size={18}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: T.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{mc.name}</div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: T.subtle }}>{mc.id}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── customer card component ── */
function CustomerCard({ c }: { c: Customer }) {
  return (
    <div className="card-lift" style={{
      background: T.surface,
      border: `1px solid ${c.isNew ? T.accent : T.border}`,
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      transition: "border-color 1s ease, box-shadow 0.2s ease",
      position: "relative",
    }}>
      {c.isNew && (
        <span className="pulse-dot" style={{ position: "absolute", top: 14, right: 14, width: 7, height: 7, borderRadius: "50%", background: T.accent, display: "inline-block" }}/>
      )}
      <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, color: "#FFFFFF", flexShrink: 0 }}>
          {c.initials}
        </div>
        <div style={{ flex: 1, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: T.ink }}>{c.id}</div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 600, color: T.ink }}>{c.value}</div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: T.subtle }}>{c.time}</div>
        </div>
      </div>
      <div style={{ height: 1, background: T.border }}/>
      <div style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: T.greenText, background: T.greenLight, padding: "2px 8px", borderRadius: 4 }}>First purchase</span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: T.muted, background: T.surface2, border: `1px solid ${T.border}`, padding: "2px 8px", borderRadius: 4 }}>{c.cycle}</span>
        <span style={{ flex: 1 }}/>
        <a href="#" style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: T.accentText, textDecoration: "none" }}>Verify in Shopify →</a>
      </div>
      <div style={{ padding: "0 20px 12px", fontFamily: "var(--font-ui)", fontSize: 13, color: T.muted }}>
        {c.days} days from first Pulse touch to purchase
      </div>
    </div>
  );
}

/* ── main page ── */
export default function DashboardPage() {
  const [period, setPeriod] = useState("This month");
  const [customers, setCustomers] = useState<Customer[]>(SEED);
  const [count, setCount] = useState(47);

  const newCustomers = useCountUp(47, 800);
  const cac          = useCountUp(31, 600, 100);
  const fee          = useCountUp(722, 700, 200);

  // clear isNew after 4s
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

  // live arrivals ~60–90s
  useEffect(() => {
    function schedule(): ReturnType<typeof setTimeout> {
      return setTimeout(() => {
        setCustomers((prev) => [genCustomer(), ...prev]);
        setCount((n) => n + 1);
        schedule();
      }, 60000 + Math.random() * 30000);
    }
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100%" }}>

      {/* ── TOPBAR ── */}
      <div style={{
        height: 60,
        borderBottom: `1px solid ${T.border}`,
        display: "flex", alignItems: "center",
        padding: "0 28px",
        background: T.surface,
        position: "sticky", top: 0, zIndex: 10,
        gap: 12,
      }}>
        <div>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 16, fontWeight: 600, color: T.ink }}>Dashboard</span>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: T.subtle, marginLeft: 10 }}>Noïse Botanics · Last updated 2 min ago</span>
        </div>
        <div style={{ flex: 1 }}/>
        <div style={{ display: "flex", gap: 4 }}>
          {PERIODS.map((p) => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              background: period === p ? T.accentLight : "transparent",
              border: `1px solid ${period === p ? T.accent : T.border}`,
              color: period === p ? T.accentText : T.muted,
              fontFamily: "var(--font-ui)", fontSize: 12,
              fontWeight: period === p ? 500 : 400,
              padding: "5px 12px", borderRadius: 6, cursor: "pointer",
            }}>{p}</button>
          ))}
        </div>
        <button style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.ink, fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, padding: "5px 14px", borderRadius: 6, cursor: "pointer" }}>
          Export ↓
        </button>
      </div>

      <div style={{ padding: "24px 28px" }}>

        {/* ── HERO METRICS ROW ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
          {/* New customers */}
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.accent}`, borderRadius: 12, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: T.subtle, marginBottom: 10 }}>New customers</div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 600, color: T.accent, lineHeight: 1, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
                  {newCustomers}
                </div>
                <div style={{ marginTop: 10 }}>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: T.greenText, background: T.greenLight, padding: "3px 10px", borderRadius: 6 }}>
                    ↑ 31% vs last month
                  </span>
                </div>
              </div>
              <div style={{ flexShrink: 0, marginBottom: 4 }}><HeroSparkline/></div>
            </div>
          </div>

          {/* CAC */}
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: T.subtle, marginBottom: 10 }}>Cost per new customer</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, color: T.ink, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>€{cac}</div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: T.muted, marginTop: 8 }}>Your Meta CAC before Pulse: €91</div>
          </div>

          {/* Fee */}
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: T.subtle, marginBottom: 10 }}>Pulse fee this month</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, color: T.ink, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>€{fee}</div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: T.muted, marginTop: 8 }}>Base €299 + €423 performance</div>
          </div>
        </div>

        {/* ── ENGINE SECTION ── */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: T.ink }}>New customer engine</div>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: T.greenText, background: T.greenLight, padding: "3px 10px", borderRadius: 6 }}>
              <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: T.green, display: "inline-block" }}/>
              3 campaigns running
            </span>
          </div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: T.muted, marginBottom: 20 }}>
            Meta Ads · 1,240 people in cycles · Running in the background. Nothing to manage.
          </div>
        </div>

        {/* Campaign cards — horizontal scroll */}
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 4, marginBottom: 20 }}>
          {CAMPAIGNS.map((c) => <CampaignCard key={c.name} c={c}/>)}

          {/* CONVERT card */}
          <div style={{
            background: T.surface2,
            border: `1px dashed ${T.borderStrong}`,
            borderRadius: 12,
            padding: "20px",
            width: 300,
            flexShrink: 0,
          }}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: T.muted, marginBottom: 4 }}>Convert stage</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500, color: T.subtle, background: T.surface3, border: `1px solid ${T.border}`, padding: "2px 8px", borderRadius: 4 }}>CONVERT</span>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontStyle: "italic", color: T.subtle }}>Your campaigns</span>
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontStyle: "italic", color: T.subtle, marginBottom: 14, lineHeight: 1.55 }}>
              Pulse doesn&apos;t run these. We feed warmer audiences into your existing conversion campaigns.
            </div>
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
              {CONVERT_CAMPAIGNS.map((cc) => (
                <div key={cc.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <MetaIcon size={18}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: T.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cc.name}</div>
                    <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: T.subtle }}>{cc.id}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Automated actions — horizontal pill row */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: T.subtle, marginBottom: 10 }}>
            Handled automatically this month
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
            {LOG.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: "5px 14px" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: item.color }}>{item.icon}</span>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: T.muted }}>{item.text}</span>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: T.subtle, marginLeft: 4 }}>{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ad network expansion */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 600, color: T.ink, marginBottom: 4 }}>Your new customer engine</div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: T.muted, marginBottom: 16, lineHeight: 1.6 }}>
            Add more ad networks to reach new customers across more channels. Same engine logic. Same Shopify verification.
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 36 }}>
          {/* Meta */}
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "18px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <MetaIcon size={28}/>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: T.ink }}>Meta Ads</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: T.greenText, background: T.greenLight, padding: "2px 8px", borderRadius: 4, marginLeft: "auto" }}>Connected</span>
            </div>
            <div style={{ height: 1, background: T.border, margin: "0 -20px 14px" }}/>
            <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
              {["3 campaigns", "1,240 in cycles", "47 delivered"].map((label) => (
                <div key={label} style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: T.muted }}>{label}</div>
              ))}
            </div>
            <a href="#" style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: T.accentText, textDecoration: "none" }}>Manage →</a>
          </div>

          {/* Google */}
          <div style={{ background: T.surface2, border: `1px dashed ${T.borderStrong}`, borderRadius: 12, padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <GoogleIcon size={28}/>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: T.subtle }}>Google Ads</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: T.subtle, background: T.surface3, padding: "2px 8px", borderRadius: 4, marginLeft: "auto" }}>Phase 2</span>
            </div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: T.subtle, lineHeight: 1.55, marginBottom: 14 }}>
              Reach buyers actively searching your category. Same engine logic, different audience pool.
            </div>
            <a href="#" style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: T.accentText, textDecoration: "none" }}>Join waitlist →</a>
          </div>

          {/* TikTok */}
          <div style={{ background: T.surface2, border: `1px dashed ${T.borderStrong}`, borderRadius: 12, padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <TikTokIcon size={28}/>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: T.subtle }}>TikTok Ads</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: T.subtle, background: T.surface3, padding: "2px 8px", borderRadius: 4, marginLeft: "auto" }}>Phase 3</span>
            </div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: T.subtle, lineHeight: 1.55, marginBottom: 14 }}>
              Reach new audiences through video-first discovery. Best for visual products with repeat purchase potential.
            </div>
            <a href="#" style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: T.accentText, textDecoration: "none" }}>Join waitlist →</a>
          </div>
        </div>

        {/* ── FULL-WIDTH DIVIDER ── */}
        <div style={{ height: 1, background: T.border, margin: "0 -28px 32px", width: "calc(100% + 56px)" }}/>

        {/* ── CUSTOMERS SECTION ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: T.ink, display: "inline" }}>New customers</div>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: T.accentText, background: T.accentLight, padding: "2px 8px", borderRadius: 4, marginLeft: 10 }}>{count}</span>
          </div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: T.muted }}>
            Each verified against Shopify first-purchase data
          </div>
        </div>

        {/* Live feed */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <AnimatePresence initial={false}>
            {customers.map((c) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={SPRING_ANIM}
              >
                <CustomerCard c={c}/>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <div style={{ marginTop: 20, padding: "14px 18px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, fontFamily: "var(--font-ui)", fontSize: 13, color: T.subtle, lineHeight: 1.7 }}>
          Pulse uses server-side first-purchase tracking. Every customer here placed their first order within 60 days of a Pulse ad touch. Verify any entry by clicking &lsquo;Verify in Shopify&rsquo;. Already using Littledata or Elevar? Pulse connects in one click.
        </div>

      </div>
    </div>
  );
}
