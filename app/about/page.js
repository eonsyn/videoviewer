import Link from "next/link";
import InteractiveGrid from "./InteractiveGrid";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "About TeraFetch | Fast & Secure TeraBox File Downloader",
  description: "Learn about TeraFetch — a free, secure, and user-friendly tool to download videos and files directly from TeraBox links without login.",
};

export const dynamic = "force-static";

export default function AboutTeraFetch() {
  return (
    <div style={{ background: "#060910", minHeight: "100vh", padding: "60px 20px 80px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "4px 12px", borderRadius: "100px", marginBottom: "20px",
            background: "rgba(79,141,245,0.08)", border: "1px solid rgba(79,141,245,0.15)",
            color: "#93c5fd", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>About Us</div>
          <h1 style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: "clamp(36px, 6vw, 60px)",
            fontWeight: 800, color: "#f0f4fc", letterSpacing: "-0.035em",
            lineHeight: 1.1, marginBottom: "20px",
          }}>
            Built for Speed,{" "}
            <span style={{
              background: "linear-gradient(135deg, #93c5fd, #5eead4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Built for You</span>
          </h1>
          <p style={{ color: "#6b7a8d", fontSize: "16px", lineHeight: 1.8, maxWidth: "540px", margin: "0 auto 32px" }}>
            TeraFetch is a free and secure web app that lets you download videos and files from TeraBox without signing in. Quick, private, and completely hassle-free.
          </p>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "12px 24px", borderRadius: "10px",
            fontSize: "14px", fontWeight: 600, color: "white", textDecoration: "none",
            background: "linear-gradient(135deg, #4f8df5, #2563eb)",
            boxShadow: "0 4px 20px rgba(79,141,245,0.35)", transition: "opacity 0.2s",
          }}
          >
            Try TeraFetch Free <ArrowRight size={14} />
          </Link>
        </div>

        <InteractiveGrid />

        {/* CTA strip */}
        <div style={{
          marginTop: "64px", padding: "36px 28px", borderRadius: "18px", textAlign: "center",
          background: "linear-gradient(135deg, rgba(79,141,245,0.08) 0%, rgba(45,212,164,0.06) 100%)",
          border: "1px solid rgba(79,141,245,0.15)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(147,197,253,0.4), transparent)",
          }} />
          <h2 style={{ fontFamily: "'Geist', sans-serif", fontSize: "24px", fontWeight: 700, color: "#f0f4fc", margin: "0 0 10px" }}>
            Ready to start downloading?
          </h2>
          <p style={{ color: "#6b7a8d", fontSize: "14px", marginBottom: "20px" }}>
            Paste any TeraBox link and get your file in seconds.
          </p>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "11px 22px", borderRadius: "9px",
            fontSize: "14px", fontWeight: 600, color: "white", textDecoration: "none",
            background: "linear-gradient(135deg, #4f8df5, #2563eb)",
            boxShadow: "0 4px 18px rgba(79,141,245,0.35)",
          }}>
            Get Started <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
