"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Hls from "hls.js";
import {
  Play, Pause, Volume2, VolumeX, Maximize,
  Settings, Loader, SkipForward, SkipBack, PictureInPicture
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
  onTimeUpdate
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // currentSrc drives what <video> / HLS is actually loading
  const [currentSrc, setCurrentSrc] = useState(() => fastSrc || src);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(apiDuration || 0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [isPipEnabled, setIsPipEnabled] = useState(false);

  const [is2xSpeed, setIs2xSpeed] = useState(false);
  const [skipIndicator, setSkipIndicator] = useState(null);

  // Tracks whether we're currently playing the fast stream (not the final HLS)
  const [usingFastSrc, setUsingFastSrc] = useState(!!(fastSrc && fastSrc !== src));
  // Ref mirror of usingFastSrc so async HLS callbacks read current value (no stale closure)
  const usingFastSrcRef = useRef(!!(fastSrc && fastSrc !== src));

  const longPressTimer = useRef(null);
  const lastTap = useRef(0);
  const prevRate = useRef(1);
  const wasLongPressing = useRef(false);
  const lastSavedTime = useRef(0);
  const initialTimeApplied = useRef(false);

  // ─── When the parent tells us a new final HLS src is ready ───────────────
  // If we're mid-playback on fastSrc, seamlessly swap to src
  const pendingSwap = useRef(false);

  useEffect(() => {
    if (!src) return;

    // Reset failure flag on a brand-new src
    fastSrcFailed.current = false;

    // First ever mount — if fastSrc exists AND hasn't already failed, start with that
    if (fastSrc && fastSrc !== src && !fastSrcFailed.current) {
      setCurrentSrc(fastSrc);
      setUsingFastSrc(true);
      usingFastSrcRef.current = true;
      pendingSwap.current = true; // will swap once video is playing
    } else {
      setCurrentSrc(src);
      setUsingFastSrc(false);
      usingFastSrcRef.current = false;
    }

    initialTimeApplied.current = false;
    lastSavedTime.current = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]); // intentionally omit fastSrc – we only care when the final src lands

  // ─── When the final src becomes available, swap if we were on fastSrc ──────
  useEffect(() => {
    if (!src) return;
    if (fastSrc && src === fastSrc) return; // same URL, nothing to do

    // If fastSrc failed we never swapped — load final src directly now
    if (fastSrcFailed.current) {
      fastSrcFailed.current = false;
      setUsingFastSrc(false);
      usingFastSrcRef.current = false;
      pendingSwap.current = false;
      swapResumeTime.current = null;
      setCurrentSrc(src);
      return;
    }

    if (!usingFastSrc) return;

    // src is now different from fastSrc → queue a seamless swap
    pendingSwap.current = true;

    // If video is already playing we can swap right now
    if (videoRef.current && !videoRef.current.paused) {
      swapToFinalSrc();
    }
    // Otherwise the swap fires inside handlePlaying once fastSrc starts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const swapToFinalSrc = useCallback(() => {
    if (!pendingSwap.current || !src) return;
    if (!videoRef.current) return;

    const currentVideoTime = videoRef.current.currentTime;
    const wasPlaying = !videoRef.current.paused;

    // If the video hasn't meaningfully progressed yet (currentTime < 1s),
    // prefer the saved entry.progress (initialTime) so the user resumes
    // from where they last left off rather than restarting from 0.
    const savedTime =
      currentVideoTime > 1
        ? currentVideoTime   // mid-playback swap — keep exact position
        : (initialTime || 0); // swap happened before user watched anything

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

  const swapResumeTime = useRef(null);
  const swapWasPlaying = useRef(false);
  // Tracks whether fastSrc failed so we know to load src directly instead
  const fastSrcFailed = useRef(false);

  // ─── Sync apiDuration ────────────────────────────────────────────────────
  useEffect(() => {
    if (apiDuration) setDuration(apiDuration);
  }, [apiDuration]);

  useEffect(() => {
    if (typeof document !== "undefined" && document.pictureInPictureEnabled) {
      setIsPipEnabled(true);
    }
  }, []);

  // ─── HLS / src loader ────────────────────────────────────────────────────
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
            // fastSrc HLS failed — mark it and immediately load the final src if available
            console.warn("fastSrc HLS fatal error — falling back to final src");
            fastSrcFailed.current = true;
            setUsingFastSrc(false);
            usingFastSrcRef.current = false;
            pendingSwap.current = false;
            if (src && src !== currentSrc) {
              setCurrentSrc(src);
            }
          } else if (fallbackSrc && currentSrc !== fallbackSrc) {
            // final src failed — try the fast stream as last resort
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
      // ── Seamless swap: we were buffering fastSrc, now it's playing → swap ──
      if (pendingSwap.current && src && currentSrc !== src) {
        swapToFinalSrc();
      }
    };
    const onError = () => {
      if (usingFastSrcRef.current) {
        // fastSrc failed — fall forward to final src immediately
        console.warn("fastSrc video error — falling back to final src");
        fastSrcFailed.current = true;
        setUsingFastSrc(false);
        usingFastSrcRef.current = false;
        pendingSwap.current = false;
        if (src && src !== currentSrc) {
          setCurrentSrc(src);
        }
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

  // ─── Auto-hide controls ──────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying || !showControls) return;
    const t = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(t);
  }, [showControls, isPlaying]);

  // ─── Fullscreen orientation ───────────────────────────────────────────────
  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) {
        try { screen.orientation?.unlock?.(); } catch (e) { /* ignore */ }
      }
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
    };
  }, []);

  // ─── Player callbacks ─────────────────────────────────────────────────────
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      if (onTimeUpdate) {
        lastSavedTime.current = videoRef.current.currentTime;
        onTimeUpdate(videoRef.current.currentTime);
      }
    } else {
      videoRef.current.play().catch(() => { });
      setIsPlaying(true);
    }
    setShowControls(true);
  };

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
    if (!apiDuration && videoRef.current && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    if (!apiDuration) setDuration(videoRef.current.duration);

    // Swap resume: seek to the saved position on the final src.
    // swapResumeTime is either the exact playback position from the fast stream
    // (if user had watched for >1s) or entry.progress (initialTime) if the swap
    // happened before the user meaningfully started watching.
    if (swapResumeTime.current !== null) {
      const t = swapResumeTime.current;
      if (t > 0) {
        videoRef.current.currentTime = t;
        setCurrentTime(t);
        lastSavedTime.current = t;
      }
      initialTimeApplied.current = true;
      if (swapWasPlaying.current) {
        videoRef.current.play().catch(() => { });
        setIsPlaying(true);
      }
      swapResumeTime.current = null;
      swapWasPlaying.current = false;
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Normal first load (no swap): resume from saved entry.progress
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
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
    videoRef.current.volume = next ? 0 : (volume || 0.5);
  };

  const handleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        const el = containerRef.current;
        await (el.requestFullscreen?.() ?? el.webkitRequestFullscreen?.() ?? el.msRequestFullscreen?.());
        try { await screen.orientation?.lock?.("landscape"); } catch (e) { /* ignore */ }
      } else {
        await document.exitFullscreen();
      }
    } catch (err) { console.error("Fullscreen error:", err); }
  };

  const handlePiP = async () => {
    if (!videoRef.current || videoRef.current.readyState === 0 || videoRef.current.videoWidth === 0) return;
    try {
      if (document.pictureInPictureElement) await document.exitPictureInPicture();
      else if (document.pictureInPictureEnabled) await videoRef.current.requestPictureInPicture();
    } catch (e) { console.error("PiP failed", e); }
  };

  const skip = (amount) => {
    if (!videoRef.current) return;
    const t = Math.max(0, Math.min(duration, videoRef.current.currentTime + amount));
    videoRef.current.currentTime = t;
    if (onTimeUpdate) { lastSavedTime.current = t; onTimeUpdate(t); }
  };

  const handleRateChange = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) videoRef.current.playbackRate = rate;
    setShowSettings(false);
  };

  const formatTime = (s) => {
    if (isNaN(s)) return "00:00";
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  // ─── Long-press 2× speed ──────────────────────────────────────────────────
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
    if (is2xSpeed) {
      if (videoRef.current) videoRef.current.playbackRate = prevRate.current;
      setIs2xSpeed(false);
    }
  };

  const handleSurfaceClick = (e) => {
    if (wasLongPressing.current) { wasLongPressing.current = false; return; }
    const now = Date.now();
    const clientX = e.clientX || e.changedTouches?.[0]?.clientX;
    if (now - lastTap.current < 300) {
      if (containerRef.current && clientX) {
        const rect = containerRef.current.getBoundingClientRect();
        if (clientX - rect.left < rect.width / 2) {
          skip(-10); setSkipIndicator("left");
        } else {
          skip(10); setSkipIndicator("right");
        }
        setTimeout(() => setSkipIndicator(null), 650);
      }
      togglePlay();
      lastTap.current = 0;
    } else {
      lastTap.current = now;
      togglePlay();
    }
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

      {/* Fast-stream indicator */}
      {/* {usingFastSrc && (
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-yellow-400 px-2.5 py-1 rounded-full text-[11px] font-semibold z-30 pointer-events-none border border-yellow-500/30">
          ⚡ Fast Stream
        </div>
      )} */}

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