"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import CountUpNumber from "./CountUpNumber";

export default function ErasureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.6", "end 0.8"],
  });

  // Curtain reveal: myth layer clips away from top
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{ backgroundColor: "#1a1a1a", minHeight: "100vh" }}
    >
      <div className="grain-overlay-dark absolute inset-0 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Reality layer (underneath) */}
        <div className="relative z-0">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span
              className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] inline-block mb-8"
              style={{ color: "rgba(246, 244, 237, 0.5)" }}
            >
              The Truth
            </span>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-beige/90 mb-8">
              A Century of Erasure
            </h2>

            <div className="space-y-6 max-w-3xl mx-auto">
              <p className="font-sans text-lg md:text-xl text-beige/60 leading-relaxed">
                The word &ldquo;cowboy&rdquo; was originally a slur — applied
                specifically to Black cattlemen. White workers were called
                &ldquo;cowhands.&rdquo; Then Hollywood rewrote the script.
                From the 1950s onward, Western films systematically erased every
                trace of African origin from cowboy culture.
              </p>
              <p className="font-sans text-lg md:text-xl text-beige/60 leading-relaxed">
                The Fulani rope-work became &ldquo;American lassoing.&rdquo; The
                mounted herding traditions of the Sahel became &ldquo;frontier
                skills.&rdquo; An entire continent&apos;s contribution — millennia of
                pastoral mastery — was whitewashed into a myth of European
                pioneering. Africa was written out of its own story.
              </p>
            </div>

            <div className="mt-16 flex justify-center">
              <div className="text-center">
                <div className="font-serif text-6xl md:text-8xl text-beige/80">
                  <CountUpNumber value={80} className="inline" suffix="" />
                </div>
                <p className="font-montserrat text-xs uppercase tracking-[0.3em] text-beige/40 mt-2">
                  years of erasure
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Myth layer (curtain on top, clips away on scroll) */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{
            clipPath,
            backgroundColor: "#1a1a1a",
          }}
        >
          <div className="text-center px-6">
            <p
              className="font-serif italic text-3xl md:text-5xl lg:text-6xl glitch-flicker leading-tight"
              style={{ color: "rgba(246, 244, 237, 0.15)" }}
            >
              &ldquo;The cowboy was<br />always white.&rdquo;
            </p>
            <p className="font-montserrat text-xs uppercase tracking-[0.3em] text-beige/20 mt-6">
              The Myth
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
