import React from "react";

export default function Loading() {
  return (
    /* Added "border border-white/40 shadow-lg" to the main container for that cool crisp edge */
    <div className=" relative glass w-full h-[80vh]   rounded-2xl bg-gray-100 dark:bg-gray-950 border  border-white  shadow-xl  ">
      <div className="relative glass w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-950  filter-goo">

        {/* 1. Bounding Inner Border (Swapped dashed line for a clean, sharp inner accent) */}
        <div className="absolute inset-1   rounded-xl pointer-events-none z-20"></div>

        {/* 2. Background "Loading..." Text */}
        <div className="absolute font-sans text-5xl font-black tracking-widest uppercase select-none  text-white/70 flex items-baseline z-10 mix-blend-difference">
          <span>Loading</span>
          <span className="inline-block w-12 text-left animate-loadingDots"></span>
        </div>

        {/* 3. Liquid Elements */}
        <div className="absolute w-32 h-32 rounded-full bg-cyan-400 blur-[4px] animate-slowSplash1 opacity-80 mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute w-36 h-36 rounded-full bg-pink-500 blur-[4px] animate-slowSplash2 opacity-80 mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute w-28 h-28 rounded-full bg-purple-600 blur-[4px] animate-slowSplash3 opacity-80 mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute w-40 h-40 rounded-full bg-amber-400 blur-[4px] animate-slowSplash4 opacity-80 mix-blend-multiply dark:mix-blend-screen"></div>

        {/* 4. Hidden SVG Gooey Filter Engine */}
        <svg className="hidden">
          <defs>
            <filter id="gooey-filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

      </div>
    </div >
  );
}