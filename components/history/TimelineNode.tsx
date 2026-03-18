"use client";

import { motion } from "motion/react";
import ImageHolder from "../ImageHolder";
import { TimelineEvent } from "./historyData";

interface TimelineNodeProps {
  event: TimelineEvent;
  index: number;
  isLeft: boolean;
}

export default function TimelineNode({ event, index, isLeft }: TimelineNodeProps) {
  return (
    <div
      className={`relative flex items-start gap-6 md:gap-10 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* Content */}
      <motion.div
        className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"} text-left`}
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        {/* Year badge */}
        <span
          className="inline-block font-montserrat font-medium text-xs uppercase tracking-[0.2em] px-3 py-1 mb-3 rounded-full"
          style={{
            backgroundColor: "rgba(0, 29, 74, 0.1)",
            color: "#001d4a",
          }}
        >
          {event.year}
        </span>

        <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-2">
          {event.title}
        </h3>

        <p className="font-sans text-sm md:text-base text-charcoal/70 leading-relaxed">
          {event.description}
        </p>

        {event.image && (
          <div className="mt-4 max-w-[280px]">
            <ImageHolder aspectRatio="landscape" className="w-full" />
          </div>
        )}
      </motion.div>

      {/* Center dot */}
      <div className="hidden md:flex flex-shrink-0 items-start justify-center w-4 relative">
        <motion.div
          className="w-4 h-4 rounded-full border-2 mt-2"
          style={{
            borderColor: "#001d4a",
            backgroundColor: "#f6f4ed",
          }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
        />
      </div>

      {/* Spacer for the other side */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}
