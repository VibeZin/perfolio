// components/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import Magnetic from '@/components/animations/Magnetic';
import GlassSurface from '@/components/ui/GlassSurface';
import { ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [presets, setPresets] = useState<any[] | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [shaderVisible, setShaderVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const themeBack = mounted && resolvedTheme === 'light' ? '#F5EBE6' : '#06080E';
  const themeTint = mounted && resolvedTheme === 'light' ? '#D5C4B3' : '#32528C';

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-[100dvh] min-h-[820px] sm:min-h-[860px] md:min-h-screen flex flex-col justify-center items-center pt-24 pb-16 sm:pt-28 sm:pb-16 md:pt-20 md:pb-12 overflow-x-hidden bg-transparent"
    >
      {/* Liquid Metal Shader — expanded scale & coverage, optimized performance on mobile, paused when out of view or menu open */}
      <div
        id="hero-canvas-container"
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden [&_canvas]:!absolute [&_canvas]:!inset-0 [&_canvas]:!w-full [&_canvas]:!h-full [&_canvas]:!block"
        style={{ isolation: 'isolate' }}
      >
        {/* Render on all devices when in viewport, with full-screen fluid shape and high-definition mobile pixel count */}
        {presets && shaderVisible && (
          <LiquidMetal
            {...(presets[2]?.params || presets[2] || {})}
            shape="none"
            fit="cover"
            scale={isTouchDevice ? 1.65 : 1.95}
            speed={isMenuOpen ? 0 : (presets[2]?.params?.speed ?? 0.6)}
            colorBack={themeBack}
            colorTint={themeTint}
            style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%' }}
            maxPixelCount={isTouchDevice ? 800000 : 1600000}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-65% to-void/90 pointer-events-none z-[1]" />
      </div>

      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none z-1 bg-[linear-gradient(to_right,rgba(var(--accent-rgb),0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--accent-rgb),0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-5 sm:px-6 md:px-8 pt-2 pb-6 md:pt-2 md:pb-8 gap-5 sm:gap-6 md:gap-6 select-none">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 mb-4 sm:mt-6 sm:mb-5 md:mt-4 md:mb-6 relative z-10 flex justify-center items-center overflow-visible"
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

        {/* Main Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-syne tracking-tighter leading-none relative z-20 -mt-14 sm:-mt-16 md:-mt-20 pointer-events-none"
          style={{ fontSize: 'clamp(44px, 10vw, 110px)', willChange: 'transform, opacity' }}
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
              className="btn-primary w-full sm:w-auto text-sm sm:text-sm font-semibold whitespace-nowrap cursor-pointer h-[52px] sm:h-12 px-6 sm:px-8 shadow-[0_4px_24px_rgba(var(--accent-rgb),0.3)] active:scale-[0.98] transition-all duration-300"
            >
              See My Work
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
