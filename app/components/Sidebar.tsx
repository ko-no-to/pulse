"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
  onSettingsClick: () => void;
}

export default function Sidebar({ onSettingsClick }: SidebarProps) {
  const pathname = usePathname();
  const homeActive = pathname === "/dashboard" || pathname === "/";

  return (
    <aside style={{
      width: 220, minWidth: 220,
      background: "#111111",
      borderRight: "1px solid rgba(255,255,255,0.07)",
      display: "flex", flexDirection: "column",
      height: "100vh", position: "sticky", top: 0, zIndex: 20,
    }}>

      {/* Logo */}
      <div style={{ padding: "20px 16px 14px" }}>
        <div style={{ fontFamily: "var(--font-inter)", fontSize: 16, fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.01em" }}>
          Pulse<span style={{ color: "var(--accent)" }}>.</span>
        </div>
        <div style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "rgba(255,255,255,0.38)", marginTop: 3 }}>
          New customer engine
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "4px 8px" }}>
        {/* Home */}
        <Link
          href="/dashboard"
          style={{
            display: "flex", alignItems: "center", gap: 9,
            padding: "7px 12px", borderRadius: 7,
            marginBottom: 2,
            fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 400,
            color: homeActive ? "#FFFFFF" : "rgba(255,255,255,0.55)",
            textDecoration: "none",
            background: homeActive ? "rgba(255,255,255,0.08)" : "transparent",
            borderLeft: homeActive ? "2px solid var(--accent)" : "2px solid transparent",
            transition: "background 0.12s, color 0.12s",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: homeActive ? 0.9 : 0.5 }}>
            <rect x="1.5" y="1.5" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
            <rect x="9.5" y="1.5" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
            <rect x="1.5" y="9.5" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
            <rect x="9.5" y="9.5" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
          </svg>
          Home
        </Link>

        {/* Settings */}
        <button
          onClick={onSettingsClick}
          style={{
            display: "flex", alignItems: "center", gap: 9,
            padding: "7px 12px", borderRadius: 7,
            marginBottom: 2, width: "100%",
            fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 400,
            color: "rgba(255,255,255,0.55)",
            textAlign: "left",
            background: "transparent",
            border: "2px solid transparent",
            borderLeft: "2px solid transparent",
            transition: "background 0.12s, color 0.12s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "rgba(255,255,255,0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "rgba(255,255,255,0.55)";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.5 }}>
            <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.3 3.3L4.4 4.4M11.6 11.6L12.7 12.7M12.7 3.3L11.6 4.4M4.4 11.6L3.3 12.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Settings
        </button>
      </nav>

      {/* Bottom: store info */}
      <div style={{ padding: "12px 16px 16px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 600, color: "#FFFFFF", flexShrink: 0, letterSpacing: "0.02em" }}>
            NB
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 500, color: "#FFFFFF" }}>Noïse Botanics</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
              <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", display: "inline-block", flexShrink: 0 }}/>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "rgba(255,255,255,0.38)" }}>Pulse running</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
