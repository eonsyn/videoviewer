import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function BlogSection() {
  const blogs = [
    {
      id: 1,
      title: "Is TeraBox Safe? A Complete Guide to Privacy, Security, and Risks",
      description: "A complete guide to TeraBox privacy, security, and risks. Learn whether TeraBox is safe to use for storing files, streaming videos, and more.",
      image: "/blog/teraboxSafe/placeholder.png",
      link: "/is-terabox-safe",
      tag: "Guide"
    }
  ];

  return (
    <section className="bg-[#060910] py-20 px-5">
      <div className="max-w-[1200px] mx-auto w-full">
        
        <div className="mb-8">
          <h2 className="font-['Geist',_sans-serif] text-[clamp(24px,3.5vw,34px)] font-bold text-[#f0f4fc] tracking-tight mb-2">
            Latest Resources
          </h2>
          <p className="text-[#6b7a8d] text-sm m-0">
            Stay updated with our latest guides and tips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <Link key={blog.id} href={blog.link} className="no-underline block group h-full">
              <div className="bg-[#0c1018] border border-white/5 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 cursor-pointer group-hover:border-blue-300/30 group-hover:-translate-y-1 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] h-full">
                <div className="relative w-full h-[200px] bg-[#131824]">
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="inline-flex self-start px-3 py-1 rounded-full bg-blue-400/10 text-blue-300 text-[11px] font-semibold tracking-wider uppercase mb-3">
                    {blog.tag}
                  </div>
                  <h3 className="font-['Geist',_sans-serif] text-[18px] font-semibold text-[#f0f4fc] mb-3 leading-[1.3]">
                    {blog.title}
                  </h3>
                  <p className="text-[#6b7a8d] text-[14px] leading-relaxed mb-5 flex-grow">
                    {blog.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-blue-300 text-[13px] font-medium mt-auto">
                    Read Article <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
}
