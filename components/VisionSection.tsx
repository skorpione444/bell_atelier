"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Section from "./Section";

export default function VisionSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Placeholder images - replace with actual image paths when available
  const visionImages = [
    { id: 1, aspectRatio: "portrait" as const },
    { id: 2, aspectRatio: "landscape" as const },
    { id: 3, aspectRatio: "square" as const },
    { id: 4, aspectRatio: "portrait" as const },
    { id: 5, aspectRatio: "wide" as const },
    { id: 6, aspectRatio: "square" as const },
  ];

  const aspectRatioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    wide: "aspect-[16/9]",
  };

  return (
    <Section id="vision" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Subtle section title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 id="vision-title" data-vision-title="true" className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal/20 tracking-tight">
            Vision
          </h2>
        </motion.div>

        {/* Dynamic image grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {visionImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={`${aspectRatioClasses[image.aspectRatio]} relative overflow-hidden group cursor-pointer`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.02 }}
            >
              {/* Image placeholder with elegant gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-sand via-beige to-sand/50"
                animate={{
                  opacity: hoveredIndex === index ? 0.7 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 grain-overlay opacity-30" />
                
                {/* Elegant shimmer effect on hover */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                )}
              </motion.div>

              {/* Subtle border that appears on hover */}
              <motion.div
                className="absolute inset-0 border border-charcoal/0"
                animate={{
                  borderColor:
                    hoveredIndex === index
                      ? "rgba(0, 0, 0, 0.1)"
                      : "rgba(0, 0, 0, 0)",
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Fade overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-charcoal/0"
                animate={{
                  backgroundColor:
                    hoveredIndex === index
                      ? "rgba(0, 0, 0, 0.05)"
                      : "rgba(0, 0, 0, 0)",
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional elegant image row for larger screens */}
        <motion.div
          className="hidden lg:grid grid-cols-4 gap-8 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {[7, 8, 9, 10].map((id, index) => (
            <motion.div
              key={id}
              className="aspect-[4/5] relative overflow-hidden group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              onMouseEnter={() => setHoveredIndex(id)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.03 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-sand via-beige to-sand/50"
                animate={{
                  opacity: hoveredIndex === id ? 0.7 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 grain-overlay opacity-30" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

