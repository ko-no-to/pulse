"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", badge: null, icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="8.5" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4"/></svg> },
      { label: "Customers", href: "/customers", badge: "47", icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="5.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M1 13c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M10.5 6.5c1 0 2 .8 2 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M12 3.5a1.5 1.5 0 1 1 0 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Engine", href: "/engine", badge: "3", icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.4"/><path d="M7.5 1.5V3M7.5 12V13.5M1.5 7.5H3M12 7.5H13.5M3.4 3.4L4.5 4.5M10.5 10.5L11.6 11.6M11.6 3.4L10.5 4.5M4.5 10.5L3.4 11.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Billing", href: "/billing", badge: null, icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1.5" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M1.5 6H13.5" stroke="currentColor" strokeWidth="1.4"/><path d="M4.5 9.5H6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
      { label: "Connections", href: "/connections", badge: null, icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="3" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="3" r="2" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.4"/><path d="M5 7.5H8.5M8.5 7.5L10 3M8.5 7.5L10 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{ width: 220, minWidth: 220, background: "#FFFFFF", borderRight: "1px solid #E8E8E2", display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0 }}>

      {/* Logo pill */}
      <div style={{ padding: "16px 14px 12px" }}>
        <div style={{ background: "#1A1A18", borderRadius: 8, padding: "12px 16px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 18, fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.01em" }}>Pulse</span>
            <span style={{ color: "#C8440F", fontSize: 18, fontWeight: 600 }}>.</span>
          </div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 3 }}>
            New customer engine
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "4px 10px", overflowY: "auto" }}>
        {sections.map((section) => (
          <div key={section.label}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9B9B96", padding: "14px 6px 6px" }}>
              {section.label}
            </div>
            {section.items.map((item) => {
              const active = pathname === item.href;
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
                    color: active ? "#A33508" : "#6B6B66",
                    textDecoration: "none",
                    borderLeft: `2px solid ${active ? "#C8440F" : "transparent"}`,
                    background: active ? "#FDF0EB" : "transparent",
                    transition: "background 0.12s, color 0.12s",
                  }}
                >
                  <span style={{ color: active ? "#C8440F" : "#9B9B96", display: "flex", alignItems: "center", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500, color: "#A33508", background: "#FDF0EB", padding: "1px 6px", borderRadius: 4 }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Brand pill */}
      <div style={{ padding: "12px 14px 16px", borderTop: "1px solid #E8E8E2" }}>
        <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          {/* NB avatar */}
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#C8440F", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.04em", flexShrink: 0 }}>
            NB
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: "#1A1A18", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Noïse Botanics
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
              <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1A7A4A", display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#156639" }}>Pulse running</span>
            </div>
          </div>
          {/* Chevron */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, color: "#D4D4CC" }}>
            <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </aside>
  );
}
