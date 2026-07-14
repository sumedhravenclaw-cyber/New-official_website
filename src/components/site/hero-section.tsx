"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import BeyondClicks from "./beyond-clicks";
import { CalendlyPopupButton } from "./calendly";
import { WHATSAPP_LINK, BRAND_GRADIENT } from "@/lib/site-data";

const HERO_DESCRIPTION =
  "At Ravenclaw, we believe the best marketing begins with intelligent thinking. Every website, every brand, every campaign is crafted with wisdom, creativity, and purpose—not guesswork.";

// Space between the <BeyondClicks /> headline and the paragraph below it.
// This is the only knob for that gap — raise it to push them apart, lower it to
// pull them together, "0rem" to sit flush. The rest of the column keeps its own
// rhythm (gap-6) regardless of what this is set to.
const HERO_HEADLINE_GAP = "5.5rem";

export function HeroSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative z-10 min-h-screen pb-6 flex items-center section-reveal"
      // Clear the fixed navbar by its measured height rather than a guessed pt-24
      // (the bar is 106px on narrow screens, so 96px tucked the copy under it).
      style={{ paddingTop: "calc(var(--nav-h) + 1rem)" }}
    >
      {/* Phoenix. Sized in % of the hero and hung 20% BELOW its bottom edge, so the
          image runs from -30% to 120% of the hero and the tail carries on into the
          About section instead of being sheared off at the seam. Nothing clips it:
          the hero sets no overflow-hidden, and <HeroAboutFlow> — which does — wraps
          both sections. The .phoenix-flow mask fades the tail out as it crosses into
          About so it can't wash over the copy. */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <img
          src="/images/homeBird.png"
          alt="RavenClaw Phoenix"
          // Below xl the hero is a single column, so the copy runs full-width and
          // the bird is far wider than the text — it would sit right under the
          // headline. There it drops to a faint wash so the copy stays readable;
          // from xl up the grid splits and the bird has its own column.
          className="phoenix-flow absolute bottom-[-20%] right-[-10%] h-[160%] w-auto max-w-none select-none object-contain opacity-20 xl:opacity-90"
        />
      </div>

      <div className="relative left-[5%] z-[3] mx-auto px-6 max-w-8xl w-full">
        <div className="grid items-center gap-8 xl:grid-cols-2">
          <div className="flex flex-col gap-6 reveal-left">
            <div className="mt-9">
              <BeyondClicks />
            </div>

            <p
              className="text-base leading-relaxed text-muted md:text-l max-w-xl"
              // The column already puts gap-6 (1.5rem) between every pair of
              // children, so subtract that off to make HERO_HEADLINE_GAP the
              // whole gap rather than something added on top of it.
              style={{ marginTop: `calc(${HERO_HEADLINE_GAP} - 1.5rem)` }}
            >
              {HERO_DESCRIPTION}
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <button
                onClick={() => scrollTo("portfolio")}
                className="flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: BRAND_GRADIENT }}
              >
                View Portfolio
                <ArrowRight size={16} />
              </button>

              <CalendlyPopupButton />

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
