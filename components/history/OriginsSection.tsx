"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import ImageHolder from "../ImageHolder";

function TypewriterText({
  text,
  className = "",
  delay = 0,
  speed = 0.08,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const [animationComplete, setAnimationComplete] = useState(false);

  const words = text.split(/(<br\s*\/?>|\n)/);
  const processedWords: Array<{
    text: string;
    isSpace: boolean;
  }> = [];

  words.forEach((segment) => {
    if (segment.match(/<br\s*\/?>/)) {
      processedWords.push({ text: "<br>", isSpace: false });
    } else if (segment.length > 0) {
      const parts = segment.split(/(\s+)/);
      parts.forEach((part) => {
        if (part.length > 0) {
          processedWords.push({ text: part, isSpace: /^\s+$/.test(part) });
        }
      });
    }
  });

  const wordCount = processedWords.filter(
    (w) => w.text !== "<br>" && !w.isSpace && w.text.trim().length > 0
  ).length;

  const totalDuration = delay + wordCount * speed + 0.2;

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), totalDuration * 1000);
    return () => clearTimeout(timer);
  }, [totalDuration]);

  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      onAnimationComplete={() => setAnimationComplete(true)}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: speed, delayChildren: delay },
        },
      }}
    >
      {processedWords.map((item, index) => {
        if (item.text === "<br>") return <br key={index} />;
        return (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.2 } },
            }}
            style={{
              display: item.isSpace ? "inline" : "inline-block",
              opacity: animationComplete ? 1 : undefined,
            }}
          >
            {item.text}
          </motion.span>
        );
      })}
    </motion.p>
  );
}

export default function OriginsSection() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-beige" style={{ backgroundColor: "#f6f4ed" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ImageHolder
              src="/images/history/1913.jpg"
              alt="Black cowboys on horseback, circa 1913"
              aspectRatio="portrait"
              className="w-full"
            />
          </motion.div>

          {/* Right: Text */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span
                className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] inline-block glitch-flicker"
                style={{ color: "#001d4a" }}
              >
                Origins
              </span>
            </motion.div>

            <motion.h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Before the Legend
            </motion.h2>

            <div className="space-y-4 pt-4">
              <TypewriterText
                text="Long before Hollywood invented its version of the cowboy, enslaved Africans were working the cattle ranches of Texas — roping, riding, and managing herds across hundreds of miles of open range."
                className="font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed"
                delay={0.3}
              />
              <TypewriterText
                text="By 1845, an estimated 25% of the settler population in Texas was of African descent. When white ranchers left to fight in the Civil War, it was Black cattlemen who kept the ranches running — the backbone of an industry that would define the American West."
                className="font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed"
                delay={2.5}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
