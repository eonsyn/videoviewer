// utils/isImageFile.js

const IMAGE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "bmp",
  "svg",
  "avif",
  "ico",
  "tiff",
  "tif",
];

export function isImageFile(filename) {
  if (!filename) return true; // default to image viewer if unknown

  const ext = filename.split(".").pop().toLowerCase();

  return IMAGE_EXTENSIONS.includes(ext);
}