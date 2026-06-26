// components/layout/ThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-16 h-8 rounded-full border border-border bg-transparent" />
    );
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;
  const isDark = currentTheme === 'dark';

  return (
    <button
      id="theme-toggle-btn"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex items-center justify-between w-16 h-8 px-2.5 rounded-full border border-border hover:border-accent bg-surface/30 cursor-pointer overflow-hidden transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center text-gold"
          >
            <Sun className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center text-accent"
          >
            <Moon className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-border/20 transition-all duration-300 ${
          isDark ? 'right-2' : 'left-2'
        }`}
      />
    </button>
  );
}
