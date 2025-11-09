import React from "react";

export const metadata = {
  title: "Join TeraFetch on Telegram | Stay Updated & Get Support",
  description:
    "Join the official TeraFetch Telegram channel for updates, new features, and direct support. Stay connected with the latest TeraBox download tools and announcements.",
  keywords: [
    "TeraFetch Telegram",
    "TeraBox downloader updates",
    "TeraFetch community",
    "TeraFetch support",
  ],
  openGraph: {
    title: "Join TeraFetch on Telegram | Stay Updated & Get Support",
    description:
      "Follow TeraFetch on Telegram to get instant updates, tips, and access to new features.",
    url: "https://terafetch.netlify.app/telegram",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gradient-to-br from-pink-50 via-orange-50 to-white text-gray-800">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">
        Join TeraFetch on Telegram 🚀
      </h1>
      <p className="max-w-xl mb-6 text-lg leading-relaxed">
        Stay updated with the latest <span className="font-medium text-orange-500">TeraBox</span> downloader
        features, announcements, and direct support through our official Telegram channel.
      </p>

      <a
        href="https://t.me/teradownloader0"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg shadow-md transition-all"
      >
        Join Telegram Channel
      </a>
    </div>
  );
}
