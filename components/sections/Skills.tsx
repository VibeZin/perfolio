// components/sections/Skills.tsx
'use client';

import { motion } from 'framer-motion';

/*
 * Skills — restructured, not restyled.
 * The old three identical icon cards are gone: that row was the most
 * generic thing on the page. Skills are now an editorial index — a
 * hairline-ruled list, category on the left, the tools as running text
 * on the right, like a credits page. Same skill names, same quote.
 */
const skillCategories = [
  {
    title: "AI tools I use",
    skills: [
      "Claude",
      "Gemini 3.5 Flash",
      "Gemini 3.1 Pro",
      "Kimi K2.6",
      "Kimi K2.7",
      "GLM 5.2",
      "MiniMax",
      "ChatGPT",
      "Grok",
    ],
  },
  {
    title: "Platforms & IDEs",
    skills: [
      "Google AI Studio",
      "Antigravity IDE",
      "GitHub",
      "Vercel",
      "Firebase",
    ],
  },
  {
    title: "Deep interests",
    skills: [
      "Machine Learning & Systems",
      "Semiconductors & Nano Tech",
      "Finance & Stock Markets",
      "CPU & GPU Architectures",
      "Business Strategy",
    ],
  },
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section
      id="skills"
      className="py-28 md:py-40 px-6 max-w-[1200px] mx-auto w-full relative z-10 scroll-mt-24 select-none"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="flex flex-col gap-12"
      >
        <motion.div variants={rowVariants} className="flex flex-col gap-4 items-start max-w-2xl">
          <span className="section-label">04 — My toolkit</span>
          <h2 className="font-syne font-extrabold leading-tight tracking-tight text-ink" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            Tech stacks I use to materialize vision.
          </h2>
          <div className="rule-accent mt-1" />
        </motion.div>

        {/* Editorial index — hairline rows, no cards */}
        <div className="border-t border-border">
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={rowVariants}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-8 md:py-10 border-b border-border"
            >
              <h3 className="md:col-span-4 font-syne font-bold text-lg text-ink tracking-tight">
                {category.title}
              </h3>
              <p className="md:col-span-8 font-dmSans text-base md:text-lg text-frost leading-relaxed">
                {category.skills.join('  ·  ')}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote Block at Bottom */}
        <div className="border-l-2 border-accent pl-4 mt-4 max-w-2xl mx-auto">
          <p className="font-dmSans italic text-base text-frost leading-relaxed">
            &ldquo;I don&rsquo;t know how to code. But I know exactly what I want to build — and I know which AI to ask.&rdquo;
          </p>
        </div>
      </motion.div>
    </section>
  );
}
