"use client";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <div
      style={{
        height: "60px",
        borderBottom: "1px solid #E8E8E2",
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
        background: "#FFFFFF",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <h1
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "#1A1A18",
          margin: 0,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <span
          style={{
            fontSize: "13px",
            color: "#9B9B96",
            marginLeft: "12px",
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
}
