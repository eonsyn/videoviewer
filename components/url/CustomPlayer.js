"use client";
import React, { useRef, useState, useEffect } from "react";
import Hls from "hls.js";
import { 
  Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, 
  Settings, Loader, SkipForward, SkipBack 
} from "lucide-react";

export default function CustomPlayer({ src, poster, subtitleUrl }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setIsLoading(true);
    setCurrentTime(0);
  }, [src]);

  // Handle HLS and dynamic buffering configuration with low‑latency support
  useEffect(() => {
    if (!videoRef.current || !src) return;
    const video = videoRef.current;

    // Ensure video element preloads data
    video.preload = "auto";

    const isHls = src.includes(".m3u8") || src.includes("m3u8");
    let hlsInstance = null;

    if (isHls && Hls.isSupported()) {
      hlsInstance = new Hls({
        maxBufferLength: 120, // up to 2 minutes buffer
        maxMaxBufferLength: 240,
        maxBufferSize: 200 * 1024 * 1024,
        lowLatencyMode: true,
        backBufferLength: 30,
        progressive: true,
        // aggressive fetch to keep buffer filled
        fragLoadingTimeOut: 4000,
        fragLoadingMaxRetry: 5,
        startLevel: -1,
      });
      hlsInstance.loadSource(src);
      hlsInstance.attachMedia(video);
    } else {
      video.src = src;
    }

    // Recover from stalled network conditions
    const handleStalled = () => {
      if (hlsInstance) hlsInstance.startLoad();
    };
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
    };
  }, [src]);

  // Hide controls after 3 seconds of inactivity when playing
  useEffect(() => {
    if (!isPlaying || !showControls) return;
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [showControls, isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
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
      // Smooth scroll to the player container when metadata is loaded
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

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

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) { /* Safari */
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) { /* IE11 */
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
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
    const mins = Math.floor(timeInSecs / 60);
    const secs = Math.floor(timeInSecs % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div 
    id="video"
      ref={containerRef}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="group relative w-full h-full bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center select-none"
    >
      <video
        ref={videoRef}
        poster={poster}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        className="w-full h-full object-contain cursor-pointer"
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

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] pointer-events-none">
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
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col gap-3 transition-opacity duration-300 z-10 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
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

            {/* Fullscreen */}
            <button 
              onClick={handleFullscreen} 
              className="text-white hover:text-red-500 transition-colors p-1"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
