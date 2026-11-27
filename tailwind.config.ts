// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        syne: ['var(--font-syne)', 'Syne', 'sans-serif'],
        dmSans: ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
        // Instrument Serif italic — the hero name's serif voice, used once.
        serifDisplay: ['var(--font-serif-display)', 'Instrument Serif', 'Georgia', 'serif'],
      },
      colors: {
        void: 'rgb(var(--void-rgb) / <alpha-value>)',
        abyss: 'var(--abyss)',
        surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        // Text-safe accent: darker blue on light, lighter blue on dark.
        'accent-ink': 'var(--accent-ink)',
        gold: 'rgb(var(--gold-rgb) / <alpha-value>)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        frost: 'var(--frost)',
        border: 'rgb(var(--border-rgb) / <alpha-value>)',
      },
      borderRadius: {
        capsule: '9999px',
        card: '4px',
        cardSm: '4px',
      },
      boxShadow: {
        // One quiet blue glow, kept only for the rare places that need it.
        glow: '0 0 30px rgba(37, 78, 145, 0.25)',
        'glow-lg': '0 0 60px rgba(37, 78, 145, 0.2)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
