"use client";
import React from "react";
import { Zap, Lock, Globe, Star } from "lucide-react";

const highlights = [
  { icon: <Zap size={18} />, color: '#f59e0b', title: 'Lightning Fast', desc: 'Direct download links generated in under 2 seconds' },
  { icon: <Lock size={18} />, color: '#34d399', title: 'No Login Needed', desc: 'Zero registration required to start downloading' },
  { icon: <Globe size={18} />, color: '#3b82f6', title: 'Works Globally', desc: 'Access TeraBox files from any country or region' },
  { icon: <Star size={18} />, color: '#a78bfa', title: 'Completely Free', desc: 'No hidden fees, subscriptions, or paywalls' },
];

function WhatIsTeraboxNetlify() {
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
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 12px', borderRadius: '100px',
            background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)',
            color: '#34d399', fontSize: '12px', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px',
          }}>
            <Zap size={12} /> Why TeraFetch
          </span>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(26px, 4vw, 38px)',
            fontWeight: 700, color: '#e8edf5', letterSpacing: '-0.02em',
            margin: '0 0 12px',
          }}>Why Choose TeraFetch?</h2>
          <p style={{ color: '#7a8799', fontSize: '15px', fontWeight: 300, maxWidth: '500px', margin: '0 auto' }}>
            The fastest and most reliable way to download from TeraBox — trusted by thousands daily.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px',
        }} className="why-grid">
          {highlights.map((item, i) => (
            <div key={i} style={{
              padding: '28px',
              background: 'rgba(14,20,32,0.8)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              display: 'flex', alignItems: 'flex-start', gap: '18px',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = item.color + '44';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px ${item.color}22`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '44px', height: '44px', flexShrink: 0,
                borderRadius: '12px',
                background: item.color + '18',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: item.color,
              }}>{item.icon}</div>
              <div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '17px', fontWeight: 700, color: '#e8edf5', margin: '0 0 6px' }}>{item.title}</h3>
                <p style={{ color: '#7a8799', fontSize: '14px', margin: 0, lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 640px) { .why-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

export default WhatIsTeraboxNetlify;
