import React from "react";
import { ShieldCheck, AlertTriangle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Disclaimer() {
  return (
    <section style={{ background: "#060910", padding: "80px 20px", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
      }} />

      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "4px 12px", borderRadius: "100px", marginBottom: "16px",
            background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.15)",
            color: "#f87171", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>
            <AlertTriangle size={11} /> Legal
          </div>
          <h2 style={{
            fontFamily: "'Geist', sans-serif", fontSize: "clamp(24px, 3.5vw, 34px)",
            fontWeight: 700, color: "#f0f4fc", letterSpacing: "-0.025em", margin: 0,
          }}>Disclaimer</h2>
        </div>

        <div style={{
          background: "#0c1018", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "16px", padding: "28px", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(248,113,113,0.3), transparent)",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", color: "#6b7a8d", fontSize: "14px", lineHeight: 1.8 }}>
            <p style={{ margin: 0 }}>
              <strong style={{ color: "#9aa5b4", fontWeight: 500 }}>TeraFetch</strong> is an independent tool to help users download files from TeraBox shared links. This site is{" "}
              <strong style={{ color: "#f0f4fc", fontWeight: 500 }}>not affiliated</strong> with{" "}
              <span style={{ color: "#93c5fd" }}>terabox.app</span> or <span style={{ color: "#93c5fd" }}>Flextech Inc.</span>
            </p>
            <p style={{ margin: 0 }}>
              Our application provides <strong style={{ color: "#9aa5b4", fontWeight: 500 }}>direct download links</strong> for publicly accessible TeraBox files. We do not host, upload, or store any files. All downloads come directly from official TeraBox servers.
            </p>
            <p style={{ margin: 0 }}>
              PlayTera respects all applicable <strong style={{ color: "#9aa5b4", fontWeight: 500 }}>copyright laws</strong> and encourages users to download only content they have legal rights to access.
            </p>

            <div style={{
              display: "flex", alignItems: "flex-start", gap: "12px",
              padding: "16px 18px", background: "rgba(248,113,113,0.05)",
              border: "1px solid rgba(248,113,113,0.12)", borderRadius: "10px", marginTop: "4px",
            }}>
              <ShieldCheck size={18} style={{ color: "#f87171", flexShrink: 0, marginTop: "2px" }} />
              <div>
                <p style={{ margin: "0 0 8px", color: "#9aa5b4", fontSize: "13px" }}>
                  If you are a content owner and believe this service infringes your rights, please contact us immediately.
                </p>
                <a href="https://t.me/+2fvOF7WT0YBjZDM9" target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  color: "#93c5fd", fontWeight: 500, fontSize: "13px",
                  borderBottom: "1px solid rgba(147,197,253,0.25)", paddingBottom: "1px",
                }}>
                  Contact via Telegram <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
