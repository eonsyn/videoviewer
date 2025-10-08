import React from "react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              TeraDownloader
            </h2>
            <p className="text-sm mt-2 text-gray-500 dark:text-gray-400 max-w-xs">
              A simple, fast, and secure way to generate direct TeraBox download links instantly.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
            <Link
              href="/dmca-policy"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              DMCA Policy
            </Link>
        
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>
            © {year}{" "}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              TeraDownloader
            </span>
            . All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}
