"use client";

import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import { projects, type Project } from "@/lib/site-data";
import { SectionLink } from "@/components/site/section-link";
import { DetailLink } from "@/components/site/detail-link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function PortfolioDetail({ project }: { project: Project }) {
  useScrollReveal([project.slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [project.slug]);

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 4);

  const whatsappHref = `https://wa.me/918010049620?text=${encodeURIComponent(
    `Hello RavenClaw, I saw the ${project.title} project and would like to discuss something similar`
  )}`;

  return (
    <article className="pt-24">
      {/* Hero image */}
      <div className="relative h-[45vh] min-h-[320px] w-full overflow-hidden reveal-left">
        <img
          src={project.img}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${project.color}33, rgba(5,5,5,0.75))`,
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-10">
          <div className="max-w-3xl mx-auto w-full">
            <SectionLink
              sectionId="portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-bold mb-6 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              Back
            </SectionLink>
            <span
              className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
              style={{ background: `${project.color}30`, color: "white" }}
            >
              {project.type}
            </span>
            <h1 className="font-display font-black text-3xl md:text-5xl text-white">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 mt-14 pb-20">
        {/* Meta row */}
        <div className="flex flex-wrap gap-8 mb-10 section-reveal">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-ink/40 mb-1">
              Client
            </p>
            <p className="font-display font-bold text-ink text-sm">
              {project.client}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-ink/40 mb-1">
              Year
            </p>
            <p className="font-display font-bold text-ink text-sm">
              {project.year}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-ink/40 mb-1">
              Service
            </p>
            <p className="font-display font-bold text-ink text-sm">
              {project.type}
            </p>
          </div>
        </div>

        {/* Description */}
        <section className="mb-14 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-4">
            Overview
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            {project.description}
          </p>
        </section>

        {/* Highlights */}
        <section className="mb-14 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-6">
            Results
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 p-4 rounded-xl border card-hover"
                style={{
                  borderColor: `${project.color}30`,
                  background: `${project.color}0C`,
                }}
              >
                <span
                  className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${project.color}20` }}
                >
                  <Check
                    size={12}
                    style={{ color: project.color }}
                    strokeWidth={3}
                  />
                </span>
                <span className="text-sm text-ink/80 leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tags */}
        <section className="mb-14 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-4">
            Tech &amp; Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                style={{
                  borderColor: `${project.color}30`,
                  color: project.color,
                  background: `${project.color}0C`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-16 section-reveal">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-display font-bold text-sm text-white px-8 py-3.5 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: project.color }}
          >
            <MessageCircle size={16} />
            Start a similar project
          </a>
        </section>

        {/* Prev / Next */}
        <nav
          className="grid grid-cols-2 gap-4 mb-16 section-reveal"
          aria-label="Adjacent projects"
        >
          <DetailLink
            href={`/portfolio/${prev.slug}`}
            sectionId="portfolio"
            className="p-4 rounded-xl border card-hover flex flex-col overflow-hidden text-left cursor-pointer"
            style={{
              borderColor: `${prev.color}30`,
              background: `${prev.color}0C`,
            }}
          >
            <span className="text-[11px] font-bold text-ink/50 flex items-center gap-1 mb-1">
              <ArrowLeft size={12} /> Previous
            </span>
            <span className="font-display font-bold text-sm text-ink truncate">
              {prev.title}
            </span>
          </DetailLink>
          <DetailLink
            href={`/portfolio/${next.slug}`}
            sectionId="portfolio"
            className="p-4 rounded-xl border card-hover flex flex-col items-end text-right overflow-hidden cursor-pointer"
            style={{
              borderColor: `${next.color}30`,
              background: `${next.color}0C`,
            }}
          >
            <span className="text-[11px] font-bold text-ink/50 flex items-center gap-1 mb-1 justify-end">
              Next <ArrowRight size={12} />
            </span>
            <span className="font-display font-bold text-sm text-ink truncate">
              {next.title}
            </span>
          </DetailLink>
        </nav>

        {/* Explore other projects */}
        <section className="section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-6">
            More work
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {others.map((p) => (
              <DetailLink
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                sectionId="portfolio"
                className="group flex items-center gap-4 p-3 rounded-xl border card-hover text-left cursor-pointer"
                style={{
                  borderColor: `${p.color}30`,
                  background: `${p.color}0C`,
                }}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-display font-bold text-ink text-sm">
                    {p.title}
                  </p>
                  <p className="text-[12px] text-ink/55 truncate">{p.type}</p>
                </div>
                <ArrowRight
                  size={14}
                  className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: p.color }}
                />
              </DetailLink>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
