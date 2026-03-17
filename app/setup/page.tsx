"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = 1 | 2 | 3;

function ProgressDots({ current }: { current: Step }) {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 36 }}>
      {([1, 2, 3] as Step[]).map((s) => (
        <div key={s} style={{ width: s === current ? 24 : 8, height: 8, borderRadius: 4, background: s === current ? "#C8440F" : s < current ? "#D4D4CC" : "#E8E8E2", transition: "width 0.3s ease, background 0.3s ease" }}/>
      ))}
    </div>
  );
}

function ShopifyIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom: 24 }}>
      <rect width="48" height="48" rx="12" fill="#96BF48"/>
      <path d="M32.4 15.6C32.4 15.6 31.8 15.3 31.2 15.3C30.6 15.3 30 15.6 30 15.6L29.4 13.2C29.1 12 28.2 11.4 27 11.4C25.8 11.4 24.6 12.3 24 13.2L22.8 16.8C21 17.4 19.8 18 19.8 18L16.2 36H33.6L36 16.2L32.4 15.6ZM27 13.8C27.6 13.8 27.9 14.1 28.2 14.7L28.8 16.8C28.2 17.1 27.3 17.4 26.4 17.7L27.6 14.4C27.3 14.1 27 13.8 27 13.8ZM24 23.4C24.6 23.4 25.2 24 25.2 24.6C25.2 25.2 24.6 25.8 24 25.8C23.4 25.8 22.8 25.2 22.8 24.6C22.8 24 23.4 23.4 24 23.4Z" fill="white"/>
    </svg>
  );
}

function MetaIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom: 24 }}>
      <rect width="48" height="48" rx="12" fill="#1877F2"/>
      <path d="M25.68 36V25.74H29.22L29.76 21.6H25.68V18.9C25.68 17.64 26.04 16.8 27.84 16.8H29.88V13.08C29.52 13.02 28.2 12.9 26.64 12.9C23.46 12.9 21.3 14.82 21.3 18.42V21.6H17.76V25.74H21.3V36H25.68Z" fill="white"/>
    </svg>
  );
}

function AnimatedCheck() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="32" stroke="#1A7A4A" strokeWidth="3" fill="#EBF7F0"
          strokeDasharray="201"
          strokeDashoffset="0"
          style={{ animation: "drawCircle 0.6s ease-out forwards" }}
        />
        <path d="M20 36L30 46L52 24" stroke="#1A7A4A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="50"
          strokeDashoffset="0"
          style={{ animation: "drawCheck 0.4s ease-out 0.6s forwards" }}
        />
        <style>{`
          @keyframes drawCircle {
            from { stroke-dashoffset: 201; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes drawCheck {
            from { stroke-dashoffset: 50; }
            to   { stroke-dashoffset: 0; }
          }
        `}</style>
      </svg>
    </div>
  );
}

export default function SetupPage() {
  const [step, setStep] = useState<Step>(1);
  const [store, setStore] = useState("noisebotanics.myshopify.com");
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", background: "#F0EFE9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>

      {/* Logo */}
      <div style={{ marginBottom: 36, textAlign: "center" }}>
        <div style={{ display: "inline-flex", background: "#1A1A18", borderRadius: 8, padding: "10px 16px", alignItems: "baseline", gap: 1 }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 20, fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.01em" }}>Pulse</span>
          <span style={{ color: "#C8440F", fontSize: 20, fontWeight: 600 }}>.</span>
        </div>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "#9B9B96", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 10 }}>
          New customer engine
        </div>
      </div>

      {/* Card */}
      <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E2", borderRadius: 16, padding: "40px 44px", width: "100%", maxWidth: 480, boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
        <ProgressDots current={step}/>

        {/* Step 1 */}
        {step === 1 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}><ShopifyIcon/></div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, color: "#1A1A18", margin: "0 0 10px" }}>
              Connect your Shopify store
            </h1>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "#6B6B66", margin: "0 0 28px", lineHeight: 1.6 }}>
              Read-only access. We only read order data to verify new customers.
            </p>
            <input
              type="text"
              value={store}
              onChange={(e) => setStore(e.target.value)}
              style={{ width: "100%", background: "#FFFFFF", border: "1px solid #D4D4CC", borderRadius: 8, color: "#1A1A18", fontFamily: "var(--font-ui)", fontSize: 14, padding: "10px 14px", outline: "none", marginBottom: 16 }}
              placeholder="yourstore.myshopify.com"
            />
            <button onClick={() => setStep(2)} style={{ width: "100%", background: "#C8440F", border: "none", borderRadius: 8, color: "#FFFFFF", fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500, padding: 12, cursor: "pointer" }}>
              Connect Shopify →
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}><MetaIcon/></div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, color: "#1A1A18", margin: "0 0 10px" }}>
              Connect your Meta Ads account
            </h1>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "#6B6B66", margin: "0 0 28px", lineHeight: 1.6 }}>
              Pulse runs your campaigns here. You keep full control and can disconnect at any time.
            </p>
            <button onClick={() => setStep(3)} style={{ width: "100%", background: "#1877F2", border: "none", borderRadius: 8, color: "#FFFFFF", fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500, padding: 12, cursor: "pointer" }}>
              Connect via Meta →
            </button>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div style={{ textAlign: "center" }}>
            <AnimatedCheck/>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600, color: "#1A1A18", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
              Pulse is now running.
            </h1>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "#6B6B66", margin: "0 auto 28px", lineHeight: 1.65, maxWidth: 340 }}>
              Your first new customers will appear in your dashboard within 48 hours as the system qualifies your first audiences.
            </p>
            {/* Connections summary */}
            <div style={{ background: "#F7F6F1", border: "1px solid #E8E8E2", borderRadius: 10, padding: "14px 16px", marginBottom: 24 }}>
              {[
                { logo: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect width="20" height="20" rx="5" fill="#96BF48"/><text x="10" y="14" textAnchor="middle" fontFamily="Arial" fontSize="10" fontWeight="700" fill="white">S</text></svg>, label: store || "noisebotanics.myshopify.com" },
                { logo: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect width="20" height="20" rx="5" fill="#1877F2"/><text x="10" y="14" textAnchor="middle" fontFamily="Arial" fontSize="10" fontWeight="700" fill="white">M</text></svg>, label: "Meta Ads connected" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                  {c.logo}
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#6B6B66", flex: 1, textAlign: "left" }}>{c.label}</span>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#156639", fontWeight: 600 }}>✓</span>
                </div>
              ))}
            </div>
            <button onClick={() => router.push("/dashboard")} style={{ width: "100%", background: "#C8440F", border: "none", borderRadius: 8, color: "#FFFFFF", fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500, padding: 12, cursor: "pointer" }}>
              Go to dashboard →
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 20, fontFamily: "var(--font-ui)", fontSize: 12, color: "#9B9B96" }}>
        Step {step} of 3
      </div>
    </div>
  );
}
