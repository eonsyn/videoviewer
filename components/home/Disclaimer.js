import React from "react";
import { AlertTriangle, Shield, Mail } from "lucide-react";
import Link from "next/link";

function Disclaimer() {
  return (
    <section className="max-w-5xl mx-auto p-8  transition-all">
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-7 h-7 text-pink-600" />
        <h2 className="text-2xl font-bold text-pink-600">Disclaimer</h2>
      </header>

      {/* Content */}
      <div className="space-y-5 leading-relaxed">
        <p>
          <strong className="text-pink-600">TeraFetch.netlify.app</strong> is an independent tool
          created to help users download files, videos, and images from
          <span className="text-orange-500 font-medium"> TeraBox</span> shared links.
          This site is <strong>not affiliated</strong> with{" "}
          <span className="text-orange-500 font-medium">terabox.app</span> or{" "}
          <span className="text-orange-500 font-medium">Flextech Inc.</span>.
        </p>

        <p>
          Our application simply provides{" "}
          <strong className="text-pink-600">direct download links</strong> for publicly
          accessible TeraBox files. We do <strong>not</strong> host, upload, or store
          any files or data. All downloads come directly from the official TeraBox servers.
        </p>

        <p>
          <strong className="text-pink-600">TeraFetch</strong> respects all applicable{" "}
          <strong>copyright laws</strong> and encourages users to download or share
          only the content they have legal rights to access.
        </p>

        {/* Contact Section */}
        <div className="flex items-start gap-3 bg-pink-50 border border-pink-100 p-4 rounded-xl hover:border-pink-300 transition-all">
          <Shield className="w-6 h-6 text-orange-500 mt-1" />
          <p className="text-sm text-gray-700">
            If you are a content owner and believe this service infringes your rights,
            please contact us immediately. You can reach out through our{" "}
            <Link
              href="https://t.me/+2fvOF7WT0YBjZDM9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-pink-600 font-medium hover:underline"
            >
              Telegram Group <Mail className="w-4 h-4" />
            </Link>{" "}
            and we will review and take appropriate action promptly.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Disclaimer;
