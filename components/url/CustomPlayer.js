"use client";
import React, { useRef, useState, useEffect } from "react";
import Hls from "hls.js";
import {
  Play, Pause, Volume2, VolumeX, Maximize, RotateCcw,
  Settings, Loader, SkipForward, SkipBack, PictureInPicture
} from "lucide-react";

export default function CustomPlayer({ src, fallbackSrc, poster, subtitleUrl, onEnded }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [currentSrc, setCurrentSrc] = useState(src);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [isPipEnabled, setIsPipEnabled] = useState(false);

  // YouTube Gestures State & Refs
  const [is2xSpeed, setIs2xSpeed] = useState(false);
  const [skipIndicator, setSkipIndicator] = useState(null); // 'left' | 'right' | null
  const longPressTimer = useRef(null);
  const lastTap = useRef(0);
  const prevRate = useRef(1);
  const wasLongPressing = useRef(false);

  useEffect(() => {
    if (typeof document !== "undefined" && document.pictureInPictureEnabled) {
      setIsPipEnabled(true);
    }
  }, []);

  const handlePiP = async () => {
    if (!videoRef.current) return;

    if (videoRef.current.readyState === 0 || videoRef.current.videoWidth === 0) {
      console.warn("Cannot enter PiP: Video track not ready.");
      return;
    }

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.error("PiP failed", error);
    }
  };

  useEffect(() => {
    setIsPlaying(false);
    setIsLoading(true);
    setCurrentTime(0);
    setCurrentSrc(src);
  }, [src]);

  useEffect(() => {
    if (!videoRef.current || !currentSrc) return;
    const video = videoRef.current;

    video.preload = "auto";
    const isHls = currentSrc.includes(".m3u8") || currentSrc.includes("m3u8");
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

      hlsInstance.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
            case Hls.ErrorTypes.MEDIA_ERROR:
            case Hls.ErrorTypes.MUX_ERROR:
              console.warn("HLS fatal error encountered. Attempting recovery or fallback...");
              if (fallbackSrc && currentSrc !== fallbackSrc) {
                console.warn("Switching to fallback source:", fallbackSrc);
                hlsInstance.destroy();
                setCurrentSrc(fallbackSrc);
              }
              break;
            default:
              if (fallbackSrc && currentSrc !== fallbackSrc) {
                hlsInstance.destroy();
                setCurrentSrc(fallbackSrc);
              }
              break;
          }
        }
      });
      hlsInstance.loadSource(currentSrc);
      hlsInstance.attachMedia(video);
    }

    const handleStalled = () => setIsLoading(true);
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);

    video.addEventListener("stalled", handleStalled);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);

    return () => {
      if (hlsInstance) hlsInstance.destroy();
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      if (video._fallbackErrorHandler) {
        video.removeEventListener("error", video._fallbackErrorHandler);
        delete video._fallbackErrorHandler;
      }
    };
  }, [currentSrc, fallbackSrc]);

  useEffect(() => {
    if (!isPlaying || !showControls) return;
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [showControls, isPlaying]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        if (screen.orientation && screen.orientation.unlock) {
          try {
            screen.orientation.unlock();
          } catch (e) {
            console.warn("Orientation unlock failed:", e);
          }
        }
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => { });
      setIsPlaying(true);
    }
    setShowControls(true);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCanPlay = () => setIsLoading(false);
  const handleLoadStart = () => setIsLoading(true);

  const handleSeek = (e) => {
    if (videoRef.current) {
      const seekTime = Number(e.target.value);
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
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
    if (videoRef.current) {
      const nextMute = !isMuted;
      videoRef.current.muted = nextMute;
      setIsMuted(nextMute);
      if (nextMute) {
        videoRef.current.volume = 0;
      } else {
        videoRef.current.volume = volume || 0.5;
      }
    }
  };

  const handleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if (containerRef.current.webkitRequestFullscreen) {
          await containerRef.current.webkitRequestFullscreen();
        } else if (containerRef.current.msRequestFullscreen) {
          await containerRef.current.msRequestFullscreen();
        }

        if (screen.orientation && screen.orientation.lock) {
          try {
            await screen.orientation.lock('landscape');
          } catch (e) {
            console.warn("Orientation lock failed:", e);
          }
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  const skip = (amount) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + amount));
    }
  };

  const handleRateChange = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setShowSettings(false);
  };

  const formatTime = (timeInSecs) => {
    if (isNaN(timeInSecs)) return "00:00";
    const hrs = Math.floor(timeInSecs / 3600);
    const mins = Math.floor((timeInSecs % 3600) / 60);
    const secs = Math.floor(timeInSecs % 60);
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // YouTube Gesture Handlers
  const handleGestureStart = (e) => {
    if (e.button && e.button !== 0) return; // Only trigger for left-click
    wasLongPressing.current = false;

    if (isPlaying) {
      longPressTimer.current = setTimeout(() => {
        if (videoRef.current) {
          prevRate.current = videoRef.current.playbackRate;
          videoRef.current.playbackRate = 2.0;
          setIs2xSpeed(true);
          wasLongPressing.current = true;
        }
      }, 450); // Hold threshold
    }
  };

  const handleGestureEnd = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    if (is2xSpeed) {
      if (videoRef.current) {
        videoRef.current.playbackRate = prevRate.current;
      }
      setIs2xSpeed(false);
    }
  };

  const handleSurfaceClick = (e) => {
    if (wasLongPressing.current) {
      wasLongPressing.current = false;
      return; // Absorb click from long press release
    }

    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    // Get correct click/tap X coordinate across desktop & mobile platforms
    const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);

    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      // Double tap confirmed
      if (containerRef.current && clientX) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;

        if (x < rect.width / 2) {
          skip(-10);
          setSkipIndicator("left");
        } else {
          skip(10);
          setSkipIndicator("right");
        }
        setTimeout(() => setSkipIndicator(null), 650);
      }
      // Revert the play/pause state shift caused by the first click
      togglePlay();
      lastTap.current = 0;
    } else {
      lastTap.current = now;
      togglePlay();
    }
  };

  return (
    <div
      id="video"
      ref={containerRef}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => {
        if (isPlaying) setShowControls(false);
        handleGestureEnd();
      }}
      className="group relative w-full h-full bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center select-none"
    >
      <video
        ref={videoRef}
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onEnded={onEnded}
        className="w-full h-full object-contain"
        playsInline
        preload="auto"
      >
        {subtitleUrl && (
          <track
            src={subtitleUrl}
            kind="subtitles"
            label="English"
            srclang="en"
            default
          />
        )}
      </video>

      {/* Transparent Gesture Layer Intercepting Inputs */}
      <div
        className="absolute inset-0 z-0 cursor-pointer"
        onMouseDown={handleGestureStart}
        onMouseUp={handleGestureEnd}
        onTouchStart={handleGestureStart}
        onTouchEnd={handleGestureEnd}
        onClick={handleSurfaceClick}
      />

      {/* YouTube Long Press Speed indicator */}
      {is2xSpeed && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 z-30 pointer-events-none animate-pulse border border-white/10">
          <span>2x Speed</span>
          <SkipForward className="w-3.5 h-3.5 fill-white" />
        </div>
      )}

      {/* YouTube Double Tap Skip Indicators */}
      {skipIndicator === "left" && (
        <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-white/10 to-transparent flex flex-col items-center justify-center text-white font-medium pointer-events-none z-20 rounded-l-2xl transition-opacity duration-300">
          <div className="bg-black/40 p-3 rounded-full flex items-center justify-center">
            <SkipBack className="w-6 h-6 fill-white animate-ping" />
          </div>
          <span className="text-xs bg-black/60 px-2 py-0.5 rounded-full font-bold mt-2">-10s</span>
        </div>
      )}
      {skipIndicator === "right" && (
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent flex flex-col items-center justify-center text-white font-medium pointer-events-none z-20 rounded-r-2xl transition-opacity duration-300">
          <div className="bg-black/40 p-3 rounded-full flex items-center justify-center">
            <SkipForward className="w-6 h-6 fill-white animate-ping" />
          </div>
          <span className="text-xs bg-black/60 px-2 py-0.5 rounded-full font-bold mt-2">+10s</span>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] pointer-events-none z-10">
          <Loader className="w-10 h-10 text-white animate-spin" />
        </div>
      )}

      {/* Big Play/Pause overlay button on hover */}
      {!isLoading && !isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer z-10"
        >
          <Play className="w-8 h-8 fill-current translate-x-0.5" />
        </button>
      )}

      {/* Controls Overlay */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col gap-3 transition-opacity duration-300 z-10 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Progress Bar Slider */}
        <div className="flex items-center gap-2 w-full group/slider">
          <span className="text-xs text-white/95 font-medium min-w-[36px]">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-red-600 hover:h-2 transition-all"
            style={{
              background: `linear-gradient(to right, #ff0000 0%, #ff0000 ${(currentTime / (duration || 100)) * 100}%, rgba(255, 255, 255, 0.2) ${(currentTime / (duration || 100)) * 100}%, rgba(255, 255, 255, 0.2) 100%)`
            }}
          />
          <span className="text-xs text-white/70 font-medium min-w-[36px]">
            {formatTime(duration)}
          </span>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="text-white hover:text-red-500 transition-colors p-1"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>

            {/* Skip Back */}
            <button
              onClick={() => skip(-10)}
              className="text-white hover:text-red-500 transition-colors p-1 hidden sm:inline"
              title="Rewind 10s"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            {/* Skip Forward */}
            <button
              onClick={() => skip(10)}
              className="text-white hover:text-red-500 transition-colors p-1 hidden sm:inline"
              title="Fast Forward 10s"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-1.5 group/volume">
              <button
                onClick={toggleMute}
                className="text-white hover:text-red-500 transition-colors p-1"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 overflow-hidden group-hover/volume:w-16 h-1 rounded bg-white/30 accent-white transition-all cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed / Settings */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:text-red-500 transition-colors p-1"
              >
                <Settings className="w-5 h-5" />
              </button>
              {showSettings && (
                <div className="absolute right-0 bottom-full mb-2 bg-black/95 border border-white/10 rounded-lg p-2 flex flex-col gap-1 text-xs text-white min-w-[100px] z-50">
                  <span className="text-white/40 font-bold px-2 py-1 select-none border-b border-white/10">Speed</span>
                  {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => handleRateChange(rate)}
                      className={`px-2 py-1 text-left rounded hover:bg-white/10 transition-colors ${playbackRate === rate ? "text-red-500 font-semibold" : ""}`}
                    >
                      {rate === 1 ? "Normal" : `${rate}x`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PiP */}
            {isPipEnabled && (
              <button
                onClick={handlePiP}
                className="text-white hover:text-red-500 transition-colors p-1"
                title="Picture in Picture"
              >
                <PictureInPicture className="w-5 h-5" />
              </button>
            )}

            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              className="text-white hover:text-red-500 transition-colors p-1"
              title="Fullscreen"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}