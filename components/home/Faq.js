// ✅ Server Component (no "use client")
import { HelpCircle } from "lucide-react";

export default function Faq() {
  const faqs = [
    {
      q: "How does TeraDownloader work?",
      a: "TeraDownloader generates direct download links for files on TeraBox, making it easier to access your content without logging in.",
    },
    {
      q: "Can I generate unlimited download links?",
      a: "Yes, you can generate as many download links as you want — completely free!",
    },
    {
      q: "Does it work with all TeraBox links?",
      a: "It supports public TeraBox links for individual files. Folder links are not currently supported.",
    },
    {
      q: "Is it legal to use this tool?",
      a: "Yes, as long as you are downloading content you have rights to access, this tool is fully legal.",
    },
    {
      q: "Do I need an account to use the downloader?",
      a: "No, you don’t need an account. Just visit the website and start generating download links instantly.",
    },
    {
      q: "Is my data safe?",
      a: "Yes, we prioritize your privacy. We don’t collect personal data, and your files remain private.",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto p-6 text-white transition-all">
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-7 h-7 text-pink-500" />
        <h2 className="text-2xl font-bold text-pink-600">
          Frequently Asked Questions (FAQ)
        </h2>
      </header>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <details
            key={index}
            className="group bg-white/20 border border-pink-200 rounded-xl overflow-hidden shadow-sm hover:border-pink-400 hover:shadow-pink-300/20 transition-all duration-300"
          >
            <summary className="cursor-pointer flex items-center justify-between p-4 text-left font-medium text-pink-600 hover:bg-white/10 transition-colors">
              {item.q}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-pink-400 group-open:rotate-180 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="px-4 pb-4 text-sm text-white leading-relaxed animate-fadeIn">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
