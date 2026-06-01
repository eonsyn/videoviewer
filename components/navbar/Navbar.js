"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Download, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "DMCA", href: "/dmca-policy" },
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      background: scrolled ? 'rgba(8,11,18,0.95)' : 'rgba(8,11,18,0.7)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'linear-gradient(135deg, #3b82f6, #34d399)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={18} color="white" strokeWidth={2.5} />
          </div>
          <span style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '20px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #60a5fa, #34d399)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>TeraFetch</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden-mobile">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href} style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                color: isActive ? '#60a5fa' : '#7a8799',
                background: isActive ? 'rgba(59,130,246,0.1)' : 'transparent',
                border: isActive ? '1px solid rgba(59,130,246,0.25)' : '1px solid transparent',
                transition: 'all 0.2s ease',
              }}>
                {link.name}
              </Link>
            );
          })}
          <Link href="/" style={{
            marginLeft: '8px',
            padding: '8px 18px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            color: 'white',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            display: 'flex', alignItems: 'center', gap: '6px',
            boxShadow: '0 4px 15px rgba(59,130,246,0.3)',
            transition: 'all 0.2s ease',
          }}>
            <Download size={14} /> Download
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} style={{
          display: 'none',
          padding: '8px',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.05)',
          color: '#e8edf5',
          cursor: 'pointer',
        }} className="show-mobile">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          background: 'rgba(8,11,18,0.98)',
          backdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '16px 24px 24px',
        }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href} onClick={() => setOpen(false)} style={{
                display: 'block',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '4px',
                fontSize: '15px',
                fontWeight: 500,
                textDecoration: 'none',
                color: isActive ? '#60a5fa' : '#a0aec0',
                background: isActive ? 'rgba(59,130,246,0.1)' : 'transparent',
              }}>
                {link.name}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </nav>
  );
}
