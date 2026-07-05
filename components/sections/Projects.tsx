// components/sections/Projects.tsx
'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Play } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';

interface Project {
  id: number;
  name: string;
  emoji: string;
  subtitle: string;
  description: string;
  tags: string[];
  repoUrl: string;
  status: 'live' | 'planned';
  accentColor: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    name: "Shabab er Daba",
    emoji: "♟",
    subtitle: "Chess Engine",
    description: "A chess engine built through AI collaboration. C++ core, a small neural network, and HCE trained on chess game data. I described what I wanted — AI handled the engineering.",
    tags: ["AI Directed", "C++", "Python"],
    repoUrl: "https://github.com",
    status: "live",
    accentColor: "#E8A936"
  },
  {
    id: 2,
    name: "Arsalan Website",
    emoji: "🍖",
    subtitle: "Restaurant Web App",
    description: "A website for Arsalan Nehari & Kabab Corner, a restaurant in Old Dhaka. Built as a passion project. Real menu, straightforward design.",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    repoUrl: "https://github.com",
    status: "live",
    accentColor: "#7C5CFC"
  },
  {
    id: 3,
    name: "Nimi Finance",
    emoji: "💰",
    subtitle: "Expenditure Tracker",
    description: "An Android app for tracking spending and working toward financial goals. Wanted something simple that actually changes habits. Built it through AI.",
    tags: ["Kotlin", "Jetpack Compose", "Room DB", "Firebase"],
    repoUrl: "https://github.com",
    status: "live",
    accentColor: "#3DBF7E"
  },
  {
    id: 4,
    name: "Zync",
    emoji: "⚡",
    subtitle: "Productivity App",
    description: "A productivity app with tasks, a Pomodoro timer, study tracking, and notifications for pending tasks. Tried to build something I'd actually use.",
    tags: ["Android", "Kotlin", "Jetpack Compose", "Notifications"],
    repoUrl: "https://github.com",
    status: "live",
    accentColor: "#7C5CFC"
  },
  {
    id: 5,
    name: "Open Source Dialer",
    emoji: "📱",
    subtitle: "Android Dialer App",
    description: "Google's default dialer causes some network issues. Planning an open-source replacement for Android. Still in early thinking stage.",
    tags: ["Android", "Kotlin", "Open Source"],
    repoUrl: "https://github.com",
    status: "planned",
    accentColor: "#64B5F6"
  },
  {
    id: 6,
    name: "This Portfolio",
    emoji: "🌐",
    subtitle: "Portfolio Website",
    description: "The website you're looking at. Built through AI collaboration using Next.js, Three.js, and a lot of back-and-forth conversations.",
    tags: ["Next.js", "Three.js", "Framer Motion", "GSAP"],
    repoUrl: "https://github.com",
    status: "live",
    accentColor: "#E8A936"
  }
];

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rafPending = useRef(false);
  const rectCache = useRef<DOMRect | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || rafPending.current) return;
    rafPending.current = true;
    const clientX = e.clientX;
    const clientY = e.clientY;
    requestAnimationFrame(() => {
      rafPending.current = false;
      if (!cardRef.current) return;
      if (!rectCache.current) rectCache.current = cardRef.current.getBoundingClientRect();
      const rect = rectCache.current;
      const x = clientX - rect.left - rect.width / 2;
      const y = clientY - rect.top - rect.height / 2;
      const rotateY = (x / (rect.width / 2)) * 8;
      const rotateX = -(y / (rect.height / 2)) * 8;
      setRotation({ x: rotateX, y: rotateY });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    rectCache.current = null; // refresh on enter
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="project-card-perspective rounded-[28px] h-[240px] relative transition-all duration-300 ease-out select-none cursor-default"
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        willChange: 'transform',
      }}
    >
      <SpotlightCard
        className="glow-card glass rounded-[28px] p-7 border transition-all duration-300 ease-out h-full w-full relative overflow-hidden group"
        innerClassName="flex flex-col justify-between h-full w-full"
        spotlightColor={`rgba(${project.accentColor === '#E8A936' ? '232, 169, 54' : project.accentColor === '#7C5CFC' ? '124, 92, 252' : '236, 72, 153'}, 0.15)`}
        style={{
          borderColor: isHovered ? `${project.accentColor}33` : 'var(--border)',
          boxShadow: isHovered 
            ? `0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 25px ${project.accentColor}25`
            : '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Decorative accent background flare */}
        <div 
          className="absolute -top-12 -right-12 w-28 h-28 rounded-full filter blur-[40px] opacity-10 transition-opacity duration-500 pointer-events-none group-hover:opacity-20 animate-pulse-glow"
          style={{ backgroundColor: project.accentColor }}
        />

        {/* Header Info */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center w-full">
            <span className="text-3xl filter drop-shadow-sm select-none">
              {project.emoji}
            </span>

            {project.status === 'live' ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-glow" />
                <span className="font-dmSans font-semibold text-[11px] text-emerald-400 uppercase tracking-widest leading-none">
                  Live
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="font-dmSans font-semibold text-[11px] text-amber-400 uppercase tracking-widest leading-none">
                  Planned
                </span>
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center w-full mt-1">
              <h3 className="font-syne font-bold text-xl text-ink tracking-tight group-hover:text-accent transition-colors duration-200">
                {project.name}
              </h3>
              {project.status === 'live' && (
                <motion.a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-frost hover:text-accent p-1.5 rounded-full hover:bg-surface/50 border border-transparent hover:border-border/30 hover:shadow-[0_0_12px_rgba(var(--accent-rgb),0.3)] transition-all duration-300 flex items-center justify-center cursor-pointer"
                  aria-label={`Visit repository for ${project.name}`}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              )}
            </div>
            <span className="font-dmSans font-medium text-[11px] text-frost uppercase tracking-widest block mt-0.5">
              {project.subtitle}
            </span>
          </div>
        </div>

        {/* Description Body */}
        <p className="font-dmSans font-normal text-frost text-sm leading-relaxed mt-4 flex-1">
          {project.description}
        </p>
      </SpotlightCard>
    </div>
  );
}

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section
      id="projects"
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
        <div className="flex flex-col gap-4 items-start max-w-2xl">
          <span className="section-label">02 / WHAT I'VE BUILT</span>
          <h2 className="font-syne font-extrabold leading-tight tracking-tight text-ink" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            Real products. Real code. Real results.
          </h2>
          <p className="font-dmSans font-normal text-base md:text-lg text-frost leading-relaxed">
            Built using modern web standards and reliable software architecture.
          </p>
          <div className="h-[2px] w-[60px] bg-gradient-to-r from-accent to-gold mt-1" />
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {projectsData.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
