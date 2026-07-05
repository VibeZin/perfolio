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

    // ─── Lenis ↔ GSAP sync ───────────────────────────────────────────────────
    // Tell ScrollTrigger to read Lenis's virtual scroll position rather than
    // window.scrollY so they stay perfectly in sync (no jitter / desync).
    const lenis = getLenis();
    if (lenis) {
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value?: number) {
          if (arguments.length && value !== undefined) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: 'transform',
      });

      // Whenever Lenis emits a scroll event, update ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      ScrollTrigger.addEventListener('refresh', () => lenis.resize());
      ScrollTrigger.refresh();
    }
    // ─────────────────────────────────────────────────────────────────────────

    const ctx = gsap.context(() => {
      // 1. Section headings (target all h2 elements inside sections)
      const headings = document.querySelectorAll('section h2');
      headings.forEach((heading) => {
        gsap.fromTo(
          heading,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 2. Section labels (target all elements with .section-label class)
      const labels = document.querySelectorAll('.section-label');
      labels.forEach((label) => {
        gsap.fromTo(
          label,
          { letterSpacing: '0.4em', opacity: 0 },
          {
            letterSpacing: '0.2em',
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: label,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 3. Background parallax for Hero section shader container
      const canvasContainer = document.getElementById('hero-canvas-container');
      const heroSection = document.getElementById('hero');
      if (canvasContainer && heroSection) {
        gsap.to(canvasContainer, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 4. Projects section background sweep
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        gsap.to(projectsSection, {
          '--sweep-pos': '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: projectsSection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 5. Navbar shrink — scrubbed via CSS data attribute, not padding animation
      // (Padding animation removed from here; handled by CSS in Navbar)
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      // Clean up Lenis listener
      const l = getLenis();
      if (l) l.off('scroll', ScrollTrigger.update);
    };
  }, []);

  return (
    <>
      {/* Dynamic styles to support Projects sweep animation smoothly */}
      <style>{`
        #projects {
          position: relative;
          --sweep-pos: -100%;
        }
        #projects::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(var(--accent-rgb), 0.04), transparent);
          background-size: 200% 100%;
          background-position: var(--sweep-pos) 0;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
    </>
  );
}
