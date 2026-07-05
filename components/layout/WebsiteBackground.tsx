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
      {isMobile ? (
        /*
         * MOBILE: pure CSS gradient — zero WebGL, zero GPU shader cost.
         * A static gradient is indistinguishable from a subtle animated one
         * on a small screen, and frees the GPU entirely for scroll compositing.
         */
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 10%, rgba(var(--accent-rgb), 0.07) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 80% 90%, rgba(var(--gold-rgb), 0.05) 0%, transparent 60%),
              radial-gradient(ellipse 100% 100% at 50% 50%, rgba(var(--accent-rgb), 0.03) 0%, transparent 80%)
            `,
          }}
        />
      ) : (
        /* DESKTOP: full animated WebGL background */
        <>
          <div className="absolute inset-0 w-full h-full">
            <LineWaves
              speed={0.15}
              innerLineCount={30}
              outerLineCount={34}
              warpIntensity={0.8}
              rotation={-35}
              edgeFadeWidth={0.1}
              colorCycleSpeed={0.5}
              brightness={colors.brightness}
              color1={colors.color1}
              color2={colors.color2}
              color3={colors.color3}
              enableMouseInteraction={true}
              mouseInfluence={1.5}
            />
          </div>
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(var(--void-rgb), 0.35) 0%, rgba(var(--void-rgb), 0.75) 45%, var(--void) 90%)',
            }}
          />
        </>
      )}
    </div>
  );
}
