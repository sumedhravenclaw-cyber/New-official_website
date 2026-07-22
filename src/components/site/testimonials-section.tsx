"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { Star, Quote, ArrowUpRight, Play, Pause } from "lucide-react";
import {
  testimonials,
  GOOGLE_REVIEW_URL,
  GOOGLE_PROFILE_URL,
} from "@/lib/site-data";
import type { GoogleReviewsPayload } from "@/app/api/google-reviews/route";

/**
 * Seconds each card spends crossing the row. Speed is defined per card rather
 * than as a total loop time so the pace stays the same as reviews are added.
 */
const SECONDS_PER_CARD = 9;

/**
 * One card on the wall, whichever source it came from. Google reviewers carry a
 * timestamp but no job title; direct client quotes carry a title but no
 * timestamp, so both collapse into a single subtitle line under the name.
 */
interface Slide {
  name: string;
  img?: string;
  review: string;
  rating: number;
  subtitle: string;
  isGoogle: boolean;
}

const baseSlides: Slide[] = testimonials.map((t) => ({
  name: t.name,
  img: t.img,
  review: t.review,
  rating: t.rating,
  subtitle:
    t.source === "google"
      ? t.time || "Google review"
      : [t.role, t.company].filter(Boolean).join(", "),
  isGoogle: t.source === "google",
}));

/**
 * Identity for de-duplication. The same review reaching us twice — once
 * transcribed into site-data, once live from the Places API — must collapse to
 * one card, and Google's own text can differ by trailing whitespace or case.
 */
function reviewKey(name: string, review: string) {
  return `${name.trim().toLowerCase()}::${review
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 60)}`;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Subscribes to the OS "reduce motion" setting. The stagger and slide-in below
 * are applied as inline styles, which the global `prefers-reduced-motion` CSS
 * block can't override — so the preference has to be read in JS instead.
 * `useSyncExternalStore` keeps it in sync without a setState-in-effect cascade,
 * and reports false during SSR so the markup matches the first client paint.
 */
function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED_MOTION_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );
}

