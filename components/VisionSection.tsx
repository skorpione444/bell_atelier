"use client";

import { motion } from "motion/react";
import Section from "./Section";
import { ImagesSlider } from "./ui/images-slider";

interface VisionSectionProps {
  images: string[];
}

export default function VisionSection({ images }: VisionSectionProps) {

  return (
    <Section id="vision" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Subtle section title */}
        <motion.div
          className="mb-0 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            id="vision-title" 
            data-vision-title="true" 
            className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] whitespace-nowrap inline-block relative glitch-flicker"
            style={{
              color: "#001d4a"
            }}
          >
            Vision
          </h2>
        </motion.div>

        {/* Images Slider */}
        <motion.div
          className="-mt-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ImagesSlider className="h-[40rem] md:h-[50rem] lg:h-[60rem] rounded-sm overflow-hidden" images={images} overlay={false} />
        </motion.div>
      </div>
    </Section>
  );
}

