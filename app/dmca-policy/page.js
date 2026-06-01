import React from "react";
import { Shield, Mail, ExternalLink, FileText, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "DMCA Policy | TeraFetch",
  description: "TeraFetch DMCA Policy — how we handle copyright infringement notices and content removal requests.",
};

export default function DmcaPolicy() {
  return (
    <div style={{ background: '#080b12', minHeight: '100vh', padding: '80px 24px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 12px', borderRadius: '100px',
            background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)',
            color: '#f87171', fontSize: '12px', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px',
          }}>
            <Shield size={12} /> Legal Policy
          </span>
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800, color: '#e8edf5',
            letterSpacing: '-0.03em', margin: '0 0 16px',
          }}>DMCA Policy</h1>
          <p style={{ color: '#7a8799', fontSize: '15px', lineHeight: 1.7, fontWeight: 300 }}>
            TeraFetch respects intellectual property rights and responds promptly to copyright infringement notices under the Digital Millennium Copyright Act (DMCA).
          </p>
        </div>

        {/* Sections */}
        {[
          {
            icon: <FileText size={20} />,
            color: '#60a5fa',
            title: 'Our Role',
            content: 'TeraFetch does not host, store, or distribute any copyrighted content. We only generate direct download links for publicly shared files already hosted on TeraBox servers. We have no control over or access to the content on TeraBox.'
          },
          {
            icon: <AlertTriangle size={20} />,
            color: '#f59e0b',
            title: 'Copyright Infringement Claims',
            content: 'If you believe that content accessible through our service infringes your copyright, please submit a DMCA takedown notice via our Telegram channel. Your notice should include: identification of the copyrighted work, the infringing URL, your contact information, and a statement of good faith belief that the use is unauthorized.'
          },
          {
            icon: <Shield size={20} />,
            color: '#34d399',
            title: 'Our Response',
            content: 'Upon receiving a valid DMCA notice, we will review the claim promptly and take appropriate action within 48 hours. This may include disabling access to the reported link through our service.'
          },
          {
            icon: <Mail size={20} />,
            color: '#a78bfa',
            title: 'Counter Notices',
            content: 'If you believe your content was wrongfully removed, you may submit a counter-notice with supporting information through our Telegram channel. Counter-notices should include your contact information and a statement under penalty of perjury that removal was mistaken.'
          },
        ].map((section, i) => (
          <div key={i} style={{
            padding: '28px 32px',
            background: 'rgba(14,20,32,0.8)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            marginBottom: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: section.color + '18', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: section.color,
              }}>{section.icon}</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700, color: '#e8edf5', margin: 0 }}>{section.title}</h2>
            </div>
            <p style={{ color: '#7a8799', fontSize: '15px', lineHeight: 1.75, margin: 0, fontWeight: 300 }}>{section.content}</p>
          </div>
        ))}

        {/* Contact CTA */}
        <div style={{
          marginTop: '8px',
          padding: '32px',
          background: 'rgba(59,130,246,0.06)',
          border: '1px solid rgba(59,130,246,0.15)',
          borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px',
        }}>
          <div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700, color: '#e8edf5', margin: '0 0 6px' }}>Submit a DMCA Notice</h3>
            <p style={{ color: '#7a8799', fontSize: '14px', margin: 0, fontWeight: 300 }}>Contact us through our Telegram channel for fastest response</p>
          </div>
          <a href="https://t.me/+2fvOF7WT0YBjZDM9" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 24px',
            borderRadius: '10px', fontSize: '14px', fontWeight: 600,
            color: 'white',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            textDecoration: 'none', whiteSpace: 'nowrap',
          }}>
            <Mail size={16} /> Contact Us <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
