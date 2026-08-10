"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Section from "./Section";
import Image from "next/image";

const BROWN_IMAGES = [
  "/images/Collection/brown1.webp",
  "/images/Collection/brown2.webp",
  "/images/Collection/brown3.webp",
  "/images/Collection/brown4.webp",
];

const BLACK_IMAGES = [
  "/images/Collection/black1.webp",
  "/images/Collection/black2.webp",
  "/images/Collection/black3.webp",
  "/images/Collection/black4.webp",
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

  // Load bookkeeping is driven by next/image's own onLoad. Preloading these via
  // `new window.Image()` fetched the raw 2880px originals — bypassing the image
  // optimizer entirely — and every shot was then downloaded a second time
  // through /_next/image.
  const markLoaded = useCallback((src: string) => {
    setLoadedImages((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));
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
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 20,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          // Faded out it is still a live hit target over every other section
          style={{ pointerEvents: isInView ? "auto" : "none" }}
        >
          <h2
            className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] whitespace-nowrap inline-block relative glitch-flicker"
            style={{ color: "#001d4a", transition: "color 0.5s ease-in-out" }}
          >
            Series 1
          </h2>
        </motion.div>

        {/* Colour flip toggle.
            Positioning lives on this static wrapper: framer-motion writes its
            own `transform` for the entrance animation, which used to wipe out
            the translateX(-50%) centring and shove the control off-screen. */}
        <div className="collection-toggle">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 20,
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ pointerEvents: isInView ? "auto" : "none" }}
          >
            <button
              onClick={toggleColor}
              className="relative flex items-center cursor-pointer select-none"
              aria-label={`Switch to ${selectedColor === "brown" ? "black" : "brown"} boot`}
            >
              {/* The product photography is on a white studio backdrop, so the
                  control is navy-on-white rather than beige-on-dark */}
              <div
                className="relative flex items-center w-[176px] md:w-[188px] rounded-full overflow-hidden"
                style={{
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  background: "rgba(246,244,237,0.55)",
                  border: "1px solid rgba(0,29,74,0.2)",
                }}
              >
                {/* Sliding pill indicator */}
                <motion.div
                  className="absolute top-0 bottom-0 rounded-full"
                  style={{
                    width: "50%",
                    background: "#001d4a",
                    borderRadius: "9999px",
                  }}
                  animate={{ x: selectedColor === "brown" ? "0%" : "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                />

                <span
                  className="relative z-10 flex-1 text-center py-2.5 font-montserrat font-medium text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.3em]"
                  style={{
                    color:
                      selectedColor === "brown"
                        ? "#f6f4ed"
                        : "rgba(0,29,74,0.55)",
                    transition: "color 0.25s ease-in-out",
                  }}
                >
                  Brown
                </span>
                <span
                  className="relative z-10 flex-1 text-center py-2.5 font-montserrat font-medium text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.3em]"
                  style={{
                    color:
                      selectedColor === "black"
                        ? "#f6f4ed"
                        : "rgba(0,29,74,0.55)",
                    transition: "color 0.25s ease-in-out",
                  }}
                >
                  Black
                </span>
              </div>
            </button>
          </motion.div>
        </div>
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
                {/* White ground so the letterboxing on narrow viewports melts
                    into the studio backdrop of the shots themselves */}
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <Image
                    src={src}
                    alt={`Brown boot angle ${index + 1}`}
                    fill
                    className="collection-boot-image object-center"
                    quality={85}
                    sizes="100vw"
                    onLoad={() => markLoaded(src)}
                    style={{
                      opacity: isLoaded && selectedColor === "brown" ? 1 : 0,
                      transition: "opacity 0.6s ease-in-out",
                    }}
                  />
                  <Image
                    src={BLACK_IMAGES[index]}
                    alt={`Black boot angle ${index + 1}`}
                    fill
                    className="collection-boot-image object-center"
                    quality={85}
                    sizes="100vw"
                    onLoad={() => markLoaded(BLACK_IMAGES[index])}
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
