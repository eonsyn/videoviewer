 
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Script from "next/script";
import Footer from '@/components/footer/Footer'
export const metadata = {
  title: "Terafetch | Free TeraBox Video & File Downloader (100% Working)",
  description:
    "Download TeraBox videos and files instantly with terafetch. 100% working, fast, secure, and ad-free TeraBox downloader that generates direct download links in seconds.",
  keywords: [
    "TeraBox downloader",
    "TeraBox video downloader",
    "terafetch",
    "free terabox download",
    "terabox direct link generator",
    "terabox file downloader",
    "download terabox without login",
    "terabox link generator",
    "terabox premium download",
  ],
  authors: [{ name: "terafetch Team" }],
  openGraph: {
    title: "Terafetch | Free TeraBox Downloader | Fast & Secure",
    description:
      "Generate direct download links for TeraBox videos and files with terafetch. Fast, secure, and easy to use — no login required.",
    url: "https://terafetch.netlify.app", // change to your real domain
    siteName: "terafetch",
    images: [
      {
        url: "https://terafetch.netlify.app/og-image.png", // optional preview image
        width: 1200,
        height: 630,
        alt: "Terafetch | Free TeraBox Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terafetch | Free TeraBox Downloader",
    description:
      "Download videos and files from TeraBox instantly using Terafetch | 100% working and secure.",
    images: ["https://terafetch.netlify.app/og-image.png"],
  },
  metadataBase: new URL("https://terafetch.netlify.app"),
  alternates: {
    canonical: "https://terafetch.netlify.app",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="a519RGXXnU8_HDFGvb_9NLkro6BAy_BnCXPq8fhFTkY"
        />

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WZL37ER1NV"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WZL37ER1NV', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className= "bg-background  ">
       
          <Navbar />
         <main className="bg-gradient-to-br from-pink-100 via-pink-200 to-orange-100">{children}</main>
         <Footer/> 
      </body>
    </html>
  );
}
