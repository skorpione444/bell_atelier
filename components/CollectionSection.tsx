"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Section from "./Section";
import Image from "next/image";

const BROWN_IMAGES = [
  "/images/Collection/brown1.png",
  "/images/Collection/brown2.png",
  "/images/Collection/brown3.png",
  "/images/Collection/brown4.png",
];

const BLACK_IMAGES = [
  "/images/Collection/black1.png",
  "/images/Collection/black2.png",
  "/images/Collection/black3.png",
  "/images/Collection/black4.png",
];

type BootColor = "brown" | "black";

export default function CollectionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [selectedColor, setSelectedColor] = useState<BootColor>("brown");
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const images = selectedColor === "brown" ? BROWN_IMAGES : BLACK_IMAGES;
  const totalImages = images.length;

  // Preload all images (both colors) on mount
  useEffect(() => {
    [...BROWN_IMAGES, ...BLACK_IMAGES].forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(src));
      };
    });
  }, []);

  // Scroll-driven animation and visibility detection
  useEffect(() => {
    let ticking = false;
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          const sectionHeight = rect.height;
          const viewportHeight = window.innerHeight;

          const isVisible =
            sectionBottom > viewportHeight * 0.6 &&
            sectionTop < viewportHeight * 0.45;
          setIsInView(isVisible);

          const scrollAmount = -sectionTop;
          const maxScroll = sectionHeight - viewportHeight;
          const progress =
            maxScroll > 0
              ? Math.max(0, Math.min(1, scrollAmount / maxScroll))
              : 0;

          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const getImageTransform = useCallback(
    (index: number) => {
      const progressPerImage = 1 / totalImages;
      const imageStart = index * progressPerImage;
      const imageEnd = (index + 1) * progressPerImage;

      if (scrollProgress < imageStart) {
        return 100;
      } else if (scrollProgress >= imageEnd) {
        if (index === totalImages - 1) {
          return 0;
        }
        const nextImageEnd = (index + 2) * progressPerImage;
        return scrollProgress >= nextImageEnd ? -100 : 0;
      } else {
        if (index === 0) {
          return 0;
        }
        const imageProgress =
          (scrollProgress - imageStart) / progressPerImage;
        return 100 - imageProgress * 100;
      }
    },
    [scrollProgress, totalImages]
  );

  const toggleColor = () => {
    setSelectedColor((prev) => (prev === "brown" ? "black" : "brown"));
  };

  return (
    <Section id="collection" className="relative !py-0 !m-0">
      {/* Fixed overlay: "SERIES 1" title + color toggle */}
      <div className="fixed inset-0 z-[60] pointer-events-none"
        style={{ paddingTop: "clamp(80px, 12vh, 140px)" }}
      >
        {/* SERIES 1 title - centered */}
        <motion.div
          className="flex justify-center pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 20,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <h2
            className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] whitespace-nowrap inline-block relative glitch-flicker"
            style={{ color: "#001d4a", transition: "color 0.5s ease-in-out" }}
          >
            Series 1
          </h2>
        </motion.div>

        {/* Color flip toggle - positioned at 3/4 from left */}
        <motion.div
          className="absolute pointer-events-auto"
          style={{ left: "75%", top: "clamp(130px, 18vh, 200px)", transform: "translateX(-50%)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 20,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <button
            onClick={toggleColor}
            className="relative flex items-center cursor-pointer select-none group"
            aria-label={`Switch to ${selectedColor === "brown" ? "black" : "brown"} boot`}
          >
            <div className="relative flex items-center rounded-full border border-[#f6f4ed]/30 overflow-hidden"
              style={{ backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.15)" }}
            >
              {/* Sliding pill indicator */}
              <motion.div
                className="absolute top-0 bottom-0 rounded-full"
                style={{
                  width: "50%",
                  background: "rgba(246,244,237,0.18)",
                  borderRadius: "9999px",
                }}
                animate={{ x: selectedColor === "brown" ? "0%" : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              />

              <span
                className="relative z-10 px-5 py-2 font-montserrat font-medium text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.3em] transition-opacity duration-300"
                style={{
                  color: "#f6f4ed",
                  opacity: selectedColor === "brown" ? 1 : 0.45,
                }}
              >
                Brown
              </span>
              <span
                className="relative z-10 px-5 py-2 font-montserrat font-medium text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.3em] transition-opacity duration-300"
                style={{
                  color: "#f6f4ed",
                  opacity: selectedColor === "black" ? 1 : 0.45,
                }}
              >
                Black
              </span>
            </div>
          </button>
        </motion.div>
      </div>

      {/* Scroll-driven stacked image panels */}
      <div
        ref={sectionRef}
        className="relative"
        style={{
          height: `${totalImages * 100}vh`,
          marginTop: 0,
          paddingTop: 0,
        }}
      >
        {/* Brown images layer */}
        {BROWN_IMAGES.map((src, index) => {
          const translateY = getImageTransform(index);
          const isLoaded = loadedImages.has(src);

          return (
            <div
              key={`brown-${index}`}
              className="sticky top-0 w-full"
              style={{
                height: "100vh",
                zIndex: index + 1,
                pointerEvents: "none",
              }}
            >
              <motion.div
                className="relative w-full h-full"
                style={{
                  transform: `translateY(${translateY}%)`,
                  willChange: "transform",
                }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={src}
                    alt={`Brown boot angle ${index + 1}`}
                    fill
                    className="object-cover object-center"
                    priority={index === 0}
                    quality={90}
                    sizes="100vw"
                    style={{
                      opacity: isLoaded && selectedColor === "brown" ? 1 : 0,
                      transition: "opacity 0.6s ease-in-out",
                    }}
                  />
                  <Image
                    src={BLACK_IMAGES[index]}
                    alt={`Black boot angle ${index + 1}`}
                    fill
                    className="object-cover object-center"
                    priority={false}
                    quality={90}
                    sizes="100vw"
                    style={{
                      opacity:
                        loadedImages.has(BLACK_IMAGES[index]) &&
                        selectedColor === "black"
                          ? 1
                          : 0,
                      transition: "opacity 0.6s ease-in-out",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
