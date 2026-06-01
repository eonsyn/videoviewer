"use client";

import { Cloud, Rocket, Heart, Shield, Zap, Users } from "lucide-react";

const cards = [
  { icon: <Cloud size={22} />, color: '#3b82f6', title: 'Direct Cloud Access', desc: 'Connects seamlessly with TeraBox to securely fetch file details and direct download links.' },
  { icon: <Rocket size={22} />, color: '#f59e0b', title: 'Instant Downloads', desc: 'Generates direct, fast download links in seconds for a completely smooth experience.' },
  { icon: <Heart size={22} />, color: '#f87171', title: 'User-First Design', desc: 'Designed with simplicity and privacy at its core — no tracking, no ads, just convenience.' },
  { icon: <Shield size={22} />, color: '#34d399', title: 'Secure & Private', desc: 'We never store your files or personal data. Your activity remains entirely private.' },
  { icon: <Zap size={22} />, color: '#a78bfa', title: 'No Registration', desc: "Use the tool instantly without creating an account or providing any personal information." },
  { icon: <Users size={22} />, color: '#60a5fa', title: 'Community Driven', desc: 'Backed by an active Telegram community for support, updates, and feature requests.' },
];

export default function InteractiveGrid() {
  return (
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
  );
}
