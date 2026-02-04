"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ImageHolderProps {
  src?: string;
  alt?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "wide";
  className?: string;
}

const aspectRatioClasses = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

export default function ImageHolder({
  src,
  alt = "",
  aspectRatio = "portrait",
  className = "",
}: ImageHolderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`${aspectRatioClasses[aspectRatio]} ${className} relative overflow-hidden bg-sand grain-overlay`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {src ? (
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          animate={{
            opacity: isHovered ? 0.95 : 1,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-sand via-beige to-sand/50" />
      )}
    </motion.div>
  );
}

