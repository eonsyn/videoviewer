import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{
      background: '#080b12', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
      textAlign: 'center',
    }}>
      <div>
        <div style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '120px', fontWeight: 800,
          background: 'linear-gradient(135deg, #1e2d45, #0d1824)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          lineHeight: 1, marginBottom: '24px',
        }}>404</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 700, color: '#e8edf5', margin: '0 0 12px' }}>Page Not Found</h1>
        <p style={{ color: '#7a8799', fontSize: '16px', fontWeight: 300, margin: '0 0 32px' }}>The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '12px 24px', borderRadius: '10px',
          fontSize: '15px', fontWeight: 600, color: 'white',
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          textDecoration: 'none',
        }}>
          <Home size={16} /> Go Home
        </Link>
      </div>
    </div>
  );
}
