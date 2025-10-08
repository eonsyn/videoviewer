import React from 'react'
import { DownloadCloud, Globe, Database } from 'lucide-react'

export default function WhatIsTeraboxNetlify() {
  const hosts = [
    'www.mirrobox.com',
    'www.nephobox.com',
    'freeterabox.com',
    'www.freeterabox.com',
    '1024tera.com',
    '4funbox.co',
    'www.4funbox.com',
    'terabox.com',
    'and many more...'
  ]

  return (
    <section className="max-w-3xl mx-auto p-6 bg-gray-900/70 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-lg text-gray-200 transition-all">
      {/* Header */}
      <header className="flex items-start gap-4 mb-5">
        <DownloadCloud className="w-8 h-8 text-indigo-300 shrink-0" />
        <div>
          <h3 className="text-xl font-semibold text-white">
            What is <span className="text-indigo-300">TeraDownloader.netlify.app</span>?
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            A lightweight helper for downloading files & videos from TeraBox links — no account required.
          </p>
        </div>
      </header>

      {/* Description */}
      <div className="leading-relaxed space-y-3 mb-6">
        <p>
          <strong>TeraDownloader</strong> is a simple tool that lets you download files and videos shared via TeraBox links.
          While TeraBox normally requires a login to access shared content, TeraDownloader fetches the file directly from
          TeraBox servers for a quick, one-step download experience.
        </p>

        <p className="flex items-center gap-1">
          <Database className="w-4 h-4 text-emerald-400" />
          <span className="font-medium">Privacy note:</span> We do <em>not</em> store any files or personal data — the app only
          proxies the request so you can download faster.
        </p>
      </div>

      {/* Supported Hosts */}
      <div className="border-t border-gray-800 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-5 h-5 text-sky-400" />
          <h4 className="text-sm font-semibold text-white">Supported TeraBox URLs</h4>
        </div>

        <ul className="flex flex-wrap gap-2">
          {hosts.map((h, i) => (
            <li
              key={i}
              className="px-3 py-1 bg-gray-800 rounded-full text-gray-200 text-sm border border-transparent hover:scale-105 transform transition-all hover:bg-gray-700"
            >
              {h}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
