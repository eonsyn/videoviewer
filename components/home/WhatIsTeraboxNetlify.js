import React from "react";
import { DownloadCloud, Globe, Database } from "lucide-react";

export default function WhatIsTerafetch() {
  const hosts = [
    "www.mirrobox.com",
    "www.nephobox.com",
    "freeterabox.com",
    "www.freeterabox.com",
    "1024tera.com",
    "4funbox.co",
    "www.4funbox.com",
    "terabox.com",
    "and many more..."
  ];

  return (
    <section className="max-w-5xl mx-auto p-8   text-gray-800  transition-all duration-300">
      {/* Header */}
      <header className="flex items-start gap-4 mb-6">
        <DownloadCloud className="w-8 h-8 text-pink-600 shrink-0" />
        <div>
          <h2 className="text-2xl font-bold">
            What is <span className="text-pink-600">TeraFetch</span>?
          </h2>
          <p className="text-gray-600 mt-1 text-sm">
            A fast and simple online downloader for TeraBox and similar cloud file-sharing links — no login or software required.
          </p>
        </div>
      </header>

      {/* Description */}
      <div className="space-y-4 mb-6 leading-relaxed text-base">
        <p>
          <strong className="text-pink-600">TeraFetch</strong> allows you to download videos and files from
          shared TeraBox links directly. It removes the need to sign in or install the TeraBox app —
          making access quicker and smoother on any device.
        </p>

        <p className="flex items-start gap-2">
          <Database className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
          <span>
            <strong className="text-orange-500">Privacy first:</strong> TeraFetch doesn’t store or track any files or user data.
            It only proxies the request so you can fetch your file faster and securely.
          </span>
        </p>
      </div>

      {/* Supported Hosts */}
      <div className="border-t border-gray-200 pt-5">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-5 h-5 text-pink-600" />
          <h3 className="font-semibold text-gray-800">Supported TeraBox Domains</h3>
        </div>

        <ul className="flex flex-wrap gap-2">
          {hosts.map((host, i) => (
            <li
              key={i}
              className="px-3 py-1.5 bg-pink-50 rounded-full text-pink-700 text-sm border border-pink-200 hover:bg-pink-100 transition-all"
            >
              {host}
            </li>
          ))}
        </ul>
      </div>

      {/* SEO-friendly Closing Note */}
      <p className="mt-6 text-sm text-gray-600 text-center">
        <strong>TeraFetch</strong> helps you download from TeraBox and its mirrors easily — supporting all major domains like
        MirroBox, FreeTeraBox, and more.
      </p>
    </section>
  );
}
