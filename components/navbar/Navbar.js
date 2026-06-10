"use client";
import React, { useState, useEffect } from "react";
import { Zap, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import TakeUrl from "../home/TakeUrl";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  // Called by TakeUrl when user hits Enter or the search button
  const handleSearch = (url) => {
    router.push(`/download?url=${encodeURIComponent(url)}`);
  };

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "DMCA", href: "/dmca-policy" },
  ];

  return (
    <>
      <nav
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "60px",

          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",

          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",

          transition: "all 0.3s ease",
          boxSizing: "border-box",
        }}
      >
        <div style={{
          maxWidth: "1600px", margin: "0 auto", height: "100%",
          padding: "0 16px",
          display: "flex", alignItems: "center", gap: "12px",
          boxSizing: "border-box",
        }}>

          {/* ── LEFT: Logo ── */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", flexShrink: 0 }}>
            <div style={{
              width: "30px", height: "30px", borderRadius: "8px",
              background: "linear-gradient(135deg, #4f8df5 0%, #2dd4a4 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 16px rgba(79,141,245,0.35)",
            }}>
              <Zap size={16} color="white" strokeWidth={2.5} />
            </div>
            <span className="nav-wordmark" style={{
              fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: "17px",
              background: "linear-gradient(135deg, #93c5fd, #5eead4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}>TeraFetch</span>
          </Link>

          {/* ── CENTER: TakeUrl in navbar variant ──
               flex: 1 makes it fill the space between logo and links.
               The component renders as a bare pill (no wrapper padding, no ad). -->
          */}
          <div className="lg:px-16" style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center" }}>
            <TakeUrl variant="navbar" onSearch={handleSearch} />
          </div>

          {/* ── RIGHT: Nav links (desktop) ── */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "2px", flexShrink: 0 }}>
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link key={l.href} href={l.href} style={{
                  padding: "6px 12px", borderRadius: "8px",
                  fontSize: "13px", fontWeight: 500,
                  color: active ? "#93c5fd" : "#6b7a8d",
                  background: active ? "rgba(79,141,245,0.1)" : "transparent",
                  border: "1px solid " + (active ? "rgba(79,141,245,0.2)" : "transparent"),
                  transition: "all 0.2s", textDecoration: "none", whiteSpace: "nowrap",
                }}>{l.label}</Link>
              );
            })}
          </div>

          {/* ── Hamburger (mobile) ── */}
          <button className="nav-mobile-btn" onClick={() => setOpen(!open)} style={{
            padding: "7px", borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "#c8d6e8", display: "none", flexShrink: 0,
          }}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 999,
          padding: "12px 16px 16px",
          background: "rgba(10,13,20,0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}>
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                display: "block", padding: "11px 14px", borderRadius: "10px", marginBottom: "4px",
                fontSize: "15px", fontWeight: 500,
                color: active ? "#93c5fd" : "#8a99b0",
                background: active ? "rgba(79,141,245,0.08)" : "transparent",
                border: "1px solid " + (active ? "rgba(79,141,245,0.18)" : "transparent"),
                textDecoration: "none", transition: "all 0.2s",
              }}>{l.label}</Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (min-width: 640px) {
          .nav-desktop    { display: flex !important; }
          .nav-mobile-btn { display: none !important; }
        }
        @media (max-width: 639px) {
          .nav-desktop    { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
          .nav-wordmark   { display: none !important; }
        }
      `}</style>
    </>
  );
}