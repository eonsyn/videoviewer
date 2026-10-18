"use client";
import { Cloud, Rocket, Heart, Shield, Zap, Users } from "lucide-react";

const cards = [
  { icon: <Cloud size={20} />, color: "#4f8df5", title: "Direct Cloud Access", desc: "Connects seamlessly with TeraBox to securely fetch file details and direct download links." },
  { icon: <Rocket size={20} />, color: "#f5a623", title: "Instant Downloads", desc: "Generates direct, fast download links in seconds for a completely smooth experience." },
  { icon: <Heart size={20} />, color: "#f87171", title: "User-First Design", desc: "Designed with simplicity and privacy at its core — no tracking, no ads, just convenience." },
  { icon: <Shield size={20} />, color: "#2dd4a4", title: "Secure & Private", desc: "We never store your files or personal data. Your activity remains entirely private." },
  { icon: <Zap size={20} />, color: "#a78bfa", title: "No Registration", desc: "Use the tool instantly without creating an account or providing any personal information." },
  { icon: <Users size={20} />, color: "#93c5fd", title: "Community Driven", desc: "Backed by an active Telegram community for support, updates, and feature requests." },
];

export default function InteractiveGrid() {
  return (
    <>
      <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {cards.map((c, i) => (
          <div key={i} style={{
            padding: "22px", background: "#0c1018",
            border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = c.color + "2a";
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,0,0,0.35)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "11px",
              background: c.color + "14", color: c.color,
              display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px",
            }}>{c.icon}</div>
            <h3 style={{ fontFamily: "'Geist', sans-serif", fontSize: "15px", fontWeight: 700, color: "#f0f4fc", margin: "0 0 7px" }}>{c.title}</h3>
            <p style={{ color: "#6b7a8d", fontSize: "13px", margin: 0, lineHeight: 1.65 }}>{c.desc}</p>
          </div>
        ))}
      </div>
      <style>{`@media (max-width: 640px) { .about-grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 400px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
