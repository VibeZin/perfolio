'use client';

import React, { useRef, useState, useEffect, useId, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: 'R' | 'G' | 'B';
  yChannel?: 'R' | 'G' | 'B';
  mixBlendMode?:
    | 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten'
    | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light'
    | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color'
    | 'luminosity' | 'plus-darker' | 'plus-lighter';
  className?: string;
  style?: React.CSSProperties;
}

// ─── Shadow constants ─────────────────────────────────────────────────────────

const SHADOW_SVG_DARK = [
  '0 0 2px 1px color-mix(in oklch, white, transparent 65%) inset',
  '0 0 10px 4px color-mix(in oklch, white, transparent 85%) inset',
  '0px 4px 16px rgba(17, 17, 26, 0.05)',
  '0px 8px 24px rgba(17, 17, 26, 0.05)',
  '0px 16px 56px rgba(17, 17, 26, 0.05)',
  '0px 4px 16px rgba(17, 17, 26, 0.05) inset',
  '0px 8px 24px rgba(17, 17, 26, 0.05) inset',
  '0px 16px 56px rgba(17, 17, 26, 0.05) inset',
].join(', ');

const SHADOW_SVG_LIGHT = [
  '0 0 2px 1px color-mix(in oklch, black, transparent 85%) inset',
  '0 0 10px 4px color-mix(in oklch, black, transparent 90%) inset',
  '0px 4px 16px rgba(17, 17, 26, 0.05)',
  '0px 8px 24px rgba(17, 17, 26, 0.05)',
  '0px 16px 56px rgba(17, 17, 26, 0.05)',
  '0px 4px 16px rgba(17, 17, 26, 0.05) inset',
  '0px 8px 24px rgba(17, 17, 26, 0.05) inset',
  '0px 16px 56px rgba(17, 17, 26, 0.05) inset',
].join(', ');

const SHADOW_INSET_DARK = 'inset 0 1px 0 0 rgba(255,255,255,0.2), inset 0 -1px 0 0 rgba(255,255,255,0.1)';
const SHADOW_INSET_LIGHT = '0 8px 32px 0 rgba(31,38,135,0.2), 0 2px 16px 0 rgba(31,38,135,0.1), inset 0 1px 0 0 rgba(255,255,255,0.4), inset 0 -1px 0 0 rgba(255,255,255,0.2)';

// ─── Component ────────────────────────────────────────────────────────────────

