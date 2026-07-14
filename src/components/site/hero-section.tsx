"use client";

import dynamic from "next/dynamic";
import { ArrowRight, MessageCircle } from "lucide-react";
import BeyondClicks from "./beyond-clicks";
import { WHATSAPP_LINK, BRAND_GRADIENT } from "@/lib/site-data";

// Three.js touches window/canvas on mount, so it's loaded client-only and
// kept out of the initial hero bundle.
const Hero3D = dynamic(() => import("./hero-3d").then((m) => m.Hero3D), {
  ssr: false,
});

const HERO_EYEBROW = "Digital Ravenclaw";

const HERO_DESCRIPTION =
  "At Ravenclaw, we believe the best marketing begins with intelligent thinking. Every website, every brand, every campaign is crafted with wisdom, creativity, and purpose—not guesswork.";

export function HeroSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-surface pt-24 pb-0 flex items-center section-reveal"
    >
      {/* Phoenix background image */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <img
          src="/images/homeBird.png"
          alt="RavenClaw Phoenix"
          className="absolute bottom-0 right-[-5%] h-[130%] w-auto max-w-none select-none object-contain opacity-90"
        />
      </div>

      {/* 3D ember particle field + gem cluster, brand-gradient colored */}
      <Hero3D />

      {/* Content */}
      <div className="relative left-[5%] z-[3] mx-auto px-6 max-w-8xl w-full">
        <div className="grid min-h-[calc(100vh-6rem)] items-center gap-8 pb-32 xl:grid-cols-2">
          <div className="flex flex-col gap-6 reveal-left">
            <p
              className="relative text-xs font-bold uppercase tracking-widest"
              style={{ color: "#8B016D", left: "4.5rem", top: "-1rem" }}
            >
              {/* <span className="text-gradient">{HERO_EYEBROW}</span> */}
            </p>

            <BeyondClicks />

            <p className="text-base leading-relaxed text-muted md:text-l max-w-xl">
              {HERO_DESCRIPTION}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("portfolio")}
                className="flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: BRAND_GRADIENT }}
              >
                View Portfolio
                <ArrowRight size={16} />
              </button>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border-2 border-black/10 bg-surface px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <MessageCircle size={16} style={{ color: "#25D366" }} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <div aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
