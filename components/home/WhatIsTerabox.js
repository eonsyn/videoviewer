"use client";
import React from "react";
import {
  Cloud,
  ShieldCheck,
  Share2,
  FolderOpen,
  MessageSquare,
} from "lucide-react";

function WhatIsTerabox() {
  return (
    <section className="w-full max-w-5xl mx-auto p-6 md:p-10 transition-all duration-300">
      {/* 🌥️ Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Cloud className="w-8 h-8 text-pink-500" />
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600">
          What is TeraBox?
        </h2>
      </div>

      {/* 📄 Description */}
      <p className="leading-relaxed mb-4 text-gray-700">
        <strong className="text-pink-600">TeraBox</strong> is a popular{" "}
        <strong className="text-orange-500">free cloud storage platform</strong>{" "}
        offering up to <strong>1TB of secure storage space</strong> for your
        photos, videos, and documents. It lets you easily store, share, and
        access your files anytime — whether you’re using a desktop, laptop, or
        smartphone.
      </p>

      <p className="leading-relaxed mb-8 text-gray-700">
        With features like smart organization, automatic backups, and instant
        file sharing,{" "}
        <strong className="text-pink-500">TeraBox keeps your data safe</strong>,{" "}
        <strong className="text-orange-500">well-managed</strong>, and{" "}
        <strong className="text-pink-600">always accessible</strong> wherever
        you go.
      </p>

      {/* ✨ Features Section */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="flex flex-col items-center text-center gap-3 p-5 bg-gradient-to-br from-pink-50 to-white border border-pink-200 rounded-2xl hover:shadow-md transition-all">
          <ShieldCheck className="w-8 h-8 text-pink-500" />
          <p className="font-semibold text-gray-700">
            Secure 1TB Cloud Storage
          </p>
        </div>

        <div className="flex flex-col items-center text-center gap-3 p-5 bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-2xl hover:shadow-md transition-all">
          <FolderOpen className="w-8 h-8 text-orange-500" />
          <p className="font-semibold text-gray-700">Smart File Organization</p>
        </div>

        <div className="flex flex-col items-center text-center gap-3 p-5 bg-gradient-to-br from-pink-50 to-white border border-pink-200 rounded-2xl hover:shadow-md transition-all">
          <Share2 className="w-8 h-8 text-pink-500" />
          <p className="font-semibold text-gray-700">Effortless File Sharing</p>
        </div>

        <div className="flex flex-col items-center text-center gap-3 p-5 bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-2xl hover:shadow-md transition-all">
          <Cloud className="w-8 h-8 text-orange-500" />
          <p className="font-semibold text-gray-700">Access Anytime, Anywhere</p>
        </div>
      </div>

      {/* 💬 Help Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 p-5 bg-pink-50 border border-pink-200 rounded-2xl hover:shadow-sm transition-all">
        <MessageSquare className="w-6 h-6 text-pink-600 mt-1" />
        <p className="text-gray-700 text-sm leading-relaxed">
          Need help or have a question? Join our{" "}
          <a
            href="https://t.me/+2fvOF7WT0YBjZDM9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 font-medium hover:underline"
          >
            Telegram Community
          </a>{" "}
          to ask, share, or get updates about TeraBox downloads.
        </p>
      </div>
    </section>
  );
}

export default WhatIsTerabox;
