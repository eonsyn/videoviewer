"use client";
import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does TeraFetch work?",
    a: "TeraFetch generates direct download links for files hosted on TeraBox. Simply paste a public TeraBox link, and we resolve it to a direct, fast download URL — no login required.",
  },
  {
    q: "Can I generate unlimited download links?",
    a: "Yes! TeraFetch is completely free and unlimited. Generate as many direct download links as you need.",
  },
  {
    q: "Does it work with all TeraBox links?",
    a: "TeraFetch supports public TeraBox share links for individual files. Folder links are not currently supported — we're working on adding that feature.",
  },
  {
    q: "Is it legal to use this tool?",
    a: "Yes, as long as you're downloading content you have legal rights to access. TeraFetch only generates links for publicly shared files.",
  },
  {
    q: "Do I need an account?",
    a: "No account needed. Just visit the website, paste your link, and download — it takes less than 10 seconds.",
  },
  {
    q: "Is my data safe and private?",
    a: "Absolutely. We don't collect personal data, log your downloads, or store any files. Your privacy is our priority.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section style={{
      background: '#080b12',
      padding: '80px 24px',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
      }} />

      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 12px', borderRadius: '100px',
            background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)',
            color: '#f59e0b', fontSize: '12px', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px',
          }}>
            <HelpCircle size={12} /> FAQ
          </span>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700, color: '#e8edf5', letterSpacing: '-0.02em', margin: 0,
          }}>Frequently Asked Questions</h2>
        </div>

        {/* FAQ items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} style={{
                background: isOpen ? 'rgba(59,130,246,0.06)' : 'rgba(14,20,32,0.7)',
                border: `1px solid ${isOpen ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '14px',
                overflow: 'hidden',
                transition: 'all 0.25s ease',
              }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  style={{
                    width: '100%', padding: '20px 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', color: '#e8edf5', gap: '16px',
                  }}
                >
                  <span style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '16px',
                    fontWeight: isOpen ? 700 : 500,
                    color: isOpen ? '#60a5fa' : '#d1d5db',
                    transition: 'color 0.2s ease',
                  }}>{item.q}</span>
                  <ChevronDown size={18} style={{
                    flexShrink: 0,
                    color: isOpen ? '#60a5fa' : '#4a5568',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'all 0.3s ease',
                  }} />
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 24px 20px',
                    color: '#7a8799',
                    fontSize: '15px',
                    lineHeight: 1.75,
                    fontWeight: 300,
                    animation: 'fadeIn 0.3s ease',
                  }}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom ad */}
        <div style={{
          marginTop: '48px',
          height: '90px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px dashed rgba(255,255,255,0.06)',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#4a5568', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>Advertisement</div>
      </div>
    </section>
  );
}
