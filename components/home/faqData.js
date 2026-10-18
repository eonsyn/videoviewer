// Single source of truth for the homepage FAQ.
// Used by components/home/Faq.js (UI) and app/page.js (FAQPage JSON-LD),
// so the structured data can never drift from what's on screen.
export const faqs = [
  { q: "How does TeraVideoPlayer work?", a: "TeraVideoPlayer plays and generates direct download links for files hosted on TeraBox. Simply paste a public TeraBox link, and we resolve it to a fast stream and a direct download URL — no login required." },
  { q: "Can I watch TeraBox videos online without downloading them?", a: "Yes! Paste a public TeraBox link and the video starts playing right in your browser with our built-in player. No app, no login, and no need to download the file first." },
  { q: "Do I need the TeraBox app to play videos?", a: "No. TeraVideoPlayer works in any modern browser on phone, tablet, or desktop, so you can watch shared TeraBox videos without installing the official app." },
  { q: "Can I generate unlimited download links?", a: "Yes! TeraVideoPlayer is completely free and unlimited. Generate as many direct download links as you need." },
  { q: "Does it work with all TeraBox links?", a: "TeraVideoPlayer supports public TeraBox share links for individual files. Folder links are not currently supported — we're working on adding that feature." },
  { q: "Is it legal to use this tool?", a: "Yes, as long as you're watching or downloading content you have legal rights to access. TeraVideoPlayer only works with publicly shared files." },
  { q: "Do I need an account?", a: "No account needed. Just visit the website, paste your link, and watch or download — it takes less than 10 seconds." },
  { q: "Is my data safe and private?", a: "Absolutely. We don't collect personal data, log your downloads, or store any files. Your privacy is our priority." },
];
