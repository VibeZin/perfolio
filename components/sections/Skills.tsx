// components/sections/Skills.tsx
'use client';

import { motion } from 'framer-motion';
import { Code2, Terminal, Layers, Settings2, Cpu } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';

interface SkillCategory {
  title: string;
  icon: any;
  skills: { name: string; level?: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "AI TOOLS I USE",
    icon: Cpu,
    skills: [
      { name: "Claude" },
      { name: "Gemini 3.5 Flash" },
      { name: "Gemini 3.1 Pro" },
      { name: "Kimi K2.6" },
      { name: "Kimi K2.7" },
      { name: "GLM 5.2" },
      { name: "MiniMax" },
      { name: "ChatGPT" },
      { name: "Grok" },
    ],
  },
  {
    title: "PLATFORMS & IDEs",
    icon: Terminal,
    skills: [
      { name: "Google AI Studio" },
      { name: "Antigravity IDE" },
      { name: "GitHub" },
      { name: "Vercel" },
      { name: "Firebase" },
    ],
  },
  {
    title: "DEEP INTERESTS",
    icon: Layers,
    skills: [
      { name: "Machine Learning & Systems" },
      { name: "Semiconductors & Nano Tech" },
      { name: "Finance & Stock Markets" },
      { name: "CPU & GPU Architectures" },
      { name: "Business Strategy" },
    ],
  },
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
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
      id="skills"
      className="py-[120px] px-6 max-w-[1100px] mx-auto w-full relative z-10 scroll-mt-24 select-none"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="flex flex-col gap-12"
      >
        {/* Header Block */}
        <motion.div variants={titleVariants} className="flex flex-col gap-4 items-start max-w-2xl">
          <span className="section-label">04 / MY TOOLKIT</span>
          <h2 className="font-syne font-extrabold leading-tight tracking-tight text-ink" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            Tech stacks I use to materialize vision.
          </h2>
          <div className="h-[2px] w-[60px] bg-gradient-to-r from-accent to-gold mt-1" />
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {skillCategories.map((category) => {
            const IconComp = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                className="w-full h-full"
              >
                <SpotlightCard
                  className="glow-card glass rounded-[28px] p-8 border border-border/40 hover:border-accent/20 transition-all duration-300 relative group w-full h-full"
                  innerClassName="flex flex-col gap-6 h-full w-full"
                  spotlightColor="rgba(var(--accent-rgb), 0.15)"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-void transition-colors duration-300">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-syne font-bold text-lg text-ink">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-col gap-3.5">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="flex justify-between items-center py-1.5 border-b border-border/10">
                        <span className="font-dmSans font-medium text-sm text-ink group-hover:text-accent transition-colors duration-200">
                          {skill.name}
                        </span>
                        {skill.level && (
                          <span className="font-dmSans font-medium text-[10px] text-frost bg-void/30 border border-border px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {skill.level}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Quote Block at Bottom */}
        <div className="border-l-3 border-accent pl-4 mt-12 max-w-2xl mx-auto">
          <p className="font-dmSans italic text-base text-frost leading-relaxed">
            "I don't know how to code. But I know exactly what I want to build — and I know which AI to ask."
          </p>
        </div>
      </motion.div>
    </section>
  );
}
