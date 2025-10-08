"use client";
import React from "react";
import Script from "next/script";

function NativeBanner() {
  return (
    <div className="my-4"> 

      {/* Ad Script */}
      <Script
        id="native-banner-script"
        async
        data-cfasync="false"
        src="//compassionunsuccessful.com/d5bbec4880ba9e9f97b9928a22401ae1/invoke.js"
      />

      {/* Container for the banner */}
      <div
        id="container-d5bbec4880ba9e9f97b9928a22401ae1"
        className="mt-2"
      ></div>
    </div>
  );
}

export default NativeBanner;
