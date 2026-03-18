"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";
import CountUpNumber from "./CountUpNumber";

export default function HistoryHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: prefersReducedMotion ? 0 : backgroundY,
          willChange: "transform",
        }}
      >
        <div className="w-full h-[130%] relative">
          <Image
            src="/images/history/Hero.jpg"
            alt="Wild horses running across the frontier"
            fill
            className="object-cover object-center"
            priority
            quality={85}
            sizes="100vw"
          />
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </motion.div>

      {/* Grain overlay dark */}
      <div className="grain-overlay-dark absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* "1 in 4" stat */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="font-montserrat font-light text-[6rem] md:text-[10rem] lg:text-[12rem] leading-none text-beige/90 mb-4">
            {prefersReducedMotion ? (
              <span>1 in 4</span>
            ) : (
              <>
                <CountUpNumber value={1} className="inline" /> in{" "}
                <CountUpNumber value={4} className="inline" />
              </>
            )}
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-montserrat font-medium text-xs md:text-sm uppercase tracking-[0.35em] text-beige/70 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          cowboys in the American West were Black
        </motion.p>

        {/* Quote */}
        <motion.blockquote
          className="font-serif italic text-lg md:text-2xl text-beige/60 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        >
          &ldquo;They tried to erase us from the frontier. The saddle
          remembers.&rdquo;
        </motion.blockquote>
      </div>

      {/* Scroll chevron */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-beige/40"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.div>
    </section>
  );
}
