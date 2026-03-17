"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Customer {
  id: string;
  customerId: number;
  orderValue: number;
  daysFromTouch: number;
  timestamp: string;
  isNew?: boolean;
}

const SEED_CUSTOMERS: Customer[] = [
  { id: "c1", customerId: 4821, orderValue: 84, daysFromTouch: 18, timestamp: "Today, 14:32" },
  { id: "c2", customerId: 4820, orderValue: 136, daysFromTouch: 24, timestamp: "Today, 11:47" },
  { id: "c3", customerId: 4819, orderValue: 62, daysFromTouch: 9, timestamp: "Today, 09:15" },
  { id: "c4", customerId: 4818, orderValue: 97, daysFromTouch: 31, timestamp: "Yesterday, 18:44" },
  { id: "c5", customerId: 4817, orderValue: 155, daysFromTouch: 14, timestamp: "Yesterday, 15:22" },
  { id: "c6", customerId: 4816, orderValue: 48, daysFromTouch: 8, timestamp: "Yesterday, 12:03" },
  { id: "c7", customerId: 4815, orderValue: 112, daysFromTouch: 22, timestamp: "Jan 29, 16:55" },
  { id: "c8", customerId: 4814, orderValue: 79, daysFromTouch: 34, timestamp: "Jan 29, 10:31" },
  { id: "c9", customerId: 4813, orderValue: 165, daysFromTouch: 17, timestamp: "Jan 28, 14:08" },
  { id: "c10", customerId: 4812, orderValue: 58, daysFromTouch: 11, timestamp: "Jan 28, 09:47" },
];

let nextId = 4822;

function generateCustomer(): Customer {
  const value = Math.floor(Math.random() * (180 - 45 + 1)) + 45;
  const days = Math.floor(Math.random() * (34 - 8 + 1)) + 8;
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const mins = now.getMinutes().toString().padStart(2, "0");
  const id = nextId++;
  return {
    id: `live-${id}-${Date.now()}`,
    customerId: id,
    orderValue: value,
    daysFromTouch: days,
    timestamp: `Today, ${hours}:${mins}`,
    isNew: true,
  };
}

function CustomerCard({
  customer,
  isFirst,
}: {
  customer: Customer;
  isFirst: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "#1a1917",
        border: isFirst && customer.isNew
          ? "1px solid rgba(42,157,110,0.4)"
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: "8px",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        boxShadow:
          isFirst && customer.isNew
            ? "0 0 0 1px rgba(42,157,110,0.15), 0 4px 24px rgba(42,157,110,0.08)"
            : "none",
        transition: "border-color 2s ease, box-shadow 2s ease",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "rgba(42,157,110,0.15)",
          border: "1px solid rgba(42,157,110,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
          <path
            d="M7 8C9.2 8 11 6.2 11 4C11 1.8 9.2 0 7 0C4.8 0 3 1.8 3 4C3 6.2 4.8 8 7 8Z"
            fill="#2a9d6e"
            fillOpacity="0.7"
          />
          <path
            d="M7 10C4.33 10 1 11.34 1 13V15C1 15.55 1.45 16 2 16H12C12.55 16 13 15.55 13 15V13C13 11.34 9.67 10 7 10Z"
            fill="#2a9d6e"
            fillOpacity="0.7"
          />
        </svg>
      </div>

      {/* Main info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "4px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#f0ede8",
              letterSpacing: "-0.01em",
            }}
          >
            Customer #{customer.customerId}
          </span>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "#2a9d6e",
              background: "rgba(42,157,110,0.1)",
              border: "1px solid rgba(42,157,110,0.25)",
              padding: "2px 7px",
              borderRadius: "4px",
            }}
          >
            FIRST PURCHASE
          </span>
        </div>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "13px", color: "#7a7570" }}>
            {customer.daysFromTouch} days from first touch
          </span>
          <span
            style={{ fontSize: "13px", color: "#7a7570", opacity: 0.5 }}
          >
            ·
          </span>
          <span style={{ fontSize: "13px", color: "#7a7570" }}>
            {customer.timestamp}
          </span>
        </div>
      </div>

      {/* Right side */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#f0ede8",
            letterSpacing: "-0.02em",
            marginBottom: "4px",
          }}
        >
          €{customer.orderValue}
        </div>
        <a
          href="#"
          style={{
            fontSize: "12px",
            color: "#c8440f",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "3px",
            justifyContent: "flex-end",
          }}
        >
          View in Shopify
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 8L8 2M8 2H4M8 2V6"
              stroke="#c8440f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

export default function CustomerFeed({
  onNewCustomer,
}: {
  onNewCustomer: () => void;
}) {
  const [customers, setCustomers] = useState<Customer[]>(SEED_CUSTOMERS);

  const addCustomer = useCallback(() => {
    const newCustomer = generateCustomer();
    setCustomers((prev) => [newCustomer, ...prev.slice(0, 14)]);
    onNewCustomer();
  }, [onNewCustomer]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    function schedule() {
      const delay = Math.floor(Math.random() * (90000 - 45000 + 1)) + 45000;
      timer = setTimeout(() => {
        addCustomer();
        schedule();
      }, delay);
    }

    schedule();
    return () => clearTimeout(timer);
  }, [addCustomer]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <AnimatePresence initial={false}>
        {customers.map((c, i) => (
          <CustomerCard key={c.id} customer={c} isFirst={i === 0} />
        ))}
      </AnimatePresence>
    </div>
  );
}
