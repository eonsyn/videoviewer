import React from "react";
import { Info, Cloud, Heart, Rocket } from "lucide-react";

export const metadata = {
  title: "About TeraFetch | Fast & Secure TeraBox File Downloader",
  description:
    "Learn about TeraFetch — a free, secure, and user-friendly tool to download videos and files directly from TeraBox links without login. Fast, private, and reliable.",
  keywords: [
    "TeraFetch",
    "TeraBox downloader",
    "TeraBox video download",
    "TeraBox file fetcher",
    "TeraBox direct download",
  ],
  openGraph: {
    title: "About TeraFetch | Fast & Secure TeraBox File Downloader",
    description:
      "TeraFetch helps you quickly download TeraBox videos and files without logging in — simple, private, and secure.",
    url: "https://terafetch.netlify.app/about",
    type: "website",
  },
};

export default function AboutTeraFetch() {
  return (
    <section className="max-w-5xl mx-auto p-8  h-screen text-gray-700 transition-all">
      <h1 className="text-3xl font-bold text-pink-600 mb-4 text-center">
        About TeraFetch
      </h1>

      <p className="leading-relaxed mb-6 text-gray-700 text-lg">
        <strong className="text-pink-600">TeraFetch</strong> is a free and
        secure web app that allows users to{" "}
        <span className="font-medium text-orange-500">
          download videos and files directly from TeraBox
        </span>{" "}
        without signing in. Whether you’re fetching shared study materials,
        movies, or documents, TeraFetch ensures the process is quick,
        private, and hassle-free.
      </p>

      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col items-center p-4 bg-white/50 border border-gray-200 rounded-xl shadow-md hover:shadow-pink-200/40 transition-all">
          <Cloud className="w-8 h-8 text-pink-400 mb-2" />
          <p className="text-pink-600 font-medium">Direct Cloud Access</p>
          <p className="text-gray-700 text-sm text-center">
            Connects seamlessly with TeraBox to securely fetch file details and
            download links.
          </p>
        </div>

        <div className="flex flex-col items-center p-4 bg-white/50 border border-gray-200 rounded-xl shadow-md hover:shadow-orange-200/40 transition-all">
          <Rocket className="w-8 h-8 text-orange-400 mb-2" />
          <p className="text-orange-500 font-medium">Instant Downloads</p>
          <p className="text-gray-700 text-sm text-center">
            Generates direct and fast download links in seconds for a smooth
            experience.
          </p>
        </div>

        <div className="flex flex-col items-center p-4 bg-white/50 border border-gray-200 rounded-xl shadow-md hover:shadow-pink-200/40 transition-all">
          <Heart className="w-8 h-8 text-pink-400 mb-2" />
          <p className="text-pink-600 font-medium">User-Friendly</p>
          <p className="text-gray-700 text-sm text-center">
            Designed with simplicity and privacy in mind — no ads, no data
            tracking, just pure convenience.
          </p>
        </div>
      </div>
    </section>
  );
}
