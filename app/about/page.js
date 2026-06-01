


import { Cloud, Rocket, Heart, Shield, Zap, Users } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About TeraFetch | Fast & Secure TeraBox File Downloader",
  description: "Learn about TeraFetch — a free, secure, and user-friendly tool to download videos and files directly from TeraBox links without login.",
};

const cards = [
  { icon: <Cloud size={22} />, color: '#3b82f6', title: 'Direct Cloud Access', desc: 'Connects seamlessly with TeraBox to securely fetch file details and direct download links.' },
  { icon: <Rocket size={22} />, color: '#f59e0b', title: 'Instant Downloads', desc: 'Generates direct, fast download links in seconds for a completely smooth experience.' },
  { icon: <Heart size={22} />, color: '#f87171', title: 'User-First Design', desc: 'Designed with simplicity and privacy at its core — no tracking, no ads, just convenience.' },
  { icon: <Shield size={22} />, color: '#34d399', title: 'Secure & Private', desc: 'We never store your files or personal data. Your activity remains entirely private.' },
  { icon: <Zap size={22} />, color: '#a78bfa', title: 'No Registration', desc: 'Use the tool instantly without creating an account or providing any personal information.' },
  { icon: <Users size={22} />, color: '#60a5fa', title: 'Community Driven', desc: 'Backed by an active Telegram community for support, updates, and feature requests.' },
];

export default function AboutTeraFetch() {
  return (
    <div style={{ background: '#080b12', minHeight: '100vh', padding: '80px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 12px', borderRadius: '100px',
            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
            color: '#60a5fa', fontSize: '12px', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px',
          }}>
            About Us
          </span>
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(36px, 6vw, 60px)',
            fontWeight: 800, color: '#e8edf5',
            letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '20px',
          }}>
            Built for Speed,<br />
            <span style={{
              background: 'linear-gradient(135deg, #60a5fa, #34d399)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Built for You</span>
          </h1>
          <p style={{ color: '#7a8799', fontSize: '17px', lineHeight: 1.8, fontWeight: 300, maxWidth: '580px', margin: '0 auto 32px' }}>
            TeraFetch is a free and secure web app that lets you download videos and files from TeraBox without signing in. Quick, private, and completely hassle-free.
          </p>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 28px',
            borderRadius: '12px',
            fontSize: '15px', fontWeight: 600, color: 'white',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            textDecoration: 'none',
            boxShadow: '0 8px 25px rgba(59,130,246,0.35)',
          }}>
            Try TeraFetch Free
          </Link>
        </div>

        {/* Feature Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="about-grid">
          {cards.map((c, i) => (
            <div key={i} style={{
              padding: '28px',
              background: 'rgba(14,20,32,0.8)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = c.color + '44';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: c.color + '18', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: c.color, marginBottom: '16px',
              }}>{c.icon}</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '17px', fontWeight: 700, color: '#e8edf5', margin: '0 0 8px' }}>{c.title}</h3>
              <p style={{ color: '#7a8799', fontSize: '14px', margin: 0, lineHeight: 1.65, fontWeight: 300 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Strip */}
        <div style={{
          marginTop: '64px',
          padding: '40px',
          background: 'rgba(59,130,246,0.06)',
          border: '1px solid rgba(59,130,246,0.15)',
          borderRadius: '20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)',
          }} />
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '26px', fontWeight: 700, color: '#e8edf5', margin: '0 0 12px' }}>
            Start Downloading Today
          </h2>
          <p style={{ color: '#7a8799', fontSize: '15px', fontWeight: 300, margin: '0 0 24px' }}>
            Join thousands who use TeraFetch daily for fast, free TeraBox downloads.
          </p>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 28px',
            borderRadius: '10px',
            fontSize: '15px', fontWeight: 600, color: 'white',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            textDecoration: 'none',
          }}>
            Get Started — It's Free
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .about-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
