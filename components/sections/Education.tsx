// components/sections/Education.tsx
'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';

export default function Education() {
  const cardLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  const cardRightVariants = {
    hidden: { opacity: 0, x: 50 },
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

  return (
    <section
      id="education"
      className="py-[120px] px-6 max-w-[1100px] mx-auto w-full relative z-10 scroll-mt-24 select-none"
    >
      <div className="flex flex-col gap-12">
        {/* Header Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={titleVariants}
          className="flex flex-col gap-4 items-start max-w-2xl"
        >
          <span className="section-label">03 / ACADEMIC JOURNEY</span>
          <h2
            className="font-syne font-extrabold leading-tight tracking-tight text-ink"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            Built in the classroom. Proven on the leaderboard.
          </h2>
          <div className="h-[2px] w-[60px] bg-gradient-to-r from-accent to-gold mt-1" />
        </motion.div>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          
          {/* CARD 1: University */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={cardLeftVariants}
            className="w-full h-full"
          >
            <SpotlightCard
              className="glow-card glass rounded-[28px] p-8 md:p-10 border border-border/40 hover:border-accent/20 transition-all duration-300 relative group w-full h-full"
              innerClassName="flex flex-col justify-between h-full w-full"
              spotlightColor="rgba(var(--accent-rgb), 0.15)"
            >
              <div className="flex flex-col gap-6">
                {/* Top Row badge */}
                <div className="flex justify-between items-center">
                  <span className="text-3xl">🎓</span>
                  <span className="font-dmSans font-semibold text-[11px] px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 uppercase tracking-widest leading-none">
                    Currently Enrolled
                  </span>
                </div>

                {/* Institution Title */}
                <div>
                  <h3 className="font-syne font-bold text-2xl md:text-3xl gradient-text tracking-tight block">
                    University of Asia Pacific
                  </h3>
                  <span className="font-dmSans font-medium text-sm text-frost mt-1 block">
                    Faculty of Business Administration, Dhaka
                  </span>
                  <p className="font-dmSans font-normal text-sm text-frost mt-3 leading-relaxed">
                    Studying Business Administration at UAP, Dhaka. First semester result was good. Second semester result is still pending.
                  </p>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-border/40 my-1" />

                {/* Grid of detail items */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-syne font-bold text-[10px] text-frost/70 uppercase tracking-[0.15em]">
                      Degree
                    </span>
                    <span className="font-syne font-semibold text-base md:text-lg text-ink leading-tight">
                      Bachelor of Business Administration
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-syne font-bold text-[10px] text-frost/70 uppercase tracking-[0.15em]">
                      Semester
                    </span>
                    <span className="font-syne font-semibold text-base md:text-lg text-ink leading-tight">
                      2nd Semester (Ongoing)
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-syne font-bold text-[10px] text-frost/70 uppercase tracking-[0.15em]">
                      1st Semester CGPA
                    </span>
                    <span className="font-syne font-semibold text-base md:text-lg text-ink leading-tight">
                      4.00
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-syne font-bold text-[10px] text-frost/70 uppercase tracking-[0.15em]">
                      2nd Semester
                    </span>
                    <span className="font-syne font-semibold text-base md:text-lg text-ink leading-tight">
                      Result Pending
                    </span>
                  </div>
                </div>
              </div>

              <p className="font-dmSans text-sm text-frost mt-6">
                Received the VC's Honor List in the first semester.
              </p>
            </SpotlightCard>
          </motion.div>

          {/* CARD 2: School Background */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={cardRightVariants}
            className="w-full h-full"
          >
            <SpotlightCard
              className="glow-card glass rounded-[28px] p-8 md:p-10 border border-border/40 hover:border-accent/20 transition-all duration-300 relative group w-full h-full"
              innerClassName="flex flex-col justify-between h-full w-full"
              spotlightColor="rgba(var(--accent-rgb), 0.15)"
            >
              <div className="flex flex-col gap-6">
                {/* Top Row badge */}
                <div className="flex justify-between items-center">
                  <span className="text-3xl">🏫</span>
                  <span className="font-dmSans font-semibold text-[11px] px-3.5 py-1.5 rounded-full border border-border/60 text-frost uppercase tracking-widest leading-none">
                    Completed
                  </span>
                </div>

                {/* Institution Title */}
                <div>
                  <h3 className="font-syne font-bold text-2xl md:text-3xl text-ink tracking-tight block">
                    Udayan Uccha Madhyamik Bidyalaya
                  </h3>
                  <span className="font-dmSans font-medium text-sm text-frost mt-1 block">
                    Fuller Road, Dhaka
                  </span>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-border/40 my-1" />

                {/* Education Milestones List */}
                <div className="flex flex-col gap-4">
                  {/* Milestone 1 */}
                  <div className="flex justify-between items-center py-2.5 border-b border-border/10">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-syne font-bold text-sm gradient-text">JSC</span>
                      <span className="font-dmSans font-semibold text-sm text-ink">Completed</span>
                    </div>
                    <span className="font-dmSans font-medium text-[10px] text-frost bg-void/30 border border-border px-2.5 py-0.5 rounded-full">
                      General
                    </span>
                  </div>

                  {/* Milestone 2 */}
                  <div className="flex justify-between items-center py-2.5 border-b border-border/10">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-syne font-bold text-sm gradient-text">SSC</span>
                      <span className="font-dmSans font-semibold text-sm text-ink">Science Discipline</span>
                    </div>
                    <span className="font-dmSans font-medium text-[10px] text-frost bg-void/30 border border-border px-2.5 py-0.5 rounded-full">
                      Science
                    </span>
                  </div>

                  {/* Milestone 3 */}
                  <div className="flex justify-between items-center py-2.5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-syne font-bold text-sm gradient-text">HSC</span>
                      <span className="font-dmSans font-semibold text-sm text-ink">Science Discipline</span>
                    </div>
                    <span className="font-dmSans font-medium text-[10px] text-frost bg-void/30 border border-border px-2.5 py-0.5 rounded-full">
                      Science
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote block at bottom */}
              <div className="border-l-3 border-accent pl-4 mt-8">
                <p className="font-dmSans italic text-base text-frost leading-relaxed">
                  "Science background. Business path. Tech future."
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
