"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function ClosingSection() {
  return (
    <section
      className="py-32 px-6 md:px-12 lg:px-24 bg-beige"
      style={{ backgroundColor: "#f6f4ed" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Logo with shine effect */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="logo-shine-container relative inline-block cursor-pointer">
            <Image
              src="/images/bell_logo_beige.png"
              alt="Bell Atelier"
              width={150}
              height={50}
              className="h-auto w-auto max-w-[120px] md:max-w-[150px]"
              quality={100}
            />
            <div
              className="logo-shine-mask"
              style={{
                "--logo-mask": "url(/images/bell_logo_beige.png)",
              } as React.CSSProperties}
            >
              <div className="logo-shine-streak" />
              <div className="logo-shine-depth" />
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Carrying the Legacy Forward
        </motion.h2>

        {/* Body text */}
        <motion.div
          className="space-y-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed">
            Bell Atelier exists because this story deserves to be worn — not just
            told. Every boot we craft carries the spirit of the riders who came
            before: their resilience, their mastery, their refusal to be erased.
          </p>
          <p className="font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed">
            This is not nostalgia. This is continuation.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="/#collection"
            className="font-montserrat font-medium text-xs uppercase tracking-[0.35em] px-8 py-4 border transition-all duration-300 hover:text-beige"
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
            Explore the Collection
          </Link>
          <Link
            href="/"
            className="font-montserrat font-medium text-xs uppercase tracking-[0.35em] px-8 py-4 text-charcoal/60 hover:text-charcoal transition-colors duration-300"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
