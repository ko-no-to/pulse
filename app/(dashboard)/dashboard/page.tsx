"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SixMonthChart from "./SixMonthChart";

/* ── shared stage config ── */
const STAGE_STYLES: Record<string, { color: string; bg: string }> = {
  QUALIFY: { color: "#1D5FA8", bg: "#EEF4FD" },
  PULSE:   { color: "#A33508", bg: "#FDF0EB" },
  LOOP:    { color: "#B45309", bg: "#FEF3E2" },
  CONVERT: { color: "#9B9B96", bg: "#F7F6F1" },
};

const cycles = [
  { name: "Skincare — broad", stage: "PULSE",   progress: 62, stat: "842 in window" },
  { name: "Wellness — lookalike", stage: "LOOP", progress: 41, stat: "394 delivered" },
  { name: "Gifting — retrigger", stage: "QUALIFY", progress: 18, stat: "2,847 qualified" },
];

const recentCustomers = [
  { id: "#4821", initials: "48", value: "€84",  days: 18, cycle: "Skincare — broad",    time: "Today, 14:32" },
  { id: "#4820", initials: "48", value: "€112", days: 22, cycle: "Wellness — lookalike", time: "Today, 11:47" },
  { id: "#4819", initials: "48", value: "€67",  days: 14, cycle: "Skincare — broad",    time: "Today, 09:15" },
];

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

