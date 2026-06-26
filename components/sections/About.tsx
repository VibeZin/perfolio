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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemLeftVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  const itemRightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
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

  const chipVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6 + i * 0.05,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    }),
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
          <span className="section-label">WHO I AM</span>
          <h2 className="font-syne font-bold leading-tight tracking-tight text-ink" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
            Just a student who builds things.
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
              Doing my BBA at University of Asia Pacific, Dhaka. Currently in my second semester.
            </p>
            <p>
              Outside class, I spend most of my time building products — apps, websites, tools. I don't write code myself. I describe what I need to AI in detail, it handles the technical side, and I keep directing until it works the way I imagined. That process is called vibe coding.
            </p>
            <p className="italic text-frost/90 border-l-2 border-border/60 pl-4 mt-2">
              I'm genuinely interested in AI, business, tech, and where all three are heading. Still learning. Always building.
            </p>
          </motion.div>

          {/* Right Column: Interests */}
          <motion.div variants={itemRightVariants} className="lg:col-span-5 flex flex-col gap-8">
            {/* Interest Chips */}
            <div className="flex flex-col gap-4">
              <span className="font-syne font-bold text-xs text-frost/70 uppercase tracking-[0.15em]">
                Obsessions & Focus Areas
              </span>
              <div className="flex flex-wrap gap-2.5">
                {interests.map((interest, idx) => (
                  <motion.span
                    key={interest}
                    custom={idx}
                    variants={chipVariants}
                    whileHover={{ scale: 1.05 }}
                    className="font-dmSans font-medium text-xs py-2 px-4 rounded-full border border-border bg-surface/30 text-frost hover:text-ink hover:border-accent transition-colors duration-300 hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.15)] cursor-default select-none"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
