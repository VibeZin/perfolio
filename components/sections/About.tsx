// components/sections/About.tsx
'use client';

import { motion } from 'framer-motion';
import SpotlightCard from '../ui/SpotlightCard';

export default function About() {
  const interests = [
    'Machine Learning & Systems',
    'Semiconductors',
    'Finance',
    'Stock Markets',
    'Chess',
    'Business Strategy',
    'Nano Tech',
    'CPU & GPU',
    'Software Craftsmanship',
    'Management',
    'Geopolitics',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const itemLeftVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  const itemRightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section
      id="about"
      className="py-[120px] px-6 max-w-[1100px] mx-auto w-full relative z-10 scroll-mt-24 select-none"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="flex flex-col gap-12"
      >
        {/* Top Header */}
        <motion.div variants={titleVariants} className="flex flex-col gap-4 items-start">
          <span className="section-label">ABOUT — THE SHORT VERSION</span>
          <h2 className="font-syne font-bold leading-tight tracking-tight text-ink" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
            BBA student by day. Professional AI-wrangler by... also day.
          </h2>
          <div className="h-[2px] w-[60px] bg-gradient-to-r from-accent to-gold" />
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-[60px] items-start mt-2">
          {/* Left Column: Bio */}
          <motion.div
            variants={itemLeftVariants}
            className="lg:col-span-7 flex flex-col gap-6 font-dmSans text-frost leading-[1.8]"
            style={{ fontSize: 'clamp(16px, 1.5vw, 18px)' }}
          >
            <p className="text-ink font-medium leading-[1.6]" style={{ fontSize: 'clamp(18px, 1.8vw, 20px)' }}>
              BBA, University of Asia Pacific, Dhaka — 2nd semester.
            </p>
            <p>
              I don't write code. I write extremely detailed instructions and argue with a robot until it builds what I meant. That's the whole process. Apps, websites, tools — all of it.
            </p>
            <p className="italic text-frost/90 border-l-2 border-border/60 pl-4 mt-2">
              Into AI, business and tech — mostly where the three collide. Still learning. Still shipping. Still surprised it works.
            </p>
          </motion.div>

          {/* Right Column: Interests */}
          <motion.div variants={itemRightVariants} className="lg:col-span-5 flex flex-col gap-8">
            {/* Interest Chips */}
            <div className="flex flex-col gap-4">
              <span className="font-syne font-bold text-xs text-frost/70 uppercase tracking-[0.15em]">
                Into right now
              </span>
              <div className="flex flex-wrap gap-2.5">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="font-dmSans font-medium text-xs py-2 px-4 rounded-full border border-border bg-surface/30 text-frost hover:text-ink hover:border-accent transition-colors duration-300 cursor-default select-none"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
