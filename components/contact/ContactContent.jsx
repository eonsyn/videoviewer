"use client";

import React from 'react';
import { Send, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ContactContent() {
  return (
    <div style={{ background: '#080b12', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      <div style={{ maxWidth: '560px', width: '100%', textAlign: 'center' }}>
        {/* Icon */}
        <div style={{
          width: '72px', height: '72px',
          background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(52,211,153,0.15))',
          border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: '20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
          color: '#60a5fa',
        }}>
          <MessageCircle size={32} />
        </div>

        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '4px 12px', borderRadius: '100px',
          background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
          color: '#60a5fa', fontSize: '12px', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px',
        }}>
          Contact
        </span>

        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(32px, 6vw, 52px)',
          fontWeight: 800, color: '#e8edf5',
          letterSpacing: '-0.03em', marginBottom: '16px',
        }}>Get In Touch</h1>

        <p style={{ color: '#7a8799', fontSize: '16px', lineHeight: 1.75, fontWeight: 300, marginBottom: '40px' }}>
          Have a question, found a bug, or want to share feedback? Join our active Telegram community for instant support and the latest updates.
        </p>

        {/* Primary CTA */}
        <a href="https://t.me/+2fvOF7WT0YBjZDM9" target="_blank" rel="noopener noreferrer" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          padding: '16px 32px',
          borderRadius: '14px',
          fontSize: '16px', fontWeight: 600, color: 'white',
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          textDecoration: 'none',
          boxShadow: '0 8px 25px rgba(59,130,246,0.35)',
          marginBottom: '16px',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 35px rgba(59,130,246,0.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(59,130,246,0.35)'; }}>
          <Send size={18} /> Join Telegram Community <ExternalLink size={14} />
        </a>

        <p style={{ color: '#4a5568', fontSize: '13px', marginBottom: '48px' }}>
          Usually respond within 24 hours
        </p>

        {/* Feature chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
          {['Bug Reports', 'Feature Requests', 'Download Help', 'General Questions'].map(tag => (
            <span key={tag} style={{
              padding: '6px 14px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: '#7a8799', fontSize: '13px', fontWeight: 400,
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
