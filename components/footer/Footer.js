"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="rounded-t-2xl border-t border-gray-700 mt-10 bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold text-white">
              TeraDownloader
            </h2>
            <p className="text-sm mt-2 max-w-xs text-gray-400">
              A simple, fast, and secure way to generate direct TeraBox download links instantly.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
            <Link
              href="/dmca-policy"
              className="hover:text-blue-500 transition-colors"
            >
              DMCA Policy
            </Link>
            <Link
              href="https://t.me/+2fvOF7WT0YBjZDM9"
              className="hover:text-blue-500 transition-colors"
            >
              Telegram
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>
            © {year}{" "}
            <span className="font-medium text-white">TeraDownloader</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
