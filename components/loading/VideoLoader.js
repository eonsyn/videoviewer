import React from "react";

function VideoLoader() {
  return (
    <div className="w-full flex flex-col gap-6 items-center animate-pulse">
      {/* Simulate 3 video cards while loading */}
      {[1].map((i) => (
        <div
          key={i}
          className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-md flex flex-col items-center text-center"
        >
          {/* Title Placeholder */}
          <div className="w-3/4 h-5 bg-gray-700 rounded mb-4"></div>

          {/* Video Thumbnail Placeholder */}
          <div className="w-full h-48 bg-gray-800 rounded-lg mb-4"></div>

          {/* File Size Placeholder */}
          <div className="w-1/3 h-4 bg-gray-700 rounded mb-3"></div>

          {/* Button Placeholder */}
          <div className="w-1/2 h-10 bg-gray-700 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
}

export default VideoLoader;
