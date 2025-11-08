"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiClipboard } from "react-icons/fi";

export default function TakeUrl() {
  const [url, setUrl] = useState("");

  const downloadPath = url ? `/download?url=${encodeURIComponent(url)}` : "#";

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error("Failed to read clipboard contents:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-orange-100">
   <div
        className="p-8 rounded-2xl shadow-xl w-full max-w-md"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      >
        <h1
          className="text-3xl font-extrabold text-center mb-6"
          style={{ color: "#ff416c" }}
        >
          Enter Video URL
        </h1>

        <div className="flex flex-col gap-5 relative">
          {/* Input with Icon */}
          <div className="relative">
            <input
              type="text"
              placeholder="https://1024terabox.com/s/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400 pr-10 transition-colors"
              style={{
                backgroundColor: "#fff0f5",
                borderColor: "#ffb6b9",
                color: "#333",
                caretColor: "#333",
              }}
            />
            <FiClipboard
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer transition-colors hover:text-pink-500"
              size={22}
              style={{ color: "#ff6f91" }}
              onClick={handlePaste}
              title="Paste from clipboard"
            />
          </div>

          {/* Download Button */}
          <Link
            href={downloadPath}
            className={`text-center font-semibold py-3 rounded-lg transition-all duration-200 ${
              !url ? "opacity-50 pointer-events-none" : "hover:scale-105 hover:shadow-lg"
            }`}
            style={{
              background: "linear-gradient(90deg, #ff6f91, #ff9966)",
              color: "#fff",
            }}
          >
            Download
          </Link>
        </div>
      </div>
    </div>
  );
}
