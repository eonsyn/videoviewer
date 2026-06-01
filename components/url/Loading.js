import React from "react";

export default function Loading() {
  return (
    <div className="relative glass w-full h-[50vh] flex items-center justify-center overflow-hidden rounded-2xl bg-gray-200/60 dark:bg-gray-800/60 shadow-inner filter-goo">

      {/* 1. Bounding Border */}
      <div className="absolute w-full h-full border-2 border-dashed border-primary/30 rounded-xl pointer-events-none"></div>

      {/* 2. Background "Loading..." Text (Sits behind the liquid) */}
      <div className="absolute font-sans text-4xl font-white tracking-widest uppercase select-none text-white dark:text-white/30 flex items-baseline">
        <span>Loading</span>
        <span className="inline-block w-12 text-left animate-loadingDots"></span>
      </div>

      {/* 3. Slow-Moving Liquid Elements */}
      <div className="absolute w-14 h-14 rounded-full bg-primary blur-[5px] animate-slowSplash1"></div>
      <div className="absolute w-16 h-16 rounded-full bg-accent blur-[5px] animate-slowSplash2"></div>
      <div className="absolute w-12 h-12 rounded-full bg-primary-glow blur-[5px] animate-slowSplash3"></div>
      <div className="absolute w-18 h-18 rounded-full bg-primary blur-[5px] animate-slowSplash4"></div>

    </div>
  );
}