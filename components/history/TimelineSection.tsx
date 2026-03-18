"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { timelineEvents } from "./historyData";
import TimelineNode from "./TimelineNode";

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.3", "end 0.7"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Group events by era for divider labels
  let currentEra = "";

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 md:px-12 lg:px-24 bg-beige"
      style={{ backgroundColor: "#f6f4ed" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] inline-block glitch-flicker"
            style={{ color: "#001d4a" }}
          >
            Timeline
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mt-4">
            From the Sahel to the Saddle
          </h2>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical line that draws on scroll */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px]">
            <motion.div
              className="w-full h-full origin-top timeline-line-glow"
              style={{
                scaleY: lineScaleY,
                backgroundColor: "#001d4a",
              }}
            />
          </div>

          {/* Mobile vertical line */}
          <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-[2px]">
            <motion.div
              className="w-full h-full origin-top"
              style={{
                scaleY: lineScaleY,
                backgroundColor: "#001d4a",
                opacity: 0.3,
              }}
            />
          </div>

          {/* Timeline events */}
          <div className="space-y-12 md:space-y-16">
            {timelineEvents.map((event, index) => {
              const showEraDivider = event.era !== currentEra;
              if (showEraDivider) currentEra = event.era;
              const isLeft = index % 2 === 0;

              return (
                <div key={index}>
                  {/* Era divider */}
                  {showEraDivider && (
                    <motion.div
                      className="text-center mb-8 md:mb-12 relative z-10"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <span
                        className="font-montserrat font-medium text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.4em] px-6 py-2 inline-block"
                        style={{
                          color: "#001d4a",
                          borderTop: "1px solid rgba(0, 29, 74, 0.2)",
                          borderBottom: "1px solid rgba(0, 29, 74, 0.2)",
                          backgroundColor: "#f6f4ed",
                        }}
                      >
                        {event.era}
                      </span>
                    </motion.div>
                  )}

                  {/* Mobile: left-aligned, Desktop: alternating */}
                  <div className="md:hidden pl-8">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      {/* Mobile dot */}
                      <motion.div
                        className="absolute left-0 w-4 h-4 rounded-full border-2"
                        style={{
                          borderColor: "#001d4a",
                          backgroundColor: "#f6f4ed",
                        }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />

                      <span
                        className="inline-block font-montserrat font-medium text-xs uppercase tracking-[0.2em] px-3 py-1 mb-3 rounded-full"
                        style={{
                          backgroundColor: "rgba(0, 29, 74, 0.1)",
                          color: "#001d4a",
                        }}
                      >
                        {event.year}
                      </span>
                      <h3 className="font-serif text-xl text-charcoal mb-2">
                        {event.title}
                      </h3>
                      <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Desktop: alternating left/right */}
                  <div className="hidden md:block">
                    <TimelineNode
                      event={event}
                      index={index}
                      isLeft={isLeft}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
