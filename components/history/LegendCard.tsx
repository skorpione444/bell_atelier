"use client";

import { motion } from "motion/react";
import ImageHolder from "../ImageHolder";
import { LegendFigure } from "./historyData";

interface LegendCardProps {
  figure: LegendFigure;
  index: number;
}

export default function LegendCard({ figure, index }: LegendCardProps) {
  return (
    <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Portrait placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <ImageHolder
            src={figure.image}
            alt={`Portrait of ${figure.name}`}
            aspectRatio="portrait"
            className="w-full max-w-md mx-auto"
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span
            className="font-montserrat font-medium text-[0.6rem] uppercase tracking-[0.3em]"
            style={{ color: "#001d4a" }}
          >
            {figure.nickname}
          </span>

          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal">
            {figure.name}
          </h3>

          <p className="font-montserrat text-xs uppercase tracking-[0.2em] text-charcoal/50">
            {figure.years}
          </p>

          <p className="font-sans text-base md:text-lg text-charcoal/80 leading-relaxed">
            {figure.bio}
          </p>

          {/* Quote */}
          <blockquote
            className="font-serif italic text-lg md:text-xl text-charcoal/70 pl-4"
            style={{ borderLeft: "2px solid #001d4a" }}
          >
            &ldquo;{figure.quote}&rdquo;
          </blockquote>
        </motion.div>
      </div>
    </div>
  );
}
