"use client";
import React from "react";
import { Link as LinkIcon, ClipboardPaste, Download } from "lucide-react";

const steps = [
  {
    num: "01", icon: <LinkIcon size={20} />, color: "#4f8df5", bg: "rgba(79,141,245,0.1)",
    title: "Copy the TeraBox Link",
    desc: "Find any public TeraBox video, image, or file and copy its share URL from Telegram, WhatsApp, or any shared post.",
  },
  {
    num: "02", icon: <ClipboardPaste size={20} />, color: "#2dd4a4", bg: "rgba(45,212,164,0.1)",
    title: "Paste into TeraFetch",
    desc: "Go to PlayTera and paste the copied URL into the input box. Our system auto-detects the file type instantly.",
  },
  {
    num: "03", icon: <Download size={20} />, color: "#f5a623", bg: "rgba(245,166,35,0.1)",
    title: "Download Instantly",
    desc: "Click download once the preview appears. Content starts immediately — no login, no waiting, no limits.",
  },
];

export default function HowToDownload() {
  return (
    <section style={{ background: "#060910", padding: "80px 20px", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
      }} />

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "4px 12px", borderRadius: "100px", marginBottom: "16px",
            background: "rgba(79,141,245,0.08)", border: "1px solid rgba(79,141,245,0.15)",
            color: "#93c5fd", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>How It Works</div>
          <h2 style={{
            fontFamily: "'Geist', sans-serif", fontSize: "clamp(26px, 4vw, 38px)",
            fontWeight: 700, color: "#f0f4fc", letterSpacing: "-0.025em", margin: "0 0 12px",
          }}>3 Simple Steps</h2>
          <p style={{ color: "#6b7a8d", fontSize: "15px", fontWeight: 400 }}>
            Download any TeraBox file in under 30 seconds
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {steps.map((step, i) => (
            <div key={i} className="step-card" style={{
              display: "flex", alignItems: "flex-start", gap: "20px",
              padding: "24px 28px",
              background: "#0c1018",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "14px",
              position: "relative", overflow: "hidden",
              transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = step.color + "33";
              e.currentTarget.style.transform = "translateX(4px)";
              e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), -4px 0 0 ${step.color}44`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              {/* Large step number bg */}
              <div style={{
                position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)",
                fontSize: "64px", fontWeight: 800, color: "rgba(255,255,255,0.025)",
                fontFamily: "'Geist', sans-serif", lineHeight: 1, userSelect: "none",
              }}>{step.num}</div>

              {/* Icon */}
              <div style={{
                width: "48px", height: "48px", flexShrink: 0, borderRadius: "12px",
                background: step.bg, color: step.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `1px solid ${step.color}22`,
              }}>{step.icon}</div>

              {/* Text */}
              <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
                <p style={{ fontSize: "11px", color: step.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 6px" }}>
                  Step {i + 1}
                </p>
                <h3 style={{ fontFamily: "'Geist', sans-serif", fontSize: "17px", fontWeight: 700, color: "#f0f4fc", margin: "0 0 8px" }}>
                  {step.title}
                </h3>
                <p style={{ color: "#6b7a8d", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "36px" }}>
          <a href="https://t.me/+2fvOF7WT0YBjZDM9" target="_blank" rel="noopener noreferrer" style={{
            fontSize: "13px", color: "#4f8df5", fontWeight: 500,
            borderBottom: "1px solid rgba(79,141,245,0.3)", paddingBottom: "1px",
          }}>
            Need help? Join our Telegram →
          </a>
        </div>
      </div>
    </section>
  );
}
