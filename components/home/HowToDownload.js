import React from "react";
import { Link as LinkIcon, ClipboardPaste, Download, Server } from "lucide-react";

function HowToDownload() {
  const steps = [
    {
      icon: <LinkIcon className="w-6 h-6 text-pink-400" />,
      title: "Copy the TeraBox Link",
      desc: "Get the TeraBox link from any source like Telegram, Twitter, WhatsApp, or any group."
    },
    {
      icon: <ClipboardPaste className="w-6 h-6 text-orange-400" />,
      title: "Paste the Link",
      desc: "Paste the copied link into the input box on our app and click the Download button."
    },
    {
      icon: <Download className="w-6 h-6 text-pink-500" />,
      title: "Download Your Files",
      desc: "After clicking download, you’ll see a thumbnail of the file. Click Download again to save it to your device."
    }
  ];

  return (
    <section className="max-w-3xl mx-auto p-6 text-white transition-all">
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <Server className="w-7 h-7 text-pink-400" />
        <h2 className="text-2xl font-bold text-pink-600">
          How to Download Files or Videos from TeraBox
        </h2>
      </header>

      <p className="mb-6 leading-relaxed text-white">
        We provide <strong className="text-pink-500">two download servers</strong> for your convenience — choose either one and enjoy seamless downloads.
        Follow these quick steps to save files or videos from TeraBox easily:
      </p>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white/20 p-4 rounded-xl border border-pink-200 hover:border-pink-400 hover:shadow-pink-300/20 hover:shadow-md transition-all"
          >
            <div className="flex-shrink-0 mt-1">{step.icon}</div>
            <div>
              <h3 className="text-lg font-medium text-pink-600 mb-1">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-white text-sm">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Optional Telegram Help Note */}
      <p className="mt-6 text-sm text-white">
        For help or questions, join our Telegram group:{" "}
        <a
          href="https://t.me/+2fvOF7WT0YBjZDM9"
          className="text-pink-500 hover:underline"
        >
          https://t.me/+2fvOF7WT0YBjZDM9
        </a>
      </p>
    </section>
  );
}

export default HowToDownload;
