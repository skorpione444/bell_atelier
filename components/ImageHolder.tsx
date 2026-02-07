"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
        <motion.div
          className="relative w-full h-full"
          animate={{
            opacity: isHovered ? 0.95 : 1,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-sand via-beige to-sand/50" />
      )}
    </motion.div>
  );
}



