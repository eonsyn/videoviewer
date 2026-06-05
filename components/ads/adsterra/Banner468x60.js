"use clients" 
import { useEffect, useRef } from "react";

export default function Banner468x60() {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Prevent duplicate loading
    if (adRef.current.childElementCount > 0) return;

    window.atOptions = {
      key: "51a85c7b96b9aa885491abb6612750e4",
      format: "iframe",
      height: 60,
      width: 468,
      params: {},
    };

    const script = document.createElement("script");
    script.src =
      "https://sturgeonvelocity.com/51a85c7b96b9aa885491abb6612750e4/invoke.js";
    script.async = true;

    adRef.current.appendChild(script);

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      className="flex justify-center items-center overflow-hidden"
      aria-label="Advertisement"
    >
      <div
        ref={adRef}
        style={{
          width: "100%",
          height: "60px",
        }}
      />
    </div>
  );
}