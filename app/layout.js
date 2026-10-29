import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Script from "next/script";
import { HistoryProvider } from "@/components/history/HistoryProvider";
import { TurnstileProvider } from "@/components/turnstile/TurnstileProvider";
import Telegram from "@/components/ads/Telegram";
export const metadata = {
  title: "TeraVideoPlayer — Watch & Download TeraBox Videos Online Free",
  description: "Watch TeraBox videos online in your browser with a fast built-in player — no app or login needed. Stream instantly or download with direct links, 100% free with TeraVideoPlayer.",
  keywords: [
    "TeraBox video downloader",
    "teravideoplayer",
    "free terabox download",
    "terabox direct link generator",
    "terabox online video player",
    "terabox player online",
    "watch terabox video online",
  ],
  authors: [{ name: "TeraVideoPlayer Team" }],
  openGraph: {
    title: "TeraVideoPlayer | Watch & Download TeraBox Videos Online",
    description: "Stream TeraBox videos in your browser or grab direct download links with TeraVideoPlayer. Fast, secure, and easy to use — no login required.",
    url: "https://teravideoplayer.netlify.app",
    siteName: "TeraVideoPlayer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TeraVideoPlayer | Watch & Download TeraBox Videos",
    description: "Watch TeraBox videos online or download them instantly with TeraVideoPlayer | 100% working and secure.",
  },
  metadataBase: new URL("https://teravideoplayer.netlify.app"),
  alternates: { canonical: "https://teravideoplayer.netlify.app" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="a519RGXXnU8_HDFGvb_9NLkro6BAy_BnCXPq8fhFTkY" />
        <meta name="msvalidate.01" content="68F9A32774479A1C4618586A9D223B7D" />
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PT4M8ZWW');
        `}</Script>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-WZL37ER1NV" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WZL37ER1NV', { page_path: window.location.pathname });
        `}</Script>
      </head>
      <body suppressHydrationWarning style={{ background: "#060910", minHeight: "100vh" }}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PT4M8ZWW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <TurnstileProvider>
          <HistoryProvider>
            <Navbar />
            <main style={{ minHeight: "100vh", paddingTop: "60px" }}>
              {children}
            </main>
            <Telegram/>
            <Footer />
          </HistoryProvider>
        </TurnstileProvider>
      </body>
    </html>
  );
}
