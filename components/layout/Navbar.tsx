// components/layout/Navbar.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X, Instagram, Facebook, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const triggerHapticFeedback = () => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(15);
    }
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

  // Framer Motion Variants for Mobile Menu Overlay
  const menuVariants: any = {
    hidden: {
      x: '100%',
      skewX: 5,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      x: 0,
      skewX: 0,
      transition: {
        type: 'spring',
        damping: 24,
        stiffness: 160,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const linkVariants: any = {
    hidden: {
      x: 60,
      opacity: 0,
      rotate: 4,
    },
    visible: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 140,
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
        className="navbar-pill fixed top-4 md:top-6 left-1/2 z-50 rounded-full border backdrop-blur-md flex items-center justify-between overflow-hidden"
      >
        {/* Liquid Glass Highlight Sweep */}
        <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
          <motion.div
            className="w-2/3 h-full bg-gradient-to-r from-transparent via-white/18 to-transparent skew-x-12"
            animate={{
              x: ['-150%', '350%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
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
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Hamburger Menu Icon */}
          <button
            id="mobile-menu-toggle"
            onClick={() => {
              triggerHapticFeedback();
              setMobileMenuOpen(true);
            }}
            className="md:hidden flex items-center justify-center p-1 text-frost hover:text-ink cursor-pointer active:scale-90 transition-transform"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="fixed inset-0 z-[100] bg-void/98 backdrop-blur-2xl flex flex-col justify-center items-center p-6 overflow-hidden select-none"
            onClick={() => {
              triggerHapticFeedback();
              setMobileMenuOpen(false);
            }}
          >
            {/* Visual background ambient details */}
            <div
              className="absolute -top-10 -right-10 w-80 h-80 rounded-full filter blur-[100px] opacity-[0.05] pointer-events-none"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <div
              className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full filter blur-[100px] opacity-[0.03] pointer-events-none"
              style={{ backgroundColor: 'var(--gold)' }}
            />

            {/* Close Button */}
            <button
              id="mobile-menu-close"
              onClick={(e) => {
                e.stopPropagation();
                triggerHapticFeedback();
                setMobileMenuOpen(false);
              }}
              className="absolute top-8 right-8 p-2.5 text-frost hover:text-ink cursor-pointer rounded-full border border-border/60 bg-surface/10 active:scale-90 transition-transform"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Centered Mobile Links */}
            <div
              className="flex flex-col gap-6 text-center w-full max-w-xs"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.div key={link.id} variants={linkVariants}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleLinkClick(e, link.id)}
                      className={`font-syne font-bold text-3xl tracking-tight block py-3.5 px-6 rounded-2xl transition-all duration-300 relative ${
                        isActive
                          ? 'text-accent bg-accent/5 border border-accent/20'
                          : 'text-frost hover:text-ink border border-transparent hover:bg-surface/5'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent animate-pulse" />
                      )}
                    </a>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-6">
              <a href="https://www.instagram.com/shababahmedtzn/" target="_blank" rel="noopener noreferrer" className="text-frost/60 hover:text-accent hover:scale-110 transition-all duration-300">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/shababahmedtzn/" target="_blank" rel="noopener noreferrer" className="text-frost/60 hover:text-accent hover:scale-110 transition-all duration-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://github.com/VibeZin" target="_blank" rel="noopener noreferrer" className="text-frost/60 hover:text-accent hover:scale-110 transition-all duration-300">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
