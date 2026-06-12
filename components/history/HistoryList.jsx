"use client";
import React, { useState } from "react";
import { useHistory } from "@/components/history/HistoryProvider";
import { Play, Trash2, Trash } from "lucide-react";

const formatDuration = (totalSeconds) => {
  if (!totalSeconds) return "0:00";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const timeAgo = (ts) => {
  if (!ts) return "";
  const diff = Date.now() - Number(ts);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(Number(ts)).toLocaleDateString();
};

export default function HistoryList({ autoplay, setAutoplay }) {
  const { history, deleteEntry, clearHistory } = useHistory();
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(null);

  const handleClearAll = () => {
    if (window.confirm("Delete all history?")) clearHistory();
  };

  if (!history || history.length === 0) return null;

  return (
    <div style={{
      width: "100%",
      background: "#0f0f0f",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.07)",
      overflow: "hidden",
      fontFamily: "'Geist', sans-serif",
      maxHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* ── Header ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px 12px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setAutoplay(!autoplay)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-full cursor-pointer border-none outline-none"
          >
            <span className="text-sm font-medium text-[#f1f1f1] pl-1">Autoplay</span>
            <div className={`w-9 h-5 rounded-full relative transition-colors flex items-center px-0.5 ${autoplay ? "bg-white" : "bg-[#717171]"}`}>
              <div className={`w-4 h-4 rounded-full transition-transform ${autoplay ? "bg-[#0f0f0f] translate-x-4" : "bg-[#0f0f0f] translate-x-0"}`} />
            </div>
          </button>
        </div>

        <button
          onClick={handleClearAll}
          title="Clear all"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.18)",
            borderRadius: "8px",
            padding: "5px 10px",
            fontSize: "12px",
            color: "#f87171",
            cursor: "pointer",
            fontFamily: "'Geist', sans-serif",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.16)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.08)"}
        >
          <Trash size={16} className="hover:text-red-500 hover:scale-110 hover:rotate-12 transition-all duration-200" />
          Clear
        </button>
      </div>

      {/* ── Scrollable list ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 4px" }}>
        {history.map((entry) => {
          // Backward compat: entries saved before this update have no files array
          const files = entry.files?.length ? entry.files : [
            {
              fs_id:            entry.url,
              filename:         entry.filename || entry.title,
              title:            entry.title,
              thumbnail:        entry.thumbnail,
              fast_stream_url:  entry.fast_stream_url || "",
              duration_seconds: entry.duration_seconds,
              progress:         entry.progress || 0,
            },
          ];

          const navUrl = `/download?url=${encodeURIComponent(entry.url)}`;

          return (
            <div
              key={entry.url}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
            >
              {files.map((file, fileIdx) => {
                const hoverKey = `${entry.url}__${file.fs_id || fileIdx}`;
                const isActive = file.fs_id === entry.activeFileId;

                // Per-file progress bar; fall back to entry-level for first file
                const progressPercent =
                  file.duration_seconds && file.progress
                    ? Math.min(100, Math.max(0, (file.progress / file.duration_seconds) * 100))
                    : fileIdx === 0 && entry.progress && entry.duration_seconds
                      ? Math.min(100, Math.max(0, (entry.progress / entry.duration_seconds) * 100))
                      : 0;

                return (
                  <div
                    key={file.fs_id || fileIdx}
                    onClick={() => window.open(navUrl, "_blank")}
                    onMouseEnter={() => { setHoveredVideo(hoverKey); setLoadingVideo(hoverKey); }}
                    onMouseLeave={() => { setHoveredVideo(null); setLoadingVideo(null); }}
                    style={{
                      display: "flex",
                      gap: "8px",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      position: "relative",
                      transition: "background 0.15s",
                      background: hoveredVideo === hoverKey ? "rgba(255,255,255,0.04)" : "transparent",
                      // Red left border on the file that was last playing
                      borderLeft:"2px solid transparent",
                    }}
                  >
                    {/* ── Thumbnail ── */}
                    <div style={{
                      width: "168px", height: "94px", flexShrink: 0,
                      borderRadius: "8px", background: "#1a1f2b", overflow: "hidden",
                      position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {/* Static thumbnail */}
                      {file.thumbnail && (
                        <img
                          src={file.thumbnail}
                          alt=""
                          style={{
                            position: "absolute", inset: 0, width: "100%", height: "100%",
                            objectFit: "cover", transition: "opacity 0.3s",
                            opacity: hoveredVideo === hoverKey && file.fast_stream_url ? 0 : 1,
                          }}
                        />
                      )}

                      {/* Hover video preview */}
                      {file.fast_stream_url && hoveredVideo === hoverKey && (
                        <video
                          src={file.fast_stream_url}
                          autoPlay muted playsInline preload="metadata"
                          onLoadedData={() => setLoadingVideo(null)}
                          onCanPlay={() => setLoadingVideo(null)}
                          style={{
                            position: "absolute", inset: 0, width: "100%", height: "100%",
                            objectFit: "cover", transition: "opacity 0.3s",
                            opacity: loadingVideo === hoverKey ? 0 : 1,
                          }}
                        />
                      )}

                      {/* Shimmer while video preview loads */}
                      {loadingVideo === hoverKey && (
                        <div style={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.06) 50%, transparent 75%)",
                          backgroundSize: "200% 100%", animation: "shimmer 1.2s infinite",
                        }} />
                      )}

                      {!file.thumbnail && !file.fast_stream_url && (
                        <Play size={22} color="#3d4f64" />
                      )}

                      {/* Duration badge */}
                      {file.duration_seconds > 0 && (
                        <div style={{
                          position: "absolute", bottom: "5px", right: "5px",
                          background: "rgba(0,0,0,0.82)", color: "#fff", fontSize: "11px",
                          fontWeight: 500, padding: "1px 5px", borderRadius: "4px",
                          letterSpacing: "0.02em", zIndex: 10,
                        }}>
                          {formatDuration(file.duration_seconds)}
                        </div>
                      )}

                      {/* Hover play overlay */}
                      <div style={{
                        position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        opacity: hoveredVideo === hoverKey ? 1 : 0,
                        transition: "opacity 0.2s", zIndex: 5, pointerEvents: "none",
                      }}>
                        <Play size={26} fill="white" color="white" />
                      </div>

                      {/* Progress bar */}
                      {progressPercent > 0 && (
                        <div style={{
                          position: "absolute", bottom: 0, left: 0, right: 0,
                          height: "3px", background: "rgba(255,255,255,0.15)", zIndex: 15,
                        }}>
                          <div style={{ width: `${progressPercent}%`, height: "100%", background: "#ef4444" }} />
                        </div>
                      )}
                    </div>

                    {/* ── Text ── */}
                    <div style={{
                      flex: 1, minWidth: 0, display: "flex",
                      flexDirection: "column", paddingTop: "2px",
                    }}>
                      <p style={{
                        fontSize: "13px", fontWeight: 500, color: "#f1f1f1",
                        lineHeight: "1.4", margin: "0 0 4px",
                        display: "-webkit-box", WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical", overflow: "hidden", wordBreak: "break-word",
                      }}>
                        {file.title || file.filename || entry.url}
                      </p>

                      <p style={{
                        fontSize: "12px", color: "#aaa", margin: "0 0 3px",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        TeraBox{files.length > 1 && (
                          <span style={{ color: "#555" }}> · {fileIdx + 1}/{files.length}</span>
                        )}
                      </p>

                      <p style={{ fontSize: "12px", color: "#717171", margin: 0 }}>
                        {timeAgo(entry.watchedAt)}
                      </p>
                    </div>

                    {/* ── Delete button (only on last row of the group) ── */}
                    {fileIdx === files.length - 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteEntry(entry.url); }}
                        title="Remove from history"
                        className="flex items-start justify-center p-1 text-gray-500 hover:text-red-400 transition-colors duration-150 shrink-0"
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                      >
                        <Trash2 size={16} className="hover:text-red-500 hover:scale-110 hover:rotate-12 transition-all duration-200" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        div::-webkit-scrollbar { width: 4px; }
        div::-webkit-scrollbar-track { background: transparent; }
        div::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.08);
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.14);
        }
      `}</style>
    </div>
  );
}