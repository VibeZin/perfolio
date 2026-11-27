// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import ScrollAnimations from '@/components/animations/ScrollAnimations';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reduced from 2000ms to 800ms — was an arbitrary stall that also delayed
    // whileInView animations from initializing. 800ms is enough for fonts + initial paint.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-transparent text-ink overflow-x-hidden">
      {/* ScrollTrigger + Lenis sync initializer — renders nothing, effect only */}
      <ScrollAnimations />

      {/* Page Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: -20,
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center select-none"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative flex items-center justify-center"
              >
                <img
                  src="/logo.png"
                  alt="Shabab Ahmed Logo"
                  className="w-32 sm:w-36 h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                />
              </motion.div>

              {/* Progress Bar Container */}
              <div className="w-48 h-[2px] bg-border/20 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  className="h-full bg-accent rounded-full shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout — rendered immediately but hidden behind loader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        aria-hidden={isLoading}
      >
        {/* Floating Navigation Menu */}
        <Navbar />

        {/* Section 1: Hero */}
        <Hero />

        {/* Wrapper for the rest of the contents */}
        <main className="flex flex-col relative z-10 w-full">
          {/* Section 2: About */}
          <About />

          {/* Section 3: Projects */}
          <Projects />

          {/* Section 4: Education */}
          <Education />

          {/* Section 5: Skills */}
          <Skills />

          {/* Section 6: Contact */}
          <Contact />

          {/* Footer */}
          <Footer />
        </main>
      </motion.div>
    </div>
  );
}
