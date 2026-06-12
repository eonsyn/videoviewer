"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Hls from "hls.js";
import {
  Play, Pause, Volume2, VolumeX, Maximize,
  Settings, Loader, SkipForward, SkipBack, PictureInPicture, Zap, Layers
} from "lucide-react";

export default function CustomPlayer({
  src,
  fastSrc,
  fallbackSrc,
  poster,
  subtitleUrl,
  onEnded,
  apiDuration,
  initialTime,
  onTimeUpdate,
  hlsReady,           // true once HLS playlist is confirmed ready
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [currentSrc, setCurrentSrc] = useState(() => fastSrc || src);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(apiDuration || 0);
  const [volume, setVolume] = useState(1);

  // Persist mute state across tabs
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("playerMuted");
    return saved === null ? true : saved === "true";
  });
  const persistMute = useCallback((muted) => {
    setIsMuted(muted);
    try { localStorage.setItem("playerMuted", String(muted)); } catch (e) { }
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [isPipEnabled, setIsPipEnabled] = useState(false);

  const [is2xSpeed, setIs2xSpeed] = useState(false);
  const [skipIndicator, setSkipIndicator] = useState(null);

  // ── Fast / HLS toggle ─────────────────────────────────────────────────────
  // "fast" = fastSrc (direct mp4/stream), "hls" = src (HLS .m3u8)
  // Only meaningful when hlsReady=true and fastSrc !== src
  const hasBothSources = hlsReady && fastSrc && src && fastSrc !== src;
  const [streamMode, setStreamMode] = useState("fast"); // "fast" | "hls"

  // Tracks whether we're currently playing the fast stream
  const [usingFastSrc, setUsingFastSrc] = useState(!!(fastSrc && fastSrc !== src));
  const usingFastSrcRef = useRef(!!(fastSrc && fastSrc !== src));

  const longPressTimer = useRef(null);
  const lastTap = useRef(0);
  const prevRate = useRef(1);
  const wasLongPressing = useRef(false);
  const lastSavedTime = useRef(0);
  const initialTimeApplied = useRef(false);
  const capturedSwapTime = useRef(null);
  const pendingSwap = useRef(false);
  const swapResumeTime = useRef(null);
  const swapWasPlaying = useRef(false);
  const fastSrcFailed = useRef(false);

  // ── Handle manual stream mode toggle ─────────────────────────────────────
  const handleToggleStream = useCallback(() => {
    if (!hasBothSources || !videoRef.current) return;
    const video = videoRef.current;
    const savedTime = video.currentTime;
    const wasPlaying = !video.paused;
    const nextMode = streamMode === "fast" ? "hls" : "fast";
    const nextSrc = nextMode === "fast" ? fastSrc : src;

    setStreamMode(nextMode);
    setIsLoading(true);
    // Capture position so resume works correctly
    swapResumeTime.current = savedTime;
    swapWasPlaying.current = wasPlaying;
    initialTimeApplied.current = false;
    lastSavedTime.current = savedTime;
    setUsingFastSrc(nextMode === "fast");
    usingFastSrcRef.current = nextMode === "fast";
    pendingSwap.current = false;
    capturedSwapTime.current = null;
    setCurrentSrc(nextSrc);
  }, [hasBothSources, streamMode, fastSrc, src]);

  // ── Sync src prop changes (new file selected) ────────────────────────────
  useEffect(() => {
    if (!src) return;
    fastSrcFailed.current = false;
    setStreamMode("fast");
    if (fastSrc && fastSrc !== src && !fastSrcFailed.current) {
      setCurrentSrc(fastSrc);
      setUsingFastSrc(true);
      usingFastSrcRef.current = true;
      pendingSwap.current = true;
    } else {
      setCurrentSrc(src);
      setUsingFastSrc(false);
      usingFastSrcRef.current = false;
    }
    initialTimeApplied.current = false;
    lastSavedTime.current = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // ── Capture playhead when src prop changes (fix HLS buffer overshoot) ────
  useEffect(() => {
    if (!src) return;
    if (fastSrc && src === fastSrc) return;
    if (fastSrcFailed.current) {
      fastSrcFailed.current = false;
      setUsingFastSrc(false);
      usingFastSrcRef.current = false;
      pendingSwap.current = false;
      swapResumeTime.current = null;
      capturedSwapTime.current = null;
      setCurrentSrc(src);
      return;
    }
    if (!usingFastSrc) return;
    if (videoRef.current) capturedSwapTime.current = videoRef.current.currentTime;
    pendingSwap.current = true;
    if (videoRef.current && !videoRef.current.paused) swapToFinalSrc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const swapToFinalSrc = useCallback(() => {
    if (!pendingSwap.current || !src) return;
    if (!videoRef.current) return;
    const wasPlaying = !videoRef.current.paused;
    const liveTime = capturedSwapTime.current ?? videoRef.current.currentTime;
    capturedSwapTime.current = null;
    const savedTime = liveTime > 1 ? liveTime : (initialTime || 0);
    pendingSwap.current = false;
    setUsingFastSrc(false);
    usingFastSrcRef.current = false;
    initialTimeApplied.current = false;
    lastSavedTime.current = savedTime;
    swapResumeTime.current = savedTime;
    swapWasPlaying.current = wasPlaying;
    setCurrentSrc(src);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, initialTime]);

  // ── Sync apiDuration ──────────────────────────────────────────────────────
  useEffect(() => {
    if (apiDuration) setDuration(apiDuration);
  }, [apiDuration]);

  useEffect(() => {
    if (typeof document !== "undefined" && document.pictureInPictureEnabled) {
      setIsPipEnabled(true);
    }
  }, []);

  // ── HLS / src loader ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!videoRef.current || !currentSrc || typeof currentSrc !== "string") return;
    const video = videoRef.current;
    video.preload = "auto";
    const isHls = currentSrc.includes(".m3u8");
    let hlsInstance = null;

    if (isHls && Hls.isSupported()) {
      hlsInstance = new Hls({
        maxBufferLength: 120,
        maxMaxBufferLength: 240,
        maxBufferSize: 200 * 1024 * 1024,
        lowLatencyMode: true,
        backBufferLength: 30,
        progressive: true,
        fragLoadingTimeOut: 4000,
        fragLoadingMaxRetry: 5,
        startLevel: -1,
      });

      hlsInstance.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          hlsInstance.destroy();
          if (usingFastSrcRef.current) {
            fastSrcFailed.current = true;
            capturedSwapTime.current = null;
            setUsingFastSrc(false);
            usingFastSrcRef.current = false;
            pendingSwap.current = false;
            if (src && src !== currentSrc) setCurrentSrc(src);
          } else if (fallbackSrc && currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
          }
        }
      });

      hlsInstance.loadSource(currentSrc);
      hlsInstance.attachMedia(video);
    } else {
      video.src = currentSrc;
    }

    const onStalled = () => setIsLoading(true);
    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => {
      setIsLoading(false);
      if (pendingSwap.current && src && currentSrc !== src) swapToFinalSrc();
    };
    const onError = () => {
      if (usingFastSrcRef.current) {
        fastSrcFailed.current = true;
        capturedSwapTime.current = null;
        setUsingFastSrc(false);
        usingFastSrcRef.current = false;
        pendingSwap.current = false;
        if (src && src !== currentSrc) setCurrentSrc(src);
      } else if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
      }
    };

    video.addEventListener("stalled", onStalled);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);

    return () => {
      if (hlsInstance) hlsInstance.destroy();
      video.removeEventListener("stalled", onStalled);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
    };
  }, [currentSrc, fallbackSrc, src, swapToFinalSrc]);

  // ── Auto-hide controls ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying || !showControls) return;
    const t = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(t);
  }, [showControls, isPlaying]);

  // ── Fullscreen orientation ────────────────────────────────────────────────
  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) {
        try { screen.orientation?.unlock?.(); } catch (e) { }
      }
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
    };
  }, []);

  // ── Player callbacks ──────────────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      if (onTimeUpdate) { lastSavedTime.current = videoRef.current.currentTime; onTimeUpdate(videoRef.current.currentTime); }
    } else {
      videoRef.current.play().catch(() => { });
      setIsPlaying(true);
    }
    setShowControls(true);
  }, [isPlaying, onTimeUpdate]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const t = videoRef.current.currentTime;
    setCurrentTime(t);
    if (onTimeUpdate && Math.abs(t - lastSavedTime.current) >= 4) {
      lastSavedTime.current = t;
      onTimeUpdate(t);
    }
  };

  const handleDurationChange = () => {
    if (!apiDuration && videoRef.current && !isNaN(videoRef.current.duration))
      setDuration(videoRef.current.duration);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    if (!apiDuration) setDuration(videoRef.current.duration);
    if (swapResumeTime.current !== null) {
      const t = swapResumeTime.current;
      if (t > 0) { videoRef.current.currentTime = t; setCurrentTime(t); lastSavedTime.current = t; }
      initialTimeApplied.current = true;
      if (swapWasPlaying.current) { videoRef.current.play().catch(() => { }); setIsPlaying(true); }
      swapResumeTime.current = null;
      swapWasPlaying.current = false;
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (initialTime && initialTime > 0 && !initialTimeApplied.current) {
      videoRef.current.currentTime = initialTime;
      setCurrentTime(initialTime);
      lastSavedTime.current = initialTime;
      initialTimeApplied.current = true;
    }
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleCanPlay = () => setIsLoading(false);
  const handleLoadStart = () => setIsLoading(true);

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const t = Number(e.target.value);
    videoRef.current.currentTime = t;
    setCurrentTime(t);
    if (onTimeUpdate) { lastSavedTime.current = t; onTimeUpdate(t); }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      persistMute(val === 0);
    }
  };

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    persistMute(next);
    videoRef.current.volume = next ? 0 : (volume || 0.5);
  }, [isMuted, volume, persistMute]);

  const handleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        const el = containerRef.current;
        await (el.requestFullscreen?.() ?? el.webkitRequestFullscreen?.() ?? el.msRequestFullscreen?.());
        try { await screen.orientation?.lock?.("landscape"); } catch (e) { }
      } else {
        await document.exitFullscreen();
      }
    } catch (err) { console.error("Fullscreen error:", err); }
  }, []);

  const handlePiP = async () => {
    if (!videoRef.current || videoRef.current.readyState === 0 || videoRef.current.videoWidth === 0) return;
    try {
      if (document.pictureInPictureElement) await document.exitPictureInPicture();
      else if (document.pictureInPictureEnabled) await videoRef.current.requestPictureInPicture();
    } catch (e) { console.error("PiP failed", e); }
  };

  const skip = useCallback((amount) => {
    if (!videoRef.current) return;
    const t = Math.max(0, Math.min(duration, videoRef.current.currentTime + amount));
    videoRef.current.currentTime = t;
    if (onTimeUpdate) { lastSavedTime.current = t; onTimeUpdate(t); }
  }, [duration, onTimeUpdate]);

  const handleRateChange = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) videoRef.current.playbackRate = rate;
    setShowSettings(false);
  };

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      switch (e.key) {
        case " ": case "k": e.preventDefault(); togglePlay(); setShowControls(true); break;
        case "ArrowRight":
          e.preventDefault(); skip(10); setSkipIndicator("right"); setShowControls(true);
          setTimeout(() => setSkipIndicator(null), 650); break;
        case "ArrowLeft":
          e.preventDefault(); skip(-10); setSkipIndicator("left"); setShowControls(true);
          setTimeout(() => setSkipIndicator(null), 650); break;
        case "ArrowUp":
          e.preventDefault();
          if (videoRef.current) {
            const v = Math.min(1, (isMuted ? 0 : volume) + 0.1);
            videoRef.current.volume = v; videoRef.current.muted = false;
            setVolume(v); persistMute(false); setShowControls(true);
          } break;
        case "ArrowDown":
          e.preventDefault();
          if (videoRef.current) {
            const v = Math.max(0, (isMuted ? 0 : volume) - 0.1);
            videoRef.current.volume = v; setVolume(v); persistMute(v === 0); setShowControls(true);
          } break;
        case "m": e.preventDefault(); toggleMute(); setShowControls(true); break;
        case "f": e.preventDefault(); handleFullscreen(); break;
        default: break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, skip, toggleMute, handleFullscreen, isMuted, volume, persistMute]);

  const formatTime = (s) => {
    if (isNaN(s)) return "00:00";
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  // ── Long-press 2× speed ───────────────────────────────────────────────────
  const handleGestureStart = (e) => {
    if (e.button && e.button !== 0) return;
    wasLongPressing.current = false;
    if (isPlaying) {
      longPressTimer.current = setTimeout(() => {
        if (videoRef.current) {
          prevRate.current = videoRef.current.playbackRate;
          videoRef.current.playbackRate = 2.0;
          setIs2xSpeed(true);
          wasLongPressing.current = true;
        }
      }, 450);
    }
  };

  const handleGestureEnd = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    if (is2xSpeed) { if (videoRef.current) videoRef.current.playbackRate = prevRate.current; setIs2xSpeed(false); }
  };

  const handleSurfaceClick = (e) => {
    if (wasLongPressing.current) { wasLongPressing.current = false; return; }
    const now = Date.now();
    const clientX = e.clientX || e.changedTouches?.[0]?.clientX;
    if (now - lastTap.current < 300) {
      if (containerRef.current && clientX) {
        const rect = containerRef.current.getBoundingClientRect();
        if (clientX - rect.left < rect.width / 2) { skip(-10); setSkipIndicator("left"); }
        else { skip(10); setSkipIndicator("right"); }
        setTimeout(() => setSkipIndicator(null), 650);
      }
      togglePlay(); lastTap.current = 0;
    } else { lastTap.current = now; togglePlay(); }
  };

  const progress = (currentTime / (duration || 100)) * 100;

  return (
    <div
      id="video"
      ref={containerRef}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => { if (isPlaying) setShowControls(false); handleGestureEnd(); }}
      className="group relative w-full h-full bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center select-none"
    >
      <video
        ref={videoRef}
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onLoadStart={handleLoadStart}
        onDurationChange={handleDurationChange}
        onCanPlay={handleCanPlay}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onEnded={onEnded}
        className="w-full h-full object-contain"
        playsInline
        preload="auto"
        muted={isMuted}
      >
        {subtitleUrl && (
          <track src={subtitleUrl} kind="subtitles" label="English" srcLang="en" default />
        )}
      </video>

      {/* Tap / click surface */}
      <div
        className="absolute inset-0 z-0 cursor-pointer"
        onMouseDown={handleGestureStart}
        onMouseUp={handleGestureEnd}
        onTouchStart={handleGestureStart}
        onTouchEnd={handleGestureEnd}
        onClick={handleSurfaceClick}
      />

      {/* 2× speed badge */}
      {is2xSpeed && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 z-30 pointer-events-none animate-pulse border border-white/10">
          <span>2x Speed</span>
          <SkipForward className="w-3.5 h-3.5 fill-white" />
        </div>
      )}

      {/* ── Fast/HLS toggle pill — top-right, only when both sources ready ── */}
      {hasBothSources && (
        <button
          onClick={(e) => { e.stopPropagation(); handleToggleStream(); setShowControls(true); }}
          title={streamMode === "fast" ? "Switch to HLS stream" : "Switch to Fast stream"}
          className={[
            "absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md transition-all duration-200",
            streamMode === "hls"
              ? "bg-red-600/90 border-red-500/50 text-white shadow-lg shadow-red-900/30"
              : "bg-black/60 border-white/15 text-white/80 hover:bg-black/80 hover:text-white",
          ].join(" ")}
        >
          {streamMode === "hls" ? (
            <><Layers className="w-3 h-3" /><span>HLS</span></>
          ) : (
            <><Zap className="w-3 h-3" /><span>Fast</span></>
          )}
        </button>
      )}

      {/* Skip indicators */}
      {skipIndicator === "left" && (
        <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-white/10 to-transparent flex flex-col items-center justify-center text-white font-medium pointer-events-none z-20 rounded-l-2xl">
          <div className="bg-black/40 p-3 rounded-full"><SkipBack className="w-6 h-6 fill-white animate-ping" /></div>
          <span className="text-xs bg-black/60 px-2 py-0.5 rounded-full font-bold mt-2">-10s</span>
        </div>
      )}
      {skipIndicator === "right" && (
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent flex flex-col items-center justify-center text-white font-medium pointer-events-none z-20 rounded-r-2xl">
          <div className="bg-black/40 p-3 rounded-full"><SkipForward className="w-6 h-6 fill-white animate-ping" /></div>
          <span className="text-xs bg-black/60 px-2 py-0.5 rounded-full font-bold mt-2">+10s</span>
        </div>
      )}

      {/* Buffering spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] pointer-events-none z-10">
          <Loader className="w-10 h-10 text-white animate-spin" />
        </div>
      )}

      {/* Centre play button */}
      {!isLoading && !isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer z-10"
        >
          <Play className="w-8 h-8 fill-current translate-x-0.5" />
        </button>
      )}

      {/* Controls bar */}
      <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col gap-3 transition-opacity duration-300 z-10 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {/* Seek bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-white/95 font-medium min-w-[36px]">{formatTime(currentTime)}</span>
          <input
            type="range" min="0" max={duration || 100} value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-red-600 hover:h-2 transition-all"
            style={{ background: `linear-gradient(to right, #ff0000 0%, #ff0000 ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)` }}
          />
          <span className="text-xs text-white/70 font-medium min-w-[36px]">{formatTime(duration)}</span>
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="text-white hover:text-red-500 transition-colors p-1">
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>
            <button onClick={() => skip(-10)} className="text-white hover:text-red-500 transition-colors p-1 hidden sm:inline" title="Rewind 10s">
              <SkipBack className="w-5 h-5" />
            </button>
            <button onClick={() => skip(10)} className="text-white hover:text-red-500 transition-colors p-1 hidden sm:inline" title="Fast Forward 10s">
              <SkipForward className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 group/volume">
              <button onClick={toggleMute} className="text-white hover:text-red-500 transition-colors p-1">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 overflow-hidden group-hover/volume:w-16 h-1 rounded bg-white/30 accent-white transition-all cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* ── Fast/HLS toggle in control bar (mirrors top-right pill) ── */}
            {hasBothSources && (
              <button
                onClick={handleToggleStream}
                title={streamMode === "fast" ? "Switch to HLS" : "Switch to Fast"}
                className={[
                  "flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold border transition-all",
                  streamMode === "hls"
                    ? "bg-red-600/80 border-red-500/40 text-white"
                    : "bg-white/10 border-white/15 text-white/70 hover:bg-white/20 hover:text-white",
                ].join(" ")}
              >
                {streamMode === "hls" ? (
                  <><Layers className="w-3 h-3" /><span>HLS</span></>
                ) : (
                  <><Zap className="w-3 h-3" /><span>Fast</span></>
                )}
              </button>
            )}

            <div className="relative">
              <button onClick={() => setShowSettings(!showSettings)} className="text-white hover:text-red-500 transition-colors p-1">
                <Settings className="w-5 h-5" />
              </button>
              {showSettings && (
                <div className="absolute right-0 bottom-full mb-2 bg-black/95 border border-white/10 rounded-lg p-2 flex flex-col gap-1 text-xs text-white min-w-[100px] z-50">
                  <span className="text-white/40 font-bold px-2 py-1 select-none border-b border-white/10">Speed</span>
                  {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
                    <button key={rate} onClick={() => handleRateChange(rate)}
                      className={`px-2 py-1 text-left rounded hover:bg-white/10 transition-colors ${playbackRate === rate ? "text-red-500 font-semibold" : ""}`}>
                      {rate === 1 ? "Normal" : `${rate}x`}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {isPipEnabled && (
              <button onClick={handlePiP} className="text-white hover:text-red-500 transition-colors p-1" title="Picture-in-Picture">
                <PictureInPicture className="w-5 h-5" />
              </button>
            )}
            <button onClick={handleFullscreen} className="text-white hover:text-red-500 transition-colors p-1" title="Fullscreen">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}