import React from 'react'
import { Link as LinkIcon, ClipboardPaste, Download, Server } from 'lucide-react'

function HowToDownload() {
  const steps = [
    {
      icon: <LinkIcon className="w-6 h-6 text-blue-400" />,
      title: 'Copy the TeraBox Link',
      desc: 'Get the TeraBox link from any source like Telegram, Twitter, WhatsApp, or any group.'
    },
    {
      icon: <ClipboardPaste className="w-6 h-6 text-amber-400" />,
      title: 'Paste the Link',
      desc: 'Paste the copied link into the input box on our app and click the Download button.'
    },
    {
      icon: <Download className="w-6 h-6 text-green-400" />,
      title: 'Download Your Files',
      desc: 'After clicking download, you’ll see a thumbnail of the file. Click Download again to save it to your device.'
    }
  ]

  return (
    <section className="max-w-3xl mx-auto p-6   text-gray-300 ">
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <Server className="w-7 h-7 text-indigo-400" />
        <h2 className="text-2xl font-semibold text-gray-100">
          How to Download Files or Videos from TeraBox
        </h2>
      </header>

      <p className="mb-6 leading-relaxed">
        We provide <strong className="text-white">two download servers</strong> for your convenience — choose either one and enjoy seamless downloads.
        Follow these quick steps to save files or videos from TeraBox easily:
      </p>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-gray-800/70 p-4 rounded-xl border border-gray-700 hover:border-indigo-500/40 hover:shadow-indigo-500/10 hover:shadow-md transition-all"
          >
            <div className="flex-shrink-0 mt-1">{step.icon}</div>
            <div>
              <h3 className="text-lg font-medium text-gray-100 mb-1">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowToDownload
