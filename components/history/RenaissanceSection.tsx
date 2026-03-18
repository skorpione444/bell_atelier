"use client";

import { motion } from "motion/react";
import ImageHolder from "../ImageHolder";
import CountUpNumber from "./CountUpNumber";
import { renaissanceStats, renaissanceItems } from "./historyData";

export default function RenaissanceSection() {
  return (
    <section
      className="py-32 px-6 md:px-12 lg:px-24 bg-beige"
      style={{ backgroundColor: "#f6f4ed" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] inline-block glitch-flicker"
            style={{ color: "#001d4a" }}
          >
            Renaissance
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mt-4">
            Still Riding
          </h2>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {renaissanceStats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="font-serif text-4xl md:text-5xl text-charcoal">
                <CountUpNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  className="inline"
                />
              </div>
              <p className="font-montserrat text-xs uppercase tracking-[0.2em] text-charcoal/50 mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {renaissanceItems.map((item, index) => (
            <motion.div
              key={index}
              className={`${item.span} relative overflow-hidden group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative w-full h-full">
                <ImageHolder
                  src={item.image}
                  alt={item.title}
                  aspectRatio="square"
                  className="w-full h-full !aspect-auto"
                />
                {/* Overlay text */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 bg-gradient-to-t from-charcoal/60 to-transparent">
                  <h3 className="font-serif text-lg md:text-xl text-beige mb-1">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-beige/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
