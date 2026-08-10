"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ImageHolder from "./ImageHolder";
import Section from "./Section";

export default function AboutSection() {
  // overflow-x-clip: the text block below waits at translateX(50px) until it
  // scrolls into view, which parked 26px of it past the right edge of the page
  // and made the whole document pannable sideways. `clip` rather than `hidden`
  // so no scroll container is created.
  return (
    <Section id="about" className="py-32 px-6 md:px-12 lg:px-24 overflow-x-clip">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Image holder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ImageHolder aspectRatio="square" className="w-full" />
          </motion.div>

          {/* Right: Text block */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="font-serif uppercase text-5xl md:text-6xl lg:text-7xl text-charcoal leading-tight">
              About
            </h2>
            <div className="space-y-4 pt-4">
              <p className="font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed">
                Bell Atelier is rooted in the heritage of the Black cowboy — a
                legacy of resilience, craftsmanship, and quiet authority that
                shaped the American West. Every boot we create carries that
                history forward.
              </p>
            </div>
            {/* CSS hover rather than mouse handlers — on a touch screen the
                JS version latched the inverted state on after a tap */}
            <Link
              href="/history"
              className="inline-block font-montserrat font-medium text-xs uppercase tracking-[0.35em] px-8 py-4 border border-[#001d4a] text-[#001d4a] transition-colors duration-300 hover:bg-[#001d4a] hover:text-[#f6f4ed]"
            >
              Cowboy History
            </Link>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

