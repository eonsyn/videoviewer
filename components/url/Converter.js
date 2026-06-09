"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSync } from "react-icons/fa";
import Loading from "./Loading.js";
import { useHistory } from "@/components/history/HistoryProvider";
import HistoryList from "@/components/history/HistoryList";
import CustomPlayer from "./CustomPlayer";
import TakeUrl from "../home/TakeUrl.js";
import Button from "@/components/ui/Button";
import VideoDetails from "./VideoDetails.js";

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

export default function Converter({ token, url }) {
  const router = useRouter();
  const { addEntry, history, updateProgress } = useHistory();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [conversionStatus, setConversionStatus] = useState(null);
  const [autoplay, setAutoplay] = useState(true);

  // ── Two-phase stream URLs ─────────────────────────────────────────────────
  // fastStreamSrc  → available immediately; player starts here with no wait
  // finalStreamSrc → set once HLS conversion finishes; player swaps seamlessly
  const [fastStreamSrc, setFastStreamSrc] = useState(null);
  const [finalStreamSrc, setFinalStreamSrc] = useState(null);

  useEffect(() => {
    if (!url || !token) return;

    const fetchStreamData = async () => {
      try {
        setLoading(true);
        setError(null);
        setFastStreamSrc(null);
        setFinalStreamSrc(null);
        setSelectedVideo(null);

        // ── 1. Check 2-hour local cache ─────────────────────────────────────
        // watchedAt is stored as a numeric timestamp (Date.now()) — compare directly.
        try {
          const stored = localStorage.getItem("videoHistory");
          if (stored) {
            const parsedHistory = JSON.parse(stored); 
            const hit = parsedHistory.find((h) => h.url === url);

            if (hit?.stream_url && hit?.watchedAt) {
              const isCacheValid = Date.now() - Number(hit.watchedAt) < TWO_HOURS_MS;

              if (isCacheValid) {
                console.log("Cache hit — skipping API call.");
                const fast = resolveFastUrl(hit.fast_stream_url);
                const final = hit.stream_url;
                const videoObj = buildCachedVideoObj(hit);

                setSelectedVideo(videoObj);
                setFastStreamSrc(fast || final);
                setFinalStreamSrc(final);
                setLoading(false);
                return; // done — no API call needed
              }
            }
          }
        } catch (e) {
          console.error("Cache read failed:", e);
        }

        // ── 2. Fetch from API ───────────────────────────────────────────────
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

        // ── 3. Read existing saved progress (before overwriting anything) ───
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

        // ── 4. Serve fast stream IMMEDIATELY ───────────────────────────────
        // Mount the player straight away so the user can start watching.
        // HLS conversion runs in the background below.
        if (fastUrl) {
          const prelimObj = buildApiVideoObj(videoData, fastUrl, existingProgress);
          setSelectedVideo(prelimObj);
          setFastStreamSrc(fastUrl);
          setLoading(false); // hide spinner — player is visible
        }

        // ── 5. HLS conversion / polling (background) ────────────────────────
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
                // ── Fast-path: check /status FIRST before calling /convert ───────
                // If this stream was already converted in a previous session,
                // status will be ready:true immediately — skip /convert entirely.
                const preCheckRes = await fetch(`${base}/status/${streamId}`);
                const preCheckData = await preCheckRes.json();

                if (preCheckData.ready) {
                  // Already fully ready — jump straight to publishing finalUrl
                  setConversionStatus(null);
                } else {
                  // Stream not ready yet — trigger conversion
                  if (!fastUrl) setConversionStatus("Starting conversion...");

                  const convertRes = await fetch(
                    `${base}/convert?token=${encodeURIComponent(playlistToken)}`,
                    { method: "POST" }
                  );
                  if (!convertRes.ok) throw new Error(`/convert returned HTTP ${convertRes.status}`);
                  const convertData = await convertRes.json();

                  if (convertData.status === "already_done") {
                    // Server says done — do one confirm ping.
                    // In practice this will be ready:true and we exit immediately.
                    // If somehow it isn't (race condition), fall into the poll loop.
                    const confirmRes = await fetch(`${base}/status/${streamId}`);
                    const confirmData = await confirmRes.json();
                    if (!confirmData.ready) {
                      // Rare: server said already_done but segments not flushed yet
                      await pollUntilReady(base, streamId, fastUrl);
                    }
                    // confirmed ready — fall through
                  } else {
                    // Normal in-progress conversion — poll until done
                    await pollUntilReady(base, streamId, fastUrl);
                  }
                  setConversionStatus(null);
                }
              }
            }
          } catch (hlsErr) {
            console.error("HLS conversion error:", hlsErr);
            setConversionStatus(null);
            // Graceful fallback: use fast stream or raw URL as final
            finalUrl = fastUrl || rawHlsUrl;
          }
        }

        // ── 6. Publish final video + trigger seamless player swap ───────────
        const finalObj = buildApiVideoObj(videoData, finalUrl, existingProgress);
        setSelectedVideo(finalObj);
        setFinalStreamSrc(finalUrl);

        // Show player now if there was no fast stream
        if (!fastUrl) setLoading(false);

        // ── 7. Persist to history (single call, preserves watchedAt) ────────
        // addEntry in HistoryProvider preserves an existing watchedAt so the
        // 2-hour cache window is anchored to when the user first opened this URL.
        addEntry({
          url,
          title: finalObj.name,
          description: finalObj.description,
          filename: finalObj.filename,
          thumbnail: finalObj.thumbnail,
          stream_url: finalUrl,
          fast_stream_url: fastUrl || "",
          duration_seconds: finalObj.duration_seconds,
          // ── Display fields needed by VideoDetails when served from cache ──
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

  // ── HLS poll helper ─────────────────────────────────────────────────────────
  // Extracted so both the normal and already_done paths share the same loop.
  async function pollUntilReady(base, streamId, fastUrl) {
    let dots = 0;
    let ready = false;
    while (!ready) {
      await new Promise((r) => setTimeout(r, 3000));
      const res = await fetch(`${base}/status/${streamId}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (data.ready) {
        ready = true;
      } else {
        dots = (dots + 1) % 4;
        const segs = data.segments > 0 ? ` · ${data.segments} segments ready` : "";
        if (!fastUrl) setConversionStatus(`Converting${".".repeat(dots + 1)}${segs}`);
      }
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  /** fast_stream_url can be a string or a { resolution: url } map */
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
      // ── Restored display fields for VideoDetails ──
      size_formatted: hit.size_formatted || "",
      duration_formatted: hit.duration_formatted || formatDuration(hit.duration_seconds),
      quality: hit.quality || "",
      width: hit.width || null,
      height: hit.height || null,
      category: hit.category || "",
    };
  }

  const handleReload = () => window.location.reload();

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
    <div className="w-full max-w-[1600px] sm:px-2 lg:px-8 pb-10 mx-auto">
      <TakeUrl />

      {/* Loading screen — only shown when there's no fast stream to show yet */}
      {loading && !error && (
        <div className="flex flex-col items-center justify-center space-y-4 my-10">
          {conversionStatus ? (
            <div className="flex flex-col items-center gap-3 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
              <div className="w-8 h-8 rounded-full border-4 border-yellow-500 border-t-transparent animate-spin" />
              <p className="text-yellow-400 font-medium font-mono animate-pulse">{conversionStatus}</p>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      )}

      {/* Error overlay */}
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
            <p style={{ color: "#9aa5b4", fontSize: "14px", lineHeight: 1.7, margin: "0 0 24px" }}>
              {error}
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <Button onClick={handleReload} style={{ background: "linear-gradient(135deg, #db2777, #be185d)" }}>
                <FaSync /> Try Again
              </Button>
              <Button onClick={() => setError(null)} variant="outline">Dismiss</Button>
            </div>
          </div>
          <style>{`
            @keyframes popupIn {
              from { opacity: 0; transform: scale(0.9) translateY(10px); }
              to   { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>
        </div>
      )}

      {/* Player — visible as soon as either stream src is ready */}
      {!error && selectedVideo && (fastStreamSrc || finalStreamSrc) && (
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="flex-1 min-w-0">
            <div
              className="w-full mx-auto relative rounded-2xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700 bg-black min-h-[220px] sm:min-h-[360px] max-h-[70vh] max-w-[1100px]"
              style={{
                aspectRatio:
                  selectedVideo.width && selectedVideo.height
                    ? `${selectedVideo.width} / ${selectedVideo.height}`
                    : "16/9",
              }}
            >
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

            <VideoDetails
              selectedVideo={selectedVideo}
              autoplay={autoplay}
              setAutoplay={setAutoplay}
              handleDownload={handleDownload}
            />
          </div>

          <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0">
            <HistoryList />
          </div>
        </div>
      )}
    </div>
  );
}
