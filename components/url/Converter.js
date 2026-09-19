"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading.js";
import { useHistory } from "@/components/history/HistoryProvider";
import HistoryList from "@/components/history/HistoryList";
import CustomPlayer from "./CustomPlayer";
import VideoDetails from "./VideoDetails.js";
import OtherFileFound from "./OtherFileFound";
import FileSelector from "./FileSelector";
import { isVideoFile } from "@/utils/isVideoFile";
import { isImageFile } from "@/utils/isImageFile.js";
import UrlError from "./UrlError.js";
import SurpriseMe from "../surprise/SurpriseMe.js";

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

// Dynamically import Turnstile to prevent Next.js SSR/Hydration errors
const Turnstile = dynamic(
  () => import("@marsidev/react-turnstile").then((mod) => mod.Turnstile),
  { ssr: false }
);

export default function Converter({ token, url }) {
  const router = useRouter();
  const [captchaToken, setCaptchaToken] = useState(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [captchaError, setCaptchaError] = useState(null);
  const { addEntry, history, updateProgress } = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [autoplay, setAutoplay] = useState(true);
  const [fastStreamSrc, setFastStreamSrc] = useState(null);
  const [finalStreamSrc, setFinalStreamSrc] = useState(null);
  const [hlsReady, setHlsReady] = useState(false);
  const [fileList, setFileList] = useState(null);
  const [activeFileId, setActiveFileId] = useState(null);
  const [surl, setSurl] = useState(null);

  // Track if we've already fetched data for this URL to prevent infinite loops
  const fetchedUrlRef = useRef(null);

  // Fallback to Cloudflare's Testing Site Key if env var is missing
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

  useEffect(() => {
    try {
      const savedAutoplay = localStorage.getItem("autoplayPreference");
      if (savedAutoplay !== null) setAutoplay(JSON.parse(savedAutoplay));
    } catch (e) {
      console.error("Failed to read autoplay preference:", e);
    }
  }, []);

  // ─── Reset captcha whenever URL changes ─────────────────────────────────────
  useEffect(() => {
    fetchedUrlRef.current = null; // Reset fetch tracker
    setCaptchaToken(null);
    setTurnstileKey((k) => k + 1);
    setError(null);
    setCaptchaError(null);
  }, [url]);

  const resetCaptcha = (errorMessage = null) => {
    // Only reset the captcha if we haven't successfully loaded the video yet
    if (!fetchedUrlRef.current) {
      setCaptchaToken(null);
      setTurnstileKey((k) => k + 1);
      setCaptchaError(errorMessage);
    }
  };

  const handleAutoplayChange = (newValue) => {
    setAutoplay(newValue);
    try {
      localStorage.setItem("autoplayPreference", JSON.stringify(newValue));
    } catch (e) {
      console.error("Failed to save autoplay preference:", e);
    }
  };

  // ─── Core loader ──────────────────────────────────────────────────────────
  const loadVideoFile = async (fileData, existingProgress = 0, surlKey = null) => {
    setLoading(true);
    setError(null);
    setFastStreamSrc(null);
    setFinalStreamSrc(null);
    setHlsReady(false);
    setSelectedVideo(null);

    if (fileData.error) {
      setError(typeof fileData.error === "string" ? fileData.error : "This file is unavailable.");
      setLoading(false);
      return;
    }

    const currentFileId = fileData.fs_id || fileData.stream_id || null;
    setActiveFileId(currentFileId);
    const historyKey = surlKey || url;

    try {
      const fastUrl = resolveFastUrl(fileData.fastStreamUrl);
      const rawHlsUrl = fileData.stream || null;

      if (fastUrl) {
        const prelimObj = buildVideoObj(fileData, fastUrl, existingProgress);
        setSelectedVideo(prelimObj);
        setFastStreamSrc(fastUrl);
        setLoading(false);
      }

      let finalUrl = rawHlsUrl || fastUrl || null;

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

              if (!preCheckData.ready) {
                const convertRes = await fetch(
                  `${base}/convert?token=${encodeURIComponent(playlistToken)}`,
                  { method: "POST" }
                );
                if (!convertRes.ok) throw new Error(`/convert returned HTTP ${convertRes.status}`);
                const convertData = await convertRes.json();

                if (convertData.status === "already_done") {
                  const confirmRes = await fetch(`${base}/status/${streamId}`);
                  const confirmData = await confirmRes.json();
                  if (!confirmData.ready) await pollUntilReady(base, streamId);
                } else {
                  await pollUntilReady(base, streamId);
                }
              }
            }
          }
          setHlsReady(true);
        } catch (hlsErr) {
          console.error("HLS conversion error:", hlsErr);
          finalUrl = fastUrl || rawHlsUrl;
          setHlsReady(false);
        }
      }

      const finalObj = buildVideoObj(fileData, finalUrl, existingProgress);
      setSelectedVideo(finalObj);
      setFinalStreamSrc(finalUrl);
      if (!fastUrl) setLoading(false);

      addEntry({
        url: historyKey,
        activeFileId: currentFileId,
        title: finalObj.name,
        filename: finalObj.filename,
        thumbnail: finalObj.thumbnail,
        fs_id: currentFileId,
        stream_url: finalUrl || "",
        fast_stream_url: fastUrl || "",
        duration_seconds: finalObj.duration_seconds,
        size_formatted: finalObj.size_formatted,
        duration_formatted: finalObj.duration_formatted,
        quality: finalObj.quality,
        width: fileData.width,
        height: fileData.height,
        category: fileData.category || "",
        progress: existingProgress,
      });
    } catch (err) {
      console.error("Load video error:", err);
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleFileSelect = async (file) => {
    const historyKey = surl || url;
    let existingProgress = 0;
    try {
      const stored = localStorage.getItem("videoHistory");
      if (stored) {
        const parsed = JSON.parse(stored);
        const existingEntry = parsed.find((h) => h.url === historyKey);
        if (existingEntry) {
          const fileRecord = existingEntry.files?.find(
            (f) => f.fs_id === (file.fs_id || file.stream_id)
          );
          // existingProgress = fileRecord?.progress || existingEntry.progress || 0;
        }
      }
    } catch (e) { /* ignore */ }
    await loadVideoFile(file, existingProgress, surl);
  };

  // ─── Main Initial Data Fetch ──────────────────────────────────────────────
  useEffect(() => {
    if (!url || !token) return;

    let cancelled = false;

    const fetchStreamData = async () => {
      // Prevent fetching again if we already got data for this URL
      if (fetchedUrlRef.current === url) return;

      setLoading(true);
      setError(null);
      setFastStreamSrc(null);
      setFinalStreamSrc(null);
      setHlsReady(false);
      setSelectedVideo(null);
      setFileList(null);
      setActiveFileId(null);
      setSurl(null);

      // 1. Cache check
      try {
        const stored = localStorage.getItem("videoHistory");
        if (stored) {
          const parsedHistory = JSON.parse(stored);
          const hit = parsedHistory.find((h) => h.url === url)
            || parsedHistory.find((h) => h.files?.some((f) => f.stream_url?.includes(url)));

          if (hit?.watchedAt) {
            const isCacheValid = Date.now() - Number(hit.watchedAt) < TWO_HOURS_MS;
            if (isCacheValid && hit.files?.length) {
              const cachedFiles = hit.files.map((f) => ({
                fs_id: f.fs_id,
                filename: f.filename,
                stream: f.stream_url,
                fastStreamUrl: f.fast_stream_url,
                thumb: f.thumbnail,
                duration: f.duration_seconds,
                width: f.width,
                height: f.height,
                size: f.size_formatted,
                category: f.category || "",
              }));

              setSurl(hit.url !== url ? hit.url : null);
              setFileList(cachedFiles);

              const activeFile = cachedFiles.find((f) => f.fs_id === hit.activeFileId) || cachedFiles[0];
              const activeRecord = hit.files.find((f) => f.fs_id === activeFile.fs_id);
              const cachedProgress = activeRecord?.progress || hit.progress || 0;

              const fast = resolveFastUrl(activeFile.fastStreamUrl);
              const final = activeFile.stream || fast;
              const videoObj = buildCachedVideoObj(activeRecord || hit, activeFile);

              setActiveFileId(activeFile.fs_id);
              setSelectedVideo(videoObj);
              setFastStreamSrc(fast || final);
              setFinalStreamSrc(final);
              if (fast && final && fast !== final) setHlsReady(true);

              fetchedUrlRef.current = url; // Mark as fetched
              setLoading(false);
              return;
            }
          }
        }
      } catch (e) {
        console.error("Cache read failed:", e);
      }

      // 2. Wait for Captcha if no cache hit
      if (!captchaToken) {
        setLoading(true);
        return;
      }

      // 3. API call
      try {
        const res = await fetch("https://player.terabro.workers.dev/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, captchaToken: captchaToken }),
        });
        setCaptchaToken(null);

        if (cancelled) return;

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          const msg = errData?.error || `HTTP error! status: ${res.status}`;
          if (
            msg.toLowerCase().includes("captcha") ||
            msg.toLowerCase().includes("token") ||
            res.status === 403
          ) {
            resetCaptcha("Captcha rejected by server. Please verify again.");
          }
          throw new Error(msg);
        }

        const data = await res.json();
        if (cancelled) return;

        // Mark as fetched IMMEDIATELY so no secondary loops happen
        fetchedUrlRef.current = url;

        const responseData = data.response || (Array.isArray(data.files) ? data : null);

        if (!responseData) {
          if (!res.ok || data.success === false) {
            const msg = data?.error?.message || data?.message || "Failed to get stream data";
            setError(
              msg.toLowerCase().includes("removed") || msg.toLowerCase().includes("private")
                ? "Video is removed or private. Please use another link."
                : msg
            );
            setLoading(false);
            return;
          }
          throw new Error("No data found in response");
        }

        let files = [];
        let responseSurl = null;

        if (Array.isArray(responseData.files) && responseData.files.length > 0) {
          files = responseData.files;
          responseSurl = responseData.surl || null;
        } else if (responseData.filename || responseData.stream || responseData.fastStreamUrl) {
          files = [responseData];
          responseSurl = responseData.surl || null;
        } else {
          throw new Error("No video data found in response");
        }

        const usableFiles = files.filter((f) => !f.error);
        if (usableFiles.length === 0 && files.length > 0) {
          setError(files[0].error || "Video is removed or private. Please use another link.");
          setLoading(false);
          return;
        }
        files = usableFiles.length > 0 ? usableFiles : files;

        setSurl(responseSurl);

        const historyKey = responseSurl || url;
        let existingProgress = 0;
        try {
          const stored = localStorage.getItem("videoHistory");
          if (stored) {
            const parsed = JSON.parse(stored);
            const existing = parsed.find((h) => h.url === historyKey);
            if (existing) existingProgress = existing.progress || 0;
          }
        } catch (e) { /* ignore */ }

        setFileList(files);

        addEntry({
          url: historyKey,
          activeFileId: files[0]?.fs_id || files[0]?.stream_id,
          title: files[0]?.filename || "",
          thumbnail: files[0]?.thumb || "",
          progress: existingProgress,
          files: files.map((f) => {
            const fastResolved = resolveFastUrl(f.fastStreamUrl) || "";
            return {
              fs_id: f.fs_id || f.stream_id,
              filename: f.filename,
              title: f.filename,
              thumbnail: f.thumb || "",
              stream_url: f.stream || fastResolved,
              fast_stream_url: fastResolved,
              duration_seconds: f.duration || null,
              size_formatted: formatSize(f.size),
              duration_formatted: formatDuration(f.duration),
              quality: f.width && f.height ? `${f.width}x${f.height}` : "",
              width: f.width || null,
              height: f.height || null,
              category: f.category || "",
            };
          }),
        });

        await loadVideoFile(files[0], existingProgress, responseSurl);

      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchStreamData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, token, captchaToken]);

  async function pollUntilReady(base, streamId) {
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

  function buildVideoObj(fileData, streamUrl, progress) {
    const fastResolved = resolveFastUrl(fileData.fastStreamUrl);
    const resolvedStream = streamUrl || fileData.stream || fastResolved || "";
    return {
      name: fileData.filename || "video.mp4",
      filename: fileData.filename || "video.mp4",
      description: fileData.description || "",
      thumbnail: fileData.thumb || "",
      size_formatted: formatSize(fileData.size),
      duration_seconds: fileData.duration,
      duration_formatted: formatDuration(fileData.duration),
      quality: fileData.width && fileData.height ? `${fileData.width}x${fileData.height}` : "",
      download_link: resolvedStream,
      stream_url: resolvedStream,
      fast_stream_url: fastResolved || "",
      progress,
      fs_id: fileData.fs_id || fileData.surl,
      ...fileData,
    };
  }

  function buildCachedVideoObj(fileRecord, rawFile) {
    const fastResolved = fileRecord.fast_stream_url || resolveFastUrl(rawFile?.fastStreamUrl) || "";
    const resolvedStream = fileRecord.stream_url || rawFile?.stream || fastResolved || "";
    return {
      name: fileRecord.title || fileRecord.filename || rawFile?.filename || "video.mp4",
      filename: fileRecord.filename || rawFile?.filename || "video.mp4",
      description: fileRecord.description || "",
      thumbnail: fileRecord.thumbnail || rawFile?.thumb || "",
      duration_seconds: fileRecord.duration_seconds,
      stream_url: resolvedStream,
      fast_stream_url: fastResolved,
      download_link: resolvedStream,
      progress: fileRecord.progress || 0,
      size_formatted: fileRecord.size_formatted || "",
      duration_formatted: fileRecord.duration_formatted || formatDuration(fileRecord.duration_seconds),
      quality: fileRecord.quality || (rawFile?.width && rawFile?.height ? `${rawFile.width}x${rawFile.height}` : ""),
      width: fileRecord.width || rawFile?.width || null,
      height: fileRecord.height || rawFile?.height || null,
      category: fileRecord.category || "",
      fs_id: fileRecord.fs_id,
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
      router.push(`/download?url=${encodeURIComponent(`https://terasharefile.com/s/1${next.url}`)}`);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "1600px", margin: "0 auto", boxSizing: "border-box" }}>

      {/* Captcha Widget: Shows when waiting for API data without a cache hit */}
      {loading && !error && !captchaToken && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          flexDirection: "column",
          gap: "20px"
        }}>
          <div style={{ minWidth: "300px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <Turnstile
              key={turnstileKey}
              siteKey={siteKey}
              onSuccess={(tok) => {
                setCaptchaToken(tok);
                setCaptchaError(null);
              }}
              onExpire={() => resetCaptcha("Captcha expired. Please verify again.")}
              onError={() => resetCaptcha("Captcha verification failed. Please try again.")}
            />
            {captchaError && (
              <p style={{ color: "#ef4444", fontSize: "14px", textAlign: "center" }}>
                {captchaError}
              </p>
            )}
          </div>
          <Loading />
        </div>
      )}

      {error && <UrlError error={error} token={token} setError={setError} />}

      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "24px",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}>

        {/* ── LEFT: Player + FileSelector + Details ── */}
        <div style={{ flex: "1 1 0%", minWidth: 0 }}>

          {loading && !error && captchaToken && (
            <div style={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.07)",
            }}>
              <Loading />
            </div>
          )}

          {!loading &&
            !error &&
            selectedVideo &&
            (fastStreamSrc || finalStreamSrc) && (
              <>
                {isVideoFile(selectedVideo.filename) ? (
                  <div
                    style={{
                      width: "100%",
                      position: "relative",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "#000",
                      border: "1px solid rgba(255,255,255,0.07)",
                      aspectRatio:
                        selectedVideo.width && selectedVideo.height
                          ? `${selectedVideo.width} / ${selectedVideo.height}`
                          : "16/9",
                      maxHeight: "70vh",
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
                      onTimeUpdate={(t) =>
                        updateProgress(
                          surl || url,
                          t,
                          selectedVideo.fs_id
                        )
                      }
                      hlsReady={hlsReady}
                    />
                  </div>
                ) : isImageFile(selectedVideo.filename) ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "#000",
                      border: "1px solid rgba(255,255,255,0.07)",
                      maxHeight: "70vh",
                    }}
                  >
                    <img
                      src={finalStreamSrc || fastStreamSrc}
                      alt={selectedVideo.filename || "Image"}
                      style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                        maxHeight: "70vh",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                ) : (
                  <OtherFileFound
                    filename={selectedVideo.filename}
                    download={fastStreamSrc || finalStreamSrc}
                  />
                )}
              </>
            )}

          {!error && fileList && fileList.length > 1 && (
            <FileSelector
              files={fileList}
              activeFileId={activeFileId}
              onSelect={handleFileSelect}
              loadingFileId={loading ? activeFileId : null}
            />
          )}

          <SurpriseMe token={token} />

          {!loading && !error && selectedVideo && (fastStreamSrc || finalStreamSrc) && (
            <VideoDetails
              selectedVideo={selectedVideo}
              handleDownload={handleDownload}
            />
          )}
        </div>

        {/* ── RIGHT: History Sidebar ── */}
        <div className="converter-sidebar">
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