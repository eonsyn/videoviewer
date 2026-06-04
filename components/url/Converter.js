"use client";
import { useEffect, useState } from "react";
import Hls from "hls.js";
import { FaSync, FaHistory } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import Link from "next/link";
import Loading from "./Loading.js";
import { useHistory } from "@/components/history/HistoryProvider";
import CustomPlayer from "./CustomPlayer";
import TakeUrl from "../home/TakeUrl.js";
import Button from "@/components/ui/Button";
export default function Converter({ token, url }) {
  const { addEntry } = useHistory();
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
          const msg = data?.error?.message || data?.message || "Failed to get stream data";
          const friendlyMsg = msg.toLowerCase().includes("removed") || msg.toLowerCase().includes("private")
            ? "Video is removed or private. Please use another link."
            : msg;
          setError(friendlyMsg);
          setLoading(false);
          return;
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
        // Add to history
        addEntry({
          url,
          title: videoObj.name,
          thumbnail: videoObj.thumbnail,
          stream_url: videoObj.stream_url,
        });

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
    <div className="w-full max-w-6xl sm:px-2 lg:px-8 pb-10 mx-auto">

      <TakeUrl />
      {loading && !error && (
        <Loading />
      )}
      {/* ❌ Error Popup Modal */}
      {error && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px",
        }}>
          <div style={{
            maxWidth: "420px", width: "100%", padding: "32px 28px",
            background: "#0c1018", border: "1px solid rgba(248,113,113,0.2)",
            borderRadius: "18px", textAlign: "center",
            boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
            animation: "popupIn 0.3s ease",
          }}>
            {/* Warning icon */}
            <div style={{
              width: "56px", height: "56px", borderRadius: "14px",
              background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 18px", fontSize: "28px",
            }}>⚠️</div>

            <h3 style={{
              fontFamily: "'Geist', sans-serif", fontSize: "20px", fontWeight: 700,
              color: "#f0f4fc", margin: "0 0 10px",
            }}>Video Unavailable</h3>

            <p style={{
              color: "#9aa5b4", fontSize: "14px", lineHeight: 1.7, margin: "0 0 24px",
            }}>{error}</p>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <Button
                onClick={handleReload}
                style={{ background: 'linear-gradient(135deg, #db2777, #be185d)' }}
              >
                <FaSync /> Try Again
              </Button>
              <Button
                onClick={() => setError(null)}
                variant="outline"
              >
                Dismiss
              </Button>
            </div>
          </div>

          <style>{`
            @keyframes popupIn {
              from { opacity: 0; transform: scale(0.9) translateY(10px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>
        </div>
      )}

      {/* ✅ Main Content */}
      {!loading && !error && selectedVideo && (
        <>
          {/* 🎥 Video Player Section */}
          <div id="video" className="w-[90vw] md:w-full max-w-full mt-10 mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700 mx-auto"
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

              {/* Download button in the middle */}
              <Button onClick={() => handleDownload(selectedVideo)} style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', boxShadow: '0 4px 15px rgba(22,163,74,0.35)' }}>
                <BsDownload /> Download
              </Button>

              {/* View History icon button */}
              <Button onClick={() => {
                const el = document.getElementById('history');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} variant="outline" style={{ padding: '10px 14px' }}>
                <FaHistory />
              </Button>
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
