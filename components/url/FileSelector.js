"use client";
import React from "react";
import { Play, FileIcon, Film, Loader } from "lucide-react";
import { isVideoFile } from "@/utils/isVideoFile";

function formatSize(bytes) {
  const b = Number(bytes);
  if (isNaN(b) || b <= 0) return "";
  if (b >= 1073741824) return (b / 1073741824).toFixed(2) + " GB";
  if (b >= 1048576) return (b / 1048576).toFixed(2) + " MB";
  if (b >= 1024) return (b / 1024).toFixed(2) + " KB";
  return b + " B";
}

export default function FileSelector({ files, activeFileId, loadingFileId, onSelect }) {
  if (!files || files.length === 0) return null;

  const showHeader = files.length > 1;

  return (
    <div className="w-full mt-3 rounded-2xl border border-white/[0.1] bg-[#0f0f0f] overflow-hidden flex flex-col">
      
      {/* Playlist Header */}
      {showHeader && (
        <div className="px-4 py-3 sm:px-5 sm:py-4 bg-[#212121] flex flex-col gap-1 border-b border-white/[0.05]">
          <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">Folder Playlist</h2>
          <p className="text-xs text-white/70 font-medium">
            {files.length} {files.length === 1 ? "file" : "files"}
          </p>
        </div>
      )}

      {/* File rows container */}
      <div className="flex flex-col py-2 px-1 sm:px-2 gap-1 overflow-y-auto max-h-[600px]">
        {files.map((file, idx) => {
          const fileId = file.fs_id || file.stream_id || idx;
          const isActive = activeFileId === fileId;
          const isLoading = loadingFileId === fileId;
          const isVideo = file.isVideo || isVideoFile(file.filename);
          const size = formatSize(file.size);

          return (
            <button
              key={fileId}
              onClick={() => !isActive && onSelect(file)}
              disabled={isLoading}
              className={[
                "group flex items-center gap-3 px-2 py-2 rounded-xl text-left border-none transition-colors",
                isActive
                  ? "bg-white/[0.1] cursor-default"
                  : "bg-transparent cursor-pointer hover:bg-white/[0.06]",
              ].join(" ")}
            >
              
              {/* Thumbnail with Overlays */}
              <div className="relative w-[100px] sm:w-[120px] aspect-video flex-shrink-0 rounded-lg overflow-hidden bg-[#1a1f2b] flex items-center justify-center">
                {file.thumb ? (
                  <img
                    src={file.thumb}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : isVideo ? (
                  <Film size={24} className="text-[#3d4f64]" />
                ) : (
                  <FileIcon size={24} className="text-[#3d4f64]" />
                )}

                {/* Dark Overlay + Icons for Hover & Active states */}
                <div className={[
                  "absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity",
                  isActive || isLoading ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                ].join(" ")}>
                  
                  {isLoading ? (
                    <Loader size={20} className="text-white animate-spin" />
                  ) : isActive ? (
                    /* Active EQ Animation Over Thumbnail */
                    <div className="flex items-end gap-[3px] h-4">
                      <div className="w-[3px] bg-white rounded-sm animate-[equalize_0.8s_ease-in-out_infinite]" style={{ height: "60%", animationDelay: "0ms" }} />
                      <div className="w-[3px] bg-white rounded-sm animate-[equalize_0.8s_ease-in-out_infinite]" style={{ height: "100%", animationDelay: "150ms" }} />
                      <div className="w-[3px] bg-white rounded-sm animate-[equalize_0.8s_ease-in-out_infinite]" style={{ height: "40%", animationDelay: "300ms" }} />
                    </div>
                  ) : (
                    /* Play Icon on Hover */
                    <Play size={20} className="fill-white text-white" />
                  )}
                </div>
                
                {/* Time/Type indicator pill (bottom right) - Hidden on hover/active to avoid clutter */}
                <div className={[
                  "absolute bottom-1 right-1 bg-black/80 px-1 rounded text-[10px] font-medium text-white leading-tight transition-opacity",
                  isActive || isLoading ? "opacity-0" : "group-hover:opacity-0"
                ].join(" ")}>
                  {isVideo ? "VID" : "FILE"}
                </div>
              </div>

              {/* File Info */}
              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                <p className={[
                  "text-sm sm:text-[15px] font-medium line-clamp-2 leading-tight",
                  isActive ? "text-white" : "text-[#f1f1f1]",
                ].join(" ")}>
                  {file.filename}
                </p>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-[#aaaaaa]">
                  {size && <span>{size}</span>}
                  {isActive && !isLoading && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-[#555] inline-block" />
                      <span className="text-red-400 font-medium">Now playing</span>
                    </>
                  )}
                </div>
              </div>

              {/* 3-Dot Menu (Hidden on mobile, visible on hover on desktop) */}
              <div className="hidden sm:flex w-8 h-8 flex-shrink-0 items-center justify-center rounded-full hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                   <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z" />
                </svg>
              </div>

            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes equalize {
          0%, 100% { transform: scaleY(0.4); }
          50%       { transform: scaleY(1);   }
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}