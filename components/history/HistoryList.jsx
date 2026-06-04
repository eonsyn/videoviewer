"use client";
import React from "react";
import { useHistory } from "@/components/history/HistoryProvider";
import { Play, Trash2, Clock, Trash } from "lucide-react";

export default function HistoryList() {
  const { history, deleteEntry, clearHistory } = useHistory();

  const handleClearAll = () => {
    if (window.confirm("Delete all history?")) clearHistory();
  };

  if (!history || history.length === 0) return null;

  return (
    <div style={{
      width: "100%", maxWidth: "640px", margin: "0 auto",
      marginTop: "32px",
      background: "#0c1018", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "16px", overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Clock size={15} color="#6b7a8d" />
          <span style={{ fontFamily: "'Geist', sans-serif", fontSize: "14px", fontWeight: 600, color: "#f0f4fc" }}>Watch History</span>
          <span style={{
            padding: "1px 8px", borderRadius: "100px",
            background: "rgba(79,141,245,0.1)", border: "1px solid rgba(79,141,245,0.18)",
            fontSize: "11px", fontWeight: 600, color: "#93c5fd",
          }}>{history.length}</span>
        </div>
        <button onClick={handleClearAll} style={{
          display: "flex", alignItems: "center", gap: "5px",
          padding: "5px 10px", borderRadius: "7px",
          background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.15)",
          color: "#f87171", fontSize: "12px", fontWeight: 500, cursor: "pointer",
          transition: "all 0.2s",
        }}>
          <Trash size={12} /> Clear all
        </button>
      </div>

      {/* Items */}
      <div style={{ maxHeight: "360px", overflowY: "auto" }}>
        {history.map((entry) => (
          <div key={entry.url} style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "12px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            {/* Thumbnail */}
            <div style={{
              width: "52px", height: "36px", flexShrink: 0, borderRadius: "6px",
              background: "#161e2e", overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {entry.thumbnail
                ? <img src={entry.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <Play size={14} color="#3d4f64" />
              }
            </div>

            {/* Title */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: "13px", color: "#9aa5b4", fontWeight: 500, margin: 0,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{entry.title || entry.url}</p>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
              <button onClick={() => window.location.href = `/download?url=${encodeURIComponent(entry.url)}`} style={{
                padding: "6px 10px", borderRadius: "7px", cursor: "pointer",
                background: "rgba(45,212,164,0.08)", border: "1px solid rgba(45,212,164,0.18)",
                color: "#2dd4a4", display: "flex", alignItems: "center", gap: "4px",
                fontSize: "12px", fontWeight: 500, transition: "all 0.2s",
              }}>
                <Play size={11} /> Play
              </button>
              <button onClick={() => deleteEntry(entry.url)} style={{
                padding: "6px 8px", borderRadius: "7px", cursor: "pointer",
                background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.12)",
                color: "#f87171", display: "flex", alignItems: "center",
                transition: "all 0.2s",
              }}>
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
