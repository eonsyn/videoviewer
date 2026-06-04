"use client";
import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqs = [
  { q: "How does TeraFetch work?", a: "TeraFetch generates direct download links for files hosted on TeraBox. Simply paste a public TeraBox link, and we resolve it to a direct, fast download URL — no login required." },
  { q: "Can I generate unlimited download links?", a: "Yes! TeraFetch is completely free and unlimited. Generate as many direct download links as you need." },
  { q: "Does it work with all TeraBox links?", a: "TeraFetch supports public TeraBox share links for individual files. Folder links are not currently supported — we're working on adding that feature." },
  { q: "Is it legal to use this tool?", a: "Yes, as long as you're downloading content you have legal rights to access. TeraFetch only generates links for publicly shared files." },
  { q: "Do I need an account?", a: "No account needed. Just visit the website, paste your link, and download — it takes less than 10 seconds." },
  { q: "Is my data safe and private?", a: "Absolutely. We don't collect personal data, log your downloads, or store any files. Your privacy is our priority." },
];

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section style={{ background: "#060910", padding: "80px 20px", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
      }} />

      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "4px 12px", borderRadius: "100px", marginBottom: "16px",
            background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.18)",
            color: "#f5a623", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>
            <HelpCircle size={11} /> FAQ
          </div>
          <h2 style={{
            fontFamily: "'Geist', sans-serif", fontSize: "clamp(26px, 4vw, 36px)",
            fontWeight: 700, color: "#f0f4fc", letterSpacing: "-0.025em", margin: 0,
          }}>Frequently Asked Questions</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                background: isOpen ? "rgba(79,141,245,0.05)" : "#0c1018",
                border: `1px solid ${isOpen ? "rgba(79,141,245,0.22)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: "12px", overflow: "hidden", transition: "all 0.2s ease",
              }}>
                <button onClick={() => setOpen(isOpen ? null : i)} style={{
                  width: "100%", padding: "18px 20px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "none", border: "none", cursor: "pointer",
                  textAlign: "left", gap: "12px",
                }}>
                  <span style={{
                    fontFamily: "'Geist', sans-serif", fontSize: "15px",
                    fontWeight: isOpen ? 600 : 500,
                    color: isOpen ? "#93c5fd" : "#c8d6e8", transition: "color 0.2s",
                  }}>{item.q}</span>
                  <ChevronDown size={16} style={{
                    flexShrink: 0, color: isOpen ? "#93c5fd" : "#3d4f64",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "all 0.25s ease",
                  }} />
                </button>
                <div style={{
                  maxHeight: isOpen ? "200px" : "0",
                  overflow: "hidden", transition: "max-height 0.3s ease",
                }}>
                  <p style={{
                    padding: "0 20px 18px", color: "#6b7a8d",
                    fontSize: "14px", lineHeight: 1.75, margin: 0, fontWeight: 400,
                  }}>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: "44px", height: "90px",
          background: "rgba(255,255,255,0.018)", border: "1px dashed rgba(255,255,255,0.05)",
          borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",
          color: "#2d3a4a", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
        }}>Advertisement</div>
      </div>
    </section>
  );
}
