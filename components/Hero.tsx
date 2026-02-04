"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Smooth spring animation for mouse movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // Combine mouse Y with parallax Y
  const combinedY = useTransform(
    [springY, parallaxY],
    ([my, py]) => (my as number) + (py as number)
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x * 15);
        mouseY.set(y * 15);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Image holder with parallax and mouse interaction */}
      <motion.div
        ref={imageRef}
        className="absolute inset-0 bg-gradient-to-br from-sand via-beige to-sand/50 grain-overlay"
        style={{
          x: springX,
          y: combinedY,
          opacity,
        }}
      >
        {/* TODO: Replace with actual hero image */}
      </motion.div>

      {/* Brand name and tagline */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <motion.h1
          className="font-serif text-6xl md:text-8xl lg:text-9xl text-charcoal mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          Bell Atelier
        </motion.h1>
        <motion.p
          className="font-sans text-sm md:text-base text-charcoal/70 tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          {/* TODO: Replace with actual tagline */}
          Crafted for the modern West
        </motion.p>
      </div>
    </motion.div>
  );
}

