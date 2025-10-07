'use client'
import React from 'react'
import { AlertTriangle, Shield, Mail } from 'lucide-react'

function Disclaimer() {
  return (
    <section className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-red-50/60 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md">
      {/* Header */}
      <header className="flex items-center gap-3 mb-4">
        <AlertTriangle className="w-7 h-7 text-red-600 dark:text-red-400" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Disclaimer
        </h2>
      </header>

      {/* Content */}
      <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          <strong className="text-gray-900 dark:text-gray-100">TeraDownloader.netlify.app</strong> is
          not an official TeraBox website and is not affiliated with{' '}
          <span className="font-medium text-blue-600 dark:text-blue-400">terabox.app</span> or{' '}
          <span className="font-medium text-blue-600 dark:text-blue-400">Flextech Inc.</span>
        </p>

        <p>
          Our tool simply generates <strong>direct download links</strong> for publicly shared TeraBox files.
          We do <strong>not</strong> store, host, or upload any content ourselves. All files remain on the
          original TeraBox servers.
        </p>

        <p>
          We fully <strong>respect copyright laws</strong> and encourage users to only download
          content they are authorized to access.
        </p>

        <div className="flex items-start gap-3 bg-white/70 dark:bg-gray-800/60 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
          <Shield className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" />
          <p className="text-sm">
            If you are a content owner and believe this tool violates your rights, please{' '}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              <Mail className="w-4 h-4" />
              contact us
            </a>
            . We will take immediate action.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Disclaimer
