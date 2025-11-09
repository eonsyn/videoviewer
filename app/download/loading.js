import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-medium tracking-wide">Verifying...</p>
    </div>
  );
}

export default Loading;
