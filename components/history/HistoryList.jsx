"use client";
import React from "react";
import { useHistory } from "@/components/history/HistoryProvider";
import { FaPlay, FaTrash } from "react-icons/fa6";

export default function HistoryList() {
  const { history, deleteEntry, clearHistory } = useHistory();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all history?')) {
      clearHistory();
    }
  };

  if (!history || history.length === 0) {
    return null; // No history to show
  }

  return (
    <div id="history" className="w-full max-w-6xl mx-auto mt-12 p-4 bg-gray-900/30 backdrop-blur-sm rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Watch History</h2>
        <button
          onClick={handleClearAll}
          className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Delete All
        </button>
      </div>
      <ul className="space-y-2">
        {history.map((entry) => (
          <li key={entry.url} className="flex items-center justify-between bg-gray-800/50 p-2 rounded">
            <div className="flex items-center space-x-3">
              {entry.thumbnail && (
                <img src={entry.thumbnail} alt={entry.title} className="w-12 h-8 object-cover rounded" />
              )}
              <span className="text-white truncate max-w-xs">{entry.title || entry.url}</span>
            </div>
            <div className="flex space-x-2">
                  <button
                  onClick={() => window.location.href = `/download?url=${encodeURIComponent(entry.url)}`}
                  className="px-4 py-2 text-base bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2"
                >
                  <FaPlay className="text-lg" />
                </button>
                <button
                  onClick={() => deleteEntry(entry.url)}
                  className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded flex items-center gap-1"
                >
                  <FaTrash className="text-sm" />
                </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
