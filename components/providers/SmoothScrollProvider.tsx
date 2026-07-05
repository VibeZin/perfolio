'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';

// Singleton Lenis instance accessible by ScrollAnimations
let lenisInstance: Lenis | null = null;
export function getLenis() { return lenisInstance; }

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Disable Lenis on touch/mobile: native scroll is smoother and avoids GSAP conflicts
    const isTouchDevice = navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      lerp: 0.075,           // Snappier feel — less lag when fighting ScrollTrigger
      duration: 1.0,
      smoothWheel: true,
      touchMultiplier: 0,    // No-op on mobile (disabled above), safety net
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    // Use a single rAF loop — more efficient than setInterval or multiple loops
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
