"use client";

import { useAnimate } from "framer-motion";
import { useEffect } from "react";

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const DIM = "#5a5a66";
const EASE_UP = [0.22, 1, 0.36, 1] as const;

// Tweak these to reposition the vertical "BEYOND" word independently of
// the .words stack — overrides the left/top set in globals.css.
const BEYOND_POSITION = { left: "8%", top: "45%" };

export default function BeyondClicks() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    let cancelled = false;

    const reset = () =>
      animate([
        [".word", { y: "115%", opacity: 0 }, { duration: 0 }],
        [
          ".beyond",
          { opacity: 0, color: DIM, letterSpacing: "0.04em" },
          { duration: 0, at: 0 },
        ],
      ]);

    const slideUp = (selector: string) =>
      animate(selector, { y: "0%", opacity: 1 }, { duration: 0.7, ease: EASE_UP });

    // The while-loop's `cancelled` check only guards the *next* lap.
    // A single lap is a long chain of awaited animate() calls, and if
    // we unmount mid-chain (route change, Fast Refresh, etc.) scope.current
    // goes null immediately - but the remaining queued animate() calls in
    // that lap don't know that yet and fire anyway. This helper re-checks
    // right before every step so we bail the instant we've gone stale.
    const stopped = () => cancelled || !scope.current;

    const run = async () => {
      while (!cancelled) {
        await reset();
        if (stopped()) return;
        await new Promise(requestAnimationFrame);
        if (stopped()) return;

        animate(".beyond", { opacity: 1 }, { duration: 0.5 });
        await slideUp(".word-1");
        if (stopped()) return;
        await slideUp(".word-2");
        if (stopped()) return;
        await slideUp(".word-3");
        if (stopped()) return;

        // Read the actual computed color so framer-motion can interpolate it
        // (CSS variables themselves aren't animatable values).
        const targetColor = getComputedStyle(document.documentElement)
          .getPropertyValue("--color-charcoal")
          .trim() || "#050505";

        await animate(
          ".beyond",
          { color: targetColor, letterSpacing: "1.28em" },
          { duration: 1.7, ease: [0.16, 1, 0.3, 1] }
        );
        if (stopped()) return;

        await wait(1500);
        if (stopped()) return;

        await animate([
          [".word", { y: "-40%", opacity: 0 }, { duration: 0.6, ease: "easeIn" }],
          [".beyond", { opacity: 0 }, { duration: 0.6, at: 0 }],
        ]);
        await wait(350);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [animate, scope]);

  return (
    <div
      className="beyond-clicks-stage relative w-full"
      style={{ height: "clamp(200px, 64vmin, 620px)" }}
      ref={scope}
    >
      <div className="beyond" style={BEYOND_POSITION}>BEYOND</div>

      <div className="words">
        <span className="line">
          <span className="word word-1">Campaigns</span>
        </span>
        <span className="line">
          <span className="word word-2">Clicks</span>
        </span>
        <span className="line">
          <span className="word word-3">Competition</span>
        </span>
      </div>
    </div>
  );
}
