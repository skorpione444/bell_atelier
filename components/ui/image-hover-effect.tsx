"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";
import NextImage from "next/image";

export const ImageHoverEffect = ({
  src,
  alt,
  duration,
  className = "",
  baseColorFilter = "",
}: {
  src: string;
  alt: string;
  duration?: number;
  className?: string;
  baseColorFilter?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const [autoPosition, setAutoPosition] = useState({ cx: "50%", cy: "50%" });
  
  // Generate unique IDs for gradients and masks
  const gradientId = useMemo(() => `imageGradient-${src.replace(/[^a-zA-Z0-9]/g, '')}`, [src]);
  const radialMaskId = useMemo(() => `radialMask-${src.replace(/[^a-zA-Z0-9]/g, '')}`, [src]);

  // Update mask position based on cursor when hovering
  useEffect(() => {
    if (hovered && containerRef.current && cursor.x !== null && cursor.y !== null) {
      const rect = containerRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - rect.left) / rect.width) * 100;
      const cyPercentage = ((cursor.y - rect.top) / rect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor, hovered]);

  // Animate mask position automatically when not hovering
  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        // Create a pattern that covers the ENTIRE logo area - from edges to corners
        const time = Date.now() / 1000;
        const speed = 0.8; // Increased speed for faster movement
        
        const t = time * speed;
        
        // Use Lissajous curves with different frequencies to ensure full coverage
        // This creates patterns that visit all areas including corners
        const freqX = 1;
        const freqY = 3; // Different frequency ratio creates complex patterns
        
        // Large amplitude to reach edges (40% from center = covers 10% to 90%)
        const amplitudeX = 40;
        const amplitudeY = 40;
        
        // Add phase offset for more variation
        const phaseX = 0;
        const phaseY = Math.PI / 4;
        
        const cx = 50 + amplitudeX * Math.sin(freqX * t + phaseX);
        const cy = 50 + amplitudeY * Math.sin(freqY * t + phaseY);
        
        // Clamp to ensure we stay within bounds but reach edges
        const clampedCx = Math.max(5, Math.min(95, cx));
        const clampedCy = Math.max(5, Math.min(95, cy));
        
        setAutoPosition({
          cx: `${clampedCx}%`,
          cy: `${clampedCy}%`,
        });
      }, 30); // Update more frequently for smoother, faster animation

      return () => clearInterval(interval);
    }
  }, [hovered]);

  // Properly encode the src for CSS mask-image
  const encodedSrc = useMemo(() => {
    // Encode spaces and special characters for URL
    return encodeURI(src);
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => {
        if (containerRef.current) {
          setCursor({ x: e.clientX, y: e.clientY });
        }
      }}
    >
      {/* Base image */}
      <div className="relative w-full h-full" style={baseColorFilter ? { filter: baseColorFilter } : {}}>
        <NextImage
          src={src}
          alt={alt}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Gradient overlay - using CSS mask to match logo shape */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          maskImage: `url('${encodedSrc}')`,
          WebkitMaskImage: `url('${encodedSrc}')`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <svg
          ref={svgRef}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Beige gradient matching color palette - always visible */}
            <linearGradient
              id={gradientId}
              gradientUnits="userSpaceOnUse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#F5F1E8" /> {/* bone */}
              <stop offset="25%" stopColor="#E8DCC6" /> {/* sand */}
              <stop offset="50%" stopColor="#D4C4A8" /> {/* beige */}
              <stop offset="75%" stopColor="#C4B299" /> {/* darker beige */}
              <stop offset="100%" stopColor="#B8A68A" /> {/* warm beige */}
            </linearGradient>

            {/* Radial gradient that follows cursor when hovering, or animates automatically when not */}
            <motion.radialGradient
              id={radialMaskId}
              gradientUnits="userSpaceOnUse"
              r={hovered ? "35%" : "60%"}
              initial={{ cx: "50%", cy: "50%" }}
              animate={hovered ? maskPosition : autoPosition}
              transition={hovered 
                ? { duration: duration ?? 0.15, ease: "easeOut" }
                : { duration: 0.2, ease: "easeInOut" }
              }
            >
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="black" stopOpacity="0" />
            </motion.radialGradient>

            {/* Mask for radial reveal */}
            <mask id={`revealMask-${gradientId}`}>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill={`url(#${radialMaskId})`}
              />
            </mask>
          </defs>

          {/* Gradient overlay - always visible where logo is (via CSS mask) */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#${gradientId})`}
            mask={`url(#revealMask-${gradientId})`}
            opacity={1}
            style={{ transition: "opacity 0.3s ease" }}
          />
        </svg>
      </div>
    </div>
  );
};
