"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Samples the pixel brightness of an <img> at a given screen point,
 * accounting for object-fit: cover and object-position.
 * Returns true if dark, false if light, null if sampling failed.
 */
function sampleImageAtScreenPoint(
  img: HTMLImageElement,
  screenX: number,
  screenY: number
): boolean | null {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const rect = img.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const elAspect = rect.width / rect.height;

    let renderWidth: number, renderHeight: number;
    if (imgAspect > elAspect) {
      // Image wider than container – height fills, width overflows
      renderHeight = rect.height;
      renderWidth = rect.height * imgAspect;
    } else {
      // Image taller than container – width fills, height overflows
      renderWidth = rect.width;
      renderHeight = rect.width / imgAspect;
    }

    // Parse object-position (computed value, e.g. "50% 50%" or "50% 100%")
    const objPos = getComputedStyle(img).objectPosition || "50% 50%";
    const posParts = objPos.split(/\s+/);
    const posX = parseFloat(posParts[0]) / 100 || 0.5;
    const posY = parseFloat(posParts[1] || posParts[0]) / 100 || 0.5;

    const offsetX = (renderWidth - rect.width) * posX;
    const offsetY = (renderHeight - rect.height) * posY;

    // Map screen coordinates → image natural coordinates
    const relX = screenX - rect.left + offsetX;
    const relY = screenY - rect.top + offsetY;
    const imgX = (relX / renderWidth) * img.naturalWidth;
    const imgY = (relY / renderHeight) * img.naturalHeight;

    const sampleSize = 20;
    canvas.width = sampleSize;
    canvas.height = sampleSize;

    const srcX = Math.max(
      0,
      Math.min(img.naturalWidth - sampleSize, imgX - sampleSize / 2)
    );
    const srcY = Math.max(
      0,
      Math.min(img.naturalHeight - sampleSize, imgY - sampleSize / 2)
    );

    ctx.drawImage(
      img,
      srcX,
      srcY,
      sampleSize,
      sampleSize,
      0,
      0,
      sampleSize,
      sampleSize
    );

    const data = ctx.getImageData(0, 0, sampleSize, sampleSize).data;
    let totalBrightness = 0;
    const pixelCount = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
      totalBrightness +=
        data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    }

    return totalBrightness / pixelCount < 128;
  } catch {
    return null;
  }
}

/**
 * Determines if an rgb/rgba color string represents a dark color.
 */
function isColorStringDark(color: string): boolean {
  const match = color.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return false;
  const brightness =
    parseInt(match[1]) * 0.299 +
    parseInt(match[2]) * 0.587 +
    parseInt(match[3]) * 0.114;
  return brightness < 128;
}

/**
 * Samples the brightness of whatever is rendered at a given screen point.
 * Skips the header itself so we only inspect what's behind it.
 * Returns true if the background is dark (needs light / beige text).
 */
function sampleBrightnessAtPoint(
  screenX: number,
  screenY: number
): boolean {
  try {
    const elements = document.elementsFromPoint(screenX, screenY);

    for (const el of elements) {
      // Skip header and its children – we want what's BEHIND it
      if (el.closest("header")) continue;
      // Skip the fixed vision title overlay
      if ((el as HTMLElement).dataset?.visionTitle) continue;

      // Check for <img> elements (hero, vision images, etc.)
      if (el.tagName === "IMG") {
        const img = el as HTMLImageElement;
        if (img.complete && img.naturalWidth > 0) {
          const result = sampleImageAtScreenPoint(img, screenX, screenY);
          if (result !== null) return result;
        }
      }

      // Check for a solid background color
      const bg = getComputedStyle(el).backgroundColor;
      if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
        return isColorStringDark(bg);
      }
    }
  } catch {
    // Fallback: assume light background
  }
  return false;
}

