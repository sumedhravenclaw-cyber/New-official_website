"use client";

import { ArrowUpRight } from "lucide-react";
import { useCalendlyPopup } from "./calendly";
import { contactInfo } from "@/lib/site-data";

// Fixed dark band — stays dark in both light and dark themes, like the footer.
const BAND_BG = "#050505";

export function LetsTalkSection() {
  const { open, loading } = useCalendlyPopup();

  const email =
    contactInfo.find((c) => c.icon === "Mail")?.value || "hello@ravenclaw.com";

  return (
    <section
      id="lets-talk"
      className="relative overflow-hidden section-reveal"
      style={{ backgroundColor: BAND_BG, color: "#FEFEFE" }}
    >
      {/* Top gradient hairline */}
      <div
        className="h-1"
        style={{
          background:
            "linear-gradient(90deg, #EA9D12, #D96016, #CC2829, #A7069B, #631DFE, #5A5DFE)",
        }}
      />

      {/* Soft radial glow behind the headline */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(99,29,254,0.25), transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
        <p className="text-xs font-bold tracking-widest uppercase mb-6 text-white/50">
          Ready to take the next step?
        </p>

        {/* Giant clickable headline — opens the Calendly popup */}
        <button
          type="button"
          onClick={open}
          disabled={loading}
          aria-label="Let's talk — book a call"
          className="group inline-flex items-center justify-center gap-3 leading-none transition-transform duration-300 hover:-translate-y-1 disabled:opacity-70"
        >
          <span
            className="font-display font-black tracking-tight text-gradient"
            style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}
          >
            {loading ? "Loading…" : "Let's Talk"}
          </span>
          <ArrowUpRight
            className="mt-2 h-[clamp(2rem,7vw,5rem)] w-[clamp(2rem,7vw,5rem)] text-white/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            strokeWidth={1.5}
          />
        </button>

        <p className="mx-auto mt-8 max-w-xl text-sm md:text-base leading-relaxed text-white/50">
          Ready to grow? We help brands and founders build a powerful digital
          presence with wisdom, creativity, and purpose. Book a free call and
          let&apos;s make it happen.
        </p>

        <p className="mt-8 text-sm text-white/40">
          Prefer email?{" "}
          <a
            href={`mailto:${email}`}
            className="font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline"
          >
            {email}
          </a>
        </p>
      </div>
    </section>
  );
}
