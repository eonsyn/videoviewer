import React from "react";
import Link from "next/link";

function ServerOne({ res }) {
  const hasValidFiles = Array.isArray(res) && res.length > 0;

  if (!hasValidFiles) {
    return (
      <p className="text-gray-400 text-center mt-4">
        No files found. Try another link.
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      {res.map((file, index) => {
        const hasVideo = Boolean(file?.direct_link);
        const hasFileName = file?.file_name || "Unnamed File";
        const hasSize = file?.size;
        const hasLink = file?.link;

        return (
          <div
            key={index}
            className="w-full max-w-lg bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-md flex flex-col items-center text-center"
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              {hasFileName}
            </h3>

            {/* Video Preview */}
            {hasVideo ? (
              <video
                src={file.direct_link}
                poster={file.thumb}
                controls
                className="w-full max-h-60 rounded-lg mb-3"
              />
            ) : (
              <p className="text-sm text-gray-400 mb-3">
                No video preview available
              </p>
            )}

            {/* File Size */}
            {hasSize && (
              <p className="text-sm text-gray-300 mb-2">
                <strong>Size:</strong> {file.size}
              </p>
            )}

            {/* Download / View Link */}
            {hasLink && (
              <Link
                href={file.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Download Now
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ServerOne;
