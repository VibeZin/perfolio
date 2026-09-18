// components/layout/Navbar.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X, Instagram, Facebook, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState({ x: 350, y: 40 });
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
    if (menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setMenuOrigin({
        x: Math.round(rect.left + rect.width / 2),
        y: Math.round(rect.top + rect.height / 2),
      });
    } else if (typeof window !== 'undefined') {
      setMenuOrigin({
        x: window.innerWidth - 44,
        y: 40,
      });
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

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [mobileMenuOpen]);

  const bgSolid = mounted && resolvedTheme === 'light' ? '#F5EBE6' : '#06080E';

  const linkContainerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.12,
      },
    },
  };

  const linkVariants: any = {
    hidden: {
      y: 16,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.18,
        ease: 'easeIn',
      },
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.28,
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
        {/* Left Side: Logo */}
        <a
          id="navbar-logo"
          href="#"
          onClick={handleLogoClick}
          className="font-syne font-extrabold text-lg gradient-text select-none cursor-pointer"
        >
          SA
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

        {/* Right Side: Toggle & Hamburger */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Hamburger Menu Icon — fully functional on mobile and desktop */}
          <button
            id="mobile-menu-toggle"
            ref={menuButtonRef}
            onClick={handleOpenMenu}
            style={{ touchAction: 'manipulation' }}
            className="flex items-center justify-center w-10 h-10 -mr-1.5 text-frost hover:text-ink cursor-pointer active:scale-95 transition-transform"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Bubble Overlay — 100% GPU Compositor Scaled Circle */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-portal"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1, transition: { delay: 0.38, duration: 0.02 } }}
            className="fixed inset-0 z-[100] overflow-hidden select-none"
            style={{ touchAction: 'none' }}
          >
            {/* 1. Fluid Expanding Bubble from Button Center — 100% GPU Compositor (Scale) */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                duration: 0.42,
                ease: [0.16, 1, 0.3, 1], // Android Material 15/16 fluid expansion curve
              }}
              style={{
                position: 'absolute',
                left: `${menuOrigin.x}px`,
                top: `${menuOrigin.y}px`,
                width: '320vmax',
                height: '320vmax',
                x: '-50%',
                y: '-50%',
                borderRadius: '9999px',
                backgroundColor: bgSolid,
                willChange: 'transform',
                transformOrigin: 'center center',
              }}
            >
              {/* 100% Solid Opaque Backing Layer — GUARANTEES zero homepage bleed */}
              <div
                className="w-full h-full rounded-full"
                style={{
                  backgroundColor: bgSolid,
                }}
              />
              {/* Subtle ambient luxury radial glow inside the bubble */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(var(--accent-rgb), 0.16) 0%, transparent 60%)',
                }}
              />
            </motion.div>

            {/* 2. Menu Content (Links, Close Button, Socials) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
              transition={{
                duration: 0.22,
                delay: 0.12, // bloom first, then links cascade in
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 w-full h-full flex flex-col justify-center items-center p-6"
              onClick={handleCloseMenu}
            >
              {/* Close Button */}
              <button
                id="mobile-menu-close"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseMenu();
                }}
                style={{ touchAction: 'manipulation' }}
                className="absolute top-6 right-6 sm:top-8 sm:right-8 p-3 text-frost hover:text-ink cursor-pointer rounded-full border border-border/80 bg-surface/30 active:scale-90 transition-transform shadow-lg"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Centered Navigation Links with Staggered Cascading Reveal */}
              <motion.div
                variants={linkContainerVariants}
                initial="hidden"
                animate="visible"
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

              {/* Bottom decoration */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.3 }}
                className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-6"
              >
                <a href="https://www.instagram.com/shababahmedtzn/" target="_blank" rel="noopener noreferrer" className="text-frost/60 hover:text-accent hover:scale-110 transition-all duration-200">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://www.facebook.com/shababahmedtzn/" target="_blank" rel="noopener noreferrer" className="text-frost/60 hover:text-accent hover:scale-110 transition-all duration-200">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://github.com/VibeZin" target="_blank" rel="noopener noreferrer" className="text-frost/60 hover:text-accent hover:scale-110 transition-all duration-200">
                  <Github className="w-6 h-6" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
