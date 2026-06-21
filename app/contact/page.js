import { MessageCircle, Send, Mail, ArrowRight } from "lucide-react";
import ContactCTA from "@/components/contact/ContactCTA";

export const metadata = {
  title: "Contact TeraFetch  | Get Support & Updates",
  description: "Join the official TeraFetch  Telegram channel for updates, new features, and direct support.",
};

export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <div style={{ background: "#060910", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 20px" }}>
      <div style={{ maxWidth: "520px", width: "100%", textAlign: "center" }}>
        {/* Icon */}
        <div style={{
          width: "64px", height: "64px", borderRadius: "16px",
          background: "linear-gradient(135deg, rgba(79,141,245,0.15), rgba(45,212,164,0.1))",
          border: "1px solid rgba(79,141,245,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px", color: "#93c5fd",
        }}>
          <MessageCircle size={28} />
        </div>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "4px 12px", borderRadius: "100px", marginBottom: "16px",
          background: "rgba(79,141,245,0.08)", border: "1px solid rgba(79,141,245,0.15)",
          color: "#93c5fd", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
        }}>Contact</div>

        <h1 style={{
          fontFamily: "'Geist', sans-serif", fontSize: "clamp(28px, 5vw, 42px)",
          fontWeight: 800, color: "#f0f4fc", letterSpacing: "-0.03em", marginBottom: "14px",
        }}>Get in Touch</h1>

        <p style={{ color: "#6b7a8d", fontSize: "15px", lineHeight: 1.7, marginBottom: "36px" }}>
          Have a question, issue, or feedback? Join our Telegram community for direct support, announcements, and updates from the TeraFetch  team.
        </p>

        <a href="https://t.me/+2fvOF7WT0YBjZDM9" target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: "9px",
          padding: "14px 28px", borderRadius: "12px",
          fontSize: "15px", fontWeight: 600, color: "white",
          background: "linear-gradient(135deg, #4f8df5, #2563eb)",
          boxShadow: "0 4px 20px rgba(79,141,245,0.4)",
          textDecoration: "none", transition: "opacity 0.2s",
        }}
        >
          <Send size={16} /> Join Our Telegram
        </a>

        <p style={{ marginTop: "20px", color: "#3d4f64", fontSize: "13px" }}>
          We typically respond within a few hours.
        </p>

        <ContactCTA />
      </div>
    </div>
  );
}
