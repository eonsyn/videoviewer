import React from 'react';

export default function BackgroundDecor() {
  return (
    <div className="relative h-full w-[100vw] overflow-hidden">
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
      <style>{`
        @keyframes orb-float { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-25px) scale(1.03); } }
      `}</style>
    </div>
  );
}
