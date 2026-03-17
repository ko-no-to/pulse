"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <rect x="8.5" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: "Connections",
    href: "/connections",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="3" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="3" r="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5 7.5H8.5M8.5 7.5L10 3M8.5 7.5L10 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Billing",
    href: "/billing",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1.5" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M1.5 6H13.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4.5 9.5H6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "220px",
        minWidth: "220px",
        background: "#0f0e0d",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "28px 24px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "1px" }}>
          <span
            style={{
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#f0ede8",
            }}
          >
            Pulse
          </span>
          <span style={{ color: "#c8440f", fontSize: "22px", fontWeight: 700 }}>
            .
          </span>
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "#4a4744",
            letterSpacing: "0.06em",
            marginTop: "3px",
            textTransform: "uppercase",
          }}
        >
          New customer engine
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 0" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 20px 9px 22px",
                fontSize: "13.5px",
                fontWeight: isActive ? 500 : 400,
                color: isActive ? "#f0ede8" : "#7a7570",
                textDecoration: "none",
                borderLeft: isActive
                  ? "2px solid #c8440f"
                  : "2px solid transparent",
                background: isActive
                  ? "rgba(200, 68, 15, 0.06)"
                  : "transparent",
                transition: "color 0.15s ease, background 0.15s ease",
              }}
            >
              <span
                style={{
                  color: isActive ? "#c8440f" : "#4a4744",
                  transition: "color 0.15s ease",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Brand pill */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            background: "#2a9d6e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: 700,
            color: "#0f0e0d",
            letterSpacing: "0.02em",
            flexShrink: 0,
          }}
        >
          NB
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#f0ede8",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Noïse Botanics
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "2px",
            }}
          >
            <span
              className="animate-pulse-dot"
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#2a9d6e",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "11px",
                color: "#2a9d6e",
                letterSpacing: "0.02em",
              }}
            >
              Pulse running
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
