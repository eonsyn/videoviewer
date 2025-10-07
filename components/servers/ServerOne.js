import React from "react";

function ServerOne({ res = [] }) {
  if (!res || res.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-4">
        No files found. Try another link.
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      {res.map((file, index) => (
        <div
          key={index}
          className="w-full max-w-lg bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-md flex flex-col items-center text-center"
        >
          <h3 className="text-lg font-semibold text-white mb-2">
            {file.file_name || "Unnamed File"}
          </h3>

          {/* Video Preview */}
          {file.direct_link ? (
            <video
              src={file.direct_link}
              poster={file.thumb}
              controls
              className="w-full rounded-lg mb-3"
            />
          ) : (
            <p className="text-sm text-gray-400 mb-3">No video preview available</p>
          )}

          {/* File Size */}
          {file.size && (
            <p className="text-sm text-gray-300 mb-2">
              <strong>Size:</strong> {file.size}
            </p>
          )}

          {/* Download / View Link */}
          {file.link && (
            <a
              href={file.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Download Now
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default ServerOne;
