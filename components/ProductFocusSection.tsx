"use client";

import { motion } from "framer-motion";
import ImageHolder from "./ImageHolder";
import Section from "./Section";

export default function ProductFocusSection() {
  const boots = [
    { id: 1, caption: "Classic Heritage" },
    { id: 2, caption: "Modern Silhouette" },
    { id: 3, caption: "Artisan Detail" },
    { id: 4, caption: "Refined Craft" },
  ];

  return (
    <Section id="collection" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif uppercase text-5xl md:text-6xl lg:text-7xl text-charcoal mb-16 text-center">
          The Collection
        </h2>

        {/* Horizontal scroll container for larger screens */}
        <div className="hidden md:flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
          {boots.map((boot, index) => (
            <motion.div
              key={boot.id}
              className="flex-shrink-0 w-[400px]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ImageHolder aspectRatio="portrait" />
              <p className="mt-6 font-sans text-sm text-charcoal/60 tracking-wide uppercase text-center">
                {/* TODO: Replace with actual boot caption */}
                {boot.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Vertical staggered layout for mobile */}
        <div className="md:hidden grid grid-cols-1 gap-12">
          {boots.map((boot, index) => (
            <motion.div
              key={boot.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ImageHolder aspectRatio="portrait" />
              <p className="mt-6 font-sans text-sm text-charcoal/60 tracking-wide uppercase text-center">
                {/* TODO: Replace with actual boot caption */}
                {boot.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

