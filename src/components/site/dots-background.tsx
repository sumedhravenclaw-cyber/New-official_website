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

const COUNT = 1000; // mobile-safe baseline per three.js perf guidance

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

/**
 * A soft round sprite for the points.
 *
 * Without a map, three.js renders every point as a hard-edged square — which is
 * exactly what these used to look like. The radial alpha falloff is what makes
 * them read as dots.
 */
function makeDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.45, "rgba(255,255,255,0.95)");
  g.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Ambient particle field — brand-colored dots drifting behind the whole site. */
function DotField({ reduced }: { reduced: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

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

  const dotTexture = useMemo(makeDotTexture, []);
  useEffect(() => () => dotTexture.dispose(), [dotTexture]);

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
        map={dotTexture}
        size={0.075}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Site-wide ambient dot field.
 *
 * Mounted once in the root layout as a fixed, pointer-events-none layer that
 * sits above the page background but beneath all content, so the dots drift
 * behind every page rather than only the hero. Sections are transparent (they
 * share the body's single surface colour), which is what lets this show through.
 *
 * Skipped on very small viewports to keep mobile TTI low.
 */
export function DotsBackground() {
  const reduced = useReducedMotion();
  const [enabled] = useState(() => window.innerWidth >= 480);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <DotField reduced={reduced} />
      </Canvas>
    </div>
  );
}
