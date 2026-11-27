// components/layout/ThemeToggle.tsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

/**
 * The theme toggle. Dark is the default look; the toggle switches to the
 * warm-paper light theme and back, and the choice is remembered by
 * next-themes. Previously the layout forced dark, so no toggle existed.
 */
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a same-size placeholder so the navbar never shifts on hydrate.
    return <span className="w-10 h-10 shrink-0" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full border border-border text-frost hover:text-ink hover:border-accent transition-colors duration-200 cursor-pointer"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
