"use client";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <div style={{
      height: 60,
      borderBottom: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      padding: "0 28px",
      background: "var(--surface)",
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}>
      <h1 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", margin: 0 }}>
        {title}
      </h1>
      {subtitle && (
        <span style={{ fontSize: 13, color: "var(--subtle)", marginLeft: 12 }}>
          {subtitle}
        </span>
      )}
    </div>
  );
}
