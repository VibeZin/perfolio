// components/sections/Projects.tsx
'use client';

import { motion } from 'framer-motion';
import {
  Github,
  Crown,
  UtensilsCrossed,
  Wallet,
  Zap,
  Phone,
  Globe,
  type LucideIcon,
} from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';

interface Project {
  id: number;
  name: string;
  icon: LucideIcon;
  subtitle: string;
  description: string;
  tags: string[];
  repoUrl: string;
  status: 'live' | 'planned';
}

// Copy, projects and links unchanged. What changed is the presentation:
// one accent for every card (the old per-project gold / purple / green /
// blue accents are gone), no emoji, no 3D tilt, no glow — flat quiet
// cards with a hairline border and a 2px lift on hover.
const projectsData: Project[] = [
  {
    id: 1,
    name: "Shabab er Daba",
    icon: Crown,
    subtitle: "Chess Engine",
    description: "A chess engine built through AI collaboration. C++ core, a small neural network, and HCE trained on chess game data. I described what I wanted — AI handled the engineering.",
    tags: ["AI Directed", "C++", "Python"],
    repoUrl: "https://github.com",
    status: "live",
  },
  {
    id: 2,
    name: "Arsalan Website",
    icon: UtensilsCrossed,
    subtitle: "Restaurant Web App",
    description: "A website for Arsalan Nehari & Kabab Corner, a restaurant in Old Dhaka. Built as a passion project. Real menu, straightforward design.",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    repoUrl: "https://github.com",
    status: "live",
  },
  {
    id: 3,
    name: "Nimi Finance",
    icon: Wallet,
    subtitle: "Expenditure Tracker",
    description: "An Android app for tracking spending and working toward financial goals. Wanted something simple that actually changes habits. Built it through AI.",
    tags: ["Kotlin", "Jetpack Compose", "Room DB", "Firebase"],
    repoUrl: "https://github.com",
    status: "live",
  },
  {
    id: 4,
    name: "Zync",
    icon: Zap,
    subtitle: "Productivity App",
    description: "A productivity app with tasks, a Pomodoro timer, study tracking, and notifications for pending tasks. Tried to build something I'd actually use.",
    tags: ["Android", "Kotlin", "Jetpack Compose", "Notifications"],
    repoUrl: "https://github.com",
    status: "live",
  },
  {
    id: 5,
    name: "Open Source Dialer",
    icon: Phone,
    subtitle: "Android Dialer App",
    description: "Google's default dialer causes some network issues. Planning an open-source replacement for Android. Still in early thinking stage.",
    tags: ["Android", "Kotlin", "Open Source"],
    repoUrl: "https://github.com",
    status: "planned",
  },
  {
    id: 6,
    name: "This Portfolio",
    icon: Globe,
    subtitle: "Portfolio Website",
    description: "The website you're looking at. Built through AI collaboration using Next.js, Three.js, and a lot of back-and-forth conversations.",
    tags: ["Next.js", "Three.js", "Framer Motion", "GSAP"],
    repoUrl: "https://github.com",
    status: "live",
  }
];

function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon;

  return (
    <SpotlightCard
      className="card-quiet p-7 h-full w-full relative overflow-hidden group"
      innerClassName="flex flex-col justify-between h-full w-full"
      spotlightColor="rgba(var(--accent-rgb), 0.08)"
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center w-full">
          <span className="w-11 h-11 rounded border border-border flex items-center justify-center text-accent-ink">
            <Icon className="w-5 h-5" />
          </span>

          {project.status === 'live' ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="font-dmSans font-semibold text-[11px] text-emerald-500 uppercase tracking-widest leading-none">
                Live
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="font-dmSans font-semibold text-[11px] text-amber-500 uppercase tracking-widest leading-none">
                Planned
              </span>
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center w-full mt-1">
            <h3 className="font-syne font-bold text-xl text-ink tracking-tight group-hover:text-accent-ink transition-colors duration-200">
              {project.name}
            </h3>
            {project.status === 'live' && (
              <motion.a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-frost hover:text-accent-ink hover:border-accent transition-all duration-300 cursor-pointer"
                aria-label={`Visit repository for ${project.name}`}
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}
          </div>
          <span className="font-dmSans font-medium text-[11px] text-frost uppercase tracking-widest block mt-0.5">
            {project.subtitle}
          </span>
        </div>
      </div>

      <p className="font-dmSans font-normal text-frost text-sm leading-relaxed mt-4 flex-1">
        {project.description}
      </p>
    </SpotlightCard>
  );
}

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section
      id="projects"
      className="py-28 md:py-40 px-6 max-w-[1200px] mx-auto w-full relative z-10 scroll-mt-24 select-none"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="flex flex-col gap-12"
      >
        <div className="flex flex-col gap-4 items-start max-w-2xl">
          <span className="section-label">02 — What I&rsquo;ve built</span>
          <h2 className="font-syne font-extrabold leading-tight tracking-tight text-ink" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            Real products. Real code. Real results.
          </h2>
          <p className="font-dmSans font-normal text-base md:text-lg text-frost leading-relaxed">
            Built using modern web standards and reliable software architecture.
          </p>
          <div className="rule-accent mt-1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {projectsData.map((project) => (
            <motion.div key={project.id} variants={itemVariants} className="h-full">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
