'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface LineWavesColors {
  color1: string;
  color2: string;
  color3: string;
  brightness: number;
}

const LineWavesColorContext = createContext<LineWavesColors | undefined>(undefined);

export function useLineWavesColors() {
  const context = useContext(LineWavesColorContext);
  if (!context) {
    throw new Error('useLineWavesColors must be used within a LineWavesColorProvider');
  }
  return context;
}

export function LineWavesColorProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [colors, setColors] = useState<LineWavesColors>({
    color1: '#1A365D',
    color2: '#9A7B2C',
    color3: '#4F46E5',
    brightness: 0.10,
  });

  useEffect(() => {
    // Helper function to extract CSS variable colors
    const getCSSVar = (name: string, fallback: string) => {
      const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return val || fallback;
    };

    const isDark = resolvedTheme === 'dark';
    const computedBrightness = isDark ? 0.12 : 0.08;

    setColors({
      color1: getCSSVar('--bg-wave-1', isDark ? '#254E91' : '#1A365D'),
      color2: getCSSVar('--bg-wave-2', isDark ? '#C9A84C' : '#9A7B2C'),
      color3: getCSSVar('--bg-wave-3', isDark ? '#6366F1' : '#4F46E5'),
      brightness: computedBrightness,
    });
  }, [resolvedTheme]);

  return (
    <LineWavesColorContext.Provider value={colors}>
      {children}
    </LineWavesColorContext.Provider>
  );
}
