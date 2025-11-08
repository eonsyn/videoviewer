 
import WhatIsTerabox from "@/components/home/WhatIsTerabox";
import WhatIsTeraboxNetlify from "@/components/home/WhatIsTeraboxNetlify";
import HowToDownload from "@/components/home/HowToDownload";
import Disclaimer from "@/components/home/Disclaimer";
import Faq from '@/components/home/Faq';
import Popunder from "@/components/ads/adsterra/Popunder"; 
import TakeUrl from "@/components/home/TakeUrl";
export default function Home() {
   


  return (
    <>
<Popunder/>
      <TakeUrl/>
<WhatIsTerabox/>
<WhatIsTeraboxNetlify/>
<HowToDownload/>
<Disclaimer/>
<Faq/>
      
    </>
  );
}
