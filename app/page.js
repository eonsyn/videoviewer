import React from 'react';
import LandingHero from "@/components/home/LandingHero";
import TakeUrl from "@/components/home/TakeUrl";
import WhatIsTerabox from "@/components/home/WhatIsTerabox";
import WhatIsTeraboxNetlify from "@/components/home/WhatIsTeraboxNetlify";
import HowToDownload from "@/components/home/HowToDownload";
import Disclaimer from "@/components/home/Disclaimer";
import Faq from '@/components/home/Faq';
import BlogSection from '@/components/home/BlogSection';
import { genToken } from "@/lib/genToken";
import Converter from "@/components/url/Converter"; 

export default function Home() {
  
  const token = genToken(process.env.SECRET_KEY);
  return (
    <>
      <LandingHero token={token} />
      <HowToDownload />
      <WhatIsTerabox />
      <WhatIsTeraboxNetlify />
      <BlogSection />
      <Faq />
      <Disclaimer />
    </>
  );
}
