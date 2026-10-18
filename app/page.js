import React from 'react';
import LandingHero from "@/components/home/LandingHero";
import TakeUrl from "@/components/home/TakeUrl";
import WhatIsTerabox from "@/components/home/WhatIsTerabox";
import WhatIsTeraboxNetlify from "@/components/home/WhatIsTeraboxNetlify";
import HowToDownload from "@/components/home/HowToDownload";
import Disclaimer from "@/components/home/Disclaimer";
import Faq from '@/components/home/Faq';
import BlogSection from '@/components/home/BlogSection';
import { faqs } from "@/components/home/faqData";

const SITE_URL = "https://teravideoplayer.netlify.app";

// Escape "<" so the JSON can never close the script tag early.
const toJsonLd = (obj) => JSON.stringify(obj).replace(/</g, "\\u003c");

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TeraVideoPlayer",
  url: SITE_URL,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires a modern web browser with JavaScript enabled",
  description: "Watch TeraBox videos online in your browser or download them with direct links — free, no login required.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function Home() {
  return (
    <>
      {/* Plain <script> (not next/script) so the JSON-LD is in the server-rendered HTML for crawlers */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(webAppJsonLd) }} />
      <LandingHero />
      <HowToDownload />
      <WhatIsTerabox />
      <WhatIsTeraboxNetlify />
      <BlogSection />
      <Faq />
      <Disclaimer />
    </>
  );
}
