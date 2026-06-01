import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from '@/components/footer/Footer';
import Script from "next/script";
import BackgroundDecor from "@/components/ui/BackgroundDecor";
import { HistoryProvider } from '@/components/history/HistoryProvider';

export const metadata = {
  title: "TeraFetch | Free TeraBox Video & File Downloader",
  description: "Download TeraBox videos and files instantly with TeraFetch. 100% working, fast, secure, and free TeraBox downloader that generates direct download links in seconds.",
  keywords: ["TeraBox video downloader", "terafetch", "free terabox download", "terabox direct link generator"],
  authors: [{ name: "TeraFetch Team" }],
  openGraph: {
    title: "TeraFetch | Free TeraBox Downloader | Fast & Secure",
    description: "Generate direct download links for TeraBox videos and files with TeraFetch. Fast, secure, and easy to use — no login required.",
    url: "https://terafetch.netlify.app",
    siteName: "TeraFetch",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TeraFetch | Free TeraBox Downloader",
    description: "Download videos and files from TeraBox instantly using TeraFetch | 100% working and secure.",
  },
  metadataBase: new URL("https://terafetch.netlify.app"),
  alternates: { canonical: "https://terafetch.netlify.app" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-site-verification" content="a519RGXXnU8_HDFGvb_9NLkro6BAy_BnCXPq8fhFTkY" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-WZL37ER1NV" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WZL37ER1NV', { page_path: window.location.pathname });
        `}</Script>
      </head>
      <body className="-mt-20" style={{ background: '#080b12', minHeight: '100vh' }} suppressHydrationWarning>
        <BackgroundDecor />
        <HistoryProvider>
          <Navbar />
          <main className="-mt-16" style={{ minHeight: '100vh' }}>
            {children}
          </main>
          <Footer />
        </HistoryProvider>
      </body>
    </html>
  );
}
