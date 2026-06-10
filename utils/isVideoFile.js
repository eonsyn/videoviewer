// utils/isVideoFile.js
const VIDEO_EXTENSIONS = ["mp4", "mkv", "webm", "mov", "avi", "flv", "wmv", "m4v"];

export function isVideoFile(filename) {
  if (!filename) return true; // default to video player if unknown
  const ext = filename.split(".").pop().toLowerCase();
  return VIDEO_EXTENSIONS.includes(ext);
}