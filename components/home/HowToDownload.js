'use client';

import React from "react";
import { Link as LinkIcon, ClipboardPaste, Download, ArrowRight } from "lucide-react";

function HowToDownload() {
  const steps = [
    {
      icon: <LinkIcon size={22} />,
      color: '#3b82f6',
      glow: 'rgba(59,130,246,0.2)',
      title: "Copy the TeraBox Link",
      desc: "Find any public TeraBox video, image, or file and copy its share URL. You can grab it from Telegram, WhatsApp, or any shared post."
    },
    {
      icon: <ClipboardPaste size={22} />,
      color: '#34d399',
      glow: 'rgba(52,211,153,0.2)',
      title: "Paste into TeraFetch",
      desc: "Go to TeraFetch, paste the copied URL into the input box. Our system auto-detects the file type and prepares it for download."
    },
    {
      icon: <Download size={22} />,
      color: '#f59e0b',
      glow: 'rgba(245,158,11,0.2)',
      title: "Download Instantly",
      desc: "Click download once the file preview appears. Your content starts downloading immediately — no login, no waiting."
    }
  ];

  return (
    <section style={{
      background: '#080b12',
      padding: '80px 24px',
      position: 'relative',
    }}>
      {/* Divider line */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 12px',
            borderRadius: '100px',
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.2)',
            color: '#60a5fa',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '16px',
          }}>
            How It Works
          </span>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700,
            color: '#e8edf5',
            letterSpacing: '-0.02em',
            margin: '0 0 12px',
          }}>
            3 Simple Steps
          </h2>
          <p style={{ color: '#7a8799', fontSize: '16px', fontWeight: 300 }}>
            Download any TeraBox file in under 30 seconds
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {steps.map((step, index) => (
            <div key={index} style={{
              display: 'flex', alignItems: 'flex-start', gap: '24px',
              padding: '28px 32px',
              background: 'rgba(14,20,32,0.7)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              transition: 'all 0.25s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = step.color + '44';
              e.currentTarget.style.transform = 'translateX(4px)';
              e.currentTarget.style.boxShadow = `0 0 40px ${step.glow}`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              {/* Step number */}
              <div style={{
                position: 'absolute', top: '20px', right: '24px',
                fontSize: '52px',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                color: 'rgba(255,255,255,0.03)',
                lineHeight: 1,
                userSelect: 'none',
              }}>0{index + 1}</div>

              {/* Icon */}
              <div style={{
                width: '52px', height: '52px', flexShrink: 0,
                borderRadius: '14px',
                background: step.glow,
                border: `1px solid ${step.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: step.color,
              }}>
                {step.icon}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: step.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Step {index + 1}</span>
                </div>
                <h3 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#e8edf5',
                  margin: '0 0 8px',
                }}>{step.title}</h3>
                <p style={{ color: '#7a8799', fontSize: '14px', lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{step.desc}</p>
              </div>

              {/* Arrow (not last) */}
              {index < steps.length - 1 && (
                <div style={{ position: 'absolute', bottom: '-28px', left: '50px', color: 'rgba(255,255,255,0.1)', zIndex: 2 }}>
                  <ArrowRight size={16} style={{ transform: 'rotate(90deg)' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Telegram link */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{ color: '#7a8799', fontSize: '14px' }}>
            Need help?{' '}
            <a href="https://t.me/+2fvOF7WT0YBjZDM9" target="_blank" rel="noopener noreferrer" style={{
              color: '#60a5fa', fontWeight: 500, textDecoration: 'none',
              borderBottom: '1px solid rgba(96,165,250,0.3)',
            }}>Join our Telegram community</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowToDownload;
