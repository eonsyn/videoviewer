
import React from "react";
import { Cloud, ShieldCheck, Share2, FolderOpen, MessageSquare } from "lucide-react";

function WhatIsTerabox() {
  return (
    <div className="max-w-3xl mx-auto text-white p-6 transition-all duration-300">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Cloud className="w-8 h-8 text-pink-400" />
        <h2 className="text-3xl font-bold text-pink-600">
          What is TeraBox?
        </h2>
      </div>

      {/* Description */}
      <p className="leading-relaxed mb-4 text-white">
        <strong className="text-pink-600">TeraBox</strong> is a free cloud storage service offering{' '}
        <strong className="text-orange-500">1TB of secure storage</strong> for your files, documents, photos, and videos.
        Access your data anytime, anywhere — web, desktop, or mobile.
      </p>

      <p className="leading-relaxed mb-8 text-white">
        TeraBox also allows easy file sharing, automatic/manual backups, smart organization, and version control — keeping your data{' '}
        <strong className="text-pink-500">safe</strong>, <strong className="text-orange-500">accessible</strong>, and <strong className="text-pink-600">well-managed</strong>.
      </p>

      {/* Features Section */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="flex items-center gap-3 p-4 bg-white/20 border border-pink-200 rounded-xl hover:border-pink-400 hover:shadow-pink-300/20 hover:shadow-md transition-all">
          <ShieldCheck className="w-6 h-6 text-pink-500" />
          <p className="text-white text-sm font-medium">Secure 1TB Cloud Storage</p>
        </div>

        <div className="flex items-center gap-3 p-4 bg-white/20 border border-orange-200 rounded-xl hover:border-orange-400 hover:shadow-orange-300/20 hover:shadow-md transition-all">
          <FolderOpen className="w-6 h-6 text-orange-400" />
          <p className="text-white text-sm font-medium">Smart File Organization</p>
        </div>

        <div className="flex items-center gap-3 p-4 bg-white/20 border border-pink-200 rounded-xl hover:border-pink-400 hover:shadow-pink-300/20 hover:shadow-md transition-all">
          <Share2 className="w-6 h-6 text-pink-400" />
          <p className="text-white text-sm font-medium">Effortless File Sharing</p>
        </div>

        <div className="flex items-center gap-3 p-4 bg-white/20 border border-orange-200 rounded-xl hover:border-orange-400 hover:shadow-orange-300/20 hover:shadow-md transition-all">
          <Cloud className="w-6 h-6 text-orange-400" />
          <p className="text-white text-sm font-medium">Access Anytime, Anywhere</p>
        </div>
      </div>

      {/* Need Help Section */}
      <div className="flex items-start gap-3 p-4 bg-white/20 border border-pink-200 rounded-xl hover:shadow-pink-300/20 transition-all">
        <MessageSquare className="w-6 h-6 text-pink-500 mt-1" />
        <p className="text-white text-sm">
          Need help or have questions? Join our Telegram group and ask your query:{" "}
          <a
            href="https://t.me/+2fvOF7WT0YBjZDM9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:underline"
          >
            Telegram Group
          </a>
        </p>
      </div>
    </div>
  );
}

export default WhatIsTerabox;
