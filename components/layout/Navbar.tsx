// components/layout/Navbar.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X, Instagram, Facebook, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState({ x: 350, y: 40 });
  const [bubbleScale, setBubbleScale] = useState(65);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    setMounted(true);
    if (menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setMenuOrigin({
        x: Math.round(rect.left + rect.width / 2),
        y: Math.round(rect.top + rect.height / 2),
      });
    }
  }, []);

  const triggerHapticFeedback = () => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(15);
    }
  };

  const handleOpenMenu = () => {
    let x = typeof window !== 'undefined' ? window.innerWidth - 44 : 350;
    let y = 40;
    if (menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      x = Math.round(rect.left + rect.width / 2);
      y = Math.round(rect.top + rect.height / 2);
    }
    setMenuOrigin({ x, y });

    // Calculate exact scale factor needed to cover the entire screen from (x, y)
    if (typeof window !== 'undefined') {
      const maxCornerDist = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      // Base circle radius is 28px (diameter 56px). Add 12% safety margin to ensure full coverage
      const targetScale = Math.ceil((maxCornerDist / 28) * 1.12);
      setBubbleScale(targetScale);
    }

    triggerHapticFeedback();
    setMobileMenuOpen(true);
  };

  const handleCloseMenu = () => {
    triggerHapticFeedback();
    setMobileMenuOpen(false);
  };

  // ─── Scroll shrink via CSS data-attribute ─────────────────────────────────
  // Instead of running Framer Motion tween every scroll event (which triggers
  // a React re-render + new animation), we flip a data-attribute on the <nav>
  // and let CSS transitions handle the visual change — zero JS overhead.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 50;
        nav.setAttribute('data-scrolled', String(scrolled));
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // ─────────────────────────────────────────────────────────────────────────

  // Intersection Observer to highlight active sections on scroll
  useEffect(() => {
    const sections = ['about', 'projects', 'skills', 'education', 'contact'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-30% 0px -40% 0px' }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Education', id: 'education' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerHapticFeedback();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('');
  };

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    triggerHapticFeedback();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Dispatch event when mobile menu opens/closes so background WebGL shaders pause,
  // and lock background scrolling without desktop layout shift
  useEffect(() => {
    if (mobileMenuOpen) {
      window.dispatchEvent(new CustomEvent('portfolio:menu-toggle', { detail: { open: true } }));
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const originalPaddingRight = document.body.style.paddingRight;

      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      return () => {
        window.dispatchEvent(new CustomEvent('portfolio:menu-toggle', { detail: { open: false } }));
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [mobileMenuOpen]);

  const bgSolid = '#06080E';

  const linkContainerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.12,
        ease: 'easeOut',
      },
    },
  };

  const linkVariants: any = {
    hidden: {
      y: 12,
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.15,
        ease: 'easeIn',
      },
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.24,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <>
      {/*
       * CSS-driven navbar shrink — no JS animation, no re-renders.
       * data-scrolled="true"  → compact pill styles via CSS
       * data-scrolled="false" → expanded pill styles via CSS
       */}
      <nav
        ref={navRef}
        id="main-navbar"
        data-scrolled="false"
        className="navbar-pill fixed top-4 md:top-6 left-1/2 z-50 rounded-full border flex items-center justify-between overflow-hidden navbar-blur"
      >
        {/* Liquid Glass Highlight Sweep — CSS only, zero JS overhead */}
        <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
          <div className="navbar-sweep w-2/3 h-full bg-gradient-to-r from-transparent via-white/18 to-transparent skew-x-12" />
        </div>
        {/* Top Specular Rim along the navbar pill curve */}
        <div
          className="absolute inset-x-8 top-0 h-[1px] pointer-events-none z-10"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.75) 50%, transparent 100%)',
          }}
        />

        {/* Left Side: Logo */}
        <a
          id="navbar-logo"
          href="#"
          onClick={handleLogoClick}
          className="relative flex items-center justify-center select-none cursor-pointer group py-0.5"
          aria-label="Home"
        >
          <img
            src="/logo.png"
            alt="Shabab Ahmed"
            className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(255,255,255,0.18)]"
          />
        </a>

        {/* Center: Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`font-dmSans font-medium text-sm transition-colors duration-200 relative py-1 ${
                  isActive ? 'text-accent' : 'text-frost hover:text-ink'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="desktopActiveIndicator"
                    className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Side: Hamburger Menu */}
        <div className="flex items-center">

          {/* Hamburger Menu Icon — pure liquid glassmorphic button */}
          <button
            id="mobile-menu-toggle"
            ref={menuButtonRef}
            onClick={handleOpenMenu}
            style={{ touchAction: 'manipulation' }}
            className="flex items-center justify-center w-10 h-10 -mr-1 text-frost hover:text-ink cursor-pointer active:scale-95 transition-all rounded-full border border-white/20 bg-gradient-to-br from-white/14 via-white/[0.03] to-white/[0.08] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(255,255,255,0.15)] hover:border-amber-400/60 hover:shadow-[0_0_16px_rgba(245,158,11,0.35)]"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 text-frost hover:text-amber-400 transition-colors" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Bubble Overlay — Ultra-Fast Compositor Scaled 56px Circle */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-portal"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1, transition: { delay: 0.31, duration: 0.01 } }}
            className="fixed inset-0 z-[100] overflow-hidden select-none"
            style={{ touchAction: 'none' }}
          >
            {/* 1. Fluid Expanding Bubble from Button Center — Featherlight 56px Base GPU Element */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: bubbleScale }}
              exit={{
                scale: 0,
                transition: {
                  duration: 0.30,
                  ease: [0.32, 0, 0.67, 0], // Material 3 Emphasized Accelerate into button
                },
              }}
              transition={{
                duration: 0.38,
                ease: [0.22, 1, 0.36, 1], // Material 3 Emphasized Decelerate (snappy touch response + fluid glide)
              }}
              style={{
                position: 'fixed',
                left: menuOrigin.x - 28,
                top: menuOrigin.y - 28,
                width: 56,
                height: 56,
                borderRadius: '50%',
                backgroundColor: bgSolid,
                willChange: 'transform',
                transformOrigin: '28px 28px',
                pointerEvents: 'none',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            />

            {/* 2. Static Ambient Luxury Gradient — Fades in smoothly with zero GPU scale load */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.28, delay: 0.08 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 45%, rgba(var(--accent-rgb), 0.15) 0%, transparent 68%)',
              }}
            />

            {/* 3. Menu Content (Links, Close Button, Socials) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.18, delay: 0.06 }}
              className="relative z-10 w-full h-full flex flex-col justify-center items-center p-6"
              onClick={handleCloseMenu}
            >
              {/* Close Button — pure liquid glassmorphic button */}
              <motion.button
                id="mobile-menu-close"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18, delay: 0.06 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseMenu();
                }}
                style={{ touchAction: 'manipulation' }}
                className="absolute top-6 right-6 sm:top-8 sm:right-8 w-12 h-12 flex items-center justify-center text-frost hover:text-amber-400 cursor-pointer rounded-full border border-white/20 bg-gradient-to-br from-white/16 via-white/[0.03] to-white/[0.08] backdrop-blur-xl active:scale-90 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1.5px_1px_rgba(255,255,255,0.7),inset_0_-1px_1px_rgba(255,255,255,0.15)] hover:border-amber-400/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Centered Navigation Links with Staggered Cascading Reveal */}
              <motion.div
                variants={linkContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-5 sm:gap-6 text-center w-full max-w-xs"
                onClick={(e) => e.stopPropagation()}
              >
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.div key={link.id} variants={linkVariants}>
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => handleLinkClick(e, link.id)}
                        className={`font-syne font-bold text-3xl sm:text-4xl tracking-tight block py-3.5 px-6 rounded-2xl transition-all duration-200 relative ${
                          isActive
                            ? 'text-accent bg-accent/10 border border-accent/25 shadow-[0_0_20px_rgba(var(--accent-rgb),0.15)]'
                            : 'text-frost hover:text-ink border border-transparent hover:bg-surface/10'
                        }`}
                      >
                        {link.label}
                        {isActive && (
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                        )}
                      </a>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Bottom Socials — pure liquid glassmorphic round buttons perfectly centered */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ delay: 0.18, duration: 0.22 }}
                className="absolute bottom-8 sm:bottom-10 inset-x-0 mx-auto w-fit flex items-center justify-center gap-4 z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href="https://www.instagram.com/shababahmedtzn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 shrink-0 rounded-full border border-white/20 bg-gradient-to-br from-white/16 via-white/[0.03] to-white/[0.08] backdrop-blur-xl flex items-center justify-center text-frost hover:text-amber-400 hover:border-amber-400/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1.5px_1px_rgba(255,255,255,0.7),inset_0_-1px_1px_rgba(255,255,255,0.15)] hover:scale-110 active:scale-95 transition-all duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 shrink-0" />
                </a>
                <a
                  href="https://www.facebook.com/shababahmedtzn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 shrink-0 rounded-full border border-white/20 bg-gradient-to-br from-white/16 via-white/[0.03] to-white/[0.08] backdrop-blur-xl flex items-center justify-center text-frost hover:text-amber-400 hover:border-amber-400/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1.5px_1px_rgba(255,255,255,0.7),inset_0_-1px_1px_rgba(255,255,255,0.15)] hover:scale-110 active:scale-95 transition-all duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 shrink-0" />
                </a>
                <a
                  href="https://github.com/VibeZin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 shrink-0 rounded-full border border-white/20 bg-gradient-to-br from-white/16 via-white/[0.03] to-white/[0.08] backdrop-blur-xl flex items-center justify-center text-frost hover:text-amber-400 hover:border-amber-400/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1.5px_1px_rgba(255,255,255,0.7),inset_0_-1px_1px_rgba(255,255,255,0.15)] hover:scale-110 active:scale-95 transition-all duration-200"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 shrink-0" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
