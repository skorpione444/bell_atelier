"use client";

import { motion } from "motion/react";
import Section from "./Section";
import { ImagesSlider } from "./ui/images-slider";

export default function VisionSection() {
  // Images from the vision folder - updated list
  const images = [
    "/images/vision/vision_img.png",
    "/images/vision/vision_img_2.png",
    "/images/vision/horse_nyc.png",
    "/images/vision/ll (3).png",
    "/images/vision/ll (4).png",
    "/images/vision/ll (5).png",
    "/images/vision/ChatGPT Image Jan 28, 2026, 05_23_52 PM.png",
    "/images/vision/Pitch Deck - BELL.png",
    "/images/vision/Pitch Deck - BELL (1).png",
    "/images/vision/large_new_hero_image.png",
  ];

  return (
    <Section id="vision" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Subtle section title */}
        <motion.div
          className="mb-4 text-center"
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

