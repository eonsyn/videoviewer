"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Clipboard, ArrowRight, Link2, CheckCircle, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

export default function TakeUrl() {
  const [url, setUrl] = useState("");
  const [pasted, setPasted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => { setUrl(""); setPasted(false); }, [pathname]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setPasted(true);
      inputRef.current?.focus();
      setTimeout(() => setPasted(false), 2000);
    } catch { }
  };

  const handleDownload = () => {
    if (!url) return;
    setLoading(true);
    setUrl(""); setPasted(false);
    setTimeout(() => setLoading(false), 800);
  };

  const downloadPath = url ? `/download?url=${encodeURIComponent(url)}` : "#";

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      {/* Card with animated border */}
      <div style={{ position: "relative", borderRadius: "20px", isolation: "isolate" }}>
        {/* Spinning conic border */}
        <div style={{
          position: "absolute", inset: "-1px", borderRadius: "21px",
          background: focused
            ? "conic-gradient(from 0deg, transparent 60deg, #4f8df5 140deg, #2dd4a4 200deg, transparent 300deg)"
            : "rgba(255,255,255,0.07)",
          zIndex: 0, transition: "background 0.4s ease",
        }} />
        {focused && (
          <div style={{
            position: "absolute", inset: "-1px", borderRadius: "21px",
            background: "conic-gradient(from 0deg, transparent 60deg, #4f8df5 140deg, #2dd4a4 200deg, transparent 300deg)",
            animation: "border-spin 4s linear infinite",
            zIndex: 0, filter: "blur(2px)", opacity: 0.6,
          }} />
        )}

        {/* Card body */}
        <div style={{
          position: "relative", zIndex: 1, background: "#0c1018",
          borderRadius: "19px", padding: "20px",
        }}>
          {/* Input row */}
          <div style={{ position: "relative", marginBottom: "12px" }}>
            <div style={{
              position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
              color: focused ? "#4f8df5" : "#3d4f64", transition: "color 0.2s", zIndex: 2,
            }}>
              <Link2 size={16} />
            </div>

            <input
              ref={inputRef}
              type="text"
              placeholder="Paste TeraBox link here…"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                width: "100%", padding: "14px 48px 14px 42px",
                borderRadius: "12px", fontSize: "14px", fontWeight: 400,
                color: "#f0f4fc", fontFamily: "'Geist', sans-serif",
                background: focused ? "rgba(79,141,245,0.06)" : "rgba(255,255,255,0.03)",
                border: focused ? "1px solid rgba(79,141,245,0.35)" : "1px solid rgba(255,255,255,0.07)",
                outline: "none", transition: "all 0.2s ease",
                boxSizing: "border-box",
              }}
            />

            <button onClick={handlePaste} title="Paste from clipboard" style={{
              position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
              padding: "6px 8px", borderRadius: "8px", zIndex: 3, cursor: "pointer",
              background: pasted ? "rgba(45,212,164,0.1)" : "rgba(255,255,255,0.05)",
              border: "1px solid " + (pasted ? "rgba(45,212,164,0.25)" : "rgba(255,255,255,0.08)"),
              color: pasted ? "#2dd4a4" : "#6b7a8d",
              display: "flex", alignItems: "center", transition: "all 0.2s",
            }}>
              {pasted ? <CheckCircle size={15} /> : <Clipboard size={15} />}
            </button>
          </div>

          {/* Download button */}
          <Link href={downloadPath} className="border-2 border border-white" onClick={handleDownload} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            width: "100%", padding: "14px", borderRadius: "12px",
            fontSize: "15px", fontWeight: 600,
            color: url ? "#fff" : "#3d4f64",
            background: url
              ? "linear-gradient(135deg, #4f8df5 0%, #2563eb 100%)"
              : "rgba(255,255,255,0.04)",
            border: url ? "none" : "1px solid rgba(255,255,255,0.06)",
            pointerEvents: url ? "auto" : "none",
            boxShadow: url ? "0 4px 20px rgba(79,141,245,0.35)" : "none",
            transition: "all 0.25s ease",
            textDecoration: "none", cursor: url ? "pointer" : "default",
          }}
            onMouseEnter={e => { if (url) e.currentTarget.style.boxShadow = "0 6px 28px rgba(79,141,245,0.5)"; }}
            onMouseLeave={e => { if (url) e.currentTarget.style.boxShadow = "0 4px 20px rgba(79,141,245,0.35)"; }}
          >
            {loading
              ? <><Loader2 size={16} className="spin" /> Processing…</>
              : <><ArrowRight size={16} /> Get Download Link</>
            }
          </Link>
        </div>
      </div>

      {/* Ad placeholder */}
      <div style={{
        marginTop: "20px", height: "56px", borderRadius: "10px",
        background: "rgba(255,255,255,0.018)", border: "1px dashed rgba(255,255,255,0.05)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#2d3a4a", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
      }}>Advertisement</div>

      <style>{`
        @keyframes border-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: #2d3a4a !important; }
      `}</style>
    </div>
  );
}
