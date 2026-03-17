"use client";

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  return (
    <div
      style={{
        height: "52px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
        background: "#0f0e0d",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <h1
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#f0ede8",
          margin: 0,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h1>
    </div>
  );
}
