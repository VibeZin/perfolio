// components/animations/ScrollAnimations.tsx
'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Register ScrollTrigger plugin safely
    gsap.registerPlugin(ScrollTrigger);

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

      // 3. Background parallax for Hero section Three.js canvas
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

      // 5. Navbar shrink & subtle scale sticky behavior
      const navbar = document.getElementById('main-navbar');
      if (navbar && heroSection) {
        gsap.to(navbar, {
          paddingTop: '7px',
          paddingBottom: '7px',
          scale: 0.98,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: heroSection,
            start: '100 top',
            end: '250 top',
            scrub: true,
          },
        });
      }
    });

    // Clean up GSAP context and ScrollTrigger instances on unmount
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
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
