import React from "react";
import { Link as LinkIcon, ClipboardPaste, Download, Server } from "lucide-react";

function HowToDownload() {
  const steps = [
    {
      icon: <LinkIcon className="w-6 h-6 text-pink-600" />,
      title: "Copy the TeraBox Link",
      desc: "Copy the public TeraBox link of any video, image, or file you want to download. You can find it on Telegram, WhatsApp, or any shared post."
    },
    {
      icon: <ClipboardPaste className="w-6 h-6 text-orange-500" />,
      title: "Paste the Link in TeraFetch",
      desc: "Go to TeraFetch and paste the copied URL into the input box. Our system automatically detects the file and prepares it for download."
    },
    {
      icon: <Download className="w-6 h-6 text-pink-500" />,
      title: "Download Instantly",
      desc: "Click the download button once the file preview appears. The file or video will start downloading directly to your device — no login needed."
    }
  ];

  return (
    <section className="max-w-5xl mx-auto p-8   transition-all">
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <Server className="w-7 h-7 text-pink-600" />
        <h2 className="text-2xl font-bold">
          How to Download Files or Videos from TeraBox using{" "}
          <span className="text-pink-600">TeraFetch</span>
        </h2>
      </header>

      <p className="mb-6 leading-relaxed text-gray-700">
        <strong className="text-pink-600">TeraFetch</strong> offers a simple and secure way to download
        from TeraBox without logging in. We use fast proxy servers for seamless downloads.
        Just follow these quick steps to get your videos, photos, or documents in seconds:
      </p>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-pink-50 p-4 rounded-xl border border-pink-100 hover:border-pink-300 hover:shadow-pink-200 transition-all"
          >
            <div className="flex-shrink-0 mt-1">{step.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-pink-700 mb-1">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-gray-700 text-sm">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Help Note */}
      <p className="mt-6 text-sm text-gray-600">
        Need help or facing download issues? Join our Telegram community:{" "}
        <a
          href="https://t.me/+2fvOF7WT0YBjZDM9"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 font-medium hover:underline"
        >
          https://t.me/+2fvOF7WT0YBjZDM9
        </a>
      </p>
    </section>
  );
}

export default HowToDownload;
