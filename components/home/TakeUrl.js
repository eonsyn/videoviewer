"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Clipboard, ArrowRight, Link2, CheckCircle, Loader } from "lucide-react";
import { usePathname } from "next/navigation";
export default function TakeUrl() {
  const [url, setUrl] = useState('');
  const [pasted, setPasted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // Clear URL and pasted flag whenever the route changes (pathname updates)
    setUrl('');
    setPasted(false);
  }, [pathname]);
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setPasted(true);
      setTimeout(() => setPasted(false), 2000);
    } catch (err) {
      console.error("Clipboard access failed:", err);
    }
  };

  const downloadPath = url ? `/download?url=${encodeURIComponent(url)}` : "#";

  const handleDownload = () => {
    if (!url) return;
    setLoading(true);
    // clear input after initiating download
    setUrl('');
    setPasted(false);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <section id="url-input" className="md:px-32 py-10" >
      <div className=" w-full md:max-w-[720px]" style={{ margin: '0 0' }}>

        {/* --- Smooth Glowing Card Wrapper --- */}
        <div style={{
          position: 'relative',
          borderRadius: '20px',
          padding: '1px',
          background: 'rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
          isolation: 'isolate',
        }}>

          {/* Ambient Rotating Glow Layer */}
          <div style={{
            position: 'absolute',
            top: '-100%',
            left: '-100%',
            width: '300%',
            height: '300%',
            background: 'conic-gradient(from 0deg, transparent 40deg, #3b82f6 140deg, #34d399 220deg, transparent 320deg)',
            animation: 'rotateCardBorder 7s linear infinite',
            zIndex: 1,
            pointerEvents: 'none',
            filter: 'blur(35px)',
            opacity: 0.85,
          }} />

          {/* Main Card Content Body */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            background: 'rgb(13, 19, 31)',
            borderRadius: '19px',
            padding: '32px',
          }}>

            {/* Input Element Area */}
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <div style={{
                position: 'absolute', left: '16px', top: '50%',
                transform: 'translateY(-50%)',
                color: isInputFocused ? '#3b82f6' : '#4a5568',
                transition: 'color 0.2.5s ease',
                zIndex: 3,
              }}>
                <Link2 size={18} />
              </div>

              <input
                ref={inputRef}
                type="text"
                placeholder="https://1024terabox.com/s/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 52px 16px 48px',
                  borderRadius: '12px',
                  color: '#e8edf5',
                  fontSize: '15px',
                  outline: 'none',
                  fontFamily: 'DM Sans, sans-serif',
                  position: 'relative',
                  zIndex: 2,

                  // --- NEW: Refined Translucent Border Behavior ---
                  // 50% Opacity Theme Blue normally, 100% Solid Solid Blue on Focus
                  border: isInputFocused
                    ? '1px solid rgb(59, 130, 246)'
                    : '1px solid rgba(59, 130, 246, 0.5)',

                  // Clean adaptive background color transition
                  background: isInputFocused
                    ? 'rgba(59, 130, 246, 0.08)'
                    : 'rgba(59, 130, 246, 0.03)',

                  // Enhanced focus ring lighting effect
                  boxShadow: isInputFocused
                    ? '0 0 25px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255,255,255,0.02)'
                    : '0 4px 12px rgba(0, 0, 0, 0.1)',

                  transition: 'all 0.25s ease-in-out',
                }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />

              <button onClick={handlePaste} title="Paste from clipboard" style={{
                position: 'absolute', right: '12px', top: '50%',
                transform: 'translateY(-50%)',
                padding: '6px',
                borderRadius: '8px',
                background: pasted ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.05)',
                border: pasted ? '1px solid rgba(52,211,153,0.3)' : '1px solid rgba(255,255,255,0.1)',
                color: pasted ? '#34d399' : '#7a8799',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex', alignItems: 'center',
                zIndex: 3,
              }}>
                {pasted ? <CheckCircle size={18} /> : <Clipboard size={18} />}
              </button>
            </div>

            {/* Download Button */}
            <Link href={downloadPath} onClick={handleDownload} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              color: url ? 'white' : '#4a5568',
              background: url
                ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                : 'rgba(255,255,255,0.04)',
              border: url ? 'none' : '1px solid rgba(255,255,255,0.07)',
              textDecoration: 'none',
              cursor: url ? 'pointer' : 'not-allowed',
              boxShadow: url ? '0 8px 25px rgba(59,130,246,0.35)' : 'none',
              transition: 'all 0.25s ease',
              pointerEvents: url ? 'auto' : 'none',
            }}>
              {loading ? <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <ArrowRight size={18} />}
              {loading ? 'Processing...' : 'Download Link'}
            </Link>

            {/* Hint */}
            <p className="md:block hidden" style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: '#4a5568' }}>
              Supports 1024terabox.com · teraboxshare.com · terabox.app
            </p>
          </div>
        </div>

        {/* Mini ad strip */}
        <div style={{
          marginTop: '32px',
          height: '60px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px dashed rgba(255,255,255,0.06)',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#4a5568', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          Advertisement
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes rotateCardBorder { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: #3a4555; }
      `}</style>
    </section>
  );
}