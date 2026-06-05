"use client";
import React, { useState, useEffect } from "react";
import { Zap, Menu, X, Download } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "DMCA", href: "/dmca-policy" },
  ];

  return (
    <>
      <nav style={{
        width: "100vw",
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: "60px",
        background: scrolled ? "rgba(6,9,16,0.92)" : "rgba(6,9,16,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{
          maxWidth: "1120px", margin: "0 auto", height: "100%",
          padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none" }}>
            <div style={{
              width: "30px", height: "30px", borderRadius: "8px",
              background: "linear-gradient(135deg, #4f8df5 0%, #2dd4a4 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 16px rgba(79,141,245,0.35)",
            }}>
              <Zap size={16} color="white" strokeWidth={2.5} />
            </div>
            <span style={{
              fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: "17px",
              background: "linear-gradient(135deg, #93c5fd, #5eead4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}>TeraFetch</span>
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link key={l.href} href={l.href} style={{
                  padding: "7px 14px", borderRadius: "8px", fontSize: "14px", fontWeight: 500,
                  color: active ? "#93c5fd" : "#6b7a8d",
                  background: active ? "rgba(79,141,245,0.1)" : "transparent",
                  border: "1px solid " + (active ? "rgba(79,141,245,0.2)" : "transparent"),
                  transition: "all 0.2s", textDecoration: "none",
                }}
                >{l.label}</Link>
              );
            })}
           
          </div>

          {/* Mobile hamburger */}
          <button className="nav-mobile-btn" onClick={() => setOpen(!open)} style={{
            padding: "7px", borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "#c8d6e8", display: "none",
          }}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div
          className="
    fixed top-[60px] left-0 right-0 z-[999]
    px-5 pt-4 pb-6
    bg-white/5
    backdrop-blur-2xl
    border-b border-white/10
    shadow-[0_8px_32px_rgba(0,0,0,0.45)]
  "
        >
          {links.map((l) => {
            const active = pathname === l.href;

            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`
          block px-4 py-3 rounded-xl mb-1
          text-[15px] font-medium
          transition-all duration-200
          ${active
                    ? "text-blue-300 bg-blue-500/10 border border-blue-400/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                  }
        `}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (min-width: 640px) { .nav-desktop { display: flex !important; } .nav-mobile-btn { display: none !important; } }
        @media (max-width: 639px) { .nav-desktop { display: none !important; } .nav-mobile-btn { display: flex !important; } }
      `}</style>
    </>
  );
}
