"use client";
import React from "react";
import Link from "next/link";
import { Zap, Send, Shield, ExternalLink, Github } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    product: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'DMCA Policy', href: '/dmca-policy' },
      { name: 'Disclaimer', href: '/#disclaimer' },
    ],
    community: [
      { name: 'Telegram', href: 'https://t.me/+2fvOF7WT0YBjZDM9', external: true },
    ],
  };

  return (
    <footer style={{
      background: '#050810',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '64px 24px 32px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '56px' }} className="footer-grid">
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}>
              <div style={{
                width: '32px', height: '32px',
                background: 'linear-gradient(135deg, #3b82f6, #34d399)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap size={18} color="white" strokeWidth={2.5} />
              </div>
              <span style={{
                fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700,
                background: 'linear-gradient(135deg, #60a5fa, #34d399)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>TeraFetch</span>
            </Link>
            <p style={{ color: '#4a5568', fontSize: '14px', lineHeight: 1.7, fontWeight: 300, margin: '0 0 20px', maxWidth: '260px' }}>
              The fastest way to download files and videos from TeraBox — free, secure, and no login required.
            </p>
            {/* Social */}
            <a href="https://t.me/+2fvOF7WT0YBjZDM9" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.2)',
              color: '#60a5fa',
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}>
              <Send size={14} /> Join Telegram
            </a>
          </div>

          {/* Product links */}
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '13px', fontWeight: 600, color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {links.product.map(l => (
                <Link key={l.name} href={l.href} style={{
                  color: '#4a5568', fontSize: '14px', fontWeight: 400, textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}>
                  {l.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '13px', fontWeight: 600, color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {links.legal.map(l => (
                <Link key={l.name} href={l.href} style={{
                  color: '#4a5568', fontSize: '14px', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#e8edf5'}
                onMouseLeave={e => e.currentTarget.style.color = '#4a5568'}>
                  <Shield size={13} /> {l.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '13px', fontWeight: 600, color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Community</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {links.community.map(l => (
                <a key={l.name} href={l.href} target={l.external ? '_blank' : undefined} rel={l.external ? 'noopener noreferrer' : undefined} style={{
                  color: '#4a5568', fontSize: '14px', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
                onMouseLeave={e => e.currentTarget.style.color = '#4a5568'}>
                  {l.name} {l.external && <ExternalLink size={11} />}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ color: '#2d3748', fontSize: '13px', margin: 0 }}>
            © {year} <span style={{ color: '#3d4f6e' }}>TeraFetch</span>. Not affiliated with TeraBox or Flextech Inc.
          </p>
          <p style={{ color: '#2d3748', fontSize: '13px', margin: 0 }}>
            Built for fast, free downloads.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
