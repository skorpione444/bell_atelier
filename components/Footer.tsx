"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-charcoal/10 py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand name */}
          <div>
            <h3 className="font-serif text-2xl text-charcoal">Bell Atelier</h3>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap gap-6 md:gap-8">
            <Link
              href="#"
              className="font-sans text-sm text-charcoal/70 hover:text-charcoal transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="#philosophy"
              className="font-sans text-sm text-charcoal/70 hover:text-charcoal transition-colors duration-300"
            >
              Vision
            </Link>
            <Link
              href="#atelier"
              className="font-sans text-sm text-charcoal/70 hover:text-charcoal transition-colors duration-300"
            >
              Atelier
            </Link>
            <Link
              href="#contact"
              className="font-sans text-sm text-charcoal/70 hover:text-charcoal transition-colors duration-300"
            >
              Contact
            </Link>
          </nav>

          {/* Social placeholders */}
          <div className="flex gap-4">
            {/* TODO: Add social media icons */}
            <span className="font-sans text-xs text-charcoal/50 uppercase tracking-wider">
              Instagram
            </span>
            <span className="font-sans text-xs text-charcoal/50 uppercase tracking-wider">
              Twitter
            </span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-charcoal/5">
          <p className="font-sans text-xs text-charcoal/40 text-center">
            © {new Date().getFullYear()} Bell Atelier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

