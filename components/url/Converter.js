"use client";
import { useEffect, useState, useRef } from "react";
import Hls from "hls.js";

export default function Converter({ token, url }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!url || !token) return;

    const fetchStreamUrl = async () => {
      try {
        console.log("📡 Fetching stream URL from backend...");

        const res = await fetch("https://shhapi.vercel.app/api/secure", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-secure-token": token,
          },
          body: JSON.stringify({ url }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to get stream URL");

        const streamUrl = data.result;
        console.log("🎬 Stream URL received:", streamUrl);

        if (!streamUrl) throw new Error("No stream URL returned");

        // Initialize HLS player
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(streamUrl);
          hls.attachMedia(videoRef.current);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoRef.current.play();
            setLoading(false);
          });
        } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
          videoRef.current.src = streamUrl;
          videoRef.current.addEventListener("loadedmetadata", () => {
            videoRef.current.play();
            setLoading(false);
          });
        } else {
          throw new Error("Your browser does not support HLS playback.");
        }
      } catch (err) {
        console.error("❌ Streaming error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStreamUrl();
  }, [url, token]);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl">
      {/* Loading Skeleton */}
      {loading && !error && (
        <div className="w-full h-[50vh] md:h-[60vh] rounded-lg bg-gray-300/30 dark:bg-gray-700/30 animate-pulse mb-3 flex items-center justify-center">
          <p className="text-gray-400 text-lg font-medium">Loading stream... 🎥</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-red-500 text-center font-medium">
              Please reload the page.
          </p>
          <button
            onClick={handleReload}
            className="px-5 py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors"
          >
            Reload Page
          </button>
        </div>
      )}

      {/* Video Player */}
      <video
        ref={videoRef}
        controls
        autoPlay
        playsInline
        className="w-full max-h-[80vh] md:max-h-[50vh] rounded-lg shadow-lg border border-slate-700 mt-3"
        style={{ display: error || loading ? "none" : "block" }}
      />
    </div>
  );
}
