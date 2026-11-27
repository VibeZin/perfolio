// components/sections/Contact.tsx
'use client';

import { motion } from 'framer-motion';
import { Instagram, Facebook, Github, ArrowUpRight } from 'lucide-react';

// Copy, mail address and social links unchanged. Presentation only: the
// heading is solid ink (the old ink→blue→gold gradient text is gone),
// the mail button is a plain solid button, and the socials are hairline
// circles — no liquid glass, no amber breathing dots.
export default function Contact() {
  const headingText = "Let's build something real.";
  const words = headingText.split(" ");

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
      className="py-28 md:py-40 px-6 max-w-[1200px] mx-auto w-full relative z-10 scroll-mt-24 select-none flex items-center justify-center"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="max-w-[700px] w-full text-center flex flex-col items-center gap-8 relative z-10"
      >
        <motion.span variants={wordVariants} className="section-label">
          05 — Get in touch
        </motion.span>

        {/* Word-by-word Reveal Heading — solid ink, no gradient */}
        <h2
          className="font-syne font-extrabold leading-none tracking-tight text-ink text-center max-w-2xl"
          style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
        >
          <span className="flex flex-wrap justify-center gap-x-3 gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h2>

        <motion.p
          variants={fadeUpVariants}
          className="font-dmSans font-normal text-lg text-frost leading-relaxed max-w-[500px] mx-auto"
        >
          Got a project idea, a collab offer, or just want to talk business and tech? I read everything.
        </motion.p>

        <motion.div variants={fadeUpVariants} className="mt-4 flex justify-center">
          <a
            href="mailto:shababahmedtazin2021@gmail.com"
            className="btn-primary"
            aria-label="Send Me a Mail"
          >
            Send Me a Mail
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

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
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-frost hover:text-accent-ink hover:border-accent transition-colors duration-200"
                  aria-label={social.name}
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
