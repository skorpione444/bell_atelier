"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to opacity and background changes
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const headerBackground = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["rgba(188, 182, 154, 0)", "rgba(188, 182, 154, 0.95)"]
  );
  const headerBorder = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.1)"]
  );

  const navItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "vision", label: "Vision", href: "#vision" },
    { id: "collection", label: "Collection", href: "#collection" },
    { id: "philosophy", label: "Philosophy", href: "#philosophy" },
    { id: "about", label: "About", href: "#about" },
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
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        opacity: headerOpacity,
        backgroundColor: headerBackground,
        borderBottomWidth: "1px",
        borderBottomColor: headerBorder,
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="#home" onClick={(e) => handleClick(e, "#home")}>
            <div className="relative h-12 w-12 md:h-16 md:w-16">
              <Image
                src="/images/bell-logo-blue.png"
                alt="Bell Atelier Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          
          {/* Navigation items */}
          <nav className="flex items-center gap-4 md:gap-6 lg:gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`group relative flex items-center transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-charcoal"
                      : "text-charcoal/50 hover:text-charcoal/70"
                  }`}
                >
                  {/* Active indicator line */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-charcoal"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  {/* Label */}
                  <span className="font-sans text-sm md:text-base uppercase tracking-wider whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}

