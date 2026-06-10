"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Clipboard, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Banner468x60 from "@/components/ads/adsterra/Banner468x60.js";

const PLACEHOLDERS = [
  "Paste TeraBox link here…",
  "terabox.com/s/1abc123…",
  "1024terabox.com/sharing/…",
  "freeterabox.com/s/xyz…",
  "Paste your video link…",
];

export default function TakeUrl({ variant = "page", onSearch }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const [placeholder, setPlaceholder] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  const inputRef = useRef(null);
  const pathname = usePathname();
  const timerRef = useRef(null);

  const isNavbar = variant === "navbar";

  useEffect(() => { setUrl(""); }, [pathname]);

  // Typing placeholder animation
  useEffect(() => {
    if (focused) return;
    const currentPhrase = PLACEHOLDERS[phraseIdx];

    const tick = () => {
      if (paused) {
        timerRef.current = setTimeout(() => { setPaused(false); setDeleting(true); }, 1800);
        return;
      }
      if (!deleting) {
        if (charIdx < currentPhrase.length) {
          setPlaceholder(currentPhrase.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
          timerRef.current = setTimeout(tick, 48);
        } else {
          setPaused(true);
          timerRef.current = setTimeout(tick, 48);
        }
      } else {
        if (charIdx > 0) {
          setPlaceholder(currentPhrase.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
          timerRef.current = setTimeout(tick, 28);
        } else {
          setDeleting(false);
          setPhraseIdx((i) => (i + 1) % PLACEHOLDERS.length);
          timerRef.current = setTimeout(tick, 400);
        }
      }
    };
    timerRef.current = setTimeout(tick, 80);
    return () => clearTimeout(timerRef.current);
  }, [charIdx, deleting, paused, phraseIdx, focused]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      inputRef.current?.focus();
    } catch { }
  };

  const handleClear = () => { setUrl(""); inputRef.current?.focus(); };

  const handleSubmit = () => {
    if (!url.trim()) return;
    if (onSearch) {
      onSearch(url.trim());
      setUrl("");
    } else {
      setLoading(true);
      setTimeout(() => setLoading(false), 800);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter" && url) handleSubmit(); };

  const downloadPath = url ? `/download?url=${encodeURIComponent(url)}` : "#";

  // Variant-specific sizing
  const innerHeight = isNavbar ? "34px" : "auto";
  const innerPadding = isNavbar ? "0 4px 0 14px" : "5px 5px 5px 20px";
  const btnHeight = isNavbar ? "26px" : "38px";
  const btnMinWidth = isNavbar ? "36px" : "52px";
  const btnPadding = isNavbar ? "0 10px" : "0 16px";
  const btnRadius = isNavbar ? "14px" : "22px";
  const inputFontSz = isNavbar ? "13px" : "15px";
  const outerRadius = isNavbar ? "20px" : "28px";
  const innerRadius = isNavbar ? "18.5px" : "26.5px";
  const iconSize = isNavbar ? 14 : 17;
  const searchIconSz = isNavbar ? 13 : 16;

  const SearchBar = (
    <div style={{
      position: "relative",
      borderRadius: outerRadius,
      isolation: "isolate",
      overflow: "hidden",
      // When focused: solid 1.5px highlight instead of the spinning gradient.
      // We do this by switching padding colour via a box-shadow on the outer
      // wrapper — but the cleanest approach is a ::before pseudo via className,
      // so instead we use a solid background on the wrapper itself.
      padding: "1.5px",
      background: focused
        ? "#4f8df5"           // solid blue ring when focused
        : "transparent",      // transparent when idle (spinner div shows through)
      transition: "background 0.25s ease",
      width: "100%",
    }}>

      {/* Spinning conic border — hidden when focused by pointer-events:none + opacity */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "260%",
        aspectRatio: "1",
        background: "conic-gradient(from 0deg, transparent 40deg, #4f8df5 120deg, #2dd4a4 170deg, transparent 230deg)",
        animation: "takeurl-border-spin 6s linear infinite",
        zIndex: 0,
        opacity: focused ? 0 : 1,
        transition: "opacity 0.25s ease",
      }} />

      {/* Inner row */}
      <div style={{
        position: "relative", zIndex: 1,
        background: focused ? "#0d1420" : "#0c1018",  // very subtle bg tint on focus
        borderRadius: innerRadius,
        padding: innerPadding,
        height: isNavbar ? innerHeight : undefined,
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        transition: "background 0.25s ease",
      }}>

        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1, minWidth: 0,
            background: "transparent",
            border: "none", outline: "none",
            fontSize: inputFontSz, fontWeight: 400,
            color: "#f0f4fc",
            fontFamily: "'Geist', sans-serif",
            padding: isNavbar ? "0" : "9px 0",
          }}
        />

        {/* Clear */}
        {url && (
          <button onClick={handleClear} title="Clear" style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#6b7a8d", display: "flex", alignItems: "center",
            padding: isNavbar ? "4px 6px" : "6px 8px",
            flexShrink: 0, transition: "color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "#f0f4fc"}
            onMouseLeave={e => e.currentTarget.style.color = "#6b7a8d"}
          >
            <X size={isNavbar ? 12 : 16} />
          </button>
        )}

        {/* Divider */}
        <div style={{
          width: "1px", height: isNavbar ? "16px" : "22px",
          background: focused ? "rgba(79,141,245,0.4)" : "rgba(255,255,255,0.09)",
          margin: "0 2px", flexShrink: 0,
          transition: "background 0.25s",
        }} />

        {/* Clipboard / paste */}
        <button onClick={handlePaste} title="Paste from clipboard" style={{
          background: "none", border: "none", cursor: "pointer",
          color: focused ? "#4f8df5" : "#6b7a8d",
          display: "flex", alignItems: "center",
          padding: isNavbar ? "4px 8px" : "6px 10px",
          flexShrink: 0, transition: "color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.color = "#4f8df5"}
          onMouseLeave={e => e.currentTarget.style.color = focused ? "#4f8df5" : "#6b7a8d"}
        >
          <Clipboard size={iconSize} />
        </button>

        {/* Search / Play button */}
        {isNavbar ? (
          <button onClick={handleSubmit} style={{
            height: btnHeight, minWidth: btnMinWidth,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            background: url ? "linear-gradient(135deg, #4f8df5 0%, #2563eb 100%)" : "rgba(255,255,255,0.05)",
            borderRadius: btnRadius, border: "none",
            cursor: url ? "pointer" : "default",
            transition: "background 0.25s, box-shadow 0.25s",
            boxShadow: url ? "0 2px 12px rgba(79,141,245,0.35)" : "none",
            padding: btnPadding,
          }}
            onMouseEnter={e => { if (url) e.currentTarget.style.boxShadow = "0 3px 18px rgba(79,141,245,0.55)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = url ? "0 2px 12px rgba(79,141,245,0.35)" : "none"; }}
          >
            <Search size={searchIconSz} color={url ? "#fff" : "#3d4f64"} />
          </button>
        ) : (
          <Link href={downloadPath} onClick={handleSubmit} style={{
            height: btnHeight, minWidth: btnMinWidth,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            background: url ? "linear-gradient(135deg, #4f8df5 0%, #2563eb 100%)" : "rgba(255,255,255,0.05)",
            borderRadius: btnRadius,
            cursor: url ? "pointer" : "default",
            pointerEvents: url ? "auto" : "none",
            textDecoration: "none",
            transition: "background 0.25s, box-shadow 0.25s",
            boxShadow: url ? "0 2px 14px rgba(79,141,245,0.35)" : "none",
            padding: btnPadding,
          }}
            onMouseEnter={e => { if (url) e.currentTarget.style.boxShadow = "0 4px 22px rgba(79,141,245,0.55)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = url ? "0 2px 14px rgba(79,141,245,0.35)" : "none"; }}
          >
            <Search size={searchIconSz} color={url ? "#fff" : "#3d4f64"} />
          </Link>
        )}
      </div>
    </div>
  );

  // Page variant
  if (!isNavbar) {
    return (
      <div style={{
        width: "100%", maxWidth: "640px",
        margin: "0 auto", boxSizing: "border-box",
        fontFamily: "'Geist', sans-serif",
      }}>
        {SearchBar}

        <div style={{
          marginTop: "16px", minHeight: "56px", borderRadius: "10px",
          background: "rgba(255,255,255,0.018)",
          border: "1px dashed rgba(255,255,255,0.05)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          color: "#2d3a4a", fontSize: "11px",
          letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
          <p style={{ margin: "0 0 4px" }}>Advertisement</p>
          <Banner468x60 />
        </div>

        <style>{`
          @keyframes takeurl-border-spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to   { transform: translate(-50%, -50%) rotate(360deg); }
          }
          input::placeholder { color: #2d3a4a !important; }
        `}</style>
      </div>
    );
  }

  // Navbar variant
  return (
    <>
      {SearchBar}
      <style>{`
        @keyframes takeurl-border-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        input::placeholder { color: #2d3a4a !important; }
      `}</style>
    </>
  );
}