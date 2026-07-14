"use client";

import dynamic from "next/dynamic";

// Client boundary for the dot field. The layout is a Server Component, where
// `ssr: false` is not allowed — and the field needs it, since three.js touches
// window/canvas on mount. Keeping the dynamic import here also holds three.js
// out of the initial bundle.
const DotsBackground = dynamic(
  () => import("./dots-background").then((m) => m.DotsBackground),
  { ssr: false }
);

export function SiteBackground() {
  return <DotsBackground />;
}
