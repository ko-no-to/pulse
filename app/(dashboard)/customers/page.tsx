"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Customer = {
  id: string;
  value: string;
  days: number;
  cycle: string;
  time: string;
  isNew?: boolean;
};

const CYCLES = [
  "Skincare — broad interest",
  "Wellness — lookalike 5%",
  "Gifting — retrigger",
];

const SEED_CUSTOMERS: Customer[] = [
  { id: "#4821", value: "€84",  days: 18, cycle: CYCLES[0], time: "Today, 14:32" },
  { id: "#4820", value: "€112", days: 22, cycle: CYCLES[1], time: "Today, 11:47" },
  { id: "#4819", value: "€67",  days: 14, cycle: CYCLES[0], time: "Today, 09:15" },
  { id: "#4818", value: "€93",  days: 31, cycle: CYCLES[2], time: "Yesterday, 21:04" },
  { id: "#4817", value: "€58",  days: 9,  cycle: CYCLES[0], time: "Yesterday, 16:22" },
  { id: "#4816", value: "€145", days: 44, cycle: CYCLES[1], time: "Yesterday, 13:55" },
  { id: "#4815", value: "€72",  days: 19, cycle: CYCLES[0], time: "Jan 14, 10:31" },
  { id: "#4814", value: "€88",  days: 26, cycle: CYCLES[2], time: "Jan 14, 08:44" },
  { id: "#4813", value: "€61",  days: 12, cycle: CYCLES[1], time: "Jan 13, 19:17" },
  { id: "#4812", value: "€103", days: 37, cycle: CYCLES[0], time: "Jan 13, 15:02" },
  { id: "#4811", value: "€79",  days: 21, cycle: CYCLES[2], time: "Jan 13, 11:38" },
  { id: "#4810", value: "€134", days: 53, cycle: CYCLES[1], time: "Jan 12, 22:09" },
];

let nextId = 4822;
function generateCustomer(): Customer {
  const values = [58, 67, 72, 79, 84, 88, 93, 103, 112, 120, 134, 145];
  const dayRanges = [7, 9, 11, 14, 16, 18, 20, 22, 25, 28, 31, 37, 44];
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  return {
    id: `#${nextId++}`,
    value: `€${values[Math.floor(Math.random() * values.length)]}`,
    days: dayRanges[Math.floor(Math.random() * dayRanges.length)],
    cycle: CYCLES[Math.floor(Math.random() * CYCLES.length)],
    time: `Today, ${h}:${m}`,
    isNew: true,
  };
}

const PERIODS = ["This month", "Last 30 days", "Last 90 days"];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(SEED_CUSTOMERS);
  const [count, setCount] = useState(47);
  const [period, setPeriod] = useState("This month");

  // Clear isNew glow after 3s
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    customers.forEach((c) => {
      if (c.isNew) {
        const t = setTimeout(() => {
          setCustomers((prev) =>
            prev.map((p) => (p.id === c.id ? { ...p, isNew: false } : p))
          );
        }, 3000);
        timers.push(t);
      }
    });
    return () => timers.forEach(clearTimeout);
  }, [customers]);

  // Simulate live arrivals every 60–90s
  useEffect(() => {
    function schedule(): ReturnType<typeof setTimeout> {
      const delay = 60000 + Math.random() * 30000;
      return setTimeout(() => {
        setCustomers((prev) => [generateCustomer(), ...prev]);
        setCount((c) => c + 1);
        schedule();
      }, delay);
    }
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ padding: "28px 32px", maxWidth: "820px" }}>

      {/* Counter card */}
      <div
        style={{
          background: "#1a1917",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "8px",
          padding: "24px 28px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#c8440f",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              marginBottom: "6px",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {count}
          </div>
          <div style={{ fontSize: "13px", color: "#f0ede8", fontWeight: 500 }}>
            new customers this month
          </div>
          <div style={{ fontSize: "12px", color: "#7a7570", marginTop: "4px" }}>
            Each verified against your Shopify first-purchase data · 60-day attribution window
          </div>
        </div>

        {/* Period selector */}
        <div style={{ display: "flex", gap: "6px" }}>
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                background: period === p ? "rgba(200,68,15,0.1)" : "transparent",
                border: `1px solid ${period === p ? "rgba(200,68,15,0.4)" : "rgba(255,255,255,0.1)"}`,
                color: period === p ? "#c8440f" : "#7a7570",
                fontSize: "12px",
                fontWeight: period === p ? 600 : 400,
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Feed label */}
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#7a7570",
          marginBottom: "10px",
        }}
      >
        Live customer feed
      </div>

      {/* Customer cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <AnimatePresence initial={false}>
          {customers.map((c) => (
            <motion.div
              key={c.id}
              layout
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                background: "#1a1917",
                border: `1px solid ${c.isNew ? "rgba(42,157,110,0.4)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: "8px",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                boxShadow: c.isNew ? "0 0 20px rgba(42,157,110,0.12)" : "none",
                transition: "border-color 0.6s ease, box-shadow 0.6s ease",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(42,157,110,0.12)",
                  border: "1px solid rgba(42,157,110,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <rect x="2" y="2" width="11" height="11" rx="2.5" stroke="#2a9d6e" strokeWidth="1.4" />
                  <path d="M5 7.5L6.5 9L10 6" stroke="#2a9d6e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#f0ede8" }}>
                    {c.id}
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      color: "#2a9d6e",
                      background: "rgba(42,157,110,0.1)",
                      border: "1px solid rgba(42,157,110,0.2)",
                      padding: "2px 6px",
                      borderRadius: "3px",
                    }}
                  >
                    FIRST PURCHASE
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#f0ede8" }}>
                    {c.value}
                  </span>
                </div>
                <div style={{ fontSize: "12px", color: "#7a7570" }}>
                  {c.days} days from first Pulse touch to purchase
                </div>
                <div style={{ marginTop: "4px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#4a4744",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      padding: "2px 7px",
                      borderRadius: "3px",
                    }}
                  >
                    {c.cycle}
                  </span>
                </div>
              </div>

              {/* Right side */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: "12px", color: "#4a4744", marginBottom: "5px" }}>
                  {c.time}
                </div>
                <a href="#" style={{ fontSize: "12px", color: "#c8440f", textDecoration: "none" }}>
                  Verify in Shopify →
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom note */}
      <div
        style={{
          marginTop: "20px",
          padding: "14px 18px",
          background: "#1a1917",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "8px",
          fontSize: "12px",
          color: "#4a4744",
          lineHeight: "1.7",
        }}
      >
        Pulse uses server-side first-purchase tracking. Every customer shown here placed their
        first ever order with your store within 60 days of a Pulse ad touch. You can verify any
        entry by clicking{" "}
        <span style={{ color: "#7a7570" }}>'Verify in Shopify'</span> on the card. Already
        using Littledata or Elevar? Pulse connects in one click.
      </div>
    </div>
  );
}
