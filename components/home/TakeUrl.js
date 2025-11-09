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
      console.error("Clipboard access failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 ">
      {/* 🧩 Hero Section */}
      <section className="text-center max-w-3xl mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-500">
            TeraFetch
          </span>{" "}
          – Free Terabox Downloader for Videos, Images & Files
        </h1>

        <p className="mt-5 text-gray-700 text-lg md:text-xl">
          Instantly <strong>download Terabox videos, images, and large files</strong>{" "}
          without logging in. <strong>TeraFetch</strong> is a fast, secure, and free
          downloader that helps you skip Terabox login and privacy restrictions.
        </p>
      </section>

      {/* 🧠 Input Section */}
      

        <div className="flex  flex-col gap-5">
          <div className="relative">
            <input
              type="text"
              placeholder="https://1024terabox.com/s/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-2xl px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400 pr-10 text-gray-800 placeholder-gray-500 bg-pink-50"
            />
            <FiClipboard
              onClick={handlePaste}
              size={22}
              title="Paste from clipboard"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 hover:text-pink-600 cursor-pointer transition-colors"
            />
          </div>

          <Link
            href={downloadPath}
            className={`text-center font-semibold py-3 rounded-lg transition-all duration-200 ${
              !url
                ? "opacity-50 pointer-events-none"
                : "hover:scale-105 hover:shadow-lg"
            }`}
            style={{
              background: "linear-gradient(90deg, #ff6f91, #ff9966)",
              color: "#fff",
            }}
          >
            Download from Terabox
          </Link>
        </div>
   

    
    </div>
  );
}
