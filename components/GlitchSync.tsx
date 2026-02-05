"use client";

import { useEffect } from "react";

export default function GlitchSync() {
  useEffect(() => {
    const animationDuration = 5000; // 5 seconds
    
    // Set initial shared delay
    const startTime = performance.now();
    const delay = -(startTime % animationDuration) / 1000;
    document.documentElement.style.setProperty("--glitch-sync-delay", `${delay}s`);

    // Sync animations when elements become visible
    const syncOnVisible = () => {
      const headings = document.querySelectorAll(".glitch-flicker");
      if (headings.length < 2) return;

      // Find the first visible heading (vision) and get its animation state
      const visionHeading = Array.from(headings).find((h) => {
        const rect = h.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });

      if (!visionHeading) return;

      const visionAnimations = (visionHeading as HTMLElement).getAnimations();
      if (visionAnimations.length === 0) return;

      const visionAnimation = visionAnimations[0];
      const currentTime = visionAnimation.currentTime || 0;
      const syncTime = currentTime % animationDuration;

      // Apply the same animation time to all other headings
      headings.forEach((heading) => {
        if (heading === visionHeading) return;
        const headingAnimations = (heading as HTMLElement).getAnimations();
        if (headingAnimations.length > 0) {
          headingAnimations[0].currentTime = syncTime;
        }
      });
    };

    // Observe when headings become visible and sync
    const observer = new IntersectionObserver(
      () => {
        setTimeout(syncOnVisible, 50);
      },
      { threshold: 0.1 }
    );

    const headings = document.querySelectorAll(".glitch-flicker");
    headings.forEach((heading) => observer.observe(heading));

    // Also sync periodically to keep them in sync
    const syncInterval = setInterval(syncOnVisible, 200);

    return () => {
      observer.disconnect();
      clearInterval(syncInterval);
    };
  }, []);

  return null;
}

