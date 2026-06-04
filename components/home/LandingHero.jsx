"use client";
import { useState, useEffect } from "react";
import { Shield, Zap, Globe, Lock } from "lucide-react";
import TakeUrl from "@/components/home/TakeUrl";

export default function LandingHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const badges = [
    { icon: <Shield size={12} />, text: "No Login" },
    { icon: <Zap size={12} />, text: "Instant" },
    { icon: <Globe size={12} />, text: "All Regions" },
    { icon: <Lock size={12} />, text: "100% Private" },
  ];

  return (
    <section style={{
      position: "relative", minHeight: "100vh",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "80px 20px 60px", textAlign: "center", overflow: "hidden",
      background: "#060910",
    }}>
      {/* Radial glow bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,141,245,0.08) 0%, transparent 70%)",
      }} />
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 100%)",
      }} />

      {/* Floating orb left */}
      <div style={{
        position: "absolute", top: "18%", left: "8%", width: "320px", height: "320px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79,141,245,0.07) 0%, transparent 70%)",
        animation: "float 9s ease-in-out infinite", pointerEvents: "none",
      }} />
      {/* Floating orb right */}
      <div style={{
        position: "absolute", bottom: "15%", right: "8%", width: "260px", height: "260px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(45,212,164,0.06) 0%, transparent 70%)",
        animation: "float 12s ease-in-out infinite reverse", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "760px", width: "100%" }}>
        {/* Status pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          padding: "5px 14px", borderRadius: "100px", marginBottom: "28px",
          background: "rgba(79,141,245,0.08)", border: "1px solid rgba(79,141,245,0.18)",
          fontSize: "12px", fontWeight: 500, color: "#93c5fd", letterSpacing: "0.01em",
          opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease 0.1s",
        }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#2dd4a4", boxShadow: "0 0 6px #2dd4a4", flexShrink: 0 }} />
          Free · Fast · No Restrictions
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Geist', sans-serif",
          fontSize: "clamp(38px, 7vw, 72px)",
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: "-0.035em",
          color: "#f0f4fc",
          marginBottom: "20px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(14px)",
          transition: "all 0.6s ease 0.15s",
        }}>
          Download TeraBox{" "}
          <span style={{
            background: "linear-gradient(135deg, #93c5fd 0%, #5eead4 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Instantly
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: "clamp(15px, 2.5vw, 17px)", color: "#6b7a8d", fontWeight: 400,
          maxWidth: "500px", margin: "0 auto 32px", lineHeight: 1.7,
          opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 0.25s",
        }}>
          Paste any TeraBox link and get direct download access — no login, no speed caps.
        </p>

        {/* Badges */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center",
          marginBottom: "44px",
          opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 0.35s",
        }}>
          {badges.map((b, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              padding: "6px 12px", borderRadius: "100px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              fontSize: "12px", fontWeight: 500, color: "#9aa5b4",
            }}>
              <span style={{ color: "#4f8df5" }}>{b.icon}</span>
              {b.text}
            </span>
          ))}
        </div>

        {/* URL input */}
        <div style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 0.45s" }}>
          <TakeUrl />
        </div>

        {/* Social proof */}
        <p style={{
          marginTop: "32px", fontSize: "13px", color: "#3d4f64",
          opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 0.55s",
        }}>
          Supports terabox.com · 1024terabox.com · teraboxapp.com · teraboxshare.com
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-18px) scale(1.02); }
        }
      `}</style>
    </section>
  );
}
