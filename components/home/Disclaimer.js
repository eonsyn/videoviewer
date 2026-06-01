import React from "react";
import { ShieldCheck, AlertTriangle, ExternalLink } from "lucide-react";
import Link from "next/link";

function Disclaimer() {
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
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 12px', borderRadius: '100px',
            background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)',
            color: '#f87171', fontSize: '12px', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px',
          }}>
            <AlertTriangle size={12} /> Legal
          </span>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(26px, 4vw, 36px)',
            fontWeight: 700, color: '#e8edf5', letterSpacing: '-0.02em', margin: 0,
          }}>Disclaimer</h2>
        </div>

        <div style={{
          background: 'rgba(14,20,32,0.8)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px',
          padding: '32px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(248,113,113,0.4), transparent)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#7a8799', fontSize: '15px', lineHeight: 1.8, fontWeight: 300 }}>
            <p style={{ margin: 0 }}>
              <strong style={{ color: '#a0aec0', fontWeight: 500 }}>TeraFetch</strong> is an independent tool created to help users download files, videos, and images from TeraBox shared links.{' '}
              This site is <strong style={{ color: '#e8edf5', fontWeight: 500 }}>not affiliated</strong> with{' '}
              <span style={{ color: '#60a5fa' }}>terabox.app</span> or{' '}
              <span style={{ color: '#60a5fa' }}>Flextech Inc.</span>
            </p>
            <p style={{ margin: 0 }}>
              Our application simply provides <strong style={{ color: '#a0aec0', fontWeight: 500 }}>direct download links</strong> for publicly accessible TeraBox files. We do not host, upload, or store any files or data. All downloads come directly from official TeraBox servers.
            </p>
            <p style={{ margin: 0 }}>
              TeraFetch respects all applicable <strong style={{ color: '#a0aec0', fontWeight: 500 }}>copyright laws</strong> and encourages users to download only content they have legal rights to access.
            </p>

            {/* Contact box */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: '14px',
              padding: '20px',
              background: 'rgba(248,113,113,0.06)',
              border: '1px solid rgba(248,113,113,0.15)',
              borderRadius: '12px',
              marginTop: '4px',
            }}>
              <ShieldCheck size={20} style={{ color: '#f87171', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <p style={{ margin: '0 0 8px', color: '#a0aec0', fontSize: '14px' }}>
                  If you are a content owner and believe this service infringes your rights, please contact us immediately.
                </p>
                <Link href="https://t.me/+2fvOF7WT0YBjZDM9" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  color: '#60a5fa', fontWeight: 500, fontSize: '14px',
                  textDecoration: 'none', borderBottom: '1px solid rgba(96,165,250,0.3)',
                }}>
                  Contact via Telegram <ExternalLink size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Disclaimer;
