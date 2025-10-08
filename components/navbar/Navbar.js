"use client";
import React, { useState } from "react";
import { Menu, X, Download, Server } from "lucide-react";
import Link from "next/link";

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="w-full bg-[#0b0b0d] text-white shadow-lg border-b border-gray-800 fixed top-0 left-0 z-50 ">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Server className="text-blue-500 w-6 h-6" />
          <Link href="/" className="text-xl font-semibold tracking-wide">
            TeraBox Downloader
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="hover:text-blue-400 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-blue-400 transition-colors font-medium"
          >
            About
          </Link>
          
          <Link
            href="/contact"
            className="hover:text-blue-400 transition-colors font-medium"
          >
            Contact
          </Link>
          <Link
              href="/dmca-policy"
             className="hover:text-blue-400 transition-colors font-medium"
           >
              DMCA
            </Link>
          
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#121214] border-t border-gray-800">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link
              href="/"
              onClick={toggleMenu}
              className="hover:text-blue-400 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={toggleMenu}
              className="hover:text-blue-400 transition-colors font-medium"
            >
              About
            </Link>
             <Link
              href="/dmca-policy"
              onClick={toggleMenu}
              className="hover:text-blue-400 transition-colors font-medium"
            >
              DMCA
            </Link>
           
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
