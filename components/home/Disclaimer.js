import React from "react";
import { AlertTriangle, Shield, Mail } from "lucide-react";
import Link from "next/link";

function Disclaimer() {
  return (
    <section className="max-w-3xl mx-auto p-6 bg-white/20 backdrop-blur-sm rounded-2xl border border-pink-200 shadow-md text-white transition-all">
      
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-7 h-7 text-pink-500" />
        <h2 className="text-2xl font-bold text-pink-600">Disclaimer</h2>
      </header>

      {/* Content */}
      <div className="space-y-5 leading-relaxed text-white">
        <p>
          <strong className="text-pink-600">TeraDownloader.netlify.app</strong> is{" "}
          <span className="text-white">
            not an official TeraBox website and is not affiliated with{" "}
          </span>
          <span className="font-medium text-orange-500">terabox.app</span> or{" "}
          <span className="font-medium text-orange-500">Flextech Inc.</span>.
        </p>

        <p>
          Our tool simply generates{" "}
          <strong className="text-pink-500">direct download links</strong> for publicly shared TeraBox files.
          We do <strong className="text-pink-500">not</strong> store, host, or upload any content ourselves.
          All files remain on the original TeraBox servers.
        </p>

        <p>
          We fully <strong className="text-pink-500">respect copyright laws</strong> and
          encourage users to only download content they are authorized to access.
        </p>

        <div className="flex items-start gap-3 bg-white/20 border border-pink-200 p-4 rounded-xl shadow-inner">
          <Shield className="w-6 h-6 text-orange-400 mt-1" />
          <p className="text-sm text-white">
            If you are a content owner and believe this tool violates your rights, please{" "}
            <Link
              href="https://t.me/+2fvOF7WT0YBjZDM9"
              target="_blank"
              className="inline-flex items-center gap-1 text-pink-500 hover:text-pink-400 transition-colors"
            >
              join our Telegram group <Mail className="w-4 h-4" />
            </Link>{" "}
            and ask your query. We will take immediate action.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Disclaimer;
