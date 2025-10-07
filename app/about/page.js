'use client'
import React from 'react'
import { Info, Cloud, Heart, Rocket } from 'lucide-react'

function Page() {
  return (
    <section className="max-w-4xl mx-auto p-8 ">
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <Info className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          About TeraDownloader
        </h1>
      </header>

      {/* Intro */}
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
        <strong>TeraDownloader</strong> is a free, user-friendly web app designed to help users
        download files and videos from <span className="font-medium text-blue-600 dark:text-blue-400">TeraBox</span> links
        without the need to log in. Whether you’re accessing shared files from friends, study groups, or online communities,
        TeraDownloader makes the process fast, simple, and secure.
      </p>

      {/* Features */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="flex flex-col items-center bg-white/80 dark:bg-gray-800/60 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <Cloud className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-2" />
          <p className="text-gray-800 dark:text-gray-100 font-medium">Direct Cloud Access</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
            Connects directly with TeraBox to fetch files securely.
          </p>
        </div>

        <div className="flex flex-col items-center bg-white/80 dark:bg-gray-800/60 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <Rocket className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
          <p className="text-gray-800 dark:text-gray-100 font-medium">Fast Downloads</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
            Generates direct download links instantly for quick access.
          </p>
        </div>

        <div className="flex flex-col items-center bg-white/80 dark:bg-gray-800/60 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <Heart className="w-8 h-8 text-red-600 dark:text-red-400 mb-2" />
          <p className="text-gray-800 dark:text-gray-100 font-medium">User-Focused</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
            Built with simplicity, privacy, and ease of use in mind.
          </p>
        </div>
      </div> 
      
    </section>
  )
}

export default Page
