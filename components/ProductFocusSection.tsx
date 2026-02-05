"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import ImageHolder from "./ImageHolder";
import Section from "./Section";

export default function ProductFocusSection() {
  const boots = [
    { id: 1, caption: "SERIES 1", href: "/series-1" },
    { id: 2, caption: "SERIES 2", href: "/series-2" },
  ];

  return (
    <Section id="collection" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Subtle section title */}
        <motion.div
          className="mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] whitespace-nowrap inline-block relative glitch-flicker"
            style={{
              color: "#001d4a"
            }}
          >
            Collection
          </h2>
        </motion.div>

        {/* Two cards with image in between for larger screens */}
        <div className="hidden md:flex justify-center items-center gap-16 mt-[30px] pb-8">
          {/* SERIES 1 Card */}
          <Link href={boots[0].href} className="flex-shrink-0 w-[400px] cursor-pointer">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              whileHover={{ scale: 1.02 }}
              className="transition-transform duration-300"
            >
              <ImageHolder aspectRatio="portrait" />
              <p className="mt-6 font-sans text-sm text-charcoal/60 tracking-wide uppercase text-center">
                {boots[0].caption}
              </p>
            </motion.div>
          </Link>

          {/* Image in between */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Image
              src="/images/transparent_rider_branded.png"
              alt="Rider Branded"
              width={400}
              height={400}
              className="object-contain"
              style={{ maxWidth: "400px", height: "auto" }}
            />
          </motion.div>

          {/* SERIES 2 Card */}
          <Link href={boots[1].href} className="flex-shrink-0 w-[400px] cursor-pointer">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="transition-transform duration-300"
            >
              <ImageHolder aspectRatio="portrait" />
              <p className="mt-6 font-sans text-sm text-charcoal/60 tracking-wide uppercase text-center">
                {boots[1].caption}
              </p>
            </motion.div>
          </Link>
        </div>

        {/* Vertical staggered layout for mobile */}
        <div className="md:hidden grid grid-cols-1 gap-12 mt-[30px]">
          {/* SERIES 1 Card */}
          <Link href={boots[0].href} className="cursor-pointer">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              whileHover={{ scale: 1.02 }}
              className="transition-transform duration-300"
            >
              <ImageHolder aspectRatio="portrait" />
              <p className="mt-6 font-sans text-sm text-charcoal/60 tracking-wide uppercase text-center">
                {boots[0].caption}
              </p>
            </motion.div>
          </Link>

          {/* Image in between */}
          <motion.div
            className="flex items-center justify-center py-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Image
              src="/images/transparent_rider_branded.png"
              alt="Rider Branded"
              width={300}
              height={300}
              className="object-contain"
              style={{ maxWidth: "300px", height: "auto" }}
            />
          </motion.div>

          {/* SERIES 2 Card */}
          <Link href={boots[1].href} className="cursor-pointer">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="transition-transform duration-300"
            >
              <ImageHolder aspectRatio="portrait" />
              <p className="mt-6 font-sans text-sm text-charcoal/60 tracking-wide uppercase text-center">
                {boots[1].caption}
              </p>
            </motion.div>
          </Link>
        </div>
      </div>
    </Section>
  );
}

