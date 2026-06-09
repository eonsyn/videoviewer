"use client";
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const HistoryContext = createContext(undefined);

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
const STORAGE_KEY = 'videoHistory';

/** Read, validate, and return history from localStorage synchronously. */
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
  // ── Initialize directly from localStorage ────────────────────────────────
  // Using a lazy initializer means state is populated on the very first render.
  // This eliminates the read-effect vs persist-effect race that was wiping data
  // on every page reload (persist effect fired with [] before read effect ran).
  const [history, setHistory] = useState(loadFromStorage);

  // Guard: skip the very first persist so we never overwrite good data with
  // the initial value (only matters as a safety net — lazy init already fixes it).
  const isFirstRender = useRef(true);

  // ── Persist every change to localStorage ─────────────────────────────────
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to persist video history', e);
    }
  }, [history]);

  // ── Purge stale entries once on mount (in case tab sat open a long time) ──
  useEffect(() => {
    const now = Date.now();
    setHistory((prev) => {
      const valid = prev.filter((e) => now - Number(e.watchedAt) < TWO_HOURS_MS);
      // Only trigger a re-render + persist if something was actually removed
      return valid.length !== prev.length ? valid : prev;
    });
  }, []);

  /**
   * Add or refresh a history entry.
   * Preserves the original watchedAt so the 2-hour cache window is anchored
   * to when the user first opened the URL, not the most recent API response.
   * Also preserves existing progress unless the caller passes a value > 0.
   */
  const addEntry = (entry) => {
    setHistory((prev) => {
      const existing = prev.find((e) => e.url === entry.url);
      const newEntry = {
        ...entry,
        watchedAt: existing ? existing.watchedAt : Date.now(),
        progress: entry.progress > 0 ? entry.progress : (existing?.progress || 0),
      };
      const filtered = prev.filter((e) => e.url !== newEntry.url);
      return [newEntry, ...filtered].slice(0, 100);
    });
  };

  /** Update only the playback position for a URL. */
  const updateProgress = (url, currentTime) => {
    setHistory((prev) =>
      prev.map((entry) =>
        entry.url === url ? { ...entry, progress: currentTime } : entry
      )
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