'use client';

import { ReactNode } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
