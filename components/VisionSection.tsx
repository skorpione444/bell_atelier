"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Section from "./Section";
import Image from "next/image";

/**
 * Samples the center of an image to determine if it's dark or light.
 * Returns true if the image center is dark (needs light text).
 */
function analyzeImageBrightness(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve(false); return; }

      // Sample a horizontal strip from the vertical center of the image
      const sampleWidth = Math.min(img.width, 200);
      const sampleHeight = Math.min(img.height, 60);
      canvas.width = sampleWidth;
      canvas.height = sampleHeight;

      const sx = (img.width - sampleWidth) / 2;
      const sy = (img.height - sampleHeight) / 2;
      ctx.drawImage(img, sx, sy, sampleWidth, sampleHeight, 0, 0, sampleWidth, sampleHeight);

      const data = ctx.getImageData(0, 0, sampleWidth, sampleHeight).data;
      let totalBrightness = 0;
      const pixelCount = data.length / 4;

      for (let i = 0; i < data.length; i += 4) {
        // Perceived brightness (ITU-R BT.601)
        totalBrightness += data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      }

      const avgBrightness = totalBrightness / pixelCount;
      // Dark image = average brightness below 128 (out of 255)
      resolve(avgBrightness < 128);
    };
    img.onerror = () => resolve(false);
  });
}

interface VisionSectionProps {
  images: string[];
}

