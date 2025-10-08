import React from "react";
import { AlertTriangle, Shield, Mail } from "lucide-react";
import Link from "next/link";

function Disclaimer() {
  return (
    <section className="max-w-3xl mx-auto p-6 bg-[#0f0f10] text-gray-300 rounded-2xl border border-gray-800 shadow-lg shadow-blue-900/10">
      {/* Header */}
      <header className="flex items-center gap-3 mb-5">
        <AlertTriangle className="w-7 h-7 text-red-500" />
        <h2 className="text-2xl font-semibold text-gray-100">Disclaimer</h2>
      </header>

      {/* Content */}
      <div className="space-y-5 leading-relaxed">
        <p>
          <strong className="text-white">TeraDownloader.netlify.app</strong> is{" "}
          <span className="text-gray-400">
            not an official TeraBox website and is not affiliated with{" "}
          </span>
          <span className="font-medium text-blue-400">terabox.app</span> or{" "}
          <span className="font-medium text-blue-400">Flextech Inc.</span>.
        </p>

        <p>
          Our tool simply generates{" "}
          <strong className="text-white">direct download links</strong> for publicly shared TeraBox files.
          We do <strong className="text-white">not</strong> store, host, or upload any content ourselves.
          All files remain on the original TeraBox servers.
        </p>

        <p>
          We fully <strong className="text-white">respect copyright laws</strong> and
          encourage users to only download content they are authorized to access.
        </p>

        <div className="flex items-start gap-3 bg-[#121214] border border-gray-800 p-4 rounded-xl shadow-inner">
          <Shield className="w-6 h-6 text-green-400 mt-1" />
          <p className="text-sm text-gray-300">
            If you are a content owner and believe this tool violates your rights, please{" "}
            <Link
              href="mailto:mail.teradownloader@gmail.com"
              className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
            >
              contact us <Mail className="w-4 h-4" />
            </Link>
            . We will take immediate action.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Disclaimer;
