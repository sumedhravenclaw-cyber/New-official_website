"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// RavenClaw brand gradient — same stops used across text-gradient / gradient-bg.
const BRAND_COLORS = [
  "#EA9D12", // golden
  "#D96016",
  "#CC2829", // crimson
  "#A7069B", // magenta
  "#631DFE", // violet
  "#5A5DFE",
  "#5B9EFE", // blue
  "#5E9929", // green
];

function useReducedMotion() {
  // Lazy-initialized: this component only ever mounts client-side (loaded
  // via next/dynamic with ssr:false), so `window` is always available here.
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/** Ambient particle field — brand-colored points drifting behind the hero copy. */
function ParticleField({ reduced }: { reduced: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const COUNT = 1000; // mobile-safe baseline per three.js perf guidance

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const palette = BRAND_COLORS.map((c) => new THREE.Color(c));

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 16;
      pos[i3 + 1] = (Math.random() - 0.5) * 10;
      pos[i3 + 2] = (Math.random() - 0.5) * 8;

      const c = palette[i % palette.length];
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (reduced || !pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;
  });

  return (
    <points ref={pointsRef} scale={[viewport.width / 12, viewport.width / 12, 1]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Scene({ reduced }: { reduced: boolean }) {
  return (
    <>
      <ParticleField reduced={reduced} />
    </>
  );
}

/**
 * Full-bleed 3D layer for the hero. Sits behind the copy (pointer-events
 * none) and is skipped on very small viewports to keep mobile TTI low.
 */
export function Hero3D() {
  const reduced = useReducedMotion();
  // Skip the 3D layer on very small viewports to keep mobile TTI low.
  const [enabled] = useState(() => window.innerWidth >= 480);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Scene reduced={reduced} />
      </Canvas>
    </div>
  );
}
