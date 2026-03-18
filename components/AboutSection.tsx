"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ImageHolder from "./ImageHolder";
import Section from "./Section";

export default function AboutSection() {
  return (
    <Section id="about" className="py-32 px-6 md:px-12 lg:px-24">
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
            <Link
              href="/history"
              className="inline-block font-montserrat font-medium text-xs uppercase tracking-[0.35em] px-8 py-4 border transition-all duration-300"
              style={{
                borderColor: "#001d4a",
                color: "#001d4a",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#001d4a";
                e.currentTarget.style.color = "#f6f4ed";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#001d4a";
              }}
            >
              Cowboy History
            </Link>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

