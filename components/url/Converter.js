"use client";
import { useEffect, useState } from "react";
import Hls from "hls.js";
import { IoReload } from "react-icons/io5";
import { BsDownload } from "react-icons/bs";
import Link from "next/link";
import Loading from "./Loading.js"
export default function Converter({ token, url }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  // Track chosen resolution for fast streams (e.g., 360p, 480p)
  const [selectedResolution, setSelectedResolution] = useState(() => {
    // Default to first available resolution key
    if (selectedVideo?.fast_stream_url && typeof selectedVideo.fast_stream_url === 'object') {
      return Object.keys(selectedVideo.fast_stream_url)[0];
    }
    return selectedVideo?.resolutions?.[0] || '';
  }); // ✅ only one video player

  useEffect(() => {
    if (!url || !token) return;

   const fetchStreamData = async () => {
  try {
    setLoading(true);
    setError(null);

      const res = await fetch(
        "https://secure-api-2ae3.onrender.com/api/secure",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-secure-token": token,
          },
          body: JSON.stringify({
            url,
          }),
        }
      );

      // Adjust response parsing for new API format
      const data = await res.json();
      console.log("API Response:", data);

      if (!res.ok) {
        throw new Error(data?.error?.message || data?.message || "Failed to get stream data");
      }

      // Extract videos array from the new response structure
      const rawList = data?.result?.videos || [];
      if (!Array.isArray(rawList) || rawList.length === 0) {
        throw new Error("No video files found");
      }

      // Helper to format size (bytes to MB/GB)
      const formatSize = (bytes) => {
        if (bytes >= 1e9) return (bytes / 1e9).toFixed(2) + " GB";
        if (bytes >= 1e6) return (bytes / 1e6).toFixed(2) + " MB";
        return (bytes / 1e3).toFixed(2) + " KB";
      };

      // Map API fields to UI fields used in the component
      const list = rawList.map((v) => ({
        name: v.title,
        thumbnail: v.thumbnailUrl,
        size_formatted: formatSize(v.size),
        duration: v.duration,
        quality: v.quality,
        download_link: v.stream_url,
        fast_stream_url: v.fast_stream_url,
        // Preserve original URLs for player selection
        stream_url: v.stream_url,
        ...v,
      }));

      setVideoList(list);
      setSelectedVideo(list[0]);
  } catch (err) {
    console.error("❌ Error:", err);
    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
    fetchStreamData();
  }, [url, token]);

  const handleReload = () => window.location.reload();

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
    // Set default resolution when fast_stream_url is an object
    if (video?.fast_stream_url && typeof video.fast_stream_url === "object") {
      const firstRes = Object.keys(video.fast_stream_url)[0];
      setSelectedResolution(firstRes);
    } else {
      setSelectedResolution("");
    }
  };

  const handleDownload = async (video) => {
    try {
      if (!video) return;
      const res = await fetch(video.stream_url, {
        headers: {
          "x-secure-token": token,
        },
      });
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const ext = video.stream_url.split('.').pop().split('?')[0] || "mp4";
      a.download = `${video.name}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("❌ Download error:", err);
      setError(err.message || "Download error");
    }
  };

  // 🎬 Initialize single HLS player
  useEffect(() => {
    if (!selectedVideo) return;
    const videoElement = document.getElementById("main-player");
    // Determine a proper stream URL string. fast_stream_url may be an object (e.g., {"360p": "url", "480p": "url"})
    // Use the first available URL if it is an object, otherwise fallback to the plain string.
    // Choose proper stream URL based on selected resolution
    const fast = selectedVideo.fast_stream_url;
    const streamUrl = fast && typeof fast === "object"
      ? fast[selectedResolution] || Object.values(fast)[0]
      : fast || selectedVideo.stream_url;
    if (!videoElement) return;
    // Re‑run effect when resolution changes


    // Clear old tracks
    while (videoElement.firstChild) {
      videoElement.removeChild(videoElement.firstChild);
    }

    // ✅ Attach HLS
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(videoElement);
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = streamUrl;
    }

    // ✅ Attach subtitles (if available)
    if (selectedVideo.subtitle_url) {
      const track = document.createElement("track");
      track.src = selectedVideo.subtitle_url;
      track.kind = "subtitles";
      track.label = "English";
      track.srclang = "en";
      track.default = true;
      videoElement.appendChild(track);
    }
  }, [selectedVideo]);

  return (
  <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-10 mx-auto">
  {/* 🔄 Loading State */}
  {loading && !error && (
    <Loading/>
  )}
<Loading/>
  {/* ❌ Error State */}
  {error && (
    <div className="flex flex-col items-center justify-center text-center gap-4 p-6 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 shadow-md mt-6">
      <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
        {error}
      </p>
      <button
        onClick={handleReload}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold transition-all duration-200 shadow-sm"
      >
        <IoReload /> Reload
      </button>
    </div>
  )}

  {/* ✅ Main Content */}
  {!loading && !error && selectedVideo && (
    <>
      {/* 🎥 Video Player Section */}
      <div id="video" className="w-full mt-10">
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700 bg-black">
          <video
            id="main-player"
            controls
            playsInline
            className="w-full h-[35vh] sm:h-[45vh] md:h-[55vh] object-contain"
            poster={selectedVideo.thumbnail}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mt-4">
        {/* Resolution selector when multiple qualities are available */}
        {selectedVideo?.fast_stream_url && typeof selectedVideo.fast_stream_url === "object" && (
          <div className="mt-2 flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Resolution:</label>
            <select
              value={selectedResolution}
              onChange={(e) => setSelectedResolution(e.target.value)}
              className="rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
            >
              {Object.entries(selectedVideo.fast_stream_url).map(([res, url]) => (
                <option key={res} value={res}>{res}</option>
              ))}
            </select>
          </div>
        )}


          <button
            onClick={() => handleDownload(selectedVideo)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-200 shadow-sm w-full md:w-auto"
          >
            <BsDownload className="text-lg" /> Download
          </button>
        </div>
      </div>

      {/* 🎬 Video List Section */}
      <div className="w-full mt-10">
        <h3 className="text-2xl font-semibold text-gray-800  mb-6 text-center">
          Select a Video to Play
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoList.map((video, index) => (
            <Link key={video.fs_id || index} href="#video" className="block">
              <button
                onClick={() => handleSelectVideo(video)}
                className={`group relative flex flex-col items-start w-full rounded-2xl overflow-hidden border shadow-md transition-all duration-300 hover:shadow-xl ${
                  selectedVideo.fs_id === video.fs_id
                    ? "border-red-600 ring-2 ring-red-500 bg-linear-to-br from-red-600/90 to-red-700 text-white"
                    : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {/* Thumbnail */}
                <div className="w-full aspect-video overflow-hidden bg-gray-200 dark:bg-gray-900">
                  <img
                    src={video.thumbnail}
                    alt={video.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col items-start text-left w-full">
                  <h3 className="font-semibold text-lg truncate w-full">
                    {video.name}
                  </h3>
                  <p
                    className={`text-sm mt-1 ${
                      selectedVideo.fs_id === video.fs_id
                        ? "text-gray-100"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {video.quality} • {video.size_formatted}
                  </p>
                </div>

                {/* Subtle hover glow */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-400/40 rounded-2xl transition-all duration-300 pointer-events-none"></div>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </>
  )}
</div>

  );
}
