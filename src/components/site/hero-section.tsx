"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import BeyondClicks from "./beyond-clicks";
import { WHATSAPP_LINK, BRAND_GRADIENT } from "@/lib/site-data";

const HERO_EYEBROW = "Digital Ravenclaw";

const HERO_DESCRIPTION =
  "At Ravenclaw, we believe the best marketing begins with intelligent thinking. Every website, every brand, every campaign is crafted with wisdom, creativity, and purpose—not guesswork.";

const FLOATING_DOTS = [
  { top: "8%", left: "12%", size: 8, color: "#EA9D12" },
  { top: "15%", left: "58%", size: 10, color: "#EA9D12" },
  { top: "22%", left: "82%", size: 8, color: "#A7069B" },
  { top: "35%", left: "92%", size: 12, color: "#5B9EFE" },
  { top: "52%", left: "86%", size: 8, color: "#5E9929" },
  { top: "20%", left: "65%", size: 6, color: "#CC2829" },
  { top: "45%", left: "57%", size: 7, color: "#EA9D12" },
  { top: "68%", left: "75%", size: 9, color: "#5B9EFE" },
  { top: "12%", left: "73%", size: 5, color: "#5E9929" },
  { top: "60%", left: "93%", size: 6, color: "#631DFE" },
  { top: "78%", left: "8%", size: 7, color: "#A7069B" },
  { top: "30%", left: "4%", size: 9, color: "#5B9EFE" },
  { top: "85%", left: "35%", size: 6, color: "#EA9D12" },
  { top: "5%", left: "40%", size: 5, color: "#5E9929" },
  { top: "90%", left: "65%", size: 8, color: "#CC2829" },
  { top: "65%", left: "20%", size: 10, color: "#631DFE" },
  { top: "40%", left: "25%", size: 6, color: "#A7069B" },
  { top: "10%", left: "90%", size: 7, color: "#5B9EFE" },
] as const;

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

      {/* Floating decorative dots */}
      {FLOATING_DOTS.map((dot, i) => (
        <div
          key={i}
          className="absolute z-[2] rounded-full pointer-events-none animate-float"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            background: dot.color,
            opacity: 0.8,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${4 + i * 0.5}s`,
          }}
        />
      ))}

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

            <p className="text-base leading-relaxed text-muted md:text-lg max-w-xl">
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
