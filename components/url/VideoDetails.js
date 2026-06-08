"use client";
import React from "react";
import { Download } from "lucide-react"; // Using lucide-react to match the previous component style

export default function VideoDetails({ selectedVideo, autoplay, setAutoplay, handleDownload }) {
  if (!selectedVideo) return null;

  return (
    <div className="mt-3 w-full font-sans pb-6">
      {/* Title */}
      <h1 className="text-xl font-bold text-[#f1f1f1] break-words line-clamp-2 mb-2">
        {selectedVideo.name}
      </h1>

      {/* Metadata & Actions Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-1">
        
        {/* Left: Metadata */}
        <div className="flex items-center text-sm text-[#aaaaaa] font-medium gap-2">
          <span>{selectedVideo.size_formatted}</span>
          <span className="w-1 h-1 rounded-full bg-[#aaaaaa]"></span>
          <span>{selectedVideo.quality}</span>
          <span className="w-1 h-1 rounded-full bg-[#aaaaaa]"></span>
          <span>{selectedVideo.duration_formatted}</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Autoplay Toggle - Styled as a YouTube secondary pill button */}
          <button 
            onClick={() => setAutoplay(!autoplay)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-full cursor-pointer border-none outline-none"
          >
            <span className="text-sm font-medium text-[#f1f1f1] pl-1">Autoplay</span>
            <div className={`w-9 h-5 rounded-full relative transition-colors flex items-center px-0.5 ${autoplay ? 'bg-white' : 'bg-[#717171]'}`}>
              <div className={`w-4 h-4 rounded-full transition-transform ${autoplay ? 'bg-[#0f0f0f] translate-x-4' : 'bg-[#0f0f0f] translate-x-0'}`} />
            </div>
          </button>

          {/* Download Button - Styled like YouTube's primary white button */}
          <button 
            onClick={() => handleDownload(selectedVideo)} 
            className="flex items-center gap-2 bg-[#f1f1f1] hover:bg-[#d9d9d9] text-[#0f0f0f] px-4 py-2 rounded-full text-sm font-medium transition-colors border-none outline-none"
          >
            <Download size={18} strokeWidth={2.5} />
            Download
          </button>
        </div>
      </div>

      {/* Description Box - YouTube Style */}
      <div className="mt-3 bg-[#272727] hover:bg-[#3f3f3f] transition-colors rounded-xl p-3">
        {/* Top summary line mimicking views/date */}
        <div className="text-sm font-medium text-[#f1f1f1] mb-2 flex gap-2">
          <span>{selectedVideo.size_formatted}</span>
          <span>•</span>
          <span>{selectedVideo.quality}</span>
          <span>•</span>
          <span>TeraBox Source</span>
        </div>
        
        {/* Details */}
        <div className="text-sm text-[#f1f1f1] leading-relaxed flex flex-col gap-1">
          <p>
            <span className="font-semibold mr-1">Filename:</span> 
            {selectedVideo.filename}
          </p>
          {selectedVideo.category && (
            <p>
              <span className="font-semibold mr-1">Category:</span> 
              {selectedVideo.category}
            </p>
          )}
          <p>
            <span className="font-semibold mr-1">Resolution:</span> 
            {selectedVideo.quality}
          </p>
          <p>
            <span className="font-semibold mr-1">Duration:</span> 
            {selectedVideo.duration_formatted}
          </p>
        </div>
      </div>
    </div>
  );
}