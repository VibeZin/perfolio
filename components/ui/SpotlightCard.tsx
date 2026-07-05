import React, { useRef, useState, useCallback, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  innerClassName?: string;
  spotlightColor?: string;
  style?: React.CSSProperties;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  innerClassName = '',
  spotlightColor = 'rgba(255, 255, 255, 0.15)',
  style
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);
  
  // Cache the bounding rect so we don't force layout on every mousemove
  const rectCache = useRef<DOMRect | null>(null);
  const rafPending = useRef<boolean>(false);

  // Invalidate the rect cache on resize/scroll (not on every mousemove)
  useEffect(() => {
    if (!divRef.current) return;
    const ro = new ResizeObserver(() => { rectCache.current = null; });
    ro.observe(divRef.current);
    return () => ro.disconnect();
  }, []);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    if (isFocused || rafPending.current) return;

    // Throttle to one update per animation frame
    rafPending.current = true;
    const clientX = e.clientX;
    const clientY = e.clientY;

    requestAnimationFrame(() => {
      rafPending.current = false;
      if (!divRef.current) return;
      // Use cached rect, only recompute if invalidated
      if (!rectCache.current) {
        rectCache.current = divRef.current.getBoundingClientRect();
      }
      const rect = rectCache.current;
      setPosition({ x: clientX - rect.left, y: clientY - rect.top });
    });
  }, [isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.5);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    // Refresh rect on enter (scroll may have moved things)
    rectCache.current = null;
    setOpacity(0.5);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          zIndex: 1,
        }}
      />
      <div className={`relative z-10 w-full h-full ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
