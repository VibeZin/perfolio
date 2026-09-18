// components/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import Magnetic from '@/components/animations/Magnetic';
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
      className="relative w-full h-screen min-h-[750px] flex flex-col justify-center items-center pt-28 md:pt-20 overflow-hidden bg-transparent"
    >
      {/* Liquid Metal Shader — optimized performance on mobile, paused when out of view */}
      <div
        id="hero-canvas-container"
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden [&_canvas]:!absolute [&_canvas]:!inset-0 [&_canvas]:!w-full [&_canvas]:!h-full [&_canvas]:!block"
        style={{ isolation: 'isolate' }}
      >
        {/* Render on all devices when in viewport, with full-screen fluid shape and mobile-adapted pixel count */}
        {presets && shaderVisible && (
          <LiquidMetal
            {...(presets[2]?.params || presets[2] || {})}
            shape="none"
            scale={isTouchDevice ? 1.35 : 1.75}
            colorBack={themeBack}
            colorTint={themeTint}
            style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%' }}
            maxPixelCount={isTouchDevice ? 450000 : 1400000}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void/90 pointer-events-none z-[1]" />
      </div>

      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none z-1 bg-[linear-gradient(to_right,rgba(var(--accent-rgb),0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--accent-rgb),0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-6 md:px-8 pt-20 pb-12 md:pt-16 gap-6 md:gap-7 select-none">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 mb-6 md:mt-14 md:mb-8 relative z-10 flex justify-center items-center overflow-visible"
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
          className="font-syne tracking-tighter leading-none relative z-20 -mt-16 md:-mt-24 pointer-events-none"
          style={{ fontSize: 'clamp(48px, 9vw, 110px)', willChange: 'transform, opacity' }}
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
          style={{ fontSize: 'clamp(18px, 2.5vw, 26px)' }}
        >
          I speak to AI. It builds. We ship.
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="font-dmSans font-normal text-frost max-w-[520px] leading-relaxed text-liquid-pop"
          style={{ fontSize: 'clamp(13px, 1.8vw, 16px)' }}
        >
          Turning ideas into real products — one conversation at a time.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-row gap-4 justify-center items-center mt-4 w-full sm:w-auto"
        >
          <Magnetic className="flex-1 sm:flex-initial">
            <button
              onClick={() => handleScrollTo('projects')}
              className="btn-primary w-full text-sm whitespace-nowrap cursor-pointer"
            >
              See My Work
            </button>
          </Magnetic>
          <Magnetic className="flex-1 sm:flex-initial">
            <button
              onClick={() => handleScrollTo('contact')}
              className="btn-ghost w-full text-sm whitespace-nowrap cursor-pointer"
            >
              Get in Touch
            </button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
