// components/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import Magnetic from '@/components/animations/Magnetic';
import GlassSurface from '@/components/ui/GlassSurface';
import { ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';

const LiquidMetal = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.LiquidMetal),
  { ssr: false }
);

const ProfileCard = dynamic(
  () => import('@/components/ui/ProfileCard'),
  { ssr: false }
);

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [presets, setPresets] = useState<any[] | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [shaderVisible, setShaderVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const isTouch = navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    // Load the LiquidMetal shader for all devices
    import('@paper-design/shaders-react').then((mod) => {
      setPresets(mod.liquidMetalPresets);
    });
  }, []);

  // Listen for mobile menu open/close to immediately halt WebGL render loop and free GPU
  useEffect(() => {
    const handleMenu = (e: Event) => {
      const custom = e as CustomEvent<{ open: boolean }>;
      setIsMenuOpen(Boolean(custom.detail?.open));
    };
    window.addEventListener('portfolio:menu-toggle', handleMenu);
    return () => window.removeEventListener('portfolio:menu-toggle', handleMenu);
  }, []);

  // Pause WebGL shader during active mobile swiping/scrolling so 100% of GPU/compositor is for smooth scroll
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScrollOrTouch = () => {
      setIsScrolling(true);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScrollOrTouch, { passive: true });
    window.addEventListener('touchmove', handleScrollOrTouch, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollOrTouch);
      window.removeEventListener('touchmove', handleScrollOrTouch);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  // Pause the shader when the Hero section is scrolled out of view
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShaderVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const themeBack = '#06080E';
  const themeTint = '#32528C';

  // Base speed is 0.6; immediately halt rAF (speed=0) when menu open or during mobile scroll/swipe
  const baseSpeed = presets?.[2]?.params?.speed ?? 0.6;
  const shaderSpeed = isMenuOpen || (isTouchDevice && isScrolling) ? 0 : baseSpeed;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-[100svh] min-h-[820px] sm:min-h-[860px] md:min-h-screen flex flex-col justify-center items-center pt-24 pb-16 sm:pt-28 sm:pb-16 md:pt-20 md:pb-12 overflow-x-hidden bg-transparent touch-pan-y"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Liquid Metal Shader — expanded scale & coverage, paused during scroll on mobile, hardware-composited */}
      <div
        id="hero-canvas-container"
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden [&_canvas]:!absolute [&_canvas]:!inset-0 [&_canvas]:!w-full [&_canvas]:!h-full [&_canvas]:!block"
        style={{ isolation: 'isolate', transform: 'translateZ(0)', willChange: 'transform' }}
      >
        {/* Render on all devices when in viewport, with full-screen fluid shape and mobile-optimized pixel count */}
        {presets && shaderVisible && (
          <LiquidMetal
            {...(presets[2]?.params || presets[2] || {})}
            shape="none"
            fit="cover"
            scale={isTouchDevice ? 1.65 : 1.95}
            speed={shaderSpeed}
            colorBack={themeBack}
            colorTint={themeTint}
            style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%' }}
            maxPixelCount={isTouchDevice ? 280000 : 1600000}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-65% to-void/90 pointer-events-none z-[1]" />
      </div>

      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none z-1 bg-[linear-gradient(to_right,rgba(var(--accent-rgb),0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--accent-rgb),0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Hero Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center max-w-4xl px-5 sm:px-6 md:px-8 pt-2 pb-6 md:pt-2 md:pb-8 gap-5 sm:gap-6 md:gap-6 select-none touch-pan-y"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2 mb-1 sm:mt-4 sm:mb-2 md:mt-2 md:mb-2 relative z-10 flex justify-center items-center overflow-visible touch-pan-y"
          style={{ touchAction: 'pan-y' }}
        >
          <ProfileCard
            name=""
            title=""
            handle="shabab"
            status="Offline (Localhost)"
            contactText="Get in Touch"
            avatarUrl="/flipper.jpg"
            showUserInfo={true}
            enableTilt={!isTouchDevice}
            enableMobileTilt={false}
            onContactClick={() => handleScrollTo('contact')}
            behindGlowEnabled={true}
            behindGlowColor="rgba(var(--accent-rgb), 0.4)"
            innerGradient="linear-gradient(145deg, rgba(var(--surface-rgb), 0.1) 0%, rgba(var(--accent-rgb), 0.1) 100%)"
          />
        </motion.div>

        {/* Main Name — positioned cleanly below the photo card with no overlap */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-syne tracking-tighter leading-none relative z-20 mt-1 sm:mt-2 pointer-events-none"
          style={{ fontSize: 'clamp(40px, 8.5vw, 96px)', willChange: 'transform, opacity' }}
        >
          <span className="gradient-text uppercase font-extrabold block">
            Shabab Ahmed
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-dmSans font-normal tracking-tight text-frost text-liquid-pop"
          style={{ fontSize: 'clamp(18px, 4.2vw, 26px)' }}
        >
          I speak to AI. It builds. We ship.
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="font-dmSans font-normal text-frost max-w-[520px] leading-relaxed text-liquid-pop"
          style={{ fontSize: 'clamp(14px, 3.2vw, 16px)' }}
        >
          Turning ideas into real products — one conversation at a time.
        </motion.p>

        {/* CTA Buttons — expanded touch targets on mobile, perfectly framed & visible on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-row gap-3.5 sm:gap-4 justify-center items-center mt-5 sm:mt-5 md:mt-4 w-full max-w-sm sm:max-w-none sm:w-auto px-1 sm:px-0"
        >
          <Magnetic className="flex-1 sm:flex-initial">
            <button
              onClick={() => handleScrollTo('projects')}
              className="group relative inline-flex items-center justify-center p-0 rounded-full focus:outline-none cursor-pointer select-none transition-transform active:scale-[0.97] w-full sm:w-auto"
              aria-label="See My Work"
            >
              <GlassSurface
                displace={1}
                distortionScale={-150}
                redOffset={19}
                greenOffset={-1}
                blueOffset={5}
                brightness={60}
                opacity={0.8}
                mixBlendMode="screen"
                borderRadius={9999}
                className="warm-breathe-glow px-6 sm:px-7 py-3 h-[52px] sm:h-12 w-full sm:w-auto min-w-[150px] sm:min-w-[165px] transition-all duration-300 group-hover:scale-[1.02] flex items-center justify-center"
              >
                <div className="flex items-center justify-center gap-2.5">
                  {/* Precise warm light breathing beacon */}
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 shadow-[0_0_10px_#F59E0B]" />
                  </span>

                  {/* Button text with precision typography */}
                  <span className="font-dmSans font-semibold text-sm text-ink tracking-wide whitespace-nowrap transition-colors duration-200 group-hover:text-amber-400">
                    See My Work
                  </span>

                  {/* Precision warm micro-arrow */}
                  <ArrowUpRight className="w-4 h-4 text-amber-500/85 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-400" />
                </div>
              </GlassSurface>
            </button>
          </Magnetic>
          <Magnetic className="flex-1 sm:flex-initial">
            <button
              onClick={() => handleScrollTo('contact')}
              className="group relative inline-flex items-center justify-center p-0 rounded-full focus:outline-none cursor-pointer select-none transition-transform active:scale-[0.97] w-full sm:w-auto"
              aria-label="Get in Touch"
            >
              <GlassSurface
                displace={1}
                distortionScale={-150}
                redOffset={19}
                greenOffset={-1}
                blueOffset={5}
                brightness={60}
                opacity={0.8}
                mixBlendMode="screen"
                borderRadius={9999}
                className="warm-breathe-glow px-6 sm:px-7 py-3 h-[52px] sm:h-12 w-full sm:w-auto min-w-[150px] sm:min-w-[165px] transition-all duration-300 group-hover:scale-[1.02] flex items-center justify-center"
              >
                <div className="flex items-center justify-center gap-2.5">
                  {/* Precise warm light breathing beacon */}
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 shadow-[0_0_10px_#F59E0B]" />
                  </span>

                  {/* Button text with precision typography */}
                  <span className="font-dmSans font-semibold text-sm text-ink tracking-wide whitespace-nowrap transition-colors duration-200 group-hover:text-amber-400">
                    Get in Touch
                  </span>

                  {/* Precision warm micro-arrow */}
                  <ArrowUpRight className="w-4 h-4 text-amber-500/85 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-400" />
                </div>
              </GlassSurface>
            </button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
