"use client";
import React from "react";
import { Cloud, ShieldCheck, Share2, FolderOpen, Zap } from "lucide-react";

const features = [
  { icon: <ShieldCheck size={20} />, title: 'Secure Storage', desc: '1TB of encrypted cloud space for all your files', color: '#3b82f6' },
  { icon: <FolderOpen size={20} />, title: 'Smart Organization', desc: 'Auto-categorize photos, videos, and documents', color: '#34d399' },
  { icon: <Share2 size={20} />, title: 'Easy Sharing', desc: 'Share files with anyone via a single link', color: '#f59e0b' },
  { icon: <Cloud size={20} />, title: 'Always Available', desc: 'Access from any device, anywhere in the world', color: '#a78bfa' },
];

function WhatIsTerabox() {
  return (
    <section style={{
      background: '#080b12',
      padding: '80px 24px',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Ad placeholder */}
        <div style={{
          margin: '0 auto 56px',
          maxWidth: '728px',
          height: '90px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px dashed rgba(255,255,255,0.06)',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#4a5568', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          Advertisement
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="stack-mobile">
          {/* Left: text */}
          <div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '4px 12px',
              borderRadius: '100px',
              background: 'rgba(167,139,250,0.1)',
              border: '1px solid rgba(167,139,250,0.2)',
              color: '#a78bfa',
              fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: '20px',
            }}>
              <Cloud size={12} /> Cloud Storage
            </span>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(26px, 4vw, 36px)',
              fontWeight: 700,
              color: '#e8edf5',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              margin: '0 0 16px',
            }}>What is TeraBox?</h2>
            <p style={{ color: '#7a8799', fontSize: '15px', lineHeight: 1.8, fontWeight: 300, marginBottom: '16px' }}>
              <strong style={{ color: '#a0aec0', fontWeight: 500 }}>TeraBox</strong> is a popular free cloud storage platform offering up to <strong style={{ color: '#60a5fa', fontWeight: 500 }}>1TB of secure storage</strong> for photos, videos, and documents.
            </p>
            <p style={{ color: '#7a8799', fontSize: '15px', lineHeight: 1.8, fontWeight: 300 }}>
              It lets you store, share, and access your files from any device — perfect for backing up large media collections.
            </p>

            {/* Highlight stat */}
            <div style={{
              marginTop: '24px',
              padding: '16px 20px',
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <Zap size={20} color="#60a5fa" />
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: 700, color: '#60a5fa' }}>1TB Free</div>
                <div style={{ fontSize: '13px', color: '#7a8799' }}>No credit card required</div>
              </div>
            </div>
          </div>

          {/* Right: feature cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {features.map((f, i) => (
              <div key={i} style={{
                padding: '20px',
                background: 'rgba(14,20,32,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px',
                transition: 'all 0.25s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = f.color + '44';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 12px 30px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  width: '38px', height: '38px',
                  borderRadius: '10px',
                  background: f.color + '18',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: f.color,
                  marginBottom: '12px',
                }}>{f.icon}</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '14px', fontWeight: 600, color: '#e8edf5', marginBottom: '6px' }}>{f.title}</div>
                <div style={{ fontSize: '12px', color: '#4a5568', lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .stack-mobile { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

export default WhatIsTerabox;
