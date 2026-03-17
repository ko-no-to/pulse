"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    section: "Overview",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Cycles", href: "/cycles" },
      { label: "Creative", href: "/creative", placeholder: true },
    ],
  },
  {
    section: "Reporting",
    links: [
      { label: "New Customers", href: "/customers" },
      { label: "Attribution Log", href: "/attribution" },
    ],
  },
  {
    section: "Settings",
    links: [
      { label: "Connections", href: "/connections" },
      { label: "Billing", href: "/billing" },
    ],
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
        borderRight: "1px solid #2a2927",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "28px 24px 24px", borderBottom: "1px solid #2a2927" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
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
          <span style={{ color: "#c8440f", fontSize: "22px", fontWeight: 700 }}>.</span>
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "#7a7570",
            letterSpacing: "0.04em",
            marginTop: "2px",
            textTransform: "uppercase",
          }}
        >
          New customer engine
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 0", overflowY: "auto" }}>
        {navItems.map((group) => (
          <div key={group.section} style={{ marginBottom: "24px" }}>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#7a7570",
                padding: "0 24px",
                marginBottom: "6px",
              }}
            >
              {group.section}
            </div>
            {group.links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.placeholder ? "#" : link.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 24px",
                    fontSize: "14px",
                    color: link.placeholder
                      ? "#4a4744"
                      : isActive
                      ? "#f0ede8"
                      : "#7a7570",
                    textDecoration: "none",
                    borderLeft: isActive ? "2px solid #c8440f" : "2px solid transparent",
                    background: isActive ? "rgba(200, 68, 15, 0.06)" : "transparent",
                    transition: "all 0.15s ease",
                    cursor: link.placeholder ? "default" : "pointer",
                  }}
                >
                  {link.label}
                  {link.placeholder && (
                    <span
                      style={{
                        marginLeft: "8px",
                        fontSize: "10px",
                        color: "#4a4744",
                        background: "#1a1917",
                        border: "1px solid #2a2927",
                        padding: "1px 6px",
                        borderRadius: "4px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Soon
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Brand pill */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid #2a2927",
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
