"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Section from "./Section";

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Section id="contact" className="border-t border-charcoal/10 py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/bell_logo_beige.png"
              alt="Bell Atelier"
              width={150}
              height={50}
              className="h-auto w-auto max-w-[100px] md:max-w-[125px]"
              quality={100}
            />
          </motion.div>

          {/* Navigation links */}
          <motion.nav 
            className="flex flex-wrap gap-6 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Link
              href="#home"
              onClick={(e) => handleClick(e, "#home")}
              className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] text-charcoal/70 hover:text-charcoal transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="#vision"
              onClick={(e) => handleClick(e, "#vision")}
              className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] text-charcoal/70 hover:text-charcoal transition-colors duration-300"
            >
              Vision
            </Link>
            <Link
              href="#collection"
              onClick={(e) => handleClick(e, "#collection")}
              className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] text-charcoal/70 hover:text-charcoal transition-colors duration-300"
            >
              Collection
            </Link>
            <Link
              href="#philosophy"
              onClick={(e) => handleClick(e, "#philosophy")}
              className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] text-charcoal/70 hover:text-charcoal transition-colors duration-300"
            >
              Philosophy
            </Link>
            <Link
              href="#about"
              onClick={(e) => handleClick(e, "#about")}
              className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] text-charcoal/70 hover:text-charcoal transition-colors duration-300"
            >
              About
            </Link>
          </motion.nav>

          {/* Social links */}
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a
              href="https://www.instagram.com/bellatelier.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] text-charcoal/50 hover:text-charcoal/70 transition-colors duration-300"
            >
              Instagram
            </a>
            <span className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] text-charcoal/50">
              Twitter
            </span>
          </motion.div>
        </div>

        <motion.div 
          className="mt-8 pt-8 border-t border-charcoal/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] text-charcoal/40 text-center">
            © {new Date().getFullYear()} Bell Atelier. All rights reserved.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

