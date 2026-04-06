"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-[#1E40AF] font-bold text-xl">Bid</span>
            <span className="text-[#10B981] font-bold text-xl">Compare</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <Link
              href="/compare"
              className="text-slate-600 hover:text-[#1E40AF] text-sm font-medium transition-colors"
            >
              Compare Bids
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-[#1E40AF] text-sm font-medium transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/compare"
              className="bg-[#1E40AF] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e3a8a] transition-colors"
            >
              Compare Free →
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="sm:hidden p-2 rounded-md text-slate-600 hover:text-[#1E40AF] hover:bg-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden pb-4 flex flex-col gap-3">
            <Link
              href="/compare"
              className="text-slate-600 hover:text-[#1E40AF] text-sm font-medium py-2 border-b border-slate-100"
              onClick={() => setMenuOpen(false)}
            >
              Compare Bids
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-[#1E40AF] text-sm font-medium py-2 border-b border-slate-100"
              onClick={() => setMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/compare"
              className="bg-[#1E40AF] text-white px-4 py-2 rounded-lg text-sm font-semibold text-center hover:bg-[#1e3a8a] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Compare Free →
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
