"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-pink-100 via-orange-100 to-white text-gray-700 border-t border-gray-300 ">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-pink-600">TeraDownloader</h2>
            <p className="mt-2 text-sm max-w-xs text-gray-600">
              A simple, fast, and secure way to generate direct TeraBox download links instantly.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-center md:text-left">
            <Link
              href="/dmca-policy"
              className="hover:text-pink-500 transition-colors font-medium"
            >
              DMCA Policy
            </Link>
            <Link
              href="https://t.me/+2fvOF7WT0YBjZDM9"
              className="hover:text-orange-500 transition-colors font-medium"
            >
              Telegram
            </Link>
          </div>
        </div>

        {/* Divider & Bottom Text */}
        <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm">
          <p>
            © {year} <span className="font-medium text-pink-600">TeraDownloader</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
