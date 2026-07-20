"use client";

import dynamic from "next/dynamic";
import { ErrorBoundary } from "./error-boundary";

// Client boundary for the dot field. The layout is a Server Component, where
// `ssr: false` is not allowed — and the field needs it, since three.js touches
// window/canvas on mount. Keeping the dynamic import here also holds three.js
// out of the initial bundle.
const DotsBackground = dynamic(
  () => import("./dots-background").then((m) => m.DotsBackground),
  { ssr: false }
);

export function SiteBackground() {
  // Purely decorative, and mounted in the root layout — so a WebGL context
  // failure here must not escalate to global-error.tsx and blank the site.
  // Falling back to nothing just means the page renders on its flat surface
  // colour, which every section is already designed against.
  return (
    <ErrorBoundary label="SiteBackground">
      <DotsBackground />
    </ErrorBoundary>
  );
}
