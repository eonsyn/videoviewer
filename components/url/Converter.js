"use client";
import { useEffect, useState } from "react";
import Hls from "hls.js";
import { IoReload } from "react-icons/io5";
import { BsDownload } from "react-icons/bs";
import Link from "next/link";
export default function Converter({ token, url }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); // ✅ only one video player

  useEffect(() => {
    if (!url || !token) return;

    const fetchStreamData = async () => {
      try {
        const res = await fetch("https://shhapi.vercel.app/api/secure", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-secure-token": token,
          },
          body: JSON.stringify({ url }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to get stream data");

        const list = data?.result?.data?.list || [];
        if (list.length === 0) throw new Error("No video files found");

        setVideoList(list);
        setSelectedVideo(list[0]); // default first video
        setLoading(false);
      } catch (err) {
        console.error("❌ Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStreamData();
  }, [url, token]);

  const handleReload = () => window.location.reload();

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
  };

  const handleDownload = (link) => {
    if (link) window.open(link, "_blank");
  };

  // 🎬 Initialize single HLS player
  useEffect(() => {
    if (!selectedVideo) return;
    const videoElement = document.getElementById("main-player");
    const streamUrl = selectedVideo.fast_stream_url || selectedVideo.stream_url;
    if (!videoElement) return;

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
  <div className="flex flex-col items-center justify-center w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-10 mx-auto">
  {/* 🔄 Loading State */}
  {loading && !error && (
    <div className="w-full h-[50vh] flex items-center justify-center rounded-2xl bg-gray-200/60 dark:bg-gray-800/60 animate-pulse shadow-inner">
      <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
        Loading videos... 🎥
      </p>
    </div>
  )}

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
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-gray-900 ">
              {selectedVideo.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {selectedVideo.quality} • {selectedVideo.duration} •{" "}
              {selectedVideo.size_formatted}
            </p>
          </div>

          <button
            onClick={() => handleDownload(selectedVideo.download_link)}
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
                    ? "border-red-600 ring-2 ring-red-500 bg-gradient-to-br from-red-600/90 to-red-700 text-white"
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
