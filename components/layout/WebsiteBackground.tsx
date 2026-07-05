'use client';

import { useEffect, useState, useRef } from 'react';
import LineWaves from '@/components/ui/LineWaves';
import { useLineWavesColors } from '@/context/LineWavesColorContext';

export default function WebsiteBackground() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const colors = useLineWavesColors();

  useEffect(() => {
    setMounted(true);
    // Detect touch/mobile once on mount
    const checkMobile = () => setIsMobile(navigator.maxTouchPoints > 0 || window.innerWidth < 768);
    checkMobile();
    // Listen for resize in case of orientation change
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden select-none bg-void transition-colors duration-300"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    >
      {/* LineWaves canvas background */}
      <div className="absolute inset-0 w-full h-full">
        <LineWaves
          speed={isMobile ? 0.10 : 0.15}
          innerLineCount={isMobile ? 18 : 30}
          outerLineCount={isMobile ? 22 : 34}
          warpIntensity={isMobile ? 0.5 : 0.8}
          rotation={-35}
          edgeFadeWidth={0.1}
          colorCycleSpeed={0.5}
          brightness={colors.brightness}
          color1={colors.color1}
          color2={colors.color2}
          color3={colors.color3}
          enableMouseInteraction={!isMobile}
          mouseInfluence={1.5}
        />
      </div>

      {/* Dynamic ambient radial vignette overlay to secure text legibility in the center */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(var(--void-rgb), 0.35) 0%, rgba(var(--void-rgb), 0.75) 45%, var(--void) 90%)',
        }}
      />
    </div>
  );
}
