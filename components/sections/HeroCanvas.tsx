// components/sections/HeroCanvas.tsx
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  // Create a spherical particle distribution
  const [positions, colors] = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorAccent = new THREE.Color('#254E91'); // Accent blue
    const colorGold = new THREE.Color('#C9A84C'); // Gold

    for (let i = 0; i < count; i++) {
      // Spherical coordinate generation
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 8 + Math.random() * 12; // Distance range

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Blend colors based on distance
      const mixedColor = colorAccent.clone().lerp(colorGold, Math.random() * 0.4);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Constant rotation
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;

    // React slowly to mouse coordinates
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mouse.x * 2.5, 0.05);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mouse.y * 2.5, 0.05);
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
        <PointMaterial
          transparent
          vertexColors
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div id="hero-canvas-container" className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#254E91" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#C9A84C" />
        <ParticleField />
      </Canvas>
    </div>
  );
}
