'use client';

import React from 'react';
import GlassSurface, { GlassSurfaceProps } from '@/components/ui/GlassSurface';
import { ArrowUpRight } from 'lucide-react';
import Magnetic from '@/components/animations/Magnetic';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PURE LIQUID GLASSMORPHIC DESIGN PRESET — PERMANENT & IMMUTABLE
 * ─────────────────────────────────────────────────────────────────────────────
 * This component preserves the exact, approved liquid glassmorphic design
 * for the Shabab Ahmed Portfolio. Any future buttons should consume this
 * component or its exported constants to ensure 100% visual consistency.
 *
 * Design Spec:
 * - Refractive liquid displacement heightmap (scale: 270, displace: 0.6)
 * - Chromatic aberration offsets: Red +10, Green +14, Blue +2
 * - Dynamic lighting: Brightness 45, Opacity 0.43, Mix-blend: screen
 * - Specular reflections: 1px top highlight rim + curved upper glare
 * - Warm breathing outline aura (.warm-breathe-glow)
 * - Pulsating amber beacon dot + micro-arrow
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const GLASS_DISPLACEMENT_PROPS = {
  displace: 0.6,
  distortionScale: 270,
  redOffset: 10,
  greenOffset: 14,
  blueOffset: 2,
  brightness: 45,
  opacity: 0.43,
  mixBlendMode: 'screen' as const,
  borderRadius: 9999,
};

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  showBeacon?: boolean;
  showArrow?: boolean;
  warmGlow?: boolean;
  magnetic?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  glassProps?: Partial<GlassSurfaceProps>;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  showBeacon = true,
  showArrow = true,
  warmGlow = true,
  magnetic = true,
  href,
  target,
  rel,
  className = '',
  glassProps = {},
  ...buttonProps
}) => {
  const content = (
    <GlassSurface
      {...GLASS_DISPLACEMENT_PROPS}
      {...glassProps}
      className={`${warmGlow ? 'warm-breathe-glow' : ''} px-6 sm:px-7 py-3 h-[52px] sm:h-12 w-full sm:w-auto min-w-[150px] sm:min-w-[165px] transition-all duration-300 group-hover:scale-[1.02] flex items-center justify-center ${className}`}
    >
      <div className="flex items-center justify-center gap-2.5">
        {showBeacon && (
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 shadow-[0_0_10px_#F59E0B]" />
          </span>
        )}

        <span className="font-dmSans font-semibold text-sm sm:text-base text-ink tracking-wide whitespace-nowrap transition-colors duration-200 group-hover:text-amber-400">
          {children}
        </span>

        {showArrow && (
          <ArrowUpRight className="w-4 h-4 text-amber-500/85 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-400" />
        )}
      </div>
    </GlassSurface>
  );

  const wrapperClass =
    'group relative inline-flex items-center justify-center p-0 rounded-full focus:outline-none cursor-pointer select-none transition-transform active:scale-[0.97] w-full sm:w-auto';

  const inner = href ? (
    <a
      href={href}
      target={target}
      rel={rel}
      className={wrapperClass}
      aria-label={typeof children === 'string' ? children : 'Action'}
    >
      {content}
    </a>
  ) : (
    <button className={wrapperClass} {...buttonProps}>
      {content}
    </button>
  );

  return magnetic ? <Magnetic className="flex-1 sm:flex-initial">{inner}</Magnetic> : inner;
};

export default GlassButton;
