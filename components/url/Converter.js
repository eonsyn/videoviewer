"use client";
import { useEffect, useState } from "react";
import Hls from "hls.js";
import { IoReload } from "react-icons/io5";
import { BsDownload } from "react-icons/bs";
import Link from "next/link";
import Loading from "./Loading.js";
import TakeUrl from "@/components/home/TakeUrl";
import CustomPlayer from "./CustomPlayer";
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

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data?.error?.message || data?.message || "Failed to get stream data");
        }

        const videoData = data.response;
        if (!videoData) {
          throw new Error("No video data found in response");
        }

        // Convert video size (bytes/string) to formatted size (MB/KB)
        const formatSize = (sizeVal) => {
          const bytes = Number(sizeVal);
          if (isNaN(bytes) || bytes <= 0) return "Unknown Size";
          if (bytes >= 1e9) return (bytes / 1e9).toFixed(2) + " GB";
          if (bytes >= 1e6) return (bytes / 1e6).toFixed(2) + " MB";
          return (bytes / 1e3).toFixed(2) + " KB";
        };

        // Format duration (in seconds) to readable string (e.g. 1:23)
        const formatDuration = (seconds) => {
          const sec = Number(seconds);
          if (isNaN(sec) || sec <= 0) return "Unknown Duration";
          const mins = Math.floor(sec / 60);
          const remainingSecs = sec % 60;
          return `${mins}:${remainingSecs.toString().padStart(2, "0")}`;
        };

        // Map API response to UI video object
        const videoObj = {
          name: videoData.filename || "video.mp4",
          filename: videoData.filename || "video.mp4",
          thumbnail: videoData.thumb || "",
          size_formatted: formatSize(videoData.size),
          duration_seconds: videoData.duration,
          duration_formatted: formatDuration(videoData.duration),
          quality: `${videoData.width}x${videoData.height}`,
          download_link: videoData.stream,
          stream_url: videoData.stream,
          fs_id: videoData.fs_id || videoData.surl,
          ...videoData,
        };

        setVideoList([videoObj]);
        setSelectedVideo(videoObj);
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

  const handleDownload = async (video) => {
    try {
      if (!video || !video.stream_url) return;
      // Use direct link redirection or standard anchor link to bypass CORS issues on direct fetch
      const a = document.createElement("a");
      a.href = video.stream_url;
      a.target = "_blank";
      a.download = video.filename || video.name || "video.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("❌ Download error:", err);
      setError(err.message || "Download error");
    }
  };

  // The custom player manages initializing the video stream, buffering configurations, and subtitles dynamically.

  return (
    <div className="w-full max-w-6xl px-4 sm:px-2 lg:px-8 pb-10 mx-auto">
      {/* 🔄 Loading State */}
      {loading && !error && (
        <Loading />
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
          <TakeUrl />
          {/* 🎥 Video Player Section */}
          <div id="video" className="w-[90vw] md:w-full max-w-full mt-10 mx-auto">
            <div
              className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700 mx-auto"
              style={{
                maxWidth: selectedVideo.width && selectedVideo.height && selectedVideo.width < selectedVideo.height ? "360px" : "100%",
                aspectRatio: selectedVideo.width && selectedVideo.height ? `${selectedVideo.width} / ${selectedVideo.height}` : "16/9"
              }}
            >
              <CustomPlayer
                src={selectedVideo.stream_url}
                poster={selectedVideo.thumbnail}
                subtitleUrl={selectedVideo.subtitle_url}
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mt-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span>Duration: {selectedVideo.duration_formatted} ({selectedVideo.duration_seconds}s)</span>
              </div>

              <button
                onClick={() => handleDownload(selectedVideo)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-200 shadow-sm w-full md:w-auto"
              >
                <BsDownload className="text-lg" /> Download
              </button>
            </div>
          </div>

          {/* 🎬 Video Details / Info Card Section */}
          <div className="w-full mt-10">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
              Video Details
            </h3>

            <div className="max-w-xl mx-auto rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-md">
              {/* Thumbnail */}
              {selectedVideo.thumbnail && (
                <div className="w-full aspect-video overflow-hidden bg-gray-200 dark:bg-gray-900 rounded-xl mb-4">
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              {/* Details */}
              <div className="flex flex-col gap-2 text-left">
                <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 break-all">
                  {selectedVideo.name}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400 mt-2 border-t pt-2">
                  <div><strong>Resolution:</strong> {selectedVideo.quality}</div>
                  <div><strong>Size:</strong> {selectedVideo.size_formatted}</div>
                  <div><strong>Duration:</strong> {selectedVideo.duration_formatted}</div>
                  <div><strong>Source:</strong> TeraBox Link</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>

  );
}
