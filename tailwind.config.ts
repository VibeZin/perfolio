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
      },
      colors: {
        void: 'rgb(var(--void-rgb) / <alpha-value>)',
        abyss: 'var(--abyss)',
        surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        gold: 'rgb(var(--gold-rgb) / <alpha-value>)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        frost: 'var(--frost)',
        border: 'rgb(var(--border-rgb) / <alpha-value>)',
      },
      borderRadius: {
        capsule: '9999px',
        card: '28px',
        cardSm: '16px',
      },
      boxShadow: {
        glow: '0 0 30px rgba(124, 92, 252, 0.35)',
        'glow-lg': '0 0 60px rgba(124, 92, 252, 0.3)',
        'glow-gold': '0 0 30px rgba(232, 169, 54, 0.3)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
