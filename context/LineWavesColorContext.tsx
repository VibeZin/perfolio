'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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
  // One colour only: blue. The old indigo (#6366F1) and gold (#C9A84C)
  // waves competed with the accent; the background is now a single blue
  // line field, faint enough to sit behind the content.
  const [colors, setColors] = useState<LineWavesColors>({
    color1: '#254E91',
    color2: '#254E91',
    color3: '#254E91',
    brightness: 0.1,
  });

  useEffect(() => {
    const getCSSVar = (name: string, fallback: string) => {
      const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return val || fallback;
    };

    setColors({
      color1: getCSSVar('--bg-wave-1', '#254E91'),
      color2: getCSSVar('--bg-wave-2', '#254E91'),
      color3: getCSSVar('--bg-wave-3', '#254E91'),
      brightness: 0.1,
    });
  }, []);

  return (
    <LineWavesColorContext.Provider value={colors}>
      {children}
    </LineWavesColorContext.Provider>
  );
}
