"use client";
import React from "react";
import { Zap, Lock, Globe, Star } from "lucide-react";

const cards = [
  { icon: <Zap size={20} />, color: "#f5a623", bg: "rgba(245,166,35,0.08)", title: "Lightning Fast", desc: "Direct download links generated in under 2 seconds" },
  { icon: <Lock size={20} />, color: "#2dd4a4", bg: "rgba(45,212,164,0.08)", title: "No Login Needed", desc: "Zero registration required to start downloading" },
  { icon: <Globe size={20} />, color: "#4f8df5", bg: "rgba(79,141,245,0.08)", title: "Works Globally", desc: "Access TeraBox files from any country or region" },
  { icon: <Star size={20} />, color: "#a78bfa", bg: "rgba(167,139,250,0.08)", title: "Completely Free", desc: "No hidden fees, subscriptions, or paywalls ever" },
];

export default function WhatIsTeraboxNetlify() {
  return (
    <section style={{ background: "#060910", padding: "80px 20px", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "4px 12px", borderRadius: "100px", marginBottom: "16px",
            background: "rgba(45,212,164,0.08)", border: "1px solid rgba(45,212,164,0.15)",
            color: "#5eead4", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>
            <Zap size={11} /> Why TeraFetch
          </div>
          <h2 style={{
            fontFamily: "'Geist', sans-serif", fontSize: "clamp(26px, 4vw, 36px)",
            fontWeight: 700, color: "#f0f4fc", letterSpacing: "-0.025em", margin: "0 0 12px",
          }}>Why Choose TeraFetch?</h2>
          <p style={{ color: "#6b7a8d", fontSize: "15px", maxWidth: "480px", margin: "0 auto" }}>
            The fastest and most reliable way to download from TeraBox — trusted by thousands daily.
          </p>
        </div>

        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {cards.map((c, i) => (
            <div key={i} style={{
              padding: "24px", background: "#0c1018",
              border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px",
              display: "flex", alignItems: "flex-start", gap: "16px",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = c.color + "2a";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.4)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              <div style={{
                width: "44px", height: "44px", flexShrink: 0, borderRadius: "12px",
                background: c.bg, color: c.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `1px solid ${c.color}18`,
              }}>{c.icon}</div>
              <div>
                <h3 style={{ fontFamily: "'Geist', sans-serif", fontSize: "16px", fontWeight: 700, color: "#f0f4fc", margin: "0 0 5px" }}>{c.title}</h3>
                <p style={{ color: "#6b7a8d", fontSize: "13px", margin: 0, lineHeight: 1.65 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 600px) { .why-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
