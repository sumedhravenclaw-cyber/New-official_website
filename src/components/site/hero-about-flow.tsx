"use client";

import { HeroSection } from "./hero-section";
import { AboutSection } from "./about-section";

/**
 * Wraps Hero and About so the phoenix can span both.
 *
 * The hero used to set overflow-hidden, which sheared the phoenix's tail off
 * flat at the section boundary. The hero now lets the bird overflow and this
 * wrapper takes over the clipping, so the bird still can't cause a horizontal
 * scrollbar but its tail is free to sweep across the seam and fade out inside
 * About as one flow.
 *
 * Neither section paints a background: the body carries the single surface
 * colour, which is what lets the site-wide dot field show through.
 */
export function HeroAboutFlow() {
  return (
    <div className="relative overflow-hidden">
      <HeroSection />
      <AboutSection />
    </div>
  );
}
