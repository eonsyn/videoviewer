"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { Clipboard, ArrowRight, Link2, CheckCircle, Loader } from "lucide-react";

export default function TakeUrl() {
  const [url, setUrl] = useState('');
  const [pasted, setPasted] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

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
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <section id="url-input" style={{
      padding: '20px 10px',
    }}>
      {/* Ad placeholder - top */}
      {/* <div style={{
        maxWidth: '728px', margin: '0 auto 48px',
        height: '90px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px dashed rgba(255,255,255,0.08)',
        borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#4a5568',
        fontSize: '12px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontWeight: 500,
      }}>
        Advertisement
      </div> */}

      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Section label */}
        {/* <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 12px',
            borderRadius: '100px',
            background: 'rgba(52,211,153,0.1)',
            border: '1px solid rgba(52,211,153,0.2)',
            color: '#34d399',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '16px',
          }}>
            <Link2 size={12} /> Paste & Download
          </span>
          
        </div> */}

        {/* Main Input Card */}
        <div style={{
          background: 'rgba(14,20,32,0.9)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle gradient top edge */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(52,211,153,0.3), transparent)',
          }} />

          {/* Input */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <div style={{
              position: 'absolute', left: '16px', top: '50%',
              transform: 'translateY(-50%)',
              color: '#4a5568',
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
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#e8edf5',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.2s ease',
                fontFamily: 'DM Sans, sans-serif',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(59,130,246,0.5)';
                e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.12), inset 0 0 20px rgba(59,130,246,0.03)';
                e.target.style.background = 'rgba(59,130,246,0.05)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                e.target.style.boxShadow = 'none';
                e.target.style.background = 'rgba(255,255,255,0.03)';
              }}
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
          }}
          >
            {loading ? <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <ArrowRight size={18} />}
            {loading ? 'Processing...' : 'Generate Download Link'}
          </Link>

          {/* Hint */}
          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: '#4a5568' }}>
            Supports 1024terabox.com · teraboxshare.com · terabox.app
          </p>
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
        input::placeholder { color: #3a4555; }
      `}</style>
    </section>
  );
}
