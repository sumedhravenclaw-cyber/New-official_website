"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, TrendingUp, MessageCircle } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/lib/site-data";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  useScrollReveal([study.id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [study.id]);

  const currentIndex = caseStudies.findIndex((c) => c.id === study.id);
  const next = caseStudies[(currentIndex + 1) % caseStudies.length];
  const others = caseStudies.filter((c) => c.id !== study.id).slice(0, 3);

  const whatsappHref = `https://wa.me/918010049620?text=${encodeURIComponent(
    `Hello RavenClaw, I saw the ${study.client} case study and would like to discuss something similar`
  )}`;

  return (
    <article className="pt-24">
      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[340px] w-full overflow-hidden reveal-left">
        <img
          src={study.image}
          alt={study.client}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(234,157,18,0.15), rgba(5,5,5,0.88))",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12">
          <div className="max-w-3xl mx-auto w-full">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-xs font-bold mb-6 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              Back to case studies
            </Link>
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white"
              style={{ background: "#EA9D12" }}
            >
              {study.industry}
            </span>
            <h1 className="font-display font-black text-3xl md:text-5xl text-white leading-[1.1] mb-4">
              {study.client}
            </h1>
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-golden" />
              <span className="font-display font-black text-2xl text-white">
                {study.metric}
              </span>
              <span className="text-sm text-white/70 font-medium">
                {study.metricLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 mt-14 pb-20">
        {/* Summary lead */}
        <p className="font-display text-lg md:text-xl text-ink leading-relaxed mb-12 section-reveal">
          {study.summary}
        </p>

        {/* Content sections */}
        <div className="space-y-10">
          {study.content.map((block, i) => (
            <section key={i} className="section-reveal">
              {block.heading && (
                <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-4">
                  {block.heading}
                </h2>
              )}
              {block.body.map((para, j) => (
                <p
                  key={j}
                  className="text-[15px] md:text-base text-ink/75 leading-[1.85] mb-4"
                >
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* Headline metric band */}
        <section className="mt-14 section-reveal">
          <div
            className="rounded-2xl px-6 py-10 text-center"
            style={{ background: "linear-gradient(135deg, #631DFE, #A7069B)" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
              Headline result
            </p>
            <p className="font-display font-black text-5xl md:text-6xl text-white mb-2">
              {study.metric}
            </p>
            <p className="text-sm text-white/80 font-medium">{study.metricLabel}</p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 section-reveal">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-display font-bold text-sm text-white px-8 py-3.5 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #EA9D12, #D96016)", color: "#050505" }}
          >
            <MessageCircle size={16} />
            Start a project like this
          </a>
        </section>

        {/* Next case study */}
        <nav
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 section-reveal"
          aria-label="Adjacent case studies"
        >
          <Link
            href={`/case-studies/${next.id}`}
            className="p-5 rounded-xl border border-black/8 bg-card card-hover flex flex-col text-left cursor-pointer"
          >
            <span className="text-[11px] font-bold text-ink/50 flex items-center gap-1 mb-1">
              Next case study <ArrowRight size={12} />
            </span>
            <span className="font-display font-bold text-sm text-ink">
              {next.client}
            </span>
            <span className="text-xs text-ink/55 mt-0.5">{next.industry}</span>
          </Link>
          <Link
            href="/case-studies"
            className="p-5 rounded-xl border border-black/8 bg-card card-hover flex flex-col justify-center text-left cursor-pointer"
          >
            <span className="text-[11px] font-bold text-ink/50 mb-1">
              All case studies
            </span>
            <span className="font-display font-bold text-sm text-ink">
              See every success story
            </span>
          </Link>
        </nav>

        {/* More case studies */}
        <section className="mt-16 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-6">
            More case studies
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {others.map((c) => (
              <Link
                key={c.id}
                href={`/case-studies/${c.id}`}
                className="group flex flex-col bg-card border border-black/8 rounded-xl overflow-hidden text-left card-hover cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.client}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 bg-card/90 text-ink rounded-full px-2 py-0.5 text-[10px] font-semibold">
                    {c.industry}
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-display font-bold text-sm text-ink leading-snug line-clamp-1 group-hover:text-gradient transition-colors">
                    {c.client}
                  </p>
                  <p className="text-xs text-ink/55 mt-1 line-clamp-2">{c.summary}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-ink/60 group-hover:text-violet transition-colors">
                    View
                    <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
