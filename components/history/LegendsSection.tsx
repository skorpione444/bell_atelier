"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { legendFigures } from "./historyData";
import LegendCard from "./LegendCard";

export default function LegendsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll to horizontal card movement
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(legendFigures.length - 1) * 100}%`]
  );

  if (isMobile) {
    return (
      <section className="py-32 px-6 bg-beige" style={{ backgroundColor: "#f6f4ed" }}>
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
              className="font-montserrat font-medium text-[0.6125rem] uppercase tracking-[0.35em] inline-block glitch-flicker"
              style={{ color: "#001d4a" }}
            >
              Legends
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal mt-4">
              The Names They Tried to Forget
            </h2>
          </motion.div>

          {/* Mobile: stacked vertically */}
          <div className="space-y-24">
            {legendFigures.map((figure, index) => (
              <div key={index} className="max-w-lg mx-auto">
                <LegendCard figure={figure} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        height: `${legendFigures.length * 100}vh`,
        backgroundColor: "#f6f4ed",
      }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header - fixed at top */}
        <motion.div
          className="absolute top-12 left-0 right-0 z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="font-montserrat font-medium text-[0.6125rem] uppercase tracking-[0.35em] inline-block glitch-flicker"
            style={{ color: "#001d4a" }}
          >
            Legends
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mt-4">
            The Names They Tried to Forget
          </h2>
        </motion.div>

        {/* Horizontal scroll track */}
        <motion.div
          className="flex h-full items-center"
          style={{ x, willChange: "transform" }}
        >
          {legendFigures.map((figure, index) => (
            <LegendCard key={index} figure={figure} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
