"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to opacity
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  const navItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "vision", label: "Vision", href: "#vision" },
    { id: "collection", label: "Collection", href: "#collection" },
    { id: "philosophy", label: "Philosophy", href: "#philosophy" },
    { id: "about", label: "About", href: "#about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const sections = navItems.map((item) => item.id);
      const scrollPosition = currentScrollY + 200; // Offset for better detection

      // Determine scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down - hide nav
        setIsNavVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up - show nav
        setIsNavVisible(true);
      }

      // Update active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
        backgroundColor: "transparent",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="#home" onClick={(e) => handleClick(e, "#home")}>
            <div className="relative w-auto h-[77px] md:h-[102px] glitch-flicker" style={{ marginLeft: '-20px', marginTop: '40px' }}>
              <Image
                src="/images/bell_vertical_filled.png"
                alt="Bell Atelier Logo"
                width={77}
                height={102}
                className="object-contain h-full w-auto"
                priority
              />
            </div>
          </Link>
          
          {/* Navigation items */}
          <motion.nav 
            className="flex items-center gap-4 md:gap-6 lg:gap-8"
            animate={{
              opacity: isNavVisible ? 1 : 0,
              y: isNavVisible ? 0 : -20,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            style={{
              pointerEvents: isNavVisible ? "auto" : "none",
            }}
          >
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
                      ? ""
                      : "opacity-50 hover:opacity-70"
                  }`}
                  style={{
                    color: "#697a87"
                  }}
                >
                  {/* Active indicator line */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5"
                      style={{ backgroundColor: "#697a87" }}
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  {/* Label */}
                  <motion.span 
                    className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] whitespace-nowrap inline-block"
                    whileHover="hover"
                    initial="rest"
                  >
                    {item.label.split('').map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        className="inline-block"
                        variants={{
                          rest: { x: 0, opacity: 1 },
                          hover: { 
                            x: [0, -15, 0],
                            opacity: [1, 0.7, 1],
                            transition: { 
                              duration: 0.5,
                              delay: charIndex * 0.04,
                              ease: "easeInOut"
                            }
                          }
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        </div>
      </div>
    </motion.header>
  );
}

