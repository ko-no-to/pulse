"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = 1 | 2 | 3;

function StepDots({ current }: { current: Step }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "6px",
        justifyContent: "center",
        marginBottom: "40px",
      }}
    >
      {([1, 2, 3] as Step[]).map((s) => (
        <div
          key={s}
          style={{
            width: s === current ? "20px" : "6px",
            height: "6px",
            borderRadius: "3px",
            background: s === current ? "#c8440f" : s < current ? "#4a4744" : "#2a2927",
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
        background: "rgba(42,157,110,0.15)",
        border: "2px solid rgba(42,157,110,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "24px",
      }}
    >
      <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
        <path
          d="M2 11L10 19L26 3"
          stroke="#2a9d6e"
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
        background: "#0f0e0d",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      {/* Logo */}
      <div
        style={{
          marginBottom: "48px",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "1px", justifyContent: "center" }}>
          <span
            style={{
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#f0ede8",
            }}
          >
            Pulse
          </span>
          <span style={{ color: "#c8440f", fontSize: "26px", fontWeight: 700 }}>
            .
          </span>
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "#4a4744",
            letterSpacing: "0.08em",
            marginTop: "4px",
            textTransform: "uppercase",
          }}
        >
          New customer engine
        </div>
      </div>

      {/* Card */}
      <div
        style={{
          background: "#1a1917",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "12px",
          padding: "40px 44px",
          width: "100%",
          maxWidth: "440px",
        }}
      >
        <StepDots current={step} />

        {/* Step 1 — Connect Shopify */}
        {step === 1 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ShopifyIcon />
            </div>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#f0ede8",
                margin: "0 0 8px",
                letterSpacing: "-0.02em",
              }}
            >
              Connect your store
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#7a7570",
                margin: "0 0 28px",
                lineHeight: "1.6",
              }}
            >
              We read your first-purchase order data to verify new customers.
            </p>
            <input
              type="text"
              value={store}
              onChange={(e) => setStore(e.target.value)}
              style={{
                width: "100%",
                background: "#0f0e0d",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "7px",
                color: "#f0ede8",
                fontSize: "14px",
                padding: "11px 14px",
                outline: "none",
                marginBottom: "14px",
                fontFamily: "inherit",
              }}
              placeholder="yourstore.myshopify.com"
            />
            <button
              onClick={() => setStep(2)}
              style={{
                width: "100%",
                background: "#c8440f",
                border: "none",
                borderRadius: "7px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                padding: "12px",
                cursor: "pointer",
                letterSpacing: "-0.01em",
              }}
            >
              Connect Shopify →
            </button>
            <p
              style={{
                fontSize: "12px",
                color: "#4a4744",
                marginTop: "14px",
                lineHeight: "1.5",
              }}
            >
              Read-only access. We only read order data to verify new customers.
            </p>
          </div>
        )}

        {/* Step 2 — Connect Meta */}
        {step === 2 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <MetaIcon />
            </div>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#f0ede8",
                margin: "0 0 8px",
                letterSpacing: "-0.02em",
              }}
            >
              Connect your Meta Ads account
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#7a7570",
                margin: "0 0 28px",
                lineHeight: "1.6",
              }}
            >
              Pulse uses Meta to run your acquisition campaigns. You keep full control.
            </p>
            <button
              onClick={() => setStep(3)}
              style={{
                width: "100%",
                background: "#1877F2",
                border: "none",
                borderRadius: "7px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                padding: "12px",
                cursor: "pointer",
                letterSpacing: "-0.01em",
                marginBottom: "14px",
              }}
            >
              Connect via Meta →
            </button>
            <p
              style={{
                fontSize: "12px",
                color: "#4a4744",
                lineHeight: "1.5",
              }}
            >
              We use this to run your Pulse campaigns. You keep full control.
            </p>
          </div>
        )}

        {/* Step 3 — You're live */}
        {step === 3 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CheckIcon />
            </div>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#f0ede8",
                margin: "0 0 8px",
                letterSpacing: "-0.02em",
              }}
            >
              Pulse is now running.
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#7a7570",
                margin: "0 0 32px",
                lineHeight: "1.6",
              }}
            >
              Your first new customers will appear in your dashboard within 48 hours.
            </p>

            {/* Connections summary */}
            <div
              style={{
                background: "#0f0e0d",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "8px",
                padding: "14px 16px",
                marginBottom: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {[
                { icon: "S", bg: "#96bf48", label: store || "brandname.myshopify.com" },
                { icon: "M", bg: "#1877F2", label: "Meta Ads connected" },
              ].map((c) => (
                <div
                  key={c.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
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
                  <span style={{ fontSize: "13px", color: "#7a7570" }}>
                    {c.label}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "11px",
                      color: "#2a9d6e",
                      fontWeight: 600,
                    }}
                  >
                    ✓
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              style={{
                width: "100%",
                background: "#c8440f",
                border: "none",
                borderRadius: "7px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                padding: "12px",
                cursor: "pointer",
                letterSpacing: "-0.01em",
              }}
            >
              Go to dashboard →
            </button>
          </div>
        )}
      </div>

      {/* Step label */}
      <div
        style={{
          marginTop: "20px",
          fontSize: "12px",
          color: "#4a4744",
        }}
      >
        Step {step} of 3
      </div>
    </div>
  );
}
