import React from "react";
import { Shield, Mail, ExternalLink, FileText, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "DMCA Policy | TeraFetch",
  description: "PlayTera DMCA Policy — how we handle copyright infringement notices and content removal requests.",
};

export const dynamic = "force-static";

const sections = [
  {
    icon: <FileText size={18} />, color: "#93c5fd",
    title: "Our Role",
    content: "PlayTera does not host, store, or distribute any copyrighted content. We only generate direct download links for publicly shared files already hosted on TeraBox servers. We have no control over or access to the content on TeraBox.",
  },
  {
    icon: <AlertTriangle size={18} />, color: "#f5a623",
    title: "Copyright Infringement Claims",
    content: "If you believe that content accessible through our service infringes your copyright, please submit a DMCA takedown notice via our Telegram channel. Your notice should include: identification of the copyrighted work, the infringing URL, your contact information, and a statement of good faith belief.",
  },
  {
    icon: <Shield size={18} />, color: "#2dd4a4",
    title: "Our Response",
    content: "Upon receiving a valid DMCA notice, we will review the claim promptly and take appropriate action within 48 hours. This may include disabling access to the reported link through our service.",
  },
  {
    icon: <Mail size={18} />, color: "#a78bfa",
    title: "Counter Notices",
    content: "If you believe your content was wrongfully removed, you may submit a counter-notice with supporting information through our Telegram channel. Counter-notices should include your contact information and a statement under penalty of perjury.",
  },
];

export default function DmcaPolicy() {
  return (
    <div style={{ background: "#060910", minHeight: "100vh", padding: "60px 20px 80px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "44px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "4px 12px", borderRadius: "100px", marginBottom: "16px",
            background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.15)",
            color: "#f87171", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>
            <Shield size={11} /> Legal Policy
          </div>
          <h1 style={{
            fontFamily: "'Geist', sans-serif", fontSize: "clamp(30px, 5vw, 46px)",
            fontWeight: 800, color: "#f0f4fc", letterSpacing: "-0.03em", margin: "0 0 14px",
          }}>DMCA Policy</h1>
          <p style={{ color: "#6b7a8d", fontSize: "15px", lineHeight: 1.75 }}>
            PlayTera respects intellectual property rights and responds promptly to copyright infringement notices under the Digital Millennium Copyright Act (DMCA).
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {sections.map((s, i) => (
            <div key={i} style={{
              padding: "24px 24px",
              background: "#0c1018", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "14px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  background: s.color + "14", color: s.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{s.icon}</div>
                <h2 style={{ fontFamily: "'Geist', sans-serif", fontSize: "16px", fontWeight: 700, color: "#f0f4fc", margin: 0 }}>{s.title}</h2>
              </div>
              <p style={{ color: "#6b7a8d", fontSize: "14px", lineHeight: 1.75, margin: 0 }}>{s.content}</p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div style={{
          marginTop: "12px", padding: "24px",
          background: "rgba(79,141,245,0.06)", border: "1px solid rgba(79,141,245,0.14)",
          borderRadius: "14px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
        }}>
          <div>
            <h3 style={{ fontFamily: "'Geist', sans-serif", fontSize: "16px", fontWeight: 700, color: "#f0f4fc", margin: "0 0 4px" }}>Submit a DMCA Notice</h3>
            <p style={{ color: "#6b7a8d", fontSize: "13px", margin: 0 }}>Contact us on Telegram for fastest response</p>
          </div>
          <a href="https://t.me/+2fvOF7WT0YBjZDM9" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "10px 20px", borderRadius: "9px", fontSize: "13px", fontWeight: 600,
            color: "white", background: "linear-gradient(135deg, #4f8df5, #2563eb)",
            textDecoration: "none", whiteSpace: "nowrap",
            boxShadow: "0 3px 14px rgba(79,141,245,0.35)",
          }}>
            <Mail size={14} /> Contact Us <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
