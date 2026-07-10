"use client";

import { useAnimate } from "framer-motion";
import { useEffect } from "react";

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const DIM = "#5a5a66";
const EASE_UP = [0.22, 1, 0.36, 1] as const;

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

    const run = async () => {
      while (!cancelled) {
        await reset();
        await new Promise(requestAnimationFrame);

        animate(".beyond", { opacity: 1 }, { duration: 0.5 });
        await slideUp(".word-1");
        await slideUp(".word-2");
        await slideUp(".word-3");

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

        await wait(1500);

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
  }, [animate]);

  return (
    <div
      className="beyond-clicks-stage relative w-full"
      style={{ height: "clamp(200px, 64vmin, 620px)" }}
      ref={scope}
    >
      <div className="beyond">BEYOND</div>

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
