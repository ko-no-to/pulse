"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPRING = { type: "spring" as const, stiffness: 280, damping: 22 };

type Customer = {
  id: string;
  initials: string;
  value: string;
  days: number;
  cycle: string;
  time: string;
  isNew?: boolean;
};

const CYCLES = ["Skincare — broad", "Wellness — lookalike", "Gifting — retrigger"];

const SEED: Customer[] = [
  { id: "#4821", initials: "48", value: "€84",  days: 18, cycle: CYCLES[0], time: "Today, 14:32" },
  { id: "#4820", initials: "48", value: "€145", days: 22, cycle: CYCLES[1], time: "Today, 11:47" },
  { id: "#4819", initials: "48", value: "€67",  days: 14, cycle: CYCLES[0], time: "Today, 09:15" },
  { id: "#4818", initials: "48", value: "€164", days: 31, cycle: CYCLES[2], time: "Yesterday, 21:04" },
  { id: "#4817", initials: "48", value: "€52",  days: 9,  cycle: CYCLES[0], time: "Yesterday, 16:22" },
  { id: "#4816", initials: "48", value: "€88",  days: 34, cycle: CYCLES[1], time: "Yesterday, 13:55" },
  { id: "#4815", initials: "48", value: "€73",  days: 19, cycle: CYCLES[0], time: "Jan 14, 10:31" },
  { id: "#4814", initials: "48", value: "€120", days: 26, cycle: CYCLES[2], time: "Jan 14, 08:44" },
  { id: "#4813", initials: "48", value: "€62",  days: 12, cycle: CYCLES[1], time: "Jan 13, 19:17" },
  { id: "#4812", initials: "48", value: "€156", days: 28, cycle: CYCLES[0], time: "Jan 13, 15:02" },
  { id: "#4811", initials: "48", value: "€79",  days: 21, cycle: CYCLES[2], time: "Jan 13, 11:38" },
  { id: "#4810", initials: "48", value: "€134", days: 33, cycle: CYCLES[1], time: "Jan 12, 22:09" },
];

let nextId = 4822;
function gen(): Customer {
  const vals = [52, 62, 67, 73, 79, 84, 88, 120, 134, 145, 156, 164];
  const days = [8, 9, 11, 14, 16, 18, 20, 22, 25, 28, 31, 34];
  const now = new Date();
  const id = nextId++;
  return {
    id: `#${id}`,
    initials: String(id).slice(0, 2),
    value: `€${vals[Math.floor(Math.random() * vals.length)]}`,
    days: days[Math.floor(Math.random() * days.length)],
    cycle: CYCLES[Math.floor(Math.random() * CYCLES.length)],
    time: `Today, ${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`,
    isNew: true,
  };
}

const PERIODS = ["This month", "Last 30 days", "Last 90 days"];

function CustomerCard({ c }: { c: Customer }) {
  return (
    <div className="card-lift" style={{
      background: "#FFFFFF",
      border: "1px solid #E8E8E2",
      borderLeft: c.isNew ? "3px solid #1A7A4A" : "1px solid #E8E8E2",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      transition: "border-left-color 0.8s ease, box-shadow 0.2s ease",
      position: "relative",
    }}>
      {/* New dot */}
      {c.isNew && (
        <span className="pulse-dot" style={{ position: "absolute", top: 14, right: 14, width: 7, height: 7, borderRadius: "50%", background: "#1A7A4A", display: "inline-block" }}/>
      )}
      {/* Row 1 */}
      <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1A7A4A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, color: "#FFFFFF", flexShrink: 0 }}>
          {c.initials}
        </div>
        <div style={{ flex: 1, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "#1A1A18" }}>{c.id}</div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 600, color: "#1A1A18" }}>{c.value}</div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#9B9B96" }}>{c.time}</div>
        </div>
      </div>
      <div style={{ height: 1, background: "#E8E8E2" }}/>
      {/* Row 2 */}
      <div style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, color: "#156639", background: "#EBF7F0", padding: "2px 8px", borderRadius: 4 }}>First purchase</span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#6B6B66", background: "#F7F6F1", border: "1px solid #E8E8E2", padding: "2px 8px", borderRadius: 4 }}>{c.cycle}</span>
        <span style={{ flex: 1 }}/>
        <a href="#" style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: "#A33508", textDecoration: "none" }}>Verify in Shopify →</a>
      </div>
      {/* Row 3 */}
      <div style={{ padding: "0 20px 12px", fontFamily: "var(--font-ui)", fontSize: 13, color: "#6B6B66" }}>
        {c.days} days from first Pulse touch to purchase
      </div>
    </div>
  );
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(SEED);
  const [count, setCount] = useState(47);
  const [period, setPeriod] = useState("This month");

  // Clear isNew after 4s
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

  // Live arrivals
  useEffect(() => {
    function schedule(): ReturnType<typeof setTimeout> {
      return setTimeout(() => {
        setCustomers((prev) => [gen(), ...prev]);
        setCount((n) => n + 1);
        schedule();
      }, 60000 + Math.random() * 30000);
    }
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ padding: "28px", background: "var(--bg)", minHeight: "100%" }}>

      {/* Counter */}
      <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 12, padding: "24px 28px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600, color: "#1A1A18", letterSpacing: "-0.02em", marginBottom: 4 }}>
            {count} new customers this month
          </div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "#6B6B66" }}>
            Each verified against your Shopify first-purchase data
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {PERIODS.map((p) => (
            <button key={p} onClick={() => setPeriod(p)} style={{ background: period === p ? "#FDF0EB" : "#FFFFFF", border: `1px solid ${period === p ? "#C8440F" : "#D4D4CC"}`, color: period === p ? "#A33508" : "#6B6B66", fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: period === p ? 500 : 400, padding: "7px 14px", borderRadius: 8, cursor: "pointer" }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Label */}
      <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B6B66", marginBottom: 10 }}>
        Live customer feed
      </div>

      {/* Feed */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <AnimatePresence initial={false}>
          {customers.map((c) => (
            <motion.div key={c.id} layout initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={SPRING}>
              <CustomerCard c={c}/>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom note */}
      <div style={{ marginTop: 20, padding: "14px 18px", background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 12, fontFamily: "var(--font-ui)", fontSize: 13, color: "#9B9B96", lineHeight: 1.7 }}>
        Pulse uses server-side first-purchase tracking. Every customer here placed their first order within 60 days of a Pulse ad touch. Verify any entry by clicking{" "}
        <span style={{ color: "#6B6B66" }}>'Verify in Shopify'</span>. Already using Littledata or Elevar? Pulse connects in one click.
      </div>
    </div>
  );
}
