"use client";

import React, { useState } from "react";
import { useHistory } from "@/components/history/HistoryProvider";
import {
  Play,
  Trash2,
  Clock,
  Trash,
} from "lucide-react";

// Helper function to format seconds into H:MM:SS or M:SS
const formatDuration = (totalSeconds) => {
  if (!totalSeconds) return "0:00";

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  }

  return `${m}:${s.toString().padStart(2, "0")}`;
};

export default function HistoryList() {
  const { history, deleteEntry, clearHistory } = useHistory();

  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(null);

  const handleClearAll = () => {
    if (window.confirm("Delete all history?")) {
      clearHistory();
    }
  };

  if (!history || history.length === 0) return null;

  return (
    <div className="flex flex-col h-full w-full bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-zinc-400" />
          <span className="text-sm font-semibold text-zinc-100">
            Up Next / History
          </span>
        </div>

        <button
          onClick={handleClearAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
        >
          <Trash size={12} />
          Clear
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-3">
        {history.map((entry) => {
          // Calculate the watched percentage safely
          const progressPercent =
            entry.duration_seconds && entry.progress
              ? Math.min(100, Math.max(0, (entry.progress / entry.duration_seconds) * 100))
              : 0;

          return (
            <div
              key={entry.url}
              className="group flex gap-3 mb-2 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer relative"
              onMouseEnter={() => {
                setHoveredVideo(entry.url);
                setLoadingVideo(entry.url);
              }}
              onMouseLeave={() => {
                setHoveredVideo(null);
                setLoadingVideo(null);
              }}
              onClick={() =>
                window.open(
                  `/download?url=${encodeURIComponent(entry.url)}`,
                  "_blank"
                )
              }
            >
              {/* Thumbnail / Preview Container */}
              <div className="relative w-[160px] h-[90px] shrink-0 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center">

                {/* Thumbnail */}
                {entry.thumbnail && (
                  <img
                    src={entry.thumbnail}
                    alt=""
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hoveredVideo === entry.url && !loadingVideo && entry.fast_stream_url
                        ? "opacity-0"
                        : "opacity-100"
                      }`}
                  />
                )}

                {/* Hover Video Preview */}
                {entry.fast_stream_url && hoveredVideo === entry.url && (
                  <video
                    src={entry.fast_stream_url}
                    autoPlay
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedData={() => setLoadingVideo(null)}
                    onCanPlay={() => setLoadingVideo(null)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loadingVideo === entry.url ? "opacity-0" : "opacity-100"
                      }`}
                  />
                )}
                 

                {/* YouTube-style shimmer */}
                {loadingVideo === entry.url && (
                  <div className="absolute inset-0 z-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.2s_infinite]" />
                  </div>
                )}

                {!entry.thumbnail && !entry.fast_stream_url && (
                  <Play size={24} className="text-zinc-600" />
                )}

                {/* Duration Overlay (Shifted slightly upward to clear progress bar) */}
                {entry.duration_seconds && (
                  <div className="absolute bottom-2 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[11px] font-medium text-white tracking-wide z-40">
                    {formatDuration(entry.duration_seconds)}
                  </div>
                )}

                {/* Hover Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  <Play size={28} className="fill-white text-white" />
                </div>

                {/* YOUTUBE STYLE PROGRESS BAR OVERLAY */}
                {progressPercent > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-40 w-full">
                    <div
                      className="bg-red-600 h-full transition-all duration-150"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-start pt-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <p
                      className="text-sm font-medium text-[#f1f1f1] line-clamp-2 leading-snug"
                      title={entry.title || entry.url}
                    >
                      {entry.title || entry.url}
                    </p>

                    {entry.description && (
                      <p
                        className="text-xs text-[#bbbbbb] mt-1 line-clamp-1"
                        title={entry.description}
                      >
                        {entry.description}
                      </p>
                    )}
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteEntry(entry.url);
                    }}
                    className="p-1.5 rounded-full text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                    title="Remove from history"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Timestamp */}
                {entry.watchedAt && (
                  <p className="text-xs text-[#aaaaaa] mt-1.5 font-medium">
                    {new Date(entry.watchedAt).toLocaleDateString()}
                    {" • "}
                    {new Date(entry.watchedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}