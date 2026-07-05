// components/sections/Contact.tsx
'use client';

import { motion } from 'framer-motion';
import { Mail, Instagram, Facebook, Linkedin, Github } from 'lucide-react';
import Magnetic from '@/components/animations/Magnetic';

export default function Contact() {
  const headingText = "Let's build something real.";
  const words = headingText.split(" ");

  // Framer motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  const socialIcons = [
    { icon: Instagram, href: "https://www.instagram.com/shababahmedtzn/", name: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/shababahmedtzn/", name: "Facebook" },
    { icon: Github, href: "https://github.com/VibeZin", name: "Github" },
  ];

  return (
    <section
      id="contact"
      className="py-[120px] px-6 max-w-[1100px] mx-auto w-full relative z-10 scroll-mt-24 select-none flex items-center justify-center"
    >
      {/* Ambient glow — box-shadow instead of filter:blur to avoid raster upload */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-[0.12] pointer-events-none"
        style={{ boxShadow: '0 0 120px 60px rgba(var(--accent-rgb), 0.15)' }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="max-w-[700px] w-full text-center flex flex-col items-center gap-8 relative z-10"
      >
        {/* Section Label */}
        <motion.span variants={wordVariants} className="section-label">
          GET IN TOUCH
        </motion.span>

        {/* Word-by-word Reveal Heading */}
        <h2 
          className="font-syne font-extrabold leading-none tracking-tight text-center max-w-2xl"
          style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
        >
          <span className="flex flex-wrap justify-center gap-x-3 gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="gradient-text inline-block"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h2>

        {/* Sub-text */}
        <motion.p
          variants={fadeUpVariants}
          className="font-dmSans font-normal text-lg text-frost leading-relaxed max-w-[500px] mx-auto"
        >
          Got a project idea, a collab offer, or just want to talk business and tech? I read everything.
        </motion.p>

        {/* Main CTA Mail Button */}
        <motion.div variants={fadeUpVariants} className="mt-4">
          <Magnetic>
            <motion.a
              href="mailto:placeholder@gmail.com"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="btn-primary inline-flex items-center justify-center font-syne font-semibold rounded-full select-none"
              style={{ padding: '16px 40px', fontSize: '18px' }}
            >
              <Mail className="w-5 h-5 mr-2.5" />
              Send Me a Mail
            </motion.a>
          </Magnetic>
        </motion.div>

        {/* Social Icons Container */}
        <motion.div variants={fadeUpVariants} className="flex flex-col gap-4 items-center mt-6">
          <div className="flex gap-4">
            {socialIcons.map((social) => {
              const IconComp = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-full border border-border/80 flex items-center justify-center text-frost hover:text-accent hover:border-accent transition-colors duration-300 bg-surface/20"
                >
                  <IconComp className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
