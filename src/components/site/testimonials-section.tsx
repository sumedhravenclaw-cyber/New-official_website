"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/site-data";
import type { GoogleReviewsPayload } from "@/app/api/google-reviews/route";

/**
 * One carousel card, whichever source it came from. Google reviews carry no
 * role/company, and manual testimonials carry no timestamp, so both collapse
 * into a single subtitle line under the reviewer's name.
 */
interface Slide {
  name: string;
  img?: string;
  review: string;
  rating: number;
  subtitle: string;
}

const manualSlides: Slide[] = testimonials.map((t) => ({
  name: t.name,
  img: t.img,
  review: t.review,
  rating: t.rating,
  subtitle: `${t.role}, ${t.company}`,
}));

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  /**
   * Live reviews from the Business Profile, fetched after mount so the section
   * paints immediately with the manual list. When Google answers with reviews,
   * the carousel swaps over; when the API is unconfigured, errors, or returns
   * nothing, the manual list simply stays — no loading state, no error state.
   */
  const [google, setGoogle] = useState<GoogleReviewsPayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/google-reviews")
      .then((res) => (res.ok ? (res.json() as Promise<GoogleReviewsPayload>) : null))
      .then((data) => {
        if (!cancelled && data && data.reviews.length > 0) {
          setGoogle(data);
          setCurrent(0);
        }
      })
      .catch(() => {}); // offline/failed fetch: keep the manual testimonials
    return () => {
      cancelled = true;
    };
  }, []);

  const slides: Slide[] =
    google && google.reviews.length > 0
      ? google.reviews.map((r) => ({
          name: r.name,
          img: r.img,
          review: r.review,
          rating: r.rating,
          subtitle: r.time ? `${r.time} · on Google` : "on Google",
        }))
      : manualSlides;

  useEffect(() => {
    // A single review has nowhere to rotate to — no timer.
    if (!isAutoPlaying || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  };

  const next = () => {
    setIsAutoPlaying(false);
    setCurrent((c) => (c + 1) % slides.length);
  };

  // Modulo guards the one render where the list swaps sources while `current`
  // still points past the shorter list's end.
  const t = slides[current % slides.length];

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-20 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, #631DFE 0%, #A7069B 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 section-reveal">
          <span className="text-xs font-medium tracking-widest uppercase mb-4 block">
            <span className="text-gradient">Testimonials</span>
          </span>
          <h2
            className="font-display font-bold text-4xl md:text-5xl mb-4"
            style={{ color: "#FEFEFE" }}
          >
            What Clients <span className="text-gradient">Say</span>
          </h2>
          {/* Aggregate proof only when the live profile is feeding the
              carousel — the manual list has no rating to aggregate. */}
          {google?.rating && (
            <a
              href={google.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-full border border-white/15 text-sm transition-colors hover:border-white/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
              style={{ color: "rgba(254, 254, 254, 0.75)" }}
            >
              <Star size={14} className="text-golden fill-golden" />
              <span>
                <strong style={{ color: "#FEFEFE" }}>
                  {google.rating.toFixed(1)}
                </strong>{" "}
                on Google
                {google.count ? ` · ${google.count} reviews` : ""}
              </span>
            </a>
          )}
        </div>

        <div className="section-reveal relative">
          {/* Large quote */}
          <div className="absolute -top-4 left-4 opacity-20">
            <Quote size={80} className="text-violet" />
          </div>

          <div
            className="rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 min-h-[280px] flex flex-col justify-between"
            style={{ backgroundColor: "rgba(5, 5, 5, 0.6)", backdropFilter: "blur(20px)" }}
          >
            <div>
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-golden fill-golden"
                  />
                ))}
              </div>
              {/* Google reviews run any length; clamp keeps the card composed
                  and the full text lives one click away on the profile. */}
              <p
                className="text-base md:text-lg leading-relaxed italic mb-8 line-clamp-6"
                style={{ color: "rgba(254, 254, 254, 0.8)" }}
              >
                &ldquo;{t.review}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-4">
              {t.img ? (
                <img
                  src={t.img}
                  alt={t.name}
                  // Google avatar CDN rejects some cross-site referrers.
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-violet/40"
                />
              ) : (
                /* Reviewers without a profile photo get a monogram disc. */
                <div
                  aria-hidden="true"
                  className="w-12 h-12 rounded-full border-2 border-violet/40 flex items-center justify-center font-display font-bold text-lg"
                  style={{ backgroundColor: "rgba(99, 29, 254, 0.25)", color: "#FEFEFE" }}
                >
                  {t.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p
                  className="font-display font-semibold"
                  style={{ color: "#FEFEFE" }}
                >
                  {t.name}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "rgba(254, 254, 254, 0.5)" }}
                >
                  {t.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Controls — only when there is more than one review to move
              between; a lone review renders as a plain quote card. */}
          {slides.length > 1 && (
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrent(i);
                  }}
                  className="transition-all duration-300 rounded-full"
                  style={
                    i === current % slides.length
                      ? { width: 32, height: 8, backgroundColor: "#631DFE" }
                      : { width: 8, height: 8, backgroundColor: "rgba(254,254,254,0.2)" }
                  }
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all hover:border-white/30"
                style={{ color: "rgba(254, 254, 254, 0.6)" }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-violet flex items-center justify-center text-white hover:opacity-90 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
