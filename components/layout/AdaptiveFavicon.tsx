'use client';

import { useEffect } from 'react';

/**
 * AdaptiveFavicon dynamically updates the browser tab favicon
 * based on whether the browser/OS is in dark mode or light mode.
 * - Dark mode  -> Crisp white signature with drop shadow
 * - Light mode -> Crisp black signature with drop shadow
 */
export default function AdaptiveFavicon() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateFavicon = (isDark: boolean) => {
      const selected = isDark
        ? { png32: '/favicon-dark-32x32.png?v=5', ico: '/favicon-dark.ico?v=5', png: '/favicon-dark.png?v=5' }
        : { png32: '/favicon-light-32x32.png?v=5', ico: '/favicon-light.ico?v=5', png: '/favicon-light.png?v=5' };

      // Remove existing icon links to force browser UI thread to re-read the icon
      document.querySelectorAll<HTMLLinkElement>("link[rel='icon'], link[rel='shortcut icon']").forEach((el) => {
        el.remove();
      });

      // 1. Primary 32x32 PNG icon
      const link32 = document.createElement('link');
      link32.rel = 'icon';
      link32.type = 'image/png';
      link32.sizes = '32x32';
      link32.href = selected.png32;
      document.head.appendChild(link32);

      // 2. High-res PNG icon
      const linkHigh = document.createElement('link');
      linkHigh.rel = 'icon';
      linkHigh.type = 'image/png';
      linkHigh.sizes = '512x512';
      linkHigh.href = selected.png;
      document.head.appendChild(linkHigh);

      // 3. Fallback shortcut ICO
      const shortcut = document.createElement('link');
      shortcut.rel = 'shortcut icon';
      shortcut.href = selected.ico;
      document.head.appendChild(shortcut);
    };

    // Initial check
    updateFavicon(mediaQuery.matches);

    // Dynamic real-time listener when OS/browser theme changes
    const handler = (e: MediaQueryListEvent) => updateFavicon(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return null;
}
