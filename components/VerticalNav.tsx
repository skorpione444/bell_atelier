"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function VerticalNav() {
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "vision", label: "Vision", href: "#vision" },
    { id: "philosophy", label: "Philosophy", href: "#philosophy" },
    { id: "collection", label: "Collection", href: "#collection" },
    { id: "atelier", label: "Atelier", href: "#atelier" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <nav className="fixed left-0 top-0 bottom-0 z-50 w-48 flex flex-col" style={{ backgroundColor: '#bcb69a' }}>
      {/* Logo at the top */}
      <div className="pt-6 pb-8 px-6">
        <div className="relative h-12 w-12 md:h-16 md:w-16">
          <Image
            src="/images/bell-logo-blue.png"
            alt="Bell Atelier Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      
      {/* Navigation items centered vertically */}
      <div className="flex flex-col gap-6 px-6 flex-1 justify-center">
        {navItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`group relative flex items-center gap-3 transition-all duration-300 ${
                activeSection === item.id
                  ? "text-charcoal"
                  : "text-charcoal/50 hover:text-charcoal/70"
              }`}
            >
              {/* Active indicator line */}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 w-1 h-6 bg-charcoal"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              {/* Dot indicator */}
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-charcoal scale-150"
                    : "bg-charcoal/30 group-hover:bg-charcoal/50 group-hover:scale-125"
                }`}
              />
              
              {/* Label */}
              <span className="font-sans text-sm uppercase tracking-wider whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </nav>
  );
}