/** Google's brand mark, used on the verified badge. */
function GoogleG({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

/**
 * A single review card in the moving row. Long Google reviews are clamped so
 * the cards keep an even rhythm, with the full text one tap away rather than
 * truncated for good — the row pauses on hover, so expanding one is workable.
 */
function ReviewCard({ slide, cloned }: { slide: Slide; cloned?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  /**
   * Google's avatar CDN URLs expire and reviewers can clear their photo, so a
   * failed load falls back to the monogram rather than leaving a broken image.
   */
  const [imgFailed, setImgFailed] = useState(false);
  // Roughly the point where a quote outgrows the clamp; avoids showing a
  // "Read more" toggle that reveals nothing.
  const isLong = slide.review.length > 320;

  return (
    <div
      className="shrink-0 w-[320px] sm:w-[380px] mr-5 group"
      aria-hidden={cloned || undefined}
    >
      <figure
        className="relative rounded-2xl p-6 border border-white/10 h-full transition-colors duration-300 group-hover:border-white/25"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.035)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Watermark quote, decorative only. */}
        <Quote
          size={28}
          aria-hidden="true"
          className="absolute top-5 right-5 text-violet opacity-15"
        />

        <div
          className="flex gap-0.5 mb-4"
          role="img"
          aria-label={`${slide.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              aria-hidden="true"
              className={
                i < slide.rating
                  ? "text-golden fill-golden"
                  : "text-white/15 fill-white/15"
              }
            />
          ))}
        </div>

        <blockquote>
          <p
            className={`text-sm leading-relaxed pr-6 ${
              isLong && !expanded ? "line-clamp-6" : ""
            }`}
            style={{ color: "rgba(254, 254, 254, 0.78)" }}
          >
            {slide.review}
          </p>
        </blockquote>

        {isLong && !cloned && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-2 text-xs font-medium text-violet hover:underline cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}

        <figcaption className="flex items-center gap-3 mt-5 pt-5 border-t border-white/10">
          {slide.img && !imgFailed ? (
            <img
              src={slide.img}
              alt=""
              // Google's avatar CDN rejects some cross-site referrers.
              referrerPolicy="no-referrer"
              loading="lazy"
              width={40}
              height={40}
              onError={() => setImgFailed(true)}
              className="w-10 h-10 rounded-full object-cover border border-violet/40 shrink-0"
            />
          ) : (
            /* Reviewers without a profile photo get a monogram disc. */
            <div
              aria-hidden="true"
              className="w-10 h-10 rounded-full border border-violet/40 flex items-center justify-center font-display font-bold text-sm shrink-0"
              style={{
                background: "linear-gradient(135deg, #631DFE, #A7069B)",
                color: "#FEFEFE",
              }}
            >
              {slide.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <p
              className="font-display font-semibold text-sm truncate"
              style={{ color: "#FEFEFE" }}
            >
              {slide.name}
            </p>
            <p
              className="text-xs flex items-center gap-1.5 truncate"
              style={{ color: "rgba(254, 254, 254, 0.5)" }}
            >
              {slide.isGoogle && <GoogleG size={11} />}
              <span className="truncate">{slide.subtitle}</span>
            </p>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

export function TestimonialsSection() {
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  /**
   * Live reviews from the Business Profile, fetched after mount so the row
   * paints immediately with the transcribed set. Anything Google returns that
   * isn't already in the row gets appended; when the API is unconfigured,
   * errors, or returns nothing, the transcribed set simply stands alone.
   */
  const [google, setGoogle] = useState<GoogleReviewsPayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/google-reviews")
      .then((res) =>
        res.ok ? (res.json() as Promise<GoogleReviewsPayload>) : null
      )
      .then((data) => {
        if (!cancelled && data) setGoogle(data);
      })
      .catch(() => {}); // offline/failed fetch: the transcribed reviews stand
    return () => {
      cancelled = true;
    };
  }, []);

  const liveSlides: Slide[] = (google?.reviews ?? []).map((r) => ({
    name: r.name,
    img: r.img,
    review: r.review,
    rating: r.rating,
    subtitle: r.time || "Google review",
    isGoogle: true,
  }));

  /**
   * Transcribed reviews first (they're curated and ordered); live ones append.
   * The whole list is de-duplicated, not just live-against-transcribed: the
   * same review pasted twice into site-data would otherwise render twice and
   * collide on its React key, since the key is derived from this same digest.
   */
  const seen = new Set<string>();
  const slides: Slide[] = [...baseSlides, ...liveSlides].filter((s) => {
    const key = reviewKey(s.name, s.review);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  /**
   * The track holds two copies of the list so the -50% keyframe endpoint lands
   * exactly on the seam and the loop is invisible. Duration scales with the
   * count, keeping the cards' travel speed constant as reviews are added.
   */
  const duration = Math.max(slides.length, 3) * SECONDS_PER_CARD;

  /**
   * Only Google's own aggregate earns the star badge. Averaging the handful of
   * reviews in the row would produce a different (flattering) number and still
   * label it "on Google" — so without the live figure the badge degrades to a
   * plain link out to the profile.
   */
  const avg = google?.rating;
  const count = google?.count;

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-20 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, #631DFE 0%, #A7069B 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14 section-reveal">
          <span className="text-xs font-medium tracking-widest uppercase mb-4 block">
            <span className="text-gradient">Testimonials</span>
          </span>
          <h2
            className="font-display font-bold text-4xl md:text-5xl mb-6"
            style={{ color: "#FEFEFE" }}
          >
            What Clients <span className="text-gradient">Say</span>
          </h2>

          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-4 py-3 rounded-full border border-white/15 text-sm transition-colors hover:border-white/35 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
            style={{ color: "rgba(254, 254, 254, 0.75)" }}
          >
            <GoogleG size={16} />
            {avg ? (
              <span className="flex items-center gap-1.5">
                <strong style={{ color: "#FEFEFE" }}>{avg.toFixed(1)}</strong>
                <span className="flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < Math.round(avg)
                          ? "text-golden fill-golden"
                          : "text-white/20 fill-white/20"
                      }
                    />
                  ))}
                </span>
                {count ? (
                  <span>
                    · {count} review{count === 1 ? "" : "s"} on Google
                  </span>
                ) : (
                  <span>on Google</span>
                )}
              </span>
            ) : (
              <span>Read our reviews on Google</span>
            )}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>

      </div>

      {/* The moving row sits outside the max-width container so cards can run
          edge to edge — the fade at each margin is what sells the loop, and a
          gutter would cut it short. */}
      <div
        className="rc-review-viewport relative z-10 mt-2"
        style={{
          // Old cards dissolve at the left margin and new ones resolve out of
          // the right, so the row reads as endless rather than as a strip that
          // starts and stops. Both spellings: WebKit still needs the prefix.
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        {/* Every card is a direct child and carries its own trailing margin
            instead of the track using `gap`. That keeps each card an identical
            slice of the total width, so the -50% endpoint lands exactly on the
            start of the second copy. A flex `gap` (or any padding on the track)
            leaves half a gutter unaccounted for and the loop visibly jumps. */}
        <div
          className="rc-review-track flex w-max"
          data-paused={paused ? "true" : "false"}
          style={
            { "--rc-review-duration": `${duration}s` } as React.CSSProperties
          }
        >
          {slides.map((s) => (
            <ReviewCard key={reviewKey(s.name, s.review)} slide={s} />
          ))}
          {/* Second copy completes the loop. These are the same reviews already
              announced above, so they're hidden from assistive tech — and they
              render without the "Read more" control, since a focusable element
              inside an aria-hidden subtree is a trap for keyboard users. */}
          {slides.map((s) => (
            <ReviewCard
              key={`clone-${reviewKey(s.name, s.review)}`}
              slide={s}
              cloned
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          {/* Content that moves on its own needs a way to stop it (WCAG 2.2.2).
              Hover and focus already pause the row, but neither is available to
              a touch user who just wants to finish reading a card. */}
          {/* {!reduceMotion && slides.length > 1 && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-sm font-medium transition-colors hover:border-white/35 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
              style={{ color: "rgba(254, 254, 254, 0.8)" }}
            >
              {paused ? (
                <Play size={15} aria-hidden="true" />
              ) : (
                <Pause size={15} aria-hidden="true" />
              )}
              {paused ? "Resume scrolling" : "Pause scrolling"}
            </button>
          )} */}

          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-sm font-medium transition-colors hover:border-white/35 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
            style={{ color: "rgba(254, 254, 254, 0.8)" }}
          >
            <GoogleG size={15} />
            Write a review
          </a>
        </div>
      </div>
    </section>
  );
}
