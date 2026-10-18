"use client";
import React from "react";
import { Cloud, ShieldCheck, Share2, FolderOpen, Zap } from "lucide-react";

const features = [
  { icon: <ShieldCheck size={18} />, title: "Secure Storage", desc: "1TB of encrypted cloud space", color: "#4f8df5" },
  { icon: <FolderOpen size={18} />, title: "Smart Organization", desc: "Auto-categorize all file types", color: "#2dd4a4" },
  { icon: <Share2 size={18} />, title: "Easy Sharing", desc: "Share via a single link", color: "#f5a623" },
  { icon: <Cloud size={18} />, title: "Always Available", desc: "Access from any device", color: "#a78bfa" },
];

export default function WhatIsTerabox() {
  return (
    <section style={{ background: "#060910", padding: "80px 20px", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Ad strip */}
        <div style={{
          margin: "0 auto 56px", maxWidth: "728px", height: "90px",
          background: "rgba(255,255,255,0.018)", border: "1px dashed rgba(255,255,255,0.05)",
          borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",
          color: "#2d3a4a", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
        }}>Advertisement</div>

        <div className="terabox-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center",
        }}>
          {/* Left */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "4px 12px", borderRadius: "100px", marginBottom: "20px",
              background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.18)",
              color: "#a78bfa", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
            }}>
              <Cloud size={11} /> Cloud Storage
            </div>
            <h2 style={{
              fontFamily: "'Geist', sans-serif", fontSize: "clamp(24px, 3.5vw, 34px)",
              fontWeight: 700, color: "#f0f4fc", letterSpacing: "-0.025em", margin: "0 0 14px",
            }}>What is TeraBox?</h2>
            <p style={{ color: "#6b7a8d", fontSize: "14px", lineHeight: 1.8, marginBottom: "14px" }}>
              <strong style={{ color: "#9aa5b4", fontWeight: 500 }}>TeraBox</strong> is a popular free cloud storage platform offering up to{" "}
              <strong style={{ color: "#93c5fd", fontWeight: 500 }}>1TB of secure storage</strong> for photos, videos, and documents.
            </p>
            <p style={{ color: "#6b7a8d", fontSize: "14px", lineHeight: 1.8, marginBottom: "24px" }}>
              It lets you store, share, and access your files from any device — perfect for backing up large media collections.
            </p>

            <div style={{
              padding: "14px 18px", borderRadius: "12px",
              background: "rgba(79,141,245,0.07)", border: "1px solid rgba(79,141,245,0.15)",
              display: "flex", alignItems: "center", gap: "12px",
            }}>
              <Zap size={18} color="#93c5fd" />
              <div>
                <div style={{ fontFamily: "'Geist', sans-serif", fontSize: "20px", fontWeight: 700, color: "#93c5fd" }}>1TB Free</div>
                <div style={{ fontSize: "12px", color: "#6b7a8d" }}>No credit card required</div>
              </div>
            </div>
          </div>

          {/* Right: feature cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {features.map((f, i) => (
              <div key={i} style={{
                padding: "18px", background: "#0c1018",
                border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px",
                transition: "all 0.25s ease", cursor: "default",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = f.color + "33";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = `0 12px 30px rgba(0,0,0,0.35)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  background: f.color + "15", color: f.color,
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px",
                }}>{f.icon}</div>
                <div style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", fontWeight: 600, color: "#f0f4fc", marginBottom: "4px" }}>{f.title}</div>
                <div style={{ fontSize: "12px", color: "#3d4f64", lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 700px) { .terabox-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
