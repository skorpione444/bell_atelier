"use client";

import { motion } from "framer-motion";
import ImageHolder from "./ImageHolder";
import Section from "./Section";

export default function AtelierSection() {
  return (
    <Section id="atelier" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Image holder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ImageHolder aspectRatio="square" className="w-full" />
            {/* TODO: Replace with actual atelier/craft image */}
          </motion.div>

          {/* Right: Text block */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-charcoal leading-tight">
              The Atelier
            </h2>
            <div className="space-y-4 pt-4">
              <p className="font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed">
                {/* TODO: Replace with actual atelier text */}
                Our workshop is where tradition meets innovation. Each boot is
                meticulously crafted by master artisans who have dedicated their
                lives to the art of leatherwork and precision construction.
              </p>
              <p className="font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed">
                {/* TODO: Replace with additional atelier text */}
                From the selection of premium materials to the final hand-stitched
                details, every step is executed with intention and care. This is
                not mass production—it is the slow, deliberate creation of
                heirloom-quality pieces.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