export default function VisionSection({ images }: VisionSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isInView, setIsInView] = useState(false);
  const [imageDarkness, setImageDarkness] = useState<Map<number, boolean>>(new Map());

  // Preload images and analyze their brightness
  useEffect(() => {
    images.forEach((src, index) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(src));
      };

      // Analyze brightness for text color adaptation
      analyzeImageBrightness(src).then((isDark) => {
        setImageDarkness((prev) => {
          const next = new Map(prev);
          next.set(index, isDark);
          return next;
        });
      });
    });
  }, [images]);

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

          // Check if vision section is in the visible range
          // Heading disappears when scrolling down: section bottom passes 60% of screen height
          // Heading disappears when scrolling up: section top passes 45% of screen height (55% from bottom)
          // This works dynamically regardless of how many images we have
          const isVisible = sectionBottom > viewportHeight * 0.6 && sectionTop < viewportHeight * 0.45;
          setIsInView(isVisible);

          // Calculate scroll progress within the section
          // Progress starts when section top reaches viewport top (0)
          // Progress ends when section bottom reaches viewport top (1)
          const scrollAmount = -sectionTop;
          const maxScroll = sectionHeight - viewportHeight;
          const progress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollAmount / maxScroll)) : 0;

          // Diagnostic logging for scroll progress (reduced to avoid CSP issues)
          // Uncomment for debugging if needed
          // if (sectionInView && progress >= 0 && progress <= 1) {
          //   console.log('progress:', progress.toFixed(4));
          // }

          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Calculate which image should be visible and its offset
  // Classic stacked panels: next panel slides from 100% to 0% covering previous
  // Previous panel stays at 0% until fully covered
  const getImageTransform = (index: number) => {
    const totalImages = images.length;
    if (totalImages === 0) return 0;

    const progressPerImage = 1 / totalImages;
    const imageStart = index * progressPerImage;
    const imageEnd = (index + 1) * progressPerImage;

    let translateY: number;
    let branch: string;

    if (scrollProgress < imageStart) {
      // Image hasn't been reached yet - position it below viewport
      translateY = 100;
      branch = 'BELOW_VIEWPORT';
    } else if (scrollProgress >= imageEnd) {
      // Image has fully transitioned (reached 0%)
      if (index === totalImages - 1) {
        // Last image - keep it at 0% (always visible)
        translateY = 0;
        branch = 'LAST_IMAGE_STAY_VISIBLE';
      } else {
        // Previous images - keep at 0% until next image fully covers them
        // Once we're past the next image's transition end, move above
        const nextImageEnd = (index + 2) * progressPerImage;
        translateY = scrollProgress >= nextImageEnd ? -100 : 0;
        branch = scrollProgress >= nextImageEnd ? 'MOVED_ABOVE' : 'STAY_AT_ZERO_UNDER_COVER';
      }
    } else {
      // Image is in transition range (imageStart <= scrollProgress < imageEnd)
      if (index === 0) {
        // First image: stay at 0% while next image slides up to cover it
        translateY = 0;
        branch = 'FIRST_IMAGE_STAY_AT_ZERO';
      } else {
        // Subsequent images: slide up from below (100%) to cover (0%)
        const imageProgress = (scrollProgress - imageStart) / progressPerImage;
        // Translate from 100% (below viewport) to 0% (covering previous)
        translateY = 100 - (imageProgress * 100);
        branch = 'IN_TRANSITION_SLIDE_UP';
      }
    }

    // Diagnostic logging (reduced to avoid CSP issues)
    // Uncomment for debugging if needed
    // if (scrollProgress >= 0 && scrollProgress <= 1 && branch === 'IN_TRANSITION_SLIDE_UP') {
    //   console.log(`[Image ${index}] translateY: ${translateY.toFixed(2)}%`);
    // }

    return translateY;
  };

  // Determine which image currently covers the center of the viewport
  // (where the "Vision" text sits). The last image with translateY <= 50
  // is the one visually on top at the center, since later images have higher z-index.
  const getDominantImageIndex = (): number => {
    let dominantIndex = 0;
    for (let i = 0; i < images.length; i++) {
      const ty = getImageTransform(i);
      if (ty <= 50) {
        dominantIndex = i;
      }
    }
    return dominantIndex;
  };

  const dominantIndex = getDominantImageIndex();
  const isDarkBackground = imageDarkness.get(dominantIndex) ?? false;
  const visionTextColor = isDarkBackground ? "#f6f4ed" : "#001d4a";

  return (
    <Section id="vision" className="relative !py-0 !m-0">
      {/* Vision Header - Only visible when section is in view, centered on screen */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
        <motion.div
          className="text-center pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 20
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <h2
            id="vision-title"
            data-vision-title="true"
            className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] whitespace-nowrap inline-block relative glitch-flicker"
            style={{
              color: visionTextColor,
              transition: "color 0.5s ease-in-out",
            }}
          >
            Vision
          </h2>
        </motion.div>
      </div>

      {/* Scroll-driven image sections - Stacked panels */}
      {/* First image starts immediately - no gap */}
      <div
        ref={sectionRef}
        className="relative"
        style={{
          height: `${images.length * 100}vh`,
          marginTop: 0,
          paddingTop: 0,
        }}
      >
        {images.map((imageSrc, index) => {
          const translateY = getImageTransform(index);
          const isLoaded = loadedImages.has(imageSrc);
          const isVisible = translateY < 100 && translateY > -100;

          // Diagnostic logging (reduced to avoid CSP issues)
          // Uncomment for debugging if needed
          // if (isInView && index === 0) {
          //   console.log(`Image 0: ${translateY.toFixed(2)}%, Image 1: ${getImageTransform(1).toFixed(2)}%`);
          // }

          return (
            <div
              key={imageSrc}
              className="sticky top-0 w-full"
              style={{
                height: "100vh",
                zIndex: index + 1, // Later images have higher z-index to cover earlier ones
              }}
            >
              <motion.div
                className="relative w-full h-full"
                style={{
                  transform: `translateY(${translateY}%)`,
                  willChange: "transform",
                }}
                transition={{
                  type: "tween",
                  ease: "linear",
                  duration: 0,
                }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-beige">
                      <div className="w-8 h-8 border-2 border-charcoal/20 border-t-charcoal/60 rounded-full animate-spin" />
                    </div>
                  )}
                  <Image
                    src={imageSrc}
                    alt={`Vision ${index + 1}`}
                    fill
                    className="object-cover object-bottom"
                    priority={index === 0}
                    quality={90}
                    sizes="100vw"
                    style={{
                      opacity: isLoaded ? 1 : 0,
                      transition: "opacity 0.3s ease-in-out",
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
