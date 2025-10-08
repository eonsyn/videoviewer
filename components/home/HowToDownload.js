import React from 'react'
import { Link as LinkIcon, ClipboardPaste, Download, Server } from 'lucide-react'

function HowToDownload() {
  const steps = [
    {
      icon: <LinkIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Copy the TeraBox Link',
      desc: 'Get the TeraBox link from any source like Telegram, Twitter, WhatsApp, or any group.'
    },
    {
      icon: <ClipboardPaste className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      title: 'Paste the Link',
      desc: 'Paste the copied link into the input box on our app and click the Download button.'
    },
    {
      icon: <Download className="w-6 h-6 text-green-600 dark:text-green-400" />,
      title: 'Download Your Files',
      desc: 'After clicking download, you’ll see a thumbnail of the file. Click Download again to save it to your device.'
    }
  ]

  return (
    <section className="max-w-3xl mx-auto p-6  ">
      {/* Header */}
      <header className="flex items-center gap-3 mb-5">
        <Server className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-2xl font-semibold ">
          How to Download Files or Videos from TeraBox
        </h2>
      </header>

      <p className=" text-gray-300 mb-6 leading-relaxed">
        We provide <strong>two download servers</strong> for your convenience — choose either one and enjoy seamless downloads.
        Follow these quick steps to save files or videos from TeraBox with ease:
      </p>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white/70 dark:bg-gray-800/60 p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex-shrink-0 mt-1">{step.icon}</div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-1">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowToDownload
