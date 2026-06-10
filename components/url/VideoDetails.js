"use client";
import React, { useState } from "react";
import { Download } from "lucide-react";

export default function VideoDetails({ selectedVideo, autoplay, setAutoplay, handleDownload }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!selectedVideo) return null;

  // Metadata may come from a fresh API call or be restored from cache.
  // Guard every field so nothing renders as "undefined" or "undefinedxundefined".
  const size = selectedVideo.size_formatted || "";
  const duration = selectedVideo.duration_formatted || "";

  // quality is stored as "WIDTHxHEIGHT" — build it from width/height if missing
  const quality =
    selectedVideo.quality && !selectedVideo.quality.startsWith("undefined")
      ? selectedVideo.quality
      : selectedVideo.width && selectedVideo.height
        ? `${selectedVideo.width}x${selectedVideo.height}`
        : "";

  // Collect non-empty metadata tokens for the pill row
  const metaParts = [size, quality, duration].filter(Boolean);

  return (
    <div className="mt-3 w-full font-sans pb-6">
      {/* Title */}
      <h1 className="text-xl font-bold text-[#f1f1f1] break-words line-clamp-2 mb-2">
        {selectedVideo.name}
      </h1>

      {/* Metadata & Actions Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-1">
        {/* Left: Metadata pills */}
        <div className="flex items-center text-sm text-[#aaaaaa] font-medium gap-2 flex-wrap">
          {metaParts.map((part, i) => (
            <React.Fragment key={part}>
              {i > 0 && <span className="w-1 h-1 rounded-full bg-[#aaaaaa]" />}
              <span>{part}</span>
            </React.Fragment>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Download button */}
          <button
            onClick={() => handleDownload(selectedVideo)}
            className="flex items-center gap-2 bg-[#f1f1f1] hover:bg-[#d9d9d9] text-[#0f0f0f] px-4 py-2 rounded-full text-sm font-medium transition-colors border-none outline-none"
          >
            <Download size={18} strokeWidth={2.5} />
            Download
          </button>
        </div>
      </div>

      {/* Description / detail box */}
      <div
        className="mt-3 bg-[#272727] hover:bg-[#3f3f3f] transition-colors rounded-xl p-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Summary line */}
        <div className="text-sm font-medium text-[#f1f1f1] flex flex-wrap gap-2">
          {metaParts.map((part, i) => (
            <React.Fragment key={part}>
              {i > 0 && <span>•</span>}
              <span>{part}</span>
            </React.Fragment>
          ))}
          <span>•</span>
          <span>TeraBox Source</span>

          {/* Show "...more" if collapsed */}
          {!isExpanded && (
            <span className="font-bold text-red-300 ml-1">...more</span>
          )}
        </div>

        {/* Detail rows — only render when expanded */}
        {isExpanded && (
          <div className="text-sm text-[#f1f1f1] leading-relaxed flex flex-col gap-1 mt-3">
            {selectedVideo.filename && (
              <p>
                <span className="font-semibold mr-1">Filename:</span>
                {selectedVideo.filename}
              </p>
            )}
            {selectedVideo.category && (
              <p>
                <span className="font-semibold mr-1">Category:</span>
                {selectedVideo.category}
              </p>
            )}
            {quality && (
              <p>
                <span className="font-semibold mr-1">Resolution:</span>
                {quality}
              </p>
            )}
            {duration && (
              <p>
                <span className="font-semibold mr-1">Duration:</span>
                {duration}
              </p>
            )}
            {size && (
              <p>
                <span className="font-semibold mr-1">Size:</span>
                {size}
              </p>
            )}

            {/* Telegram Link */}
            <p className="mt-4">
              <a
                href="https://t.me/terafetch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-300 hover:text-[#71baff] transition-colors font-medium"
                onClick={(e) => e.stopPropagation()} // Prevents the box from collapsing when clicking the link
              >
                Join telegram for update
              </a>
            </p>

            {/* Show Less button */}
            <div className="mt-4 font-bold text-red-300">
              Show less
            </div>
          </div>
        )}
      </div>
    </div>
  );
}