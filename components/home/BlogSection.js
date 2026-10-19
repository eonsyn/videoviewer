import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

export default function BlogSection() {
  const blogs = [
    {
      id: 1,
      title: "Is TeraBox Safe? A Complete Guide to Privacy, Security, and Risks",
      description:
        "How TeraBox handles your data, what permissions its app really wants, and the red flags to check before you upload anything sensitive.",
      image: "/blog/teraboxSafe/placeholder.png",
      link: "/is-terabox-safe",
      tag: "Privacy & Security",
      date: "Oct 12, 2025",
      readTime: "8 min read",
    },
    {
      id: 2,
      title: "How to Watch a TeraBox Video Online Without the App",
      description:
        "Open a TeraBox share link directly in your browser, stream without downloading, and fix common playback issues — no app, no account.",
      image: "/blog/HowWatchTeraBoxVideoOnlineWithoutApp/placeholder.png",
      link: "/how-to-watch-a-terabox-video-online-without-the-app",
      tag: "How-To",
      date: "Oct 15, 2025",
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "Best Ways to Watch TeraBox Videos Online Without the App",
      description:
        "Compare official TeraBox options against web-based viewers. Discover how TeraVideoPlayer offers fast, login-free in-browser video streaming.",
      image: "/blog/best-ways-to-watch-terabox-videos-online/placeholder.png",
      link: "/best-ways-to-watch-terabox-videos-online-without-the-app",
      tag: "Comparison & Guide",
      date: "Oct 19, 2026",
      readTime: "7 min read",
    },
  ];

  return (
    <section className="bg-[#060910] py-20 px-5">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-400/10 border border-blue-400/20 text-blue-300 text-[11px] font-semibold tracking-wider uppercase mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              Resources
            </span>
            <h2 className="font-['Geist',_sans-serif] text-[clamp(24px,3.5vw,34px)] font-bold text-[#f0f4fc] tracking-tight mb-2">
              Latest Resources
            </h2>
            <p className="text-[#6b7a8d] text-sm m-0 max-w-md">
              Practical guides to help you get the most out of TeraBox and TeraVideoPlayer.
            </p>
          </div>
           
        </div>

        {/* Grid — 2 columns for 2 posts, scales to 3-4 if you add more */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={blog.link}
              className="no-underline block group h-full"
            >
              <article className="relative bg-[#0c1018] border border-white/5 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 cursor-pointer group-hover:border-blue-300/30 group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.5)] h-full">
                {/* Image */}
                <div className="relative w-full h-[200px] bg-[#131824] overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1018] via-[#0c1018]/20 to-transparent" />
                  {/* Tag */}
                  <div className="absolute top-3 left-3 inline-flex px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-blue-300 text-[10px] font-semibold tracking-wider uppercase">
                    {blog.tag}
                  </div>
                </div>

                {/* Body — hover flip zone */}
                <div className="relative p-6 flex flex-col flex-grow overflow-hidden min-h-[180px]">
                  {/* Meta (always visible) */}
                  <div className="flex items-center gap-2 text-[#6b7a8d] text-[12px] mb-3">
                    <span>{blog.date}</span>
                    <span className="h-1 w-1 rounded-full bg-[#2a3340]" />
                    <span className="inline-flex items-center gap-1">
                      <Clock size={11} />
                      {blog.readTime}
                    </span>
                  </div>

                  {/* Title — slides up & out on hover */}
                  <h3 className="font-['Geist',_sans-serif] text-[18px] font-semibold text-[#f0f4fc] leading-[1.3] transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:opacity-0 line-clamp-3">
                    {blog.title}
                  </h3>

                  {/* Description — slides up & fades in on hover, absolutely positioned over title */}
                  <p className="absolute left-6 right-6 top-[60px] text-[#9aa8bb] text-[13.5px] leading-relaxed opacity-0 translate-y-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 line-clamp-4">
                    {blog.description}
                  </p>

                  {/* CTA — pinned to bottom */}
                  <div className="flex items-center gap-1.5 text-blue-300 text-[13px] font-medium mt-auto pt-4 border-t border-white/5">
                    Read article
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}