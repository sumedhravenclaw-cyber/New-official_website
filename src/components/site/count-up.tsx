"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1800;

/** Splits "150+" into { prefix: "", target: 150, suffix: "+" }. */
function parseValue(value: string) {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!match) return null;
  const target = Number(match[2].replace(/,/g, ""));
  if (!Number.isFinite(target)) return null;
  return { prefix: match[1], target, suffix: match[3] };
}

// Fast out the gate, easing into the final number — reads as a tally landing
// rather than a linear ramp.
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts from zero up to the number inside `value`, starting the first time
 * the element scrolls into view and stopping exactly on the target.
 *
 * Non-numeric values are rendered as-is, and the final number is shown
 * immediately when the user prefers reduced motion.
 */
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const parsed = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed) return;

    const { target } = parsed;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect(); // count once, not on every scroll-back

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          setCount(Math.round(easeOutCubic(progress) * target));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // `parsed` is derived from `value` — re-run only when the value itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!parsed) return <span className={className}>{value}</span>;

  return (
    // tabular-nums keeps the digits from jittering the layout as they tick up.
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {parsed.prefix}
      {count.toLocaleString()}
      {parsed.suffix}
    </span>
  );
}