export default function Header() {
  // Starts on "home" for both renders — the pathname effect below corrects it,
  // so the server and client markup agree.
  const [activeSection, setActiveSection] = useState("home");
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [maskPosition, setMaskPosition] = useState(100); // Percentage from top (100 = all blue)
  const hasEnteredVisionRef = useRef(false); // Track if logo has ever entered vision section
  const isDarkBgRef = useRef(false); // Avoid stale closures in scroll handler
  const [isDarkBg, setIsDarkBg] = useState(false); // Whether the nav sits on a dark background
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const router = useRouter();
  
  // Transform scroll progress to opacity
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  const navItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "vision", label: "Vision", href: "#vision" },
    { id: "collection", label: "Collection", href: "#collection" },
    { id: "philosophy", label: "Philosophy", href: "#philosophy" },
    { id: "about", label: "About", href: "#about" },
    { id: "history", label: "History", href: "/history" },
  ];

  useEffect(() => {
    let ticking = false;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
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

          // Sample background brightness behind the nav (top-right area)
          if (navRef.current) {
            const navRect = navRef.current.getBoundingClientRect();
            // Sample at the horizontal center of the nav, vertically centered
            const sampleX = navRect.left + navRect.width / 2;
            const sampleY = navRect.top + navRect.height / 2;
            const dark = sampleBrightnessAtPoint(sampleX, sampleY);
            if (dark !== isDarkBgRef.current) {
              isDarkBgRef.current = dark;
              setIsDarkBg(dark);
            }
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set active section based on pathname for page routes
  useEffect(() => {
    if (pathname === "/history") {
      setActiveSection("history");
    }
  }, [pathname]);

  // Hold the page still behind the mobile menu, and let Escape dismiss it
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // Drop the menu if the viewport grows into the inline nav layout
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMenuOpen(false);
    };
    desktop.addEventListener("change", handleChange);
    return () => desktop.removeEventListener("change", handleChange);
  }, []);

  // Handle scrolling to section when navigating from another page with hash
  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace("#", "");
        // Wait for page to fully load before scrolling
        setTimeout(() => {
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
        }, 100);
      }
    }
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a page link (starts with /), let normal navigation happen
    if (href.startsWith("/")) {
      e.preventDefault();
      router.push(href);
      return;
    }

    e.preventDefault();
    const targetId = href.replace("#", "");

    // If we're not on the home page, navigate to home page with hash
    if (pathname !== "/") {
      // Use window.location for reliable hash navigation across pages
      window.location.href = `/${href}`;
      return;
    }

    // If we're on the home page, scroll to the section
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

  // Same navigation, but the curtain has to come down before the page moves —
  // the body is scroll-locked while the menu is open.
  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);

    window.setTimeout(() => {
      if (href.startsWith("/")) {
        router.push(href);
        return;
      }

      if (pathname !== "/") {
        window.location.href = `/${href}`;
        return;
      }

      const element = document.getElementById(href.replace("#", ""));
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        window.scrollTo({
          top: elementPosition + window.pageYOffset - headerOffset,
          behavior: "smooth",
        });
      }
    }, 420);
  };

  // Create dynamic mask gradient for portal effect
  // Reveals beige logo from bottom to top as it enters vision section
  // maskPosition: 100 = all blue (beige hidden), 0 = all beige (beige visible)
  // Everything below the transition point should be fully beige
  // The open menu is navy, so the blue mark would vanish into it — force the
  // beige mark for as long as the curtain is down.
  const effectiveMaskPosition = isMenuOpen ? 0 : maskPosition;
  const transitionZone = 3; // Small transition zone for smooth edge
  const maskGradient = `linear-gradient(to bottom,
    transparent 0%,
    transparent ${Math.max(0, effectiveMaskPosition - transitionZone)}%,
    black ${Math.max(0, effectiveMaskPosition - transitionZone)}%,
    black 100%
  )`;

  // Nav chrome sits on beige, on photography, or on the open navy curtain
  const chromeColor = isMenuOpen || isDarkBg ? "#f6f4ed" : "#001d4a";

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[80]"
      style={{
        opacity: isMenuOpen ? 1 : headerOpacity,
        backgroundColor: "transparent",
      }}
    >
      <div className="relative z-20 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo with portal transition effect */}
          <Link
            href="#home"
            onClick={(e) =>
              isMenuOpen ? handleMenuClick(e, "#home") : handleClick(e, "#home")
            }
          >
            <div
              ref={logoRef}
              className="relative w-auto h-[104px] md:h-[102px] ml-[-6px] md:ml-[-20px] mt-[30px] md:mt-[40px] glitch-flicker"
            >
              {/* Blue logo (base layer) */}
              <Image
                src="/images/bell_vertical_filled.webp"
                alt="Bell Atelier Logo"
                width={77}
                height={102}
                className="object-contain h-full w-auto"
                style={{
                  transform: 'translateZ(0)',
                  opacity: effectiveMaskPosition === 0 ? 0 : 1,
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
                  src="/images/bell_vertical_filled_beige.webp"
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
          
          {/* Navigation — inline from lg up, curtain menu below that.
              Six wide-tracked labels need ~660px, which no phone or portrait
              tablet has; forcing them inline is what pushed the page sideways. */}
          <motion.div
            ref={navRef}
            className="flex items-center"
            animate={{
              opacity: isNavVisible || isMenuOpen ? 1 : 0,
              y: isNavVisible || isMenuOpen ? 0 : -20,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            style={{
              pointerEvents: isNavVisible || isMenuOpen ? "auto" : "none",
            }}
          >
          <nav className="hidden lg:flex items-center gap-8">
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
                    color: isDarkBg ? "#f6f4ed" : "#001d4a",
                    transition: "color 0.5s ease-in-out",
                  }}
                >
                  {/* Active indicator line */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5"
                      style={{
                        backgroundColor: isDarkBg ? "#f6f4ed" : "#001d4a",
                        transition: "background-color 0.5s ease-in-out",
                      }}
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
          </nav>

            {/* Menu trigger — two rules that fold into a cross */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden -mr-2 flex h-12 w-12 items-center justify-center"
            >
              <span className="relative block h-4 w-6">
                <motion.span
                  className="absolute left-0 top-[4px] block h-[1.5px] w-full"
                  style={{ backgroundColor: chromeColor }}
                  animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 4 : 0 }}
                  transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.span
                  className="absolute left-0 top-[12px] block h-[1.5px] w-full"
                  style={{ backgroundColor: chromeColor }}
                  animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -4 : 0 }}
                  transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                />
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu — a navy curtain drawn down over the page */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="lg:hidden fixed inset-0 z-10 grain-overlay-dark overflow-y-auto overscroll-contain"
            style={{ backgroundColor: "#001d4a" }}
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* pt clears the logo, which overhangs the header bar */}
            <div className="relative z-10 flex min-h-full flex-col justify-between px-8 pb-10 pt-36 sm:px-12">
              <nav className="flex flex-col">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
                    transition={{
                      duration: 0.5,
                      delay: 0.18 + index * 0.06,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleMenuClick(e, item.href)}
                      className="flex items-baseline gap-5 py-[2.6vh] min-h-[46px]"
                      style={{
                        borderBottom: "1px solid rgba(246, 244, 237, 0.12)",
                      }}
                    >
                      <span
                        className="font-montserrat font-medium text-[0.5rem] uppercase tracking-[0.3em]"
                        style={{ color: "#bcb69a" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="font-serif text-[1.9rem] leading-none sm:text-[2.25rem]"
                        style={{
                          color:
                            activeSection === item.id
                              ? "#f6f4ed"
                              : "rgba(246, 244, 237, 0.6)",
                          transition: "color 0.3s ease-in-out",
                        }}
                      >
                        {item.label}
                      </span>
                      {activeSection === item.id && (
                        <motion.span
                          layoutId="menuActiveDot"
                          className="ml-auto block h-1.5 w-1.5 rounded-full self-center"
                          style={{ backgroundColor: "#bcb69a" }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-end justify-between gap-6"
              >
                <p
                  className="font-montserrat font-medium text-[0.5rem] uppercase tracking-[0.3em] leading-relaxed"
                  style={{ color: "rgba(246, 244, 237, 0.35)" }}
                >
                  Crafted for the
                  <br />
                  modern West
                </p>
                <a
                  href="https://www.instagram.com/bellatelier.studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-montserrat font-medium text-[0.5rem] uppercase tracking-[0.3em] pb-1"
                  style={{
                    color: "#bcb69a",
                    borderBottom: "1px solid rgba(188, 182, 154, 0.4)",
                  }}
                >
                  Instagram
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

