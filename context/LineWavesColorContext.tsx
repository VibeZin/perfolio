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
  const [colors, setColors] = useState<LineWavesColors>({
    color1: '#254E91',
    color2: '#C9A84C',
    color3: '#6366F1',
    brightness: 0.12,
  });

  useEffect(() => {
    // Helper function to extract CSS variable colors
    const getCSSVar = (name: string, fallback: string) => {
      const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return val || fallback;
    };

    setColors({
      color1: getCSSVar('--bg-wave-1', '#254E91'),
      color2: getCSSVar('--bg-wave-2', '#C9A84C'),
      color3: getCSSVar('--bg-wave-3', '#6366F1'),
      brightness: 0.12,
    });
  }, []);

  return (
    <LineWavesColorContext.Provider value={colors}>
      {children}
    </LineWavesColorContext.Provider>
  );
}
