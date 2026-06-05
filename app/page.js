import React from 'react';
import LandingHero from "@/components/home/LandingHero";
import TakeUrl from "@/components/home/TakeUrl";
import WhatIsTerabox from "@/components/home/WhatIsTerabox";
import WhatIsTeraboxNetlify from "@/components/home/WhatIsTeraboxNetlify";
import HowToDownload from "@/components/home/HowToDownload";
import Disclaimer from "@/components/home/Disclaimer";
import Faq from '@/components/home/Faq';
import BlogSection from '@/components/home/BlogSection';

export default function Home() {
  return (
    <>
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
