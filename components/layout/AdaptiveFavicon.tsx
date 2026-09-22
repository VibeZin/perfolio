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
      const darkIcons = {
        ico: '/favicon-dark.ico?v=4',
        png32: '/favicon-dark-32x32.png?v=4',
        png: '/favicon-dark.png?v=4',
      };
      const lightIcons = {
        ico: '/favicon-light.ico?v=4',
        png32: '/favicon-light-32x32.png?v=4',
        png: '/favicon-light.png?v=4',
      };

      const selected = isDark ? darkIcons : lightIcons;

      // Update shortcut icon / default ico
      const shortcut = document.querySelector<HTMLLinkElement>("link[rel='shortcut icon']");
      if (shortcut) shortcut.href = selected.ico;

      // Update 32x32 icon
      const icon32 = document.querySelector<HTMLLinkElement>("link[rel='icon'][sizes='32x32']");
      if (icon32) icon32.href = selected.png32;

      // Update default icon if present without explicit media query
      const defaultIcon = document.querySelector<HTMLLinkElement>("link[rel='icon']:not([media]):not([type='image/svg+xml'])");
      if (defaultIcon) defaultIcon.href = selected.png;
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
