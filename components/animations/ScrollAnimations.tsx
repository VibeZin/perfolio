// components/animations/ScrollAnimations.tsx
'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '@/components/providers/SmoothScrollProvider';

export default function ScrollAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Keep Lenis and ScrollTrigger in sync
    const lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      ScrollTrigger.refresh();
    }

    // REMOVED: hero parallax scrub + projects sweep scrub
    // Both used scrub: true which fires mainthread JS on EVERY scroll pixel.
    // On a 60fps scroll that's 60 forced JS tasks per second competing with
    // the browser's own compositor. The visual effect was minor; the cost was not.

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      const l = getLenis();
      if (l) l.off('scroll', ScrollTrigger.update);
    };
  }, []);

  // No rendered output needed anymore
  return null;
}
