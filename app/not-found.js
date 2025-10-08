"use client";
import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white px-4">
      <div className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl shadow-lg text-center max-w-md w-full border border-gray-700">
        <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
        <h1 className="text-3xl font-bold mb-2">404 - Page Not Found</h1>
        <p className="text-gray-400 mb-6">
          Oops! The page you're looking for doesn’t exist or may have been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-blue-500/40"
        >
          <Home className="w-5 h-5" />
          Return Home
        </Link>
      </div>
      <p className="text-sm text-gray-500 mt-8">© {new Date().getFullYear()} Terabox Downloader</p>
    </div>
  );
}
