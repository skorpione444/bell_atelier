"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import ImageHolder from "./ImageHolder";
import Section from "./Section";
import { useState, useEffect, useRef } from "react";

export default function ProductFocusSection() {
  const boots = [
    { id: 1, caption: "SERIES 1", href: "/series-1" },
    { id: 2, caption: "SERIES 2", href: "/series-2" },
  ];

  // Two perspective images
  // Front (0) = scrolling down or at rest, Back (1) = scrolling up
  const perspectives = [
    { id: 0, src: "/images/transparent_rider_branded.png", label: "Front" },
    { id: 1, src: "/images/horse_back_pers.png", label: "Back" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Start with front view
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll detection logic
  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY;

          // Clear existing timeout
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }

          // Determine scroll direction
          if (Math.abs(scrollDelta) > 1) {
            // User is actively scrolling
            if (scrollDelta > 0) {
              // Scrolling down → Front view
              setCurrentIndex(0);
            } else {
              // Scrolling up → Back view
              setCurrentIndex(1);
            }
          }

          // Set timeout to detect when scrolling stops
          // When scrolling stops, show front view
          scrollTimeoutRef.current = setTimeout(() => {
            setCurrentIndex(0); // Front view when stopped
          }, 3000); // 3000ms (3 seconds) delay after scroll stops

          lastScrollY = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Section id="collection" className="py-32 px-6 md:px-12 lg:px-24">
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
            className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] whitespace-nowrap inline-block relative glitch-flicker"
            style={{
              color: "#001d4a"
            }}
          >
            Collection
          </h2>
        </motion.div>

        {/* Two cards with image in between for larger screens */}
        <div className="hidden md:flex justify-center items-center gap-16 mt-[30px] pb-8">
          {/* SERIES 1 Card */}
          <Link href={boots[0].href} className="flex-shrink-0 w-[400px] cursor-pointer">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              whileHover={{ scale: 1.02 }}
              className="transition-transform duration-300"
            >
              <ImageHolder aspectRatio="portrait" />
              <p className="mt-6 font-sans text-sm text-charcoal/60 tracking-wide uppercase text-center">
                {boots[0].caption}
              </p>
            </motion.div>
          </Link>

          {/* Scroll-based Image Container */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ width: "400px", height: "400px" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={perspectives[currentIndex].src}
                alt={`Rider ${perspectives[currentIndex].label}`}
                width={400}
                height={400}
                className="object-contain"
                style={{ 
                  maxWidth: "400px", 
                  maxHeight: "400px",
                  width: "auto",
                  height: "auto"
                }}
                priority={currentIndex === 0}
              />
            </div>
          </motion.div>

          {/* SERIES 2 Card */}
          <Link href={boots[1].href} className="flex-shrink-0 w-[400px] cursor-pointer">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="transition-transform duration-300"
            >
              <ImageHolder aspectRatio="portrait" />
              <p className="mt-6 font-sans text-sm text-charcoal/60 tracking-wide uppercase text-center">
                {boots[1].caption}
              </p>
            </motion.div>
          </Link>
        </div>

        {/* Vertical staggered layout for mobile */}
        <div className="md:hidden grid grid-cols-1 gap-12 mt-[30px]">
          {/* SERIES 1 Card */}
          <Link href={boots[0].href} className="cursor-pointer">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              whileHover={{ scale: 1.02 }}
              className="transition-transform duration-300"
            >
              <ImageHolder aspectRatio="portrait" />
              <p className="mt-6 font-sans text-sm text-charcoal/60 tracking-wide uppercase text-center">
                {boots[0].caption}
              </p>
            </motion.div>
          </Link>

          {/* Scroll-based Image Container - Mobile */}
          <motion.div
            className="flex items-center justify-center py-8 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ width: "100%", minHeight: "300px" }}
          >
            <div className="flex items-center justify-center">
              <Image
                src={perspectives[currentIndex].src}
                alt={`Rider ${perspectives[currentIndex].label}`}
                width={300}
                height={300}
                className="object-contain"
                style={{ 
                  maxWidth: "300px", 
                  maxHeight: "300px",
                  width: "auto",
                  height: "auto"
                }}
                priority={currentIndex === 0}
                loading={currentIndex === 0 ? undefined : "lazy"}
              />
            </div>
          </motion.div>

          {/* SERIES 2 Card */}
          <Link href={boots[1].href} className="cursor-pointer">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="transition-transform duration-300"
            >
              <ImageHolder aspectRatio="portrait" />
              <p className="mt-6 font-sans text-sm text-charcoal/60 tracking-wide uppercase text-center">
                {boots[1].caption}
              </p>
            </motion.div>
          </Link>
        </div>
      </div>
    </Section>
  );
}

