"use client";
import { useState, useEffect } from 'react';
import { Shield, Zap, Globe } from 'lucide-react';
import TakeUrl from "@/components/home/TakeUrl";

export default function LandingHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);



  const badges = [
    { icon: <Shield size={14} />, text: 'No Login Required' },
    { icon: <Zap size={14} />, text: 'Instant Links' },
    { icon: <Globe size={14} />, text: 'All Regions' },
  ];

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 24px 80px',
      textAlign: 'center',
      overflow: 'hidden',
      background: '#080b12',
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'absolute', top: '10%', left: '15%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'orb-float 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '15%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'orb-float 10s ease-in-out infinite reverse',
        pointerEvents: 'none',
      }} />

      {/* Grid pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px',
          borderRadius: '100px',
          background: 'rgba(59,130,246,0.1)',
          border: '1px solid rgba(59,130,246,0.25)',
          color: '#60a5fa',
          fontSize: '13px',
          fontWeight: 500,
          marginBottom: '32px',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.6s ease 0.1s',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', flexShrink: 0, boxShadow: '0 0 8px #34d399' }} />
          Free · Fast · No Restrictions
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(42px, 5vw, 80px)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          color: '#e8edf5',
          marginBottom: '24px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.7s ease 0.2s',
        }}>
          Download TeraBox{' '}
          <span style={{
            background: 'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Videos & Files</span>
          {/* <br />Instantly */}
        </h1>

        {/* Subtext */}
        {/* <p style={{
          fontSize: '18px',
          color: '#7a8799',
          lineHeight: 1.7,
          maxWidth: '560px',
          margin: '0 auto 40px',
          fontWeight: 300,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.7s ease 0.35s',
        }}>
          Paste any TeraBox link and get a direct download. No login, no speed limits, no hassle — just instant access to your files.
        </p> */}

        {/* Badges */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '10px',
          justifyContent: 'center', marginBottom: '48px',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.7s ease 0.45s',
        }}>
          {badges.map((b, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontSize: '13px',
              color: '#a0aec0',
              fontWeight: 500,
            }}>
              <span style={{ color: '#60a5fa' }}>{b.icon}</span>
              {b.text}
            </span>
          ))}
        </div>

        {/* CTA */}
        <TakeUrl />


      </div>

      <style>{`
        @keyframes orb-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(1.03); }
        }
      `}</style>
    </section>
  );
}
