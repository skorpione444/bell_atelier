"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}: {
  images: string[];
  children?: React.ReactNode;
  overlay?: boolean | React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [directionState, setDirectionState] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [imageDimensions, setImageDimensions] = useState<Map<string, { width: number; height: number }>>(new Map());
  const [isAutoplayActive, setIsAutoplayActive] = useState(autoplay);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);

  // Calculate next index for preloading
  const nextIndex = direction === "up" 
    ? (currentIndex + 1) % images.length
    : (currentIndex - 1 + images.length) % images.length;

  // Preload next image using native img element
  useEffect(() => {
    if (typeof window !== 'undefined' && images[nextIndex] && !loadedImages.has(images[nextIndex])) {
      const img = new window.Image();
      img.src = images[nextIndex];
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(images[nextIndex]));
      };
    }
  }, [nextIndex, images, loadedImages]);

  // Navigate to next/previous image
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIdx = direction === "up" 
        ? (prevIndex + 1) % images.length
        : (prevIndex - 1 + images.length) % images.length;
      setDirectionState(direction === "up" ? 1 : -1);
      return nextIdx;
    });
  }, [direction, images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const prevIdx = direction === "up"
        ? (prevIndex - 1 + images.length) % images.length
        : (prevIndex + 1) % images.length;
      setDirectionState(direction === "up" ? -1 : 1);
      return prevIdx;
    });
  }, [direction, images.length]);

  // Handle manual navigation (pause autoplay, resume after 4 seconds)
  const handleManualNavigation = useCallback(() => {
    setIsAutoplayActive(false);
    setIsLoading(true);
    
    // Resume autoplay after 4 seconds of inactivity
    setTimeout(() => {
      if (autoplay) {
        setIsAutoplayActive(true);
      }
    }, 4000);
  }, [autoplay]);

  // Auto-play effect
  useEffect(() => {
    if (isAutoplayActive && autoplay) {
      const interval = setInterval(() => {
        goToNext();
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoplayActive, autoplay, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
        handleManualNavigation();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
        handleManualNavigation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious, handleManualNavigation]);

  // Touch/swipe handlers
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndRef.current = null;
    touchStartRef.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndRef.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const distanceX = touchStartRef.current.x - touchEndRef.current.x;
    const distanceY = touchStartRef.current.y - touchEndRef.current.y;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX);

    // Only handle horizontal swipes
    if (!isVerticalSwipe) {
      if (isLeftSwipe) {
        goToNext();
        handleManualNavigation();
      } else if (isRightSwipe) {
        goToPrevious();
        handleManualNavigation();
      }
    }
  }, [goToNext, goToPrevious, handleManualNavigation]);

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      zIndex: 0,
    }),
    center: {
      zIndex: 1,
      opacity: 1,
    },
    exit: (direction: number) => ({
      opacity: 0,
      zIndex: 0,
    }),
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const src = img.src;
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    
    // Store dimensions using the original image path (currentImage) as key
    const currentImagePath = images[currentIndex];
    setImageDimensions(prev => new Map(prev).set(currentImagePath, { width, height }));
    setLoadedImages(prev => new Set(prev).add(currentImagePath));
    setIsLoading(false);
  };

  const handleImageError = (src: string) => {
    setImageErrors(prev => new Set(prev).add(src));
  };

  const currentImage = images[currentIndex];
  const isImageLoaded = loadedImages.has(currentImage);
  const hasImageError = imageErrors.has(currentImage);
  const currentImageDimensions = imageDimensions.get(currentImage);
  const isVertical = currentImageDimensions 
    ? currentImageDimensions.height > currentImageDimensions.width 
    : false;
  
  // Check if image needs cropping
  const needsTopCrop = currentImage.includes('ll (5).png');
  const needsRightCrop = currentImage.includes('Pitch Deck - BELL.png') && !currentImage.includes('Pitch Deck - BELL (1).png');
  const needsTopBottomCrop = currentImage.includes('Pitch Deck - BELL (1).png');
  
  // Base scale for all images (previous: 0.837, additional 15% reduction = 0.837 * 0.85 = 0.711)
  const baseScale = 0.9 * 0.93 * 0.85; // 0.711 (28.9% total reduction)
  
  // Calculate final scale based on image type
  const getImageScale = () => {
    if (isVertical) {
      return baseScale * 0.8; // Vertical images: 0.711 * 0.8 = 0.569
    }
    if (needsTopCrop) {
      return baseScale * 1.15; // Top crop: 0.711 * 1.15 = 0.818 (to compensate for 15% crop)
    }
    if (needsRightCrop) {
      return baseScale * 1.2; // Right crop: 0.711 * 1.2 = 0.853 (to compensate for 20% crop)
    }
    if (needsTopBottomCrop) {
      return baseScale * 1.16; // Top/bottom crop: 0.711 * 1.16 = 0.825 (to compensate for 8% top + 8% bottom crop)
    }
    return baseScale; // Regular images: 0.711
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full h-full flex items-center justify-center",
        className
      )}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Only render current image */}
      <AnimatePresence custom={directionState}>
        <motion.div
          key={currentImage}
          custom={directionState}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 1.2, ease: "easeInOut" },
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          <div className="relative w-full h-full max-w-full max-h-full flex items-center justify-center p-4 overflow-hidden">
            {isLoading && currentIndex === 0 && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-8 h-8 border-2 border-charcoal/20 border-t-charcoal/60 rounded-full animate-spin" />
              </div>
            )}
            {!hasImageError ? (
              <img
                src={currentImage}
                alt={`Slide ${currentIndex + 1}`}
                className={`object-contain w-full h-full max-w-full max-h-full transition-opacity duration-300 ${
                  isLoading && currentIndex === 0 ? 'opacity-0' : 'opacity-100'
                }`}
                style={{ 
                  objectFit: "contain",
                  objectPosition: needsTopCrop ? 'center' : needsRightCrop ? 'left center' : needsTopBottomCrop ? 'center' : 'center',
                  transform: `scale(${getImageScale()})`,
                  transformOrigin: 'center',
                  clipPath: needsTopCrop ? 'inset(15% 0 0 0)' : needsRightCrop ? 'inset(0 20% 0 0)' : needsTopBottomCrop ? 'inset(8% 0 8% 0)' : 'none',
                  transition: 'transform 0.3s ease, clip-path 0.3s ease'
                }}
                onLoad={handleImageLoad}
                onError={() => {
                  handleImageError(currentImage);
                  setIsLoading(false);
                }}
                loading={currentIndex === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-charcoal/40">
                <p>Image failed to load</p>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Custom overlay */}
      {overlay && typeof overlay !== "boolean" && (
        <div
          className={cn(
            "absolute inset-0 z-40 pointer-events-none",
            overlayClassName
          )}
        >
          {overlay}
        </div>
      )}

      {/* Children content */}
      {children && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          {children}
        </div>
      )}

      {/* Elegant dots indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 flex gap-2 pointer-events-none">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-all duration-500 pointer-events-auto",
              idx === currentIndex
                ? "bg-white w-8"
                : "bg-white/40 hover:bg-white/60"
            )}
            onClick={() => {
              setDirectionState(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
              handleManualNavigation();
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

