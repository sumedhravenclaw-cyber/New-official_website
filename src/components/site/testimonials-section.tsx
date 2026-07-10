"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/site-data";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setIsAutoPlaying(false);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const t = testimonials[current];

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
              <p
                className="text-base md:text-lg leading-relaxed italic mb-8"
                style={{ color: "rgba(254, 254, 254, 0.8)" }}
              >
                &ldquo;{t.review}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={t.img}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-violet/40"
              />
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
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrent(i);
                  }}
                  className="transition-all duration-300 rounded-full"
                  style={
                    i === current
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
        </div>
      </div>
    </section>
  );
}
