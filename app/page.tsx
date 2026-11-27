// app/page.tsx
'use client';

import { motion } from 'framer-motion';
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
  return (
    <div className="relative w-full min-h-screen bg-transparent text-ink overflow-x-hidden">
      {/* ScrollTrigger + Lenis sync initializer — renders nothing, effect only */}
      <ScrollAnimations />

      {/*
        No loading screen. The old 800ms loader was an arbitrary stall that
        hid the page for no reason; content now renders immediately and
        fades in once (0.5s), which is the only entrance motion on the page.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
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
