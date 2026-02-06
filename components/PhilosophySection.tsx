"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Section from "./Section";

// Typewriter component for manifesto text
function TypewriterText({ 
  text, 
  className = "",
  delay = 0,
  speed = 0.1,
  lineHover = false,
  style
}: { 
  text: string; 
  className?: string;
  delay?: number;
  speed?: number;
  lineHover?: boolean;
  style?: React.CSSProperties;
}) {
  // Track hover state per line
  const [hoveredLineIndex, setHoveredLineIndex] = useState<number | null>(null);
  // Track if animation has completed to ensure all words are visible
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Split text into words and spaces, preserving line breaks
  const words = text.split(/(<br\s*\/?>|\n)/);
  const processedWords: Array<{ text: string; isSpace: boolean; lineIndex: number }> = [];
  
  let currentLineIndex = 0;
  words.forEach((segment) => {
    if (segment.match(/<br\s*\/?>/)) {
      processedWords.push({ text: "<br>", isSpace: false, lineIndex: currentLineIndex });
      currentLineIndex++;
    } else if (segment.length > 0) {
      // Split into words and spaces
      const parts = segment.split(/(\s+)/);
      parts.forEach(part => {
        if (part.length > 0) {
          const isSpace = /^\s+$/.test(part);
          processedWords.push({ text: part, isSpace, lineIndex: currentLineIndex });
        }
      });
    }
  });

  // Filter out empty strings and count actual words (excluding <br> and spaces)
  const wordCount = processedWords.filter(w => w.text !== "<br>" && !w.isSpace && w.text.trim().length > 0).length;
  
  // Calculate total animation duration
  const totalDuration = delay + (wordCount * speed) + 0.2; // delay + stagger + last word duration
  
  // Set animation complete after all words should have appeared
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, totalDuration * 1000);
    return () => clearTimeout(timer);
  }, [totalDuration]);

  return (
    <motion.p
      className={`${className} text-center`}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-200px" }}
      onAnimationComplete={() => setAnimationComplete(true)}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: speed,
            delayChildren: delay
          }
        }
      }}
      onMouseLeave={lineHover ? () => setHoveredLineIndex(null) : undefined}
    >
      {processedWords.map((item, index) => {
        if (item.text === "<br>") {
          return <br key={index} />;
        }
        
        const isWord = !item.isSpace && item.text.trim().length > 0;
        const isLineHovered = lineHover && hoveredLineIndex === item.lineIndex;
        
        return (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { duration: 0.2 }
              }
            }}
            // Force visibility after animation completes - hover only affects color, never opacity
            animate={{
              ...(animationComplete ? { opacity: 1 } : {}),
              ...(lineHover && isWord ? {
                color: isLineHovered ? "#800020" : "inherit",
                transition: { duration: 0.2, ease: "easeInOut" }
              } : {})
            }}
            onMouseEnter={lineHover && isWord ? () => setHoveredLineIndex(item.lineIndex) : undefined}
            whileHover={!lineHover && isWord ? {
              color: "#800020",
              transition: { duration: 0.2, ease: "easeInOut" }
            } : {}}
            className={isWord ? "cursor-pointer" : ""}
            style={{ 
              display: item.isSpace ? "inline" : "inline-block",
              // Ensure visibility after animation completes as fallback
              opacity: animationComplete ? 1 : undefined
            }}
          >
            {item.text}
          </motion.span>
        );
      })}
    </motion.p>
  );
}

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect - content moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Split GRAVITAS into letters
  const gravitasLetters = "GRAVITAS".split("");

  return (
    <Section id="philosophy" className="py-32 px-6 md:px-12 lg:px-24">
      <div ref={sectionRef} className="max-w-4xl mx-auto">
        {/* Subtle section title */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] whitespace-nowrap inline-block relative glitch-flicker"
            style={{
              color: "#001d4a"
            }}
          >
            Philosophy
          </h2>
        </motion.div>
        
        <motion.div 
          style={{ y }}
          className="space-y-8 font-montserrat font-light text-[0.675rem] md:text-[0.75rem] text-charcoal/80 leading-relaxed"
        >
          {/* GRAVITAS Heading - Split Text Animation */}
          <motion.h3 
            className="font-serif uppercase text-2xl md:text-3xl mb-8 tracking-wide flex justify-center"
            style={{ color: "#bcb69a" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {gravitasLetters.map((letter, index) => (
              <motion.span
                key={index}
                variants={{
                  // Letters fall in from above, like gravity pulling them down
                  hidden: { opacity: 0, y: -40, scale: 1.05 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      duration: 0.8,
                      ease: "easeOut"
                    }
                  }
                }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h3>

          {/* Manifesto Content - Typewriter Effect with Waterfall */}
          <div className="space-y-6 text-center">
            {/* Paragraph 1: 8 words, duration ~0.8s */}
            <TypewriterText
              text="Gravitas is not weight.<br />It is earned presence."
              delay={0.2}
              speed={0.1}
            />

            {/* Paragraph 2: 20 words, duration ~2.0s, starts after para 1 finishes (0.2 + 0.8 = 1.0s) */}
            <TypewriterText
              text="It is what remains when noise, trend, and imitation fall away.<br />When a person no longer performs rebellion — they embody it."
              delay={1.0}
              speed={0.1}
            />

            {/* Paragraph 3: 19 words, duration ~1.9s, starts after para 2 finishes (1.0 + 2.0 = 3.0s) */}
            <TypewriterText
              text="BELL is built for those who move silently through a loud world.<br />Rooted, but not nostalgic.<br />Nomadic, but never unanchored."
              className="uppercase tracking-wider"
              delay={3.0}
              speed={0.1}
            />

            {/* Paragraph 4: 25 words, duration ~2.5s, starts after para 3 finishes (3.0 + 1.9 = 4.9s) */}
            <TypewriterText
              text="Our work stands at the intersection of modernized tradition and future instinct — where African heritage, outlaw independence, and restraint converge.<br />Not as costume. Not as revival.<br />As continuation."
              delay={4.9}
              speed={0.1}
            />

            {/* Paragraph 5: 7 words, duration ~0.7s, starts after para 4 finishes (4.9 + 2.5 = 7.4s) */}
            <TypewriterText
              text="We believe authority is not declared.<br />It is recognized."
              delay={7.4}
              speed={0.1}
            />

            {/* Paragraph 6: 6 words, duration ~0.6s, starts after para 5 finishes (7.4 + 0.7 = 8.1s) */}
            <TypewriterText
              text="Taste is not consensus.<br />It is refusal."
              delay={8.1}
              speed={0.1}
            />

            {/* Paragraph 7: 32 words, duration ~3.2s, starts after para 6 finishes (8.1 + 0.6 = 8.7s) */}
            <TypewriterText
              text="To wear BELL is not to follow a style, but to carry a stance — one that resists dilution, resists trend, and remains true to its roots even as the world accelerates away from them."
              delay={8.7}
              speed={0.1}
            />

            {/* Paragraph 8: 6 words, duration ~0.6s, starts after para 7 finishes (8.7 + 3.2 = 11.9s) */}
            <TypewriterText
              text="This is not fashion.<br />This is bearing."
              className="font-montserrat font-medium"
              delay={11.9}
              speed={0.1}
              lineHover={true}
              style={{ color: "#001d4a" }}
            />
          </div>

          {/* Logo signature */}
          <motion.div
            className="mt-2 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            // Fade-in starts as soon as logo enters viewport, ~5 seconds to fully appear
            transition={{ duration: 5, delay: 0 }}
          >
            <Image
              src="/images/bell_logo_beige.png"
              alt="Bell Atelier"
              width={150}
              height={50}
              className="h-auto w-auto max-w-[100px] md:max-w-[125px] glitch-flicker"
              quality={100}
              priority={false}
            />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

