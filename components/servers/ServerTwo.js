import React from "react";

function ServerTwo({ res }) {
  if (!res || !res.list || res.list.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-4">
        No files found on Server 2. Try another link.
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      {res.list.map((file, index) => (
        <div
          key={index}
          className="w-full max-w-lg bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-md flex flex-col items-center text-center"
        >


          {/* Video Preview */}
          {file.stream_url ? (
            <video
              src={file.stream_url}
              poster={file.thumbnail}
              controls
              className="w-full max-h-60 rounded-lg mb-3"
            />
          ) : (
            <p className="text-sm text-gray-400 mb-3">
              No video preview available
            </p>
          )}
          {/* File Name */}
          <h3 className="text-lg font-semibold text-white mb-2">
            {file.name || "Unnamed File"}
          </h3>
          {/* File Size */}
          {file.size_formatted && (
            <p className="text-sm  text-gray-300 mb-2">
              <strong>Size:</strong> {file.size_formatted}
             {/* Download Link */}
          {file.fast_download_link && (
            <a
              href={file.fast_download_link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Download File
            </a>
          )}
            </p>
          )}

         
        </div>
      ))}
    </div>
  );
}

export default ServerTwo;
