import React from "react";
import { DownloadCloud, Globe, Database } from "lucide-react";

export default function WhatIsTeraboxNetlify() {
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
    <section className="max-w-3xl mx-auto p-6 bg-white/20 backdrop-blur-sm rounded-2xl border border-pink-200 shadow-md text-white transition-all">
      {/* Header */}
      <header className="flex items-start gap-4 mb-5">
        <DownloadCloud className="w-8 h-8 text-pink-400 shrink-0" />
        <div>
          <h3 className="text-xl font-semibold text-pink-600">
            What is <span className="text-orange-500">TeraDownloader.netlify.app</span>?
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            A lightweight helper for downloading files & videos from TeraBox links — no account required.
          </p>
        </div>
      </header>

      {/* Description */}
      <div className="leading-relaxed space-y-3 mb-6">
        <p>
          <strong className="text-pink-500">TeraDownloader</strong> is a simple tool that lets you download files and videos shared via TeraBox links.
          While TeraBox normally requires a login to access shared content, TeraDownloader fetches the file directly from
          TeraBox servers for a quick, one-step download experience.
        </p>

        <p className="flex text-pink-500 items-center gap-2">
          <Database className="w-4 h-4 text-orange-400 shrink-0" />
           We do  not  store any files or personal data — the app only
          proxies the request so you can download faster.
        </p>
      </div>

      {/* Supported Hosts */}
      <div className="border-t border-pink-200 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-5 h-5 text-orange-400" />
          <h4 className="text-sm font-semibold text-pink-600">Supported TeraBox URLs</h4>
        </div>

        <ul className="flex flex-wrap gap-2">
          {hosts.map((host, i) => (
            <li
              key={i}
              className="px-3 py-1 bg-white/80 rounded-full text-pink-600 text-sm border border-transparent hover:scale-105 transform transition-all hover:bg-pink-100 cursor-default"
            >
              {host}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
