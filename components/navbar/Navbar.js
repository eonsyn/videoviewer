"use client";
import React, { useState } from "react";
import { Menu, X, Server } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => setOpen(!open);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "DMCA", href: "/dmca-policy" },
  ];

  return (
    <nav className="w-full  bg-[#0f0f10] text-gray-100 border-b border-gray-800 shadow-lg fixed top-0 left-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Server className="text-blue-500 w-6 h-6" />
          <Link
            href="/"
            className="text-xl font-semibold tracking-wide text-white hover:text-blue-400 transition"
          >
            TeraBox Downloader
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-medium transition-colors duration-300 group ${
                  isActive
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-blue-400"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-blue-500 transition-all duration-300 ease-out ${
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg text-gray-200 hover:bg-gray-800 transition"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#121214] border-t border-gray-800">
          <div className="flex flex-col items-center gap-5 py-5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={toggleMenu}
                  className={`relative font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-blue-400"
                      : "text-gray-300 hover:text-blue-400"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-blue-500 transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 hover:w-full"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
