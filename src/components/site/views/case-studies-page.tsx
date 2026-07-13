"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import {
  caseStudies as staticCaseStudies,
  industries,
  type CaseStudy,
  type Industry,
} from "@/lib/site-data";
import { SectionLink } from "@/components/site/section-link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function CaseStudiesPage() {
  const [activeIndustry, setActiveIndustry] = useState<Industry>("All");
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(staticCaseStudies);

  useEffect(() => {
    fetch("/api/case-studies")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.caseStudies)) setCaseStudies(data.caseStudies);
      })
      .catch((err) => console.error("Failed to load case studies:", err));
  }, []);

  // Re-run the reveal observer whenever the filtered study set changes —
  // switching industries swaps in new cards that were never observed by
  // the mount-time IntersectionObserver, so without this they'd stay at
  // opacity:0 (the pre-reveal state) forever.
  useScrollReveal([activeIndustry, caseStudies]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const visibleStudies =
    activeIndustry === "All"
      ? caseStudies
      : caseStudies.filter((s) => s.industry === activeIndustry);

  return (
    <main className="min-h-screen bg-surface pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <header className="max-w-3xl mb-14 section-reveal">
          <p className="text-golden text-xs font-bold uppercase tracking-widest mb-4">
            Case Studies
          </p>
          <h1 className="font-display font-black text-4xl md:text-6xl text-ink leading-[1.05] mb-6">
            Real brands, <span className="text-gradient">real numbers</span>
          </h1>
          <p className="text-base md:text-lg text-muted leading-relaxed">
            Selected work across food, fitness, SaaS, and D2C — each one built
            around a clear metric, not a vanity slide deck. The numbers below
            are real, and so are the brands behind them.
          </p>
        </header>

        {/* Industry filter */}
        <div className="flex flex-wrap gap-2 mb-12 section-reveal">
          {industries.map((ind) => {
            const active = ind === activeIndustry;
            return (
              <button
                key={ind}
                type="button"
                onClick={() => setActiveIndustry(ind)}
                aria-pressed={active}
                className={
                  "px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors cursor-pointer " +
                  (active
                    ? "bg-violet text-white border-violet"
                    : "bg-card text-ink border-black/10 hover:border-golden")
                }
              >
                {ind}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleStudies.map((study) => (
            <Link
              key={study.id}
              href={`/case-studies/${study.id}`}
              className="group flex flex-col bg-card border border-black/10 rounded-2xl overflow-hidden text-left card-hover section-reveal cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={study.image}
                  alt={study.client}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-card text-ink rounded-full px-3 py-1 text-xs font-semibold shadow-sm">
                  {study.industry}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-bold text-lg text-ink mb-2 group-hover:text-gradient transition-colors leading-snug">
                  {study.client}
                </h3>
                <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-5 flex-1">
                  {study.summary}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={16} className="text-golden flex-shrink-0" />
                  <span className="font-display font-black text-lg text-ink">
                    {study.metric}
                  </span>
                  <span className="text-xs text-ink/55 font-medium">
                    {study.metricLabel}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-ink/70 group-hover:text-violet transition-colors">
                  View
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </section>

        {visibleStudies.length === 0 && (
          <p className="text-center text-muted py-20 font-display">
            No case studies in this industry yet.
          </p>
        )}

        {/* CTA */}
        <section className="mt-20 section-reveal">
          <div
            className="rounded-2xl px-6 py-10 md:px-12 md:py-14 text-center"
            style={{ backgroundColor: "#050505", color: "#FEFEFE" }}
          >
            <h3 className="font-display font-black text-2xl md:text-3xl mb-3">
              Want results like these for your brand?
            </h3>
            <p
              className="text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed"
              style={{ color: "rgba(254, 254, 254, 0.7)" }}
            >
              Tell us about your goals and we&apos;ll send back a plan — no
              obligation, no fluff.
            </p>
            <SectionLink
              sectionId="contact"
              className="px-8 py-3.5 rounded-xl bg-golden text-sm font-display font-bold hover:opacity-90 transition-opacity cursor-pointer inline-block"
              style={{ color: "#050505" }}
            >
              Start a project
            </SectionLink>
          </div>
        </section>
      </div>
    </main>
  );
}
