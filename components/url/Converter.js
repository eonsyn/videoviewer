"use client";
import { useEffect, useState } from "react";
import Hls from "hls.js";
import { FaSync, FaHistory } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import Link from "next/link";
import Loading from "./Loading.js";
import { useHistory } from "@/components/history/HistoryProvider";
import HistoryList from "@/components/history/HistoryList";
import CustomPlayer from "./CustomPlayer";
import TakeUrl from "../home/TakeUrl.js";
import Button from "@/components/ui/Button";
import VideoDetails from "./VideoDetails.js"
export default function Converter({ token, url }) {
  const { addEntry, history } = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [conversionStatus, setConversionStatus] = useState(null);
  const [autoplay, setAutoplay] = useState(false);
  // Track chosen resolution for fast streams (e.g., 360p, 480p)
  const [selectedResolution, setSelectedResolution] = useState(() => {
    // Default to first available resolution key
    if (selectedVideo?.fast_stream_url && typeof selectedVideo.fast_stream_url === 'object') {
      return Object.keys(selectedVideo.fast_stream_url)[0];
    }
    return selectedVideo?.resolutions?.[0] || '';
  }); 
  
  useEffect(() => {
    if (!url || !token) return;

    const fetchStreamData = async () => {
      try {
        setLoading(true);
        setError(null);
        // https://secure-api-2ae3.onrender.com
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

        // Convert video size (bytes/string) to formatted size (MB/KB/GB)
        const formatSize = (sizeVal) => {
          const bytes = Number(sizeVal);
          if (isNaN(bytes) || bytes <= 0) return "Unknown Size";
          if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + " GB";
          if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + " MB";
          if (bytes >= 1024) return (bytes / 1024).toFixed(2) + " KB";
          return bytes + " B";
        };

        // Format duration (in seconds) to readable string (e.g. 1:23 or 1:02:23)
        const formatDuration = (seconds) => {
          const sec = Number(seconds);
          if (isNaN(sec) || sec <= 0) return "Unknown Duration";
          const hrs = Math.floor(sec / 3600);
          const mins = Math.floor((sec % 3600) / 60);
          const remainingSecs = sec % 60;
          if (hrs > 0) {
            return `${hrs}:${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
          }
          return `${mins}:${remainingSecs.toString().padStart(2, "0")}`;
        };

        let finalStreamUrl = videoData.stream;

        // --- NEW: HLS Conversion & Polling Logic ---
        if (finalStreamUrl && finalStreamUrl.includes("/playlist/") && finalStreamUrl.includes(".m3u8")) {
          try {
            const u = new URL(finalStreamUrl);
            const match = u.pathname.match(/\/playlist\/([a-f0-9]{32})\.m3u8/);
            if (match) {
              const streamId = match[1];
              const playlistToken = u.searchParams.get("token");
              const base = `${u.protocol}//${u.host}`;

              if (playlistToken && base) {
                setConversionStatus("Starting conversion...");
                const convertRes = await fetch(`${base}/convert?token=${encodeURIComponent(playlistToken)}`, { method: "POST" });
                if (!convertRes.ok) throw new Error(`/convert returned HTTP ${convertRes.status}`);
                const convertData = await convertRes.json();

                if (convertData.status !== "already_done") {
                  let ready = false;
                  let dots = 0;
                  while (!ready) {
                    await new Promise(r => setTimeout(r, 3000));
                    const statusRes = await fetch(`${base}/status/${streamId}`);
                    const statusData = await statusRes.json();

                    if (statusData.error) throw new Error(statusData.error);

                    if (statusData.ready) {
                      ready = true;
                    } else {
                      dots = (dots + 1) % 4;
                      const segs = statusData.segments > 0 ? ` · ${statusData.segments} segments ready` : "";
                      setConversionStatus(`Converting${".".repeat(dots + 1)}${segs}`);
                    }
                  }
                }
                setConversionStatus(null);
              }
            }
          } catch (hlsErr) {
            console.error("HLS conversion polling error:", hlsErr);
            setConversionStatus(null);
            // Fallback to fastStreamUrl if available
            if (videoData.fastStreamUrl) {
              finalStreamUrl = videoData.fastStreamUrl;
            }
          }
        }
        // -------------------------------------------

        // Map API response to UI video object
        const videoObj = {
          name: videoData.filename || "video.mp4",
          filename: videoData.filename || "video.mp4",
          description: videoData.description || "",
          thumbnail: videoData.thumb || "",
          size_formatted: formatSize(videoData.size),
          duration_seconds: videoData.duration,
          duration_formatted: formatDuration(videoData.duration),
          quality: `${videoData.width}x${videoData.height}`,
          download_link: finalStreamUrl,
          stream_url: finalStreamUrl,
          fast_stream_url: videoData.fastStreamUrl || "",
          fs_id: videoData.fs_id || videoData.surl,
          ...videoData,
        };

        setVideoList([videoObj]);
        setSelectedVideo(videoObj);
        // Add to history
          addEntry({
            url,
            title: videoObj.name,
            description: videoObj.name,
            filename: videoObj.filename,
            thumbnail: videoObj.thumbnail,
            stream_url: videoObj.stream_url,
            duration_seconds: videoObj.duration_seconds,
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

  const handleVideoEnded = () => {
    if (autoplay && history && history.length > 0) {
      // Try to find the next video in history (older). If current isn't in history or is last, loop to first.
      const currentIndex = history.findIndex(h => h.url === url);
      let nextItem;
      if (currentIndex !== -1 && currentIndex + 1 < history.length) {
        nextItem = history[currentIndex + 1];
      } else {
        nextItem = history[0];
      }
      if (nextItem && nextItem.url !== url) {
        window.location.href = `/download?url=${encodeURIComponent(nextItem.url)}`;
      }
    }
  };

  return (
    <div className="w-full max-w-[1600px] sm:px-2 lg:px-8 pb-10 mx-auto">

      <TakeUrl />
      {loading && !error && (
        <div className="flex flex-col items-center justify-center space-y-4 my-10">
          {conversionStatus ? (
            <div className="flex flex-col items-center gap-3 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
              <div className="w-8 h-8 rounded-full border-4 border-yellow-500 border-t-transparent animate-spin"></div>
              <p className="text-yellow-400 font-medium font-mono animate-pulse">{conversionStatus}</p>
            </div>
          ) : (
            <Loading />
          )}
        </div>
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
        <div className="flex flex-col lg:flex-row gap-6 mt-6">

          {/* 🎥 Left Column: Video Player & Details */}
          <div className="flex-1 min-w-0">
            {/* Player */}
            <div id="video" className="w-full relative rounded-2xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700 bg-black"
              style={{
                aspectRatio: selectedVideo.width && selectedVideo.height ? `${selectedVideo.width} / ${selectedVideo.height}` : "16/9"
              }}
            >
              <CustomPlayer
                src={selectedVideo.stream_url}
                fallbackSrc={selectedVideo.fast_stream_url}
                poster={selectedVideo.thumbnail}
                subtitleUrl={selectedVideo.subtitle_url}
                onEnded={handleVideoEnded}
              />
            </div>

            {/* Video Details (YouTube Title/Desc style) */}
            <VideoDetails selectedVideo={selectedVideo} autoplay={autoplay} setAutoplay={setAutoplay} handleDownload={handleDownload}/>
          </div>

          {/* 🎬 Right Column: Sidebar (History / Up Next) */}
          <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0" id="history">
            <HistoryList />
          </div>

        </div>
      )}
    </div>

  );
}
