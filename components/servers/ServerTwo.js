import React from "react";

function ServerTwo({ res }) {
  if (!res || !res.list || res.list.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-4">
        No files found on Server 2. Try another link.
      </p>
    );
  }
  if(res.list[0].thumbnail === 'http://iteraplay.com/media/logo.png'){
    return (
     <div className="  p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-sm">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-red-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
  <span>
    <strong>Invalid URL:</strong> Please use a correct link.
  </span>
</div>

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
