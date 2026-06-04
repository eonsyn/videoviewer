"use client";
import { createContext, useContext, useEffect, useState } from 'react';
// Shape of a history entry
/**
 * @typedef {Object} HistoryEntry
 * @property {string} url
 * @property {string} [title]
 * @property {string} [thumbnail]
 * @property {number} watchedAt
 */

/**
 * Context value shape
 * @typedef {Object} HistoryContextProps
 * @property {HistoryEntry[]} history
 * @property {(entry: Omit<HistoryEntry, 'watchedAt'>) => void} addEntry
 * @property {(url: string) => void} deleteEntry
 * @property {() => void} clearHistory
 */

const HistoryContext = createContext(undefined);

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('videoHistory');
      if (stored) {
        try {
          setHistory(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse video history', e);
        }
      }
    }
  }, []);

  // Persist when history changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('videoHistory', JSON.stringify(history));
    }
  }, [history]);

  const addEntry = (entry) => {
    const newEntry = {
      url: entry.url,
      thumbnail: entry.thumbnail,
      watchedAt: Date.now(),
    };
    setHistory((prev) => {
      const filtered = prev.filter((e) => e.url !== newEntry.url);
      return [newEntry, ...filtered].slice(0, 100); // keep recent 100
    });
  };

  const deleteEntry = (url) => {
    setHistory((prev) => prev.filter((e) => e.url !== url));
  };


  const clearHistory = () => {
    setHistory([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('videoHistory');
    }
  };

  return (
    <HistoryContext.Provider value={{ history, addEntry, deleteEntry, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error('useHistory must be used within HistoryProvider');
  return ctx;
};
