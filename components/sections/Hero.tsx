// components/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

const LiquidMetal = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.LiquidMetal),
  { ssr: false }
);

/*
 * Hero — the ONE maximalist moment on the site.
 * Editorial, left-aligned: a hairline meta row, then the name set huge —
 * "SHABAB" in Syne, "Ahmed" in italic Instrument Serif — with a single
 * gold full stop. Everything else on the page stays quiet.
 * The liquid-metal shader is dark-mode only, never on touch devices, and
 * never when the visitor prefers reduced motion. In light mode the hero
 * is just paper, type and a hairline — which is the point.
 */
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [presets, setPresets] = useState<any[] | null>(null);
  const [shaderVisible, setShaderVisible] = useState(true);
  const [allowShader, setAllowShader] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const isTouch = navigator.maxTouchPoints > 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Shader only on a fine pointer, with motion allowed. Touch and
    // reduced-motion visitors get the still, editorial hero instead.
    setAllowShader(!isTouch && !reduced);
    import('@paper-design/shaders-react').then((mod) => {
      setPresets(mod.liquidMetalPresets);
    });
  }, []);

  // Pause the shader when the Hero section is scrolled out of view.
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

  const showShader = mounted && allowShader && resolvedTheme === 'dark' && presets && shaderVisible;
  const shaderSpeed = presets?.[2]?.params?.speed ?? 0.6;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-[100svh] flex flex-col justify-center overflow-x-hidden bg-transparent"
    >
      {/* Liquid Metal Shader — dark mode, desktop, motion allowed only. */}
      {showShader && (
        <div
          id="hero-canvas-container"
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden [&_canvas]:!absolute [&_canvas]:!inset-0 [&_canvas]:!w-full [&_canvas]:!h-full [&_canvas]:!block"
          style={{ isolation: 'isolate', transform: 'translateZ(0)', contain: 'layout paint' }}
          aria-hidden="true"
        >
          <LiquidMetal
            {...(presets[2]?.params || presets[2] || {})}
            shape="none"
            fit="cover"
            scale={1.95}
            speed={shaderSpeed}
            colorBack="#07090F"
            colorTint="#2E5AAC"
            style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%' }}
            minPixelRatio={1}
            maxPixelCount={1600000}
            webGlContextAttributes={{
              powerPreference: 'high-performance',
              alpha: false,
              depth: false,
              stencil: false,
              antialias: false,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-65% to-void/90 pointer-events-none z-[1]" />
          {/*
            Soft veil over the shader: live, the moving black/white/blue/
            cyan/yellow/red bands passed behind the headline and buttons
            and changed their fill and fringe as they moved. The veil
            tames the bands; the solid-ink headline and opaque buttons
            sit above it, so nothing fringes anymore.
          */}
          <div className="absolute inset-0 bg-void/45 pointer-events-none z-[2]" aria-hidden="true" />
        </div>
      )}

      {/* Hero Content — editorial, left-aligned, one column of type */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-8 pt-32 pb-20 md:pt-36 md:pb-24">
        {/* Meta row — hairline above, small caps below */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="border-t border-border pt-5 mb-10 md:mb-14 flex flex-wrap gap-x-8 gap-y-2"
        >
          <span className="section-label">Shabab Ahmed — Portfolio</span>
          <span className="section-label">Dhaka, Bangladesh</span>
          <span className="section-label">Software Developer &amp; Builder</span>
        </motion.div>

        {/* The name — the single maximalist moment */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="leading-[0.9] tracking-tight"
        >
          <span
            className="font-syne font-extrabold uppercase text-ink block"
            style={{ fontSize: 'clamp(64px, 13vw, 168px)' }}
          >
            Shabab
          </span>
          <span
            className="display-serif text-accent-ink block"
            style={{ fontSize: 'clamp(64px, 13vw, 168px)' }}
          >
            Ahmed<span className="text-gold">.</span>
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-dmSans font-medium text-ink mt-10 md:mt-12 max-w-[560px]"
          style={{ fontSize: 'clamp(20px, 3.4vw, 28px)', lineHeight: 1.35 }}
        >
          I speak to AI. It builds. We ship.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-dmSans text-frost max-w-[520px] leading-relaxed mt-4"
          style={{ fontSize: 'clamp(15px, 2.4vw, 17px)' }}
        >
          Turning ideas into real products — one conversation at a time.
        </motion.p>

        {/* CTAs — one solid, one hairline. No glass, no breathing glow. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex flex-wrap gap-3 mt-10 md:mt-12"
        >
          <button
            onClick={() => handleScrollTo('projects')}
            className="btn-primary"
            aria-label="See My Work"
          >
            See My Work
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScrollTo('contact')}
            className="btn-ghost"
            aria-label="Get in Touch"
          >
            Get in Touch
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
