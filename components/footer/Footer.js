"use client";
import React from "react";
import Link from "next/link";
import { Zap, Send, Shield, ExternalLink } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    product: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "DMCA Policy", href: "/dmca-policy" },
      { name: "Disclaimer", href: "/#disclaimer" },
    ],
    community: [
      { name: "Telegram", href: "https://t.me/+2fvOF7WT0YBjZDM9", external: true },
    ],
  };

  return (
    <footer style={{ background: "#04060c", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "60px 20px 28px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: "48px" }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none", marginBottom: "14px" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "7px",
                background: "linear-gradient(135deg, #4f8df5, #2dd4a4)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Zap size={15} color="white" strokeWidth={2.5} />
              </div>
              <span style={{
                fontFamily: "'Geist', sans-serif", fontSize: "16px", fontWeight: 700,
                background: "linear-gradient(135deg, #93c5fd, #5eead4)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>TeraFetch</span>
            </Link>
            <p style={{ color: "#3d4f64", fontSize: "13px", lineHeight: 1.7, margin: "0 0 18px", maxWidth: "220px" }}>
              The fastest way to download from TeraBox — free, secure, no login required.
            </p>
            <a href="https://t.me/+2fvOF7WT0YBjZDM9" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "7px 14px", borderRadius: "8px",
              background: "rgba(79,141,245,0.08)", border: "1px solid rgba(79,141,245,0.15)",
              color: "#93c5fd", fontSize: "12px", fontWeight: 500,
              textDecoration: "none", transition: "all 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(79,141,245,0.14)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(79,141,245,0.08)"}
            >
              <Send size={12} /> Join Telegram
            </a>
          </div>

          {[
            { title: "Product", items: links.product },
            { title: "Legal", items: links.legal },
            { title: "Community", items: links.community },
          ].map(({ title, items }) => (
            <div key={title}>
              <h4 style={{ fontFamily: "'Geist', sans-serif", fontSize: "11px", fontWeight: 600, color: "#6b7a8d", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>
                {title}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {items.map((l) => (
                  <a key={l.name} href={l.href} target={l.external ? "_blank" : undefined} rel={l.external ? "noopener noreferrer" : undefined} style={{
                    color: "#3d4f64", fontSize: "13px", textDecoration: "none",
                    display: "flex", alignItems: "center", gap: "4px", transition: "color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#9aa5b4"}
                  onMouseLeave={e => e.currentTarget.style.color = "#3d4f64"}
                  >
                    {l.name} {l.external && <ExternalLink size={10} />}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.04)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "8px",
        }}>
          <p style={{ color: "#1e2d40", fontSize: "12px", margin: 0 }}>
            © {year} <span style={{ color: "#2d3a4a" }}>TeraFetch</span> · Not affiliated with TeraBox or Flextech Inc.
          </p>
          <p style={{ color: "#1e2d40", fontSize: "12px", margin: 0 }}>Built for fast, free downloads.</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
