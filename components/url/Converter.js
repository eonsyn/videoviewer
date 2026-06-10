"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading.js";
import { useHistory } from "@/components/history/HistoryProvider";
import HistoryList from "@/components/history/HistoryList";
import CustomPlayer from "./CustomPlayer";
import VideoDetails from "./VideoDetails.js";
import OtherFileFound from "./OtherFileFound";
import { isVideoFile } from "@/utils/isVideoFile";
import UrlError from "./UrlError.js";

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

export default function Converter({ token, url }) {
  const router = useRouter();
  const { addEntry, history, updateProgress } = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [autoplay, setAutoplay] = useState(true);
  const [fastStreamSrc, setFastStreamSrc] = useState(null);
  const [finalStreamSrc, setFinalStreamSrc] = useState(null);

  // Load autoplay preference from localStorage on mount
  useEffect(() => {
    try {
      const savedAutoplay = localStorage.getItem("autoplayPreference");
      if (savedAutoplay !== null) {
        setAutoplay(JSON.parse(savedAutoplay));
      }
    } catch (e) {
      console.error("Failed to read autoplay preference:", e);
    }
  }, []);

  // Wrapper function to update state and localStorage together
  const handleAutoplayChange = (newValue) => {
    setAutoplay(newValue);
    try {
      localStorage.setItem("autoplayPreference", JSON.stringify(newValue));
    } catch (e) {
      console.error("Failed to save autoplay preference:", e);
    }
  };

  useEffect(() => {
    if (!url || !token) return;

    const fetchStreamData = async () => {
      try {
        setLoading(true);
        setError(null);
        setFastStreamSrc(null);
        setFinalStreamSrc(null);
        setSelectedVideo(null);

        try {
          const stored = localStorage.getItem("videoHistory");
          if (stored) {
            const parsedHistory = JSON.parse(stored);
            const hit = parsedHistory.find((h) => h.url === url);

            if (hit?.stream_url && hit?.watchedAt) {
              const isCacheValid = Date.now() - Number(hit.watchedAt) < TWO_HOURS_MS;

              if (isCacheValid) {
                const fast = resolveFastUrl(hit.fast_stream_url);
                const final = hit.stream_url;
                const videoObj = buildCachedVideoObj(hit);

                setSelectedVideo(videoObj);
                setFastStreamSrc(fast || final);
                setFinalStreamSrc(final);
                setLoading(false);
                return;
              }
            }
          }
        } catch (e) {
          console.error("Cache read failed:", e);
        }

        const res = await fetch("https://secure-api-2ae3.onrender.com/api/secure", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-secure-token": token,
          },
          body: JSON.stringify({ url }),
        });
        const data = await res.json();

        if (!res.ok || !data.success) {
          const msg = data?.error?.message || data?.message || "Failed to get stream data";
          setError(
            msg.toLowerCase().includes("removed") || msg.toLowerCase().includes("private")
              ? "Video is removed or private. Please use another link."
              : msg
          );
          setLoading(false);
          return;
        }

        const videoData = data.response;
        if (!videoData) throw new Error("No video data found in response");

        let existingProgress = 0;
        try {
          const stored = localStorage.getItem("videoHistory");
          if (stored) {
            const parsed = JSON.parse(stored);
            const existing = parsed.find((h) => h.url === url);
            if (existing) existingProgress = existing.progress || 0;
          }
        } catch (e) {
          console.error("Progress read failed:", e);
        }

        const fastUrl = resolveFastUrl(videoData.fastStreamUrl);
        const rawHlsUrl = videoData.stream;

        if (fastUrl) {
          const prelimObj = buildApiVideoObj(videoData, fastUrl, existingProgress);
          setSelectedVideo(prelimObj);
          setFastStreamSrc(fastUrl);
          setLoading(false);
        }

        let finalUrl = rawHlsUrl;

        if (rawHlsUrl?.includes("/playlist/") && rawHlsUrl.includes(".m3u8")) {
          try {
            const u = new URL(rawHlsUrl);
            const match = u.pathname.match(/\/playlist\/([a-f0-9]{32})\.m3u8/);

            if (match) {
              const streamId = match[1];
              const playlistToken = u.searchParams.get("token");
              const base = `${u.protocol}//${u.host}`;

              if (playlistToken && base) {
                const preCheckRes = await fetch(`${base}/status/${streamId}`);
                const preCheckData = await preCheckRes.json();

                if (preCheckData.ready) {
                  // Already ready
                } else {
                  const convertRes = await fetch(
                    `${base}/convert?token=${encodeURIComponent(playlistToken)}`,
                    { method: "POST" }
                  );
                  if (!convertRes.ok) throw new Error(`/convert returned HTTP ${convertRes.status}`);
                  const convertData = await convertRes.json();

                  if (convertData.status === "already_done") {
                    const confirmRes = await fetch(`${base}/status/${streamId}`);
                    const confirmData = await confirmRes.json();
                    if (!confirmData.ready) {
                      await pollUntilReady(base, streamId, fastUrl);
                    }
                  } else {
                    await pollUntilReady(base, streamId, fastUrl);
                  }
                }
              }
            }
          } catch (hlsErr) {
            console.error("HLS conversion error:", hlsErr);
            finalUrl = fastUrl || rawHlsUrl;
          }
        }

        const finalObj = buildApiVideoObj(videoData, finalUrl, existingProgress);
        setSelectedVideo(finalObj);
        setFinalStreamSrc(finalUrl);

        if (!fastUrl) setLoading(false);

        addEntry({
          url,
          title: finalObj.name,
          description: finalObj.description,
          filename: finalObj.filename,
          thumbnail: finalObj.thumbnail,
          stream_url: finalUrl,
          fast_stream_url: fastUrl || "",
          duration_seconds: finalObj.duration_seconds,
          size_formatted: finalObj.size_formatted,
          duration_formatted: finalObj.duration_formatted,
          quality: finalObj.quality,
          width: videoData.width,
          height: videoData.height,
          category: videoData.category || "",
          progress: existingProgress,
        });

      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchStreamData();
  }, [url, token]);

  async function pollUntilReady(base, streamId, fastUrl) {
    let ready = false;
    while (!ready) {
      await new Promise((r) => setTimeout(r, 3000));
      const res = await fetch(`${base}/status/${streamId}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (data.ready) ready = true;
    }
  }

  function resolveFastUrl(val) {
    if (!val) return null;
    if (typeof val === "string") return val || null;
    if (typeof val === "object") return Object.values(val)[0] || null;
    return null;
  }

  function formatSize(bytes) {
    const b = Number(bytes);
    if (isNaN(b) || b <= 0) return "Unknown Size";
    if (b >= 1073741824) return (b / 1073741824).toFixed(2) + " GB";
    if (b >= 1048576) return (b / 1048576).toFixed(2) + " MB";
    if (b >= 1024) return (b / 1024).toFixed(2) + " KB";
    return b + " B";
  }

  function formatDuration(seconds) {
    const s = Number(seconds);
    if (isNaN(s) || s <= 0) return "Unknown Duration";
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${m}:${String(sec).padStart(2, "0")}`;
  }

  function buildApiVideoObj(videoData, streamUrl, progress) {
    return {
      name: videoData.filename || "video.mp4",
      filename: videoData.filename || "video.mp4",
      description: videoData.description || "",
      thumbnail: videoData.thumb || "",
      size_formatted: formatSize(videoData.size),
      duration_seconds: videoData.duration,
      duration_formatted: formatDuration(videoData.duration),
      quality: `${videoData.width}x${videoData.height}`,
      download_link: streamUrl,
      stream_url: streamUrl,
      fast_stream_url: videoData.fastStreamUrl || "",
      progress,
      fs_id: videoData.fs_id || videoData.surl,
      ...videoData,
    };
  }

  function buildCachedVideoObj(hit) {
    return {
      name: hit.title || "video.mp4",
      filename: hit.filename || "video.mp4",
      description: hit.description || "",
      thumbnail: hit.thumbnail || "",
      duration_seconds: hit.duration_seconds,
      stream_url: hit.stream_url,
      fast_stream_url: hit.fast_stream_url || "",
      download_link: hit.stream_url,
      progress: hit.progress || 0,
      size_formatted: hit.size_formatted || "",
      duration_formatted: hit.duration_formatted || formatDuration(hit.duration_seconds),
      quality: hit.quality || "",
      width: hit.width || null,
      height: hit.height || null,
      category: hit.category || "",
    };
  }

  const handleDownload = (video) => {
    if (!video?.stream_url) return;
    const a = document.createElement("a");
    a.href = video.stream_url;
    a.target = "_blank";
    a.download = video.filename || video.name || "video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleVideoEnded = () => {
    if (!autoplay || !history?.length) return;
    const idx = history.findIndex((h) => h.url === url);
    const next = idx !== -1 && idx + 1 < history.length ? history[idx + 1] : history[0];
    if (next && next.url !== url) {
      router.push(`/download?url=${encodeURIComponent(next.url)}`);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "1600px", margin: "0 auto", boxSizing: "border-box" }}>

      {/* Error overlay */}
      {error && <UrlError error={error} setError={setError} />}

      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "24px",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}>

        {/* ── LEFT: Player + Details ── */}
        <div style={{ flex: "1 1 0%", minWidth: 0 }}>

          {/* Loading state */}
          {loading && !error && (
            <div style={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.07)",
            }}>
              <Loading />
            </div>
          )}

          {/* Player */}
          {!loading && !error && selectedVideo && (fastStreamSrc || finalStreamSrc) && (
            <>
              {isVideoFile(selectedVideo.filename) ? (
                <div style={{
                  width: "100%",
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "#000",
                  border: "1px solid rgba(255,255,255,0.07)",
                  aspectRatio: selectedVideo.width && selectedVideo.height
                    ? `${selectedVideo.width} / ${selectedVideo.height}`
                    : "16/9",
                  maxHeight: "70vh",
                }}>
                  <CustomPlayer
                    fastSrc={fastStreamSrc}
                    src={finalStreamSrc || fastStreamSrc}
                    fallbackSrc={fastStreamSrc}
                    poster={selectedVideo.thumbnail}
                    apiDuration={selectedVideo.duration_seconds}
                    subtitleUrl={selectedVideo.subtitle_url}
                    onEnded={handleVideoEnded}
                    initialTime={selectedVideo.progress}
                    onTimeUpdate={(t) => updateProgress(url, t)}
                  />
                </div>
              ) : (
                <OtherFileFound
                  filename={selectedVideo.filename}
                  download={fastStreamSrc || finalStreamSrc}
                />
              )}

              <VideoDetails
                selectedVideo={selectedVideo}
                handleDownload={handleDownload}
              />
            </>
          )}
        </div>

        {/* ── RIGHT: History Sidebar ── */}
        <div className="converter-sidebar">
          {/* Note the prop change here to pass our new wrapper function */}
          <HistoryList
            autoplay={autoplay}
            setAutoplay={handleAutoplayChange}
          />
        </div>

      </div>

      <style>{`
        .converter-sidebar {
          width: 380px;
          flex-shrink: 0;
        }

        @media (max-width: 1023px) {
          .converter-sidebar {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}