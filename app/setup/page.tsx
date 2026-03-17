"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = 1 | 2 | 3;

function StepDots({ current }: { current: Step }) {
  return (
    <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "36px" }}>
      {([1, 2, 3] as Step[]).map((s) => (
        <div
          key={s}
          style={{
            width: s === current ? "20px" : "6px",
            height: "6px",
            borderRadius: "3px",
            background:
              s === current ? "#C8440F" : s < current ? "#D4D4CC" : "#E8E8E2",
            transition: "width 0.3s ease, background 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

function ShopifyIcon() {
  return (
    <div
      style={{
        width: "56px",
        height: "56px",
        borderRadius: "12px",
        background: "#96bf48",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        fontWeight: 700,
        color: "#fff",
        marginBottom: "24px",
      }}
    >
      S
    </div>
  );
}

function MetaIcon() {
  return (
    <div
      style={{
        width: "56px",
        height: "56px",
        borderRadius: "12px",
        background: "#1877F2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        fontWeight: 700,
        color: "#fff",
        marginBottom: "24px",
      }}
    >
      M
    </div>
  );
}

function CheckIcon() {
  return (
    <div
      style={{
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        background: "#EBF7F0",
        border: "2px solid #1A7A4A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "24px",
      }}
    >
      <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
        <path
          d="M2 11L10 19L26 3"
          stroke="#1A7A4A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function SetupPage() {
  const [step, setStep] = useState<Step>(1);
  const [store, setStore] = useState("brandname.myshopify.com");
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F6F6F1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: "40px", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            background: "#1A1A18",
            borderRadius: "12px",
            padding: "10px 16px",
            alignItems: "baseline",
            gap: "1px",
            marginBottom: "0",
          }}
        >
          <span
            style={{
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
            }}
          >
            Pulse
          </span>
          <span style={{ color: "#C8440F", fontSize: "22px", fontWeight: 700 }}>.</span>
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#9B9B96",
            letterSpacing: "0.06em",
            marginTop: "10px",
            textTransform: "uppercase",
          }}
        >
          New customer engine
        </div>
      </div>

      {/* Card */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E8E8E2",
          borderRadius: "16px",
          padding: "40px 44px",
          width: "100%",
          maxWidth: "440px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <StepDots current={step} />

        {/* Step 1 */}
        {step === 1 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ShopifyIcon />
            </div>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#1A1A18",
                margin: "0 0 8px",
              }}
            >
              Connect your store
            </h1>
            <p style={{ fontSize: "14px", color: "#6B6B66", margin: "0 0 28px", lineHeight: "1.6" }}>
              We read your first-purchase order data to verify new customers.
            </p>
            <input
              type="text"
              value={store}
              onChange={(e) => setStore(e.target.value)}
              style={{
                width: "100%",
                background: "#FFFFFF",
                border: "1px solid #D4D4CC",
                borderRadius: "8px",
                color: "#1A1A18",
                fontSize: "14px",
                padding: "10px 14px",
                outline: "none",
                marginBottom: "12px",
                fontFamily: "inherit",
              }}
              placeholder="yourstore.myshopify.com"
            />
            <button
              onClick={() => setStep(2)}
              style={{
                width: "100%",
                background: "#C8440F",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 500,
                padding: "11px",
                cursor: "pointer",
              }}
            >
              Connect Shopify →
            </button>
            <p style={{ fontSize: "12px", color: "#9B9B96", marginTop: "12px", lineHeight: "1.5" }}>
              Read-only access. We only read order data to verify new customers.
            </p>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <MetaIcon />
            </div>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#1A1A18",
                margin: "0 0 8px",
              }}
            >
              Connect your Meta Ads account
            </h1>
            <p style={{ fontSize: "14px", color: "#6B6B66", margin: "0 0 28px", lineHeight: "1.6" }}>
              Pulse uses Meta to run your acquisition campaigns. You keep full control.
            </p>
            <button
              onClick={() => setStep(3)}
              style={{
                width: "100%",
                background: "#1877F2",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 500,
                padding: "11px",
                cursor: "pointer",
                marginBottom: "12px",
              }}
            >
              Connect via Meta →
            </button>
            <p style={{ fontSize: "12px", color: "#9B9B96", lineHeight: "1.5" }}>
              Pulse uses this to run your campaigns. You keep full control of your ad account.
            </p>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CheckIcon />
            </div>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#1A1A18",
                margin: "0 0 8px",
              }}
            >
              Pulse is now running.
            </h1>
            <p style={{ fontSize: "14px", color: "#6B6B66", margin: "0 0 28px", lineHeight: "1.6" }}>
              Your first new customers will appear in your dashboard within 48 hours.
            </p>

            {/* Connections summary */}
            <div
              style={{
                background: "#FAFAF7",
                border: "1px solid #E8E8E2",
                borderRadius: "10px",
                padding: "14px 16px",
                marginBottom: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {[
                { icon: "S", bg: "#96bf48", label: store || "brandname.myshopify.com" },
                { icon: "M", bg: "#1877F2", label: "Meta Ads connected" },
              ].map((c) => (
                <div key={c.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "5px",
                      background: c.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  <span style={{ fontSize: "13px", color: "#6B6B66", flex: 1, textAlign: "left" }}>
                    {c.label}
                  </span>
                  <span style={{ fontSize: "13px", color: "#156639", fontWeight: 600 }}>✓</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              style={{
                width: "100%",
                background: "#C8440F",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 500,
                padding: "11px",
                cursor: "pointer",
              }}
            >
              Go to dashboard →
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: "20px", fontSize: "12px", color: "#9B9B96" }}>
        Step {step} of 3
      </div>
    </div>
  );
}
