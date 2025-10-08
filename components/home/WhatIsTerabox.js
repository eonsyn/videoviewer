import React from 'react'
import { Cloud, ShieldCheck, Share2, FolderOpen } from 'lucide-react'

function WhatIsTerabox() {
  return (
    <div className="max-w-3xl mx-auto p-6  transition-all duration-300">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-5">
        <Cloud className="w-8 h-8 text-blue-400" />
        <h2 className="text-2xl font-semibold text-gray-100">
          What is TeraBox?
        </h2>
      </div>

      {/* Description */}
      <p className="leading-relaxed mb-4">
        <strong className="text-white">TeraBox</strong> is a free cloud storage service that offers{' '}
        <strong className="text-white">1TB of secure storage</strong> for your files, documents, photos, and videos. 
        With TeraBox, you can easily upload and store your data, and access it from any device — 
        whether you’re on the web, using the desktop app, or on your mobile phone.
      </p>

      <p className="leading-relaxed mb-8">
        The platform also allows you to share your files with friends and family effortlessly. 
        It provides features like automatic and manual backups, smart organization, version control, 
        and easy sharing — ensuring your data stays{' '}
        <strong className="text-white">safe, accessible,</strong> and{' '}
        <strong className="text-white">well-managed</strong>.
      </p>

      {/* Features Section */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-4 bg-gray-800/70 border border-gray-700 rounded-xl hover:border-green-500/40 hover:shadow-green-500/10 hover:shadow-md transition-all">
          <ShieldCheck className="w-6 h-6 text-green-400" />
          <p className="text-gray-200 text-sm font-medium">Secure 1TB Cloud Storage</p>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-800/70 border border-gray-700 rounded-xl hover:border-amber-400/40 hover:shadow-amber-500/10 hover:shadow-md transition-all">
          <FolderOpen className="w-6 h-6 text-amber-400" />
          <p className="text-gray-200 text-sm font-medium">Smart File Organization</p>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-800/70 border border-gray-700 rounded-xl hover:border-blue-400/40 hover:shadow-blue-500/10 hover:shadow-md transition-all">
          <Share2 className="w-6 h-6 text-blue-400" />
          <p className="text-gray-200 text-sm font-medium">Effortless File Sharing</p>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-800/70 border border-gray-700 rounded-xl hover:border-purple-400/40 hover:shadow-purple-500/10 hover:shadow-md transition-all">
          <Cloud className="w-6 h-6 text-purple-400" />
          <p className="text-gray-200 text-sm font-medium">Access Anytime, Anywhere</p>
        </div>
      </div>
    </div>
  )
}

export default WhatIsTerabox