const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width,
  height,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {},
  ...divProps
}) => {
  const reactId = useId();
  const uniqueId = reactId.replace(/:/g, '-');
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const [svgSupported, setSvgSupported] = useState(false);
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const feImageRef = useRef<SVGFEImageElement | null>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const isWebkit = typeof navigator !== 'undefined' && /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = typeof navigator !== 'undefined' && /Firefox/.test(navigator.userAgent);
    setSvgSupported(!isWebkit && !isFirefox);
  }, []);

  const isDarkMode = true;

  // Builds the SVG data URI that acts as the displacement heightmap
  const generateDisplacementMap = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    const w = Math.max(20, Math.round(rect?.width || 200));
    const h = Math.max(20, Math.round(rect?.height || 50));
    const edge = Math.max(1, Math.min(w, h) * (borderWidth * 0.5));

    const svg = `
      <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="black"/>
        <rect width="${w}" height="${h}" rx="${borderRadius}" fill="url(#${redGradId})"/>
        <rect width="${w}" height="${h}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode:${mixBlendMode}"/>
        <rect x="${edge}" y="${edge}" width="${Math.max(1, w - edge * 2)}" height="${Math.max(1, h - edge * 2)}"
              rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)"/>
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }, [borderWidth, borderRadius, mixBlendMode, brightness, opacity, blur, redGradId, blueGradId]);

  const updateDisplacementMap = useCallback(() => {
    if (feImageRef.current) {
      feImageRef.current.setAttribute('href', generateDisplacementMap());
    }
  }, [generateDisplacementMap]);

  // Applies per-channel offsets to create the chromatic aberration prism effect
  const updateChannels = useCallback(() => {
    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset },
    ].forEach(({ ref, offset }) => {
      if (!ref.current) return;
      ref.current.setAttribute('scale', (distortionScale + offset).toString());
      ref.current.setAttribute('xChannelSelector', xChannel);
      ref.current.setAttribute('yChannelSelector', yChannel);
    });

    if (gaussianBlurRef.current) {
      gaussianBlurRef.current.setAttribute('stdDeviation', displace.toString());
    }
  }, [distortionScale, redOffset, greenOffset, blueOffset, xChannel, yChannel, displace]);

  // Runs when the container mounts
  const containerCallbackRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    containerRef.current = node;

    requestAnimationFrame(() => {
      updateDisplacementMap();
      updateChannels();
    });

    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(updateDisplacementMap);
      });
      resizeObserver.observe(node);
      return () => resizeObserver.disconnect();
    }
  }, [updateDisplacementMap, updateChannels]);

  // Re-sync SVG filter when distortion/offset props change after mount
  const prevPropsRef = useRef({ distortionScale, redOffset, greenOffset, blueOffset, displace });
  useEffect(() => {
    if (!mounted) return;
    const prev = prevPropsRef.current;
    if (
      prev.distortionScale !== distortionScale ||
      prev.redOffset !== redOffset ||
      prev.greenOffset !== greenOffset ||
      prev.blueOffset !== blueOffset ||
      prev.displace !== displace
    ) {
      prevPropsRef.current = { distortionScale, redOffset, greenOffset, blueOffset, displace };
      requestAnimationFrame(() => {
        updateDisplacementMap();
        updateChannels();
      });
    }
  }, [mounted, distortionScale, redOffset, greenOffset, blueOffset, displace, updateDisplacementMap, updateChannels]);

  // ─── Styles ──────────────────────────────────────────────────────────────────

  const baseStyles: React.CSSProperties = {
    ...style,
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    borderRadius: `${borderRadius}px`,
  };

  const backdropSupported =
    mounted && typeof window !== 'undefined' && CSS.supports('backdrop-filter', 'blur(10px)');

  const getContainerStyles = (): React.CSSProperties => {
    if (svgSupported) {
      return {
        ...baseStyles,
        background: isDarkMode
          ? `hsl(0 0% 0% / ${backgroundOpacity})`
          : `hsl(0 0% 100% / ${backgroundOpacity})`,
        backdropFilter: `url(#${filterId}) saturate(${saturation})`,
        WebkitBackdropFilter: `url(#${filterId}) saturate(${saturation})`,
        boxShadow: isDarkMode ? SHADOW_SVG_DARK : SHADOW_SVG_LIGHT,
      };
    }

    const cssBlur = isDarkMode
      ? 'blur(12px) saturate(1.8) brightness(1.2)'
      : 'blur(12px) saturate(1.8) brightness(1.1)';

    if (isDarkMode) {
      return backdropSupported
        ? {
            ...baseStyles,
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: cssBlur,
            WebkitBackdropFilter: cssBlur,
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: SHADOW_INSET_DARK,
          }
        : {
            ...baseStyles,
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: SHADOW_INSET_DARK,
          };
    }

    return backdropSupported
      ? {
          ...baseStyles,
          background: 'rgba(255,255,255,0.25)',
          backdropFilter: cssBlur,
          WebkitBackdropFilter: cssBlur,
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: SHADOW_INSET_LIGHT,
        }
      : {
          ...baseStyles,
          background: 'rgba(255,255,255,0.4)',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: SHADOW_INSET_LIGHT,
        };
  };

  const focusRing = isDarkMode
    ? 'focus-visible:outline-2 focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2'
    : 'focus-visible:outline-2 focus-visible:outline-[#007AFF] focus-visible:outline-offset-2';

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div
      ref={containerCallbackRef}
      className={`relative flex items-center justify-center overflow-hidden transition-all duration-[260ms] ease-out ${focusRing} ${className}`}
      style={getContainerStyles()}
      {...divProps}
    >
      {/* Hidden SVG housing the displacement filter — applied via backdropFilter above */}
      <svg className="w-full h-full pointer-events-none absolute inset-0 opacity-0 -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map"/>

            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" result="dispRed"/>
            <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red"/>

            <feDisplacementMap ref={greenChannelRef} in="SourceGraphic" in2="map" result="dispGreen"/>
            <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green"/>

            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" result="dispBlue"/>
            <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue"/>

            <feBlend in="red" in2="green" mode="screen" result="rg"/>
            <feBlend in="rg" in2="blue" mode="screen" result="output"/>
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7"/>
          </filter>
        </defs>
      </svg>

      <div className="w-full h-full flex items-center justify-center rounded-[inherit] relative z-10 pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;
