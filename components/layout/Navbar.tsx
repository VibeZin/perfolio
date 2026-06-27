// components/layout/Navbar.tsx
'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Instagram, Facebook, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const triggerHapticFeedback = () => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(15);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <motion.nav
        id="main-navbar"
        initial={false}
        animate={{
          x: '-50%',
          width: isMobile 
            ? (scrolled ? 'calc(100% - 2.5rem)' : 'calc(100% - 2rem)') 
            : (scrolled ? '560px' : '720px'),
          paddingTop: isMobile
            ? (scrolled ? '6px' : '10px')
            : (scrolled ? '8px' : '14px'),
          paddingBottom: isMobile
            ? (scrolled ? '6px' : '10px')
            : (scrolled ? '8px' : '14px'),
          paddingLeft: isMobile
            ? (scrolled ? '14px' : '20px')
            : (scrolled ? '20px' : '28px'),
          paddingRight: isMobile
            ? (scrolled ? '14px' : '20px')
            : (scrolled ? '20px' : '28px'),
          backgroundColor: scrolled
            ? 'rgba(var(--surface-rgb), 0.75)'
            : 'rgba(var(--surface-rgb), 0.25)',
          borderColor: scrolled
            ? 'var(--border)'
            : 'rgba(var(--border-rgb), 0.4)',
          boxShadow: scrolled
            ? '0 12px 30px -10px rgba(var(--ink-rgb), 0.08), inset 0 1px 2px rgba(var(--surface-rgb), 0.25), 0 0 20px var(--glow)'
            : '0 4px 12px rgba(var(--ink-rgb), 0.02), inset 0 1px 1px rgba(var(--surface-rgb), 0.1)',
        }}
        transition={{
          type: 'spring',
          stiffness: 160,
          damping: 22,
          mass: 0.9,
        }}
        className="fixed top-4 md:top-6 left-1/2 z-50 rounded-full border backdrop-blur-md flex items-center justify-between overflow-hidden"
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
      </motion.nav>

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

