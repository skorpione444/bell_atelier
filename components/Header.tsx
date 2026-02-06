"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const logoRef = useRef<HTMLDivElement>(null);
  const [maskPosition, setMaskPosition] = useState(100); // Percentage from top (100 = all blue)
  const hasEnteredVisionRef = useRef(false); // Track if logo has ever entered vision section
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

      // Calculate mask position for portal effect
      if (logoRef.current) {
        const logoRect = logoRef.current.getBoundingClientRect();
        const visionSection = document.getElementById("vision");
        
        if (visionSection) {
          const visionRect = visionSection.getBoundingClientRect();
          const logoBottom = logoRect.bottom;
          const logoTop = logoRect.top;
          const visionTop = visionRect.top;
          
          // Calculate how much of the logo has entered the vision section
          if (logoBottom <= visionTop) {
            // Logo is completely above vision section - all blue
            hasEnteredVisionRef.current = false; // Reset when scrolling back up
            setMaskPosition(100);
          } else if (logoTop >= visionTop) {
            // Logo's top has crossed into vision section - all beige (stays beige)
            hasEnteredVisionRef.current = true;
            setMaskPosition(0);
          } else if (logoBottom > visionTop) {
            // Logo is partially in vision section - calculate transition
            hasEnteredVisionRef.current = true;
            // Only the bottom part is in vision section
            const logoHeight = logoRect.height;
            const overlap = logoBottom - visionTop;
            const percentageInVision = (overlap / logoHeight) * 100;
            // maskPosition represents where the gradient transition starts from top
            // 100 = all blue, 0 = all beige
            setMaskPosition(Math.max(0, 100 - percentageInVision));
          }
        } else {
          // Vision section not found, keep it blue
          setMaskPosition(100);
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

  // Create dynamic mask gradient for portal effect
  // Reveals beige logo from bottom to top as it enters vision section
  // maskPosition: 100 = all blue (beige hidden), 0 = all beige (beige visible)
  // Everything below the transition point should be fully beige
  const transitionZone = 3; // Small transition zone for smooth edge
  const maskGradient = `linear-gradient(to bottom, 
    transparent 0%, 
    transparent ${Math.max(0, maskPosition - transitionZone)}%, 
    black ${Math.max(0, maskPosition - transitionZone)}%, 
    black 100%
  )`;

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
          {/* Logo with portal transition effect */}
          <Link href="#home" onClick={(e) => handleClick(e, "#home")}>
            <div 
              ref={logoRef}
              className="relative w-auto h-[77px] md:h-[102px] glitch-flicker" 
              style={{ marginLeft: '-20px', marginTop: '40px' }}
            >
              {/* Blue logo (base layer) */}
              <Image
                src="/images/bell_vertical_filled.png"
                alt="Bell Atelier Logo"
                width={77}
                height={102}
                className="object-contain h-full w-auto"
                style={{ 
                  transform: 'translateZ(0)',
                  opacity: maskPosition === 0 ? 0 : 1,
                  width: '100%',
                  height: '100%',
                }}
                priority
              />
              
              {/* Beige logo (masked layer - covers entire logo, reveals from bottom as it enters vision section) */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  maskImage: maskGradient,
                  WebkitMaskImage: maskGradient,
                  maskSize: '100% 100%',
                  WebkitMaskSize: '100% 100%',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                  width: '100%',
                  height: '100%',
                  transform: 'translateZ(0)',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <Image
                  src="/images/bell_vertical_filled_beige.png"
                  alt="Bell Atelier Logo"
                  width={77}
                  height={102}
                  className="object-contain h-full w-auto"
                  style={{ 
                    transform: 'translateZ(0)',
                    width: '100%',
                    height: '100%',
                  }}
                  priority
                />
              </div>
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

