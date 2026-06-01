"use client";

import React from 'react';
import { Send, ExternalLink } from 'lucide-react';

export default function ContactCTA() {
  return (
    <a
      href="https://t.me/+2fvOF7WT0YBjZDM9"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '16px 32px',
        borderRadius: '14px',
        fontSize: '16px',
        fontWeight: 600,
        color: 'white',
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        textDecoration: 'none',
        boxShadow: '0 8px 25px rgba(59,130,246,0.35)',
        marginBottom: '16px',
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 12px 35px rgba(59,130,246,0.5)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(59,130,246,0.35)';
      }}
    >
      <Send size={18} /> Join Telegram Community <ExternalLink size={14} />
    </a>
  );
}