/* ── inline sparkline (dashboard hero) ── */
function HeroSparkline() {
  const data = [12, 18, 22, 28, 38, 47];
  const max = Math.max(...data);
  const W = 200, H = 80;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - (v / max) * H * 0.9 - 4}`).join(" ");
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="hsg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8440F" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#C8440F" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polyline fill="none" stroke="#C8440F" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={pts}/>
      <polygon fill="url(#hsg)" points={`0,${H} ${pts} ${W},${H}`}/>
    </svg>
  );
}

/* ── StatusBar ── */
function StatusBar() {
  return (
    <div style={{ background: "#FDF0EB", borderLeft: "3px solid #C8440F", borderRadius: "0 8px 8px 0", padding: "12px 20px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1A7A4A", display: "inline-block", flexShrink: 0 }}/>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500, color: "#1A1A18" }}>Pulse is running</span>
      </div>
      <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#6B6B66" }}>
        3 campaigns active · 1,240 people in cycles · Last updated 2 min ago
      </span>
    </div>
  );
}

export default function DashboardPage() {
  const customers = useCountUp(47, 800);
  const cac       = useCountUp(31, 600, 100);
  const fee       = useCountUp(722, 700, 200);

  return (
    <div style={{ padding: "28px", background: "#F0EFE9", minHeight: "100%" }}>
      <StatusBar />

      {/* ── ASYMMETRIC HERO ── */}
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>

        {/* Primary card ~55% */}
        <div style={{ flex: "0 0 55%", background: "#FFFFFF", border: "1px solid #E8E8E2", borderLeft: "3px solid #C8440F", borderRadius: 12, padding: "28px 32px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B6B66", marginBottom: 12 }}>
            New customers this month
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 72, fontWeight: 600, color: "#C8440F", lineHeight: 1, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
                {customers}
              </div>
              <div style={{ marginTop: 12 }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: "#156639", background: "#EBF7F0", padding: "3px 10px", borderRadius: 6 }}>
                  ↑ 31% vs last month
                </span>
              </div>
            </div>
            <div style={{ flexShrink: 0 }}>
              <HeroSparkline />
            </div>
          </div>
        </div>

        {/* Secondary stack ~45% */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 12, padding: "20px 24px", flex: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B6B66", marginBottom: 8 }}>
              Cost per new customer
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "#1A1A18", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
              €{cac}
            </div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#6B6B66", marginTop: 6 }}>
              Your Meta CAC before Pulse: €91
            </div>
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 12, padding: "20px 24px", flex: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B6B66", marginBottom: 8 }}>
              Pulse fee this month
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "#1A1A18", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
              €{fee}
            </div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#6B6B66", marginTop: 6 }}>
              Base €299 + €423 performance
            </div>
          </div>
        </div>
      </div>

      {/* ── INSIGHT BANNER ── */}
      <div style={{ background: "#EBF7F0", borderLeft: "3px solid #1A7A4A", borderRadius: "0 8px 8px 0", padding: "12px 20px", marginBottom: 24, fontFamily: "var(--font-ui)", fontSize: 14, color: "#156639", lineHeight: 1.6 }}>
        ↑ Your new customer rate has grown 31% since Pulse launched. At this pace you&apos;ll acquire 180+ new customers this quarter.
      </div>

      {/* ── TWO COLUMN ── */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>

        {/* Left 2/3 — 6-month chart */}
        <div style={{ flex: 2, background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 12, padding: "24px 28px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B6B66", marginBottom: 20 }}>
            New customers — last 6 months
          </div>
          <SixMonthChart />
          <div style={{ marginTop: 14, fontFamily: "var(--font-ui)", fontSize: 12, color: "#9B9B96", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#C8440F" }}/>
            New customers via Pulse (Shopify verified)
          </div>
        </div>

        {/* Right 1/3 — Engine summary */}
        <div style={{ flex: 1, background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 12, padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "#1A1A18" }}>Engine</div>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: "#156639", background: "#EBF7F0", padding: "2px 8px", borderRadius: 6, display: "flex", alignItems: "center", gap: 5 }}>
              <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#1A7A4A", display: "inline-block" }}/>
              Running
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {cycles.map((c) => {
              const s = STAGE_STYLES[c.stage];
              return (
                <div key={c.name}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6, gap: 6 }}>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: "#1A1A18", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500, color: s.color, background: s.bg, padding: "2px 7px", borderRadius: 4, flexShrink: 0 }}>{c.stage}</span>
                  </div>
                  <div style={{ height: 4, background: "#E8E8E2", borderRadius: 2, overflow: "hidden", marginBottom: 4 }}>
                    <div style={{ height: "100%", width: `${c.progress}%`, background: "#C8440F", borderRadius: 2 }}/>
                  </div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#9B9B96" }}>{c.stat}</div>
                </div>
              );
            })}
          </div>

          <Link href="/engine" style={{ display: "block", marginTop: 18, fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: "#A33508", textDecoration: "none" }}>
            View engine →
          </Link>
        </div>
      </div>

      {/* ── RECENT CUSTOMERS ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B6B66" }}>Recent new customers</div>
        <Link href="/customers" style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: "#A33508", textDecoration: "none" }}>View all 47 →</Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {recentCustomers.map((c) => (
          <div key={c.id} className="card-lift" style={{ background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            {/* Row 1 */}
            <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1A7A4A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, color: "#FFFFFF", flexShrink: 0 }}>
                {c.initials}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "#1A1A18" }}>{c.id}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 600, color: "#1A1A18" }}>{c.value}</div>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#9B9B96" }}>{c.time}</div>
              </div>
            </div>
            {/* Divider */}
            <div style={{ height: 1, background: "#E8E8E2" }}/>
            {/* Row 2 */}
            <div style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: "#156639", background: "#EBF7F0", padding: "2px 8px", borderRadius: 4 }}>First purchase</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#6B6B66", background: "#F7F6F1", border: "1px solid #E8E8E2", padding: "2px 8px", borderRadius: 4 }}>{c.cycle}</span>
              <span style={{ flex: 1 }}/>
              <a href="#" style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: "#A33508", textDecoration: "none" }}>Verify in Shopify →</a>
            </div>
            {/* Row 3 */}
            <div style={{ padding: "0 20px 12px", fontFamily: "var(--font-ui)", fontSize: 13, color: "#6B6B66" }}>
              {c.days} days from first Pulse touch
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
