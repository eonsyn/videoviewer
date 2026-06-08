"use client";
import React from "react";
import { useHistory } from "@/components/history/HistoryProvider";
import { Play, Trash2, Clock, Trash } from "lucide-react";

// Helper function to format seconds into H:MM:SS or M:SS
const formatDuration = (totalSeconds) => {
  if (!totalSeconds) return "0:00";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function HistoryList() {
  const { history, deleteEntry, clearHistory } = useHistory();

  const handleClearAll = () => {
    if (window.confirm("Delete all history?")) clearHistory();
  };

  if (!history || history.length === 0) return null;

  return (
    <div className="flex flex-col h-full w-full bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-zinc-400" />
          <span className="text-sm font-semibold text-zinc-100">Up Next / History</span>
        </div>
        <button
          onClick={handleClearAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
        >
          <Trash size={12} /> Clear
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-3">
        {history.map((entry) => (
          <div
            key={entry.url}
            className="group flex gap-3 mb-2 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer relative"
            onClick={() => window.open(`/download?url=${encodeURIComponent(entry.url)}`, '_blank')}
          >
            {/* YouTube-style Thumbnail */}
            <div className="relative w-[160px] h-[90px] shrink-0 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center">
              {entry.thumbnail ? (
                <img src={entry.thumbnail} alt="" className="w-full h-full object-cover" />
              ) : (
                <Play size={24} className="text-zinc-600" />
              )}

              {/* Duration Badge - Bottom Right */}
              {entry.duration_seconds && (
                <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[11px] font-medium text-white tracking-wide z-10">
                  {formatDuration(entry.duration_seconds)}
                </div>
              )}

              {/* Play overlay icon on hover */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <Play size={28} className="fill-white text-white" />
              </div>
            </div>

            {/* Title & Actions */}
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
                    <p className="text-xs text-[#bbbbbb] mt-1 line-clamp-1" title={entry.description}>
                      {entry.description}
                    </p>
                  )}
                </div>
                {/* Delete Button - Appears on Hover */}
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

              {entry.watchedAt && (
                <p className="text-xs text-[#aaaaaa] mt-1.5 font-medium">
                  {new Date(entry.watchedAt).toLocaleDateString()} • {new Date(entry.watchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}