"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

interface HeroProps {
  imageSrc?: string;
}

export default function Hero({ imageSrc = "/images/Landing image (1).png" }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [initialLogoTop, setInitialLogoTop] = useState<number | null>(null);
  const [isFixed, setIsFixed] = useState(true);
  const [relativeTop, setRelativeTop] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Track window scroll position
  const { scrollY } = useScroll();

  // Simplified initialization - removed unnecessary interval overhead
  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    
    // Measure position and mark as ready - minimal delay for DOM to settle
    const measureAndReady = () => {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        if (measureRef.current && window.scrollY === 0) {
          const rect = measureRef.current.getBoundingClientRect();
          setInitialLogoTop(rect.top);
        }
        
        // Mark as ready after measurement
        setIsReady(true);
        const currentScroll = window.scrollY;
        setIsFixed(currentScroll < 350);
      });
    };
    
    // Minimal delay - just enough for DOM to be ready
    const timer = setTimeout(measureAndReady, 0);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Capture initial logo position using hidden measurement element (for resize)
  useEffect(() => {
    if (!isReady) return; // Only measure on resize after initial load
    
    const measurePosition = () => {
      if (measureRef.current && window.scrollY === 0) {
        const rect = measureRef.current.getBoundingClientRect();
        setInitialLogoTop(rect.top);
      }
    };
    
    window.addEventListener('resize', measurePosition);
    return () => window.removeEventListener('resize', measurePosition);
  }, [isReady]);
  // Update fixed state and calculate relative position when switching
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only process scroll events after initial delay to prevent positioning bugs
    if (!isReady) return;
    
    const wasFixed = isFixed;
    const nowFixed = latest < 350;
    
    if (wasFixed && !nowFixed && initialLogoTop !== null && heroRef.current) {
      // Switching from fixed to absolute - calculate position to maintain same visual location
      // Logo was fixed at initialLogoTop from viewport top
      // Get hero section's position relative to document at scrollY = 350
      const heroRect = heroRef.current.getBoundingClientRect();
      
      // Logo should appear at initialLogoTop from viewport. Hero's top is at heroRect.top from viewport.
      // So logo should be at: initialLogoTop - heroRect.top relative to hero section
      const logoPositionRelativeToHero = initialLogoTop - heroRect.top;
      setRelativeTop(logoPositionRelativeToHero);
    }
    
    setIsFixed(nowFixed);
  });

  // Text starts fading immediately on scroll, fully disappears by 40% so logo can pass through
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0], {
    clamp: false,
  });
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -30], {
    clamp: false,
  });

  return (
    <div
      ref={heroRef}
      id="home"
      className="relative h-screen w-full overflow-hidden"
      style={{
        position: 'relative',
      }}
    >
      {/* Background image - Using Next.js Image for optimization */}
      <div className="absolute inset-0 w-full h-full z-0">
        {!imageError ? (
          <Image
            src={imageSrc}
            alt="Hero background"
            fill
            priority
            quality={85}
            className="object-cover object-center-bottom"
            sizes="100vw"
            onError={() => {
              console.error("Failed to load hero image:", imageSrc);
              setImageError(true);
            }}
            style={{
              objectPosition: "center bottom",
            }}
          />
        ) : (
          // Fallback background color if image fails to load
          <div className="w-full h-full bg-gradient-to-b from-slate-800 to-slate-900" />
        )}
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/5 pointer-events-none" />
      </div>

      {/* Hidden measurement element - always in relative position to measure initial top */}
      <div 
        ref={measureRef}
        className="relative z-10 flex items-center justify-center pt-4 md:pt-6 lg:pt-8 pointer-events-none opacity-0 absolute"
        aria-hidden="true"
      >
        <div className="relative h-[10.12rem] w-[10.12rem] md:h-[12.65rem] md:w-[12.65rem] lg:h-[15.18rem] lg:w-[15.18rem] flex items-center justify-center -mt-4 md:-mt-6 lg:-mt-8">
          <div className="w-full h-full" />
        </div>
      </div>

      {/* Logo - Fixed in viewport until scrollY 350, then scrolls normally */}
      {/* Only render logo when ready and position is measured */}
      {isReady && initialLogoTop !== null && (
        isFixed ? (
          <motion.div 
            ref={logoRef}
            className="fixed z-40 left-0 right-0 flex items-center justify-center pt-4 md:pt-6 lg:pt-8"
            style={{
              top: initialLogoTop,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative h-[10.12rem] w-[10.12rem] md:h-[12.65rem] md:w-[12.65rem] lg:h-[15.18rem] lg:w-[15.18rem] flex items-center justify-center -mt-4 md:-mt-6 lg:-mt-8">
              <div
                className="logo-shine-container w-full h-full"
                style={{ '--logo-mask': "url('/images/bell_logo_beige.png')" } as React.CSSProperties}
              >
                <Image
                  src="/images/bell_logo_beige.png"
                  alt="Bell Atelier Logo"
                  fill
                  className="object-contain"
                  priority
                />
                <div className="logo-shine-mask">
                  <div className="logo-shine-streak" />
                  <div className="logo-shine-depth" />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            ref={logoRef}
            className="absolute z-40 left-0 right-0 flex items-center justify-center pt-4 md:pt-6 lg:pt-8"
            style={{
              ...(relativeTop !== null ? { top: relativeTop } : {}),
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative h-[10.12rem] w-[10.12rem] md:h-[12.65rem] md:w-[12.65rem] lg:h-[15.18rem] lg:w-[15.18rem] flex items-center justify-center -mt-4 md:-mt-6 lg:-mt-8">
              <div
                className="logo-shine-container w-full h-full"
                style={{ '--logo-mask': "url('/images/bell_logo_beige.png')" } as React.CSSProperties}
              >
                <Image
                  src="/images/bell_logo_beige.png"
                  alt="Bell Atelier Logo"
                  fill
                  className="object-contain"
                  priority
                />
                <div className="logo-shine-mask">
                  <div className="logo-shine-streak" />
                  <div className="logo-shine-depth" />
                </div>
              </div>
            </div>
          </motion.div>
        )
      )}

      {/* Text - tagline - Positioned at bottom, disappears sooner */}
      <div className="absolute left-0 right-0 z-10 flex flex-col items-center pb-8 md:pb-12 lg:pb-16" style={{ bottom: '-35px' }}>
        <motion.p
          className="font-sans text-sm md:text-base tracking-widest uppercase drop-shadow-sm"
          style={{ 
            color: '#bcb69a',
            opacity: textOpacity,
            y: textY,
            letterSpacing: '0.2em',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Crafted for the modern West
        </motion.p>
      </div>
    </div>
  );
}

