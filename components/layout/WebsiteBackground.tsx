'use client';

import { useEffect, useState } from 'react';
import LineWaves from '@/components/ui/LineWaves';
import { useLineWavesColors } from '@/context/LineWavesColorContext';

export default function WebsiteBackground() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const colors = useLineWavesColors();

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(navigator.maxTouchPoints > 0 || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden select-none bg-void"
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Animated WebGL Ripple Waves — rendered on all devices, auto-optimized on mobile */}
      <div className="absolute inset-0 w-full h-full">
        <LineWaves
          speed={isMobile ? 0.12 : 0.15}
          innerLineCount={isMobile ? 24 : 30}
          outerLineCount={isMobile ? 28 : 34}
          warpIntensity={0.8}
          rotation={-35}
          edgeFadeWidth={0.1}
          colorCycleSpeed={0.5}
          brightness={isMobile ? Math.max(colors.brightness, 0.15) : colors.brightness}
          color1={colors.color1}
          color2={colors.color2}
          color3={colors.color3}
          enableMouseInteraction={!isMobile}
          mouseInfluence={1.5}
        />
      </div>

      {/* Smooth vignette overlay to blend edges with the void background while keeping ripples clear */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: isMobile
            ? 'radial-gradient(ellipse 95% 75% at 50% 50%, rgba(var(--void-rgb), 0.2) 0%, rgba(var(--void-rgb), 0.65) 55%, var(--void) 95%)'
            : 'radial-gradient(circle at 50% 50%, rgba(var(--void-rgb), 0.35) 0%, rgba(var(--void-rgb), 0.75) 45%, var(--void) 90%)',
        }}
      />
    </div>
  );
}
