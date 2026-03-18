"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="8.5" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    label: "Billing",
    href: "/billing",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1.5" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M1.5 6H13.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M4.5 9.5H6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Connections",
    href: "/connections",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="3" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="12" cy="3" r="2" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M5 7.5H8.5M8.5 7.5L10 3M8.5 7.5L10 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: 220, minWidth: 220,
      background: "var(--sidebar)",
      display: "flex", flexDirection: "column",
      height: "100vh", position: "sticky", top: 0,
    }}>

      {/* Logo */}
      <div style={{ padding: "20px 16px 16px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 18, fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.01em" }}>Pulse</span>
          <span style={{ color: "var(--accent)", fontSize: 18, fontWeight: 600 }}>.</span>
        </div>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 3 }}>
          New customer engine
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "4px 10px", overflowY: "auto" }}>
        {NAV.map((item) => {
          const active = pathname === item.href || (item.href === "/dashboard" && pathname === "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex", alignItems: "center", gap: 9,
                padding: "8px 10px", marginBottom: 2,
                borderRadius: 8,
                fontFamily: "var(--font-ui)",
                fontSize: 14, fontWeight: active ? 500 : 400,
                color: active ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                textDecoration: "none",
                background: active ? "rgba(255,255,255,0.1)" : "transparent",
                transition: "background 0.12s, color 0.12s",
              }}
            >
              <span style={{ color: active ? "#FFFFFF" : "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", flexShrink: 0 }}>
                {item.icon}
              </span>
              <span style={{ flex: 1 }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Brand pill */}
      <div style={{ padding: "12px 10px 16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.04em", flexShrink: 0 }}>
            NB
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Noïse Botanics
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
              <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ADE80", display: "inline-block", flexShrink: 0 }}/>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Pulse running</span>
            </div>
          </div>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, color: "rgba(255,255,255,0.25)" }}>
            <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </aside>
  );
}
