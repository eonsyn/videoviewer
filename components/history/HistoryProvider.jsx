"use client";
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const HistoryContext = createContext(undefined);

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
const STORAGE_KEY = 'videoHistory';

function loadFromStorage() {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    const now = Date.now();
    return parsed.filter((e) => now - Number(e.watchedAt) < TWO_HOURS_MS);
  } catch {
    return [];
  }
}

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState(loadFromStorage);
  const isFirstRender = useRef(true);

  // Persist on every change, skip first render to avoid overwriting good data
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to persist video history', e);
    }
  }, [history]);

  // Purge stale entries once on mount
  useEffect(() => {
    const now = Date.now();
    setHistory((prev) => {
      const valid = prev.filter((e) => now - Number(e.watchedAt) < TWO_HOURS_MS);
      return valid.length !== prev.length ? valid : prev;
    });
  }, []);

  /**
   * addEntry supports two call shapes:
   *
   * A) Full files array (first load / all-files registration):
   *    { url, activeFileId, title, thumbnail, progress, files: [...] }
   *
   * B) Single file upsert (after HLS resolves for one file):
   *    { url, activeFileId, fs_id, title, filename, thumbnail,
   *      stream_url, fast_stream_url, duration_seconds, ... }
   *
   * Storage shape per entry:
   * {
   *   url, watchedAt, progress, activeFileId,
   *   title, thumbnail,          ← from the active file (for backward compat)
   *   files: [{
   *     fs_id, filename, title, thumbnail,
   *     stream_url, fast_stream_url,
   *     duration_seconds, size_formatted, duration_formatted,
   *     quality, width, height, category,
   *     progress                 ← per-file playback position
   *   }]
   * }
   */
  const addEntry = (entry) => {
    setHistory((prev) => {
      const existing = prev.find((e) => e.url === entry.url);

      // ── 1. Resolve the updated files array ────────────────────────────
      let updatedFiles;

      if (Array.isArray(entry.files) && entry.files.length > 0) {
        // Shape A — merge with any existing files (preserve per-file progress)
        if (existing?.files?.length) {
          const merged = [...existing.files];
          for (const f of entry.files) {
            const idx = merged.findIndex((m) => m.fs_id === f.fs_id);
            if (idx === -1) {
              merged.push(f);
            } else {
              // Keep existing progress; refresh everything else (urls may rotate)
              merged[idx] = { progress: merged[idx].progress || 0, ...f };
            }
          }
          updatedFiles = merged;
        } else {
          updatedFiles = entry.files.map((f) => ({ progress: 0, ...f }));
        }
      } else {
        // Shape B — upsert a single file record
        const fileRecord = {
          fs_id:              entry.fs_id || entry.stream_id || entry.url,
          filename:           entry.filename || "",
          title:              entry.title || entry.filename || "",
          thumbnail:          entry.thumbnail || "",
          stream_url:         entry.stream_url || "",
          fast_stream_url:    entry.fast_stream_url || "",
          duration_seconds:   entry.duration_seconds || null,
          size_formatted:     entry.size_formatted || "",
          duration_formatted: entry.duration_formatted || "",
          quality:            entry.quality || "",
          width:              entry.width || null,
          height:             entry.height || null,
          category:           entry.category || "",
        };

        const existingFiles = existing?.files || [];
        const idx = existingFiles.findIndex((f) => f.fs_id === fileRecord.fs_id);
        if (idx === -1) {
          // New file — preserve whatever progress we had (shouldn't be any)
          updatedFiles = [...existingFiles, { progress: 0, ...fileRecord }];
        } else {
          // Known file — refresh metadata, keep progress
          updatedFiles = existingFiles.map((f, i) =>
            i === idx ? { progress: f.progress || 0, ...fileRecord } : f
          );
        }
      }

      // ── 2. Derive the convenience top-level fields ─────────────────────
      const activeFile =
        updatedFiles.find((f) => f.fs_id === entry.activeFileId) || updatedFiles[0];

      const newEntry = {
        url:          entry.url,
        watchedAt:    existing ? existing.watchedAt : Date.now(),
        progress:     entry.progress > 0 ? entry.progress : (existing?.progress || 0),
        activeFileId: entry.activeFileId || existing?.activeFileId || activeFile?.fs_id,
        title:        activeFile?.title || activeFile?.filename || entry.title || "",
        thumbnail:    activeFile?.thumbnail || entry.thumbnail || "",
        files:        updatedFiles,
      };

      const filtered = prev.filter((e) => e.url !== newEntry.url);
      return [newEntry, ...filtered].slice(0, 100);
    });
  };

  /**
   * Update playback position.
   * - Updates top-level `progress` (backward compat)
   * - Updates per-file `progress` when fileId is supplied
   * - Keeps `activeFileId` in sync
   */
  const updateProgress = (url, currentTime, fileId) => {
    setHistory((prev) =>
      prev.map((entry) => {
        if (entry.url !== url) return entry;

        const updatedFiles = fileId && entry.files
          ? entry.files.map((f) =>
              f.fs_id === fileId ? { ...f, progress: currentTime } : f
            )
          : entry.files;

        return {
          ...entry,
          progress:     currentTime,
          activeFileId: fileId || entry.activeFileId,
          files:        updatedFiles,
        };
      })
    );
  };

  const deleteEntry = (url) =>
    setHistory((prev) => prev.filter((e) => e.url !== url));

  const clearHistory = () => {
    setHistory([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  };

  return (
    <HistoryContext.Provider value={{ history, addEntry, updateProgress, deleteEntry, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error('useHistory must be used within HistoryProvider');
  return ctx;
};