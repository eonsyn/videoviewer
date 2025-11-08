import React from 'react'
import { Info, Cloud, Heart, Rocket } from 'lucide-react'

function AboutTeraDownloader() {
  return (
    <section className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-br from-pink-50 via-orange-50 to-white backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg text-gray-700 transition-all">
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <Info className="w-8 h-8 text-pink-400" />
        <h1 className="text-3xl font-semibold text-pink-600">
          About TeraDownloader
        </h1>
      </header>

      {/* Intro */}
      <p className="leading-relaxed mb-6 text-gray-700">
        <strong className="text-pink-600">TeraDownloader</strong> is a free, user-friendly web app designed to help users
        download files and videos from <span className="font-medium text-orange-500">TeraBox</span> links
        without logging in. Whether you’re accessing shared files from friends, study groups, or online communities,
        TeraDownloader makes the process fast, simple, and secure.
      </p>

      {/* Features */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col items-center p-4 bg-white/50 border border-gray-200 rounded-xl shadow-md hover:shadow-pink-200/40 transition-all">
          <Cloud className="w-8 h-8 text-pink-400 mb-2" />
          <p className="text-pink-600 font-medium">Direct Cloud Access</p>
          <p className="text-gray-700 text-sm text-center">
            Connects directly with TeraBox to fetch files securely.
          </p>
        </div>

        <div className="flex flex-col items-center p-4 bg-white/50 border border-gray-200 rounded-xl shadow-md hover:shadow-orange-200/40 transition-all">
          <Rocket className="w-8 h-8 text-orange-400 mb-2" />
          <p className="text-orange-500 font-medium">Fast Downloads</p>
          <p className="text-gray-700 text-sm text-center">
            Generates direct download links instantly for quick access.
          </p>
        </div>

        <div className="flex flex-col items-center p-4 bg-white/50 border border-gray-200 rounded-xl shadow-md hover:shadow-pink-200/40 transition-all">
          <Heart className="w-8 h-8 text-pink-400 mb-2" />
          <p className="text-pink-600 font-medium">User-Focused</p>
          <p className="text-gray-700 text-sm text-center">
            Built with simplicity, privacy, and ease of use in mind.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutTeraDownloader
