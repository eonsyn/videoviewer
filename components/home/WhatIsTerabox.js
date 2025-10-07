'use client'
import React from 'react'
import { Cloud, ShieldCheck, Share2, FolderOpen } from 'lucide-react'

function WhatIsTerabox() {
  return (
    <div className="max-w-3xl mx-auto p-6   transition-all duration-300">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-4">
        <Cloud className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          What is TeraBox?
        </h2>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        <strong>TeraBox</strong> is a free cloud storage service that offers <strong>1TB of secure storage</strong> 
        for your files, documents, photos, and videos. With TeraBox, you can easily upload and store your data, 
        and access it from any device&mdash;whether you&apos;re on the web, using the desktop app, or on your mobile phone.
      </p>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
        This platform also allows you to share your files with friends and family effortlessly. 
        It provides features like automatic and manual backups, file organization, version control, 
        and easy sharing&mdash;ensuring your data is <strong>safe, accessible,</strong> and <strong>well-managed</strong>.
      </p>

      {/* Features Section */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 bg-white/70 dark:bg-gray-800/60 rounded-xl shadow-sm hover:shadow-md transition">
          <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
          <p className="text-gray-700 dark:text-gray-200">Secure 1TB Cloud Storage</p>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white/70 dark:bg-gray-800/60 rounded-xl shadow-sm hover:shadow-md transition">
          <FolderOpen className="w-6 h-6 text-amber-500 dark:text-amber-400" />
          <p className="text-gray-700 dark:text-gray-200">Smart File Organization</p>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white/70 dark:bg-gray-800/60 rounded-xl shadow-sm hover:shadow-md transition">
          <Share2 className="w-6 h-6 text-blue-500 dark:text-blue-300" />
          <p className="text-gray-700 dark:text-gray-200">Effortless File Sharing</p>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white/70 dark:bg-gray-800/60 rounded-xl shadow-sm hover:shadow-md transition">
          <Cloud className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <p className="text-gray-700 dark:text-gray-200">Access Anytime, Anywhere</p>
        </div>
      </div>
    </div>
  )
}

export default WhatIsTerabox
