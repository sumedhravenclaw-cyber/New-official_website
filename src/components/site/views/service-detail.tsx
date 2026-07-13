"use client";

import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import { services, getServiceBySlug } from "@/lib/site-data";
import { SectionLink } from "@/components/site/section-link";
import { DetailLink } from "@/components/site/detail-link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

// Service.icon is a component reference, which can't be serialized across
// the server/client boundary — so unlike the other detail pages, the route
// file only resolves the slug for notFound()/generateMetadata, and this
// client component re-resolves the full record (including the icon) itself.
export function ServiceDetail({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug)!;

  useScrollReveal([service.slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [service.slug]);

  const currentIndex = services.findIndex((s) => s.slug === service.slug);
  const prev = services[(currentIndex - 1 + services.length) % services.length];
  const next = services[(currentIndex + 1) % services.length];
  const others = services.filter((s) => s.slug !== service.slug);

  const Icon = service.icon;
  const whatsappHref = `https://wa.me/918010049620?text=${encodeURIComponent(
    `Hello RavenClaw, I'd like to discuss a ${service.title} project`
  )}`;

  return (
    <article className="pt-24">
      {/* Hero */}
      <div className="pt-16 pb-14 px-6" style={{ background: service.bg }}>
        <div className="max-w-3xl mx-auto reveal-left">
          <SectionLink
            sectionId="services"
            className="inline-flex items-center gap-1.5 text-xs font-bold mb-8 text-ink/60 hover:text-ink transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </SectionLink>

          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md"
            style={{
              background: `${service.color}20`,
              border: `2px solid ${service.color}30`,
            }}
          >
            <Icon size={28} style={{ color: service.color }} />
          </div>

          <h1 className="font-display font-black text-3xl md:text-5xl text-ink mb-4">
            {service.title}
          </h1>
          <p className="text-base text-ink/70 leading-relaxed max-w-xl">
            {service.longDesc}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 mt-14 pb-20">
        {/* Features */}
        <section className="mb-14 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-6">
            What&apos;s included
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 p-4 rounded-xl border card-hover"
                style={{ borderColor: service.border, background: service.bg }}
              >
                <span
                  className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${service.color}20` }}
                >
                  <Check
                    size={12}
                    style={{ color: service.color }}
                    strokeWidth={3}
                  />
                </span>
                <span className="text-sm text-ink/80 leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Process */}
        <section className="mb-16 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-6">
            How it works
          </h2>
          <ol className="space-y-6">
            {service.process.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm"
                  style={{
                    background: `${service.color}18`,
                    color: service.color,
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-display font-bold text-ink text-sm mb-1">
                    {step.title}
                  </p>
                  <p className="text-sm text-ink/60 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="mb-16 section-reveal">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-display font-bold text-sm text-white px-8 py-3.5 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: service.color }}
          >
            <MessageCircle size={16} />
            Discuss {service.title}
          </a>
        </section>

        {/* Prev / Next */}
        <nav
          className="grid grid-cols-2 gap-4 mb-16 section-reveal"
          aria-label="Adjacent services"
        >
          <DetailLink
            href={`/services/${prev.slug}`}
            sectionId="services"
            className="p-4 rounded-xl border card-hover flex flex-col text-left cursor-pointer"
            style={{ borderColor: prev.border, background: prev.bg }}
          >
            <span className="text-[11px] font-bold text-ink/50 flex items-center gap-1 mb-1">
              <ArrowLeft size={12} /> Previous
            </span>
            <span className="font-display font-bold text-sm text-ink">
              {prev.title}
            </span>
          </DetailLink>
          <DetailLink
            href={`/services/${next.slug}`}
            sectionId="services"
            className="p-4 rounded-xl border card-hover flex flex-col items-end text-right cursor-pointer"
            style={{ borderColor: next.border, background: next.bg }}
          >
            <span className="text-[11px] font-bold text-ink/50 flex items-center gap-1 mb-1 justify-end">
              Next <ArrowRight size={12} />
            </span>
            <span className="font-display font-bold text-sm text-ink">
              {next.title}
            </span>
          </DetailLink>
        </nav>

        {/* All other services */}
        <section className="section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-6">
            Explore other services
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {others.map((s) => (
              <DetailLink
                key={s.slug}
                href={`/services/${s.slug}`}
                sectionId="services"
                className="group flex items-center gap-4 p-4 rounded-xl border card-hover text-left cursor-pointer"
                style={{ borderColor: s.border, background: s.bg }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${s.color}20`,
                    border: `2px solid ${s.color}30`,
                  }}
                >
                  <s.icon size={18} style={{ color: s.color }} />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-ink text-sm">
                    {s.title}
                  </p>
                  <p className="text-[12px] text-ink/55 truncate">{s.desc}</p>
                </div>
                <ArrowRight
                  size={14}
                  className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: s.color }}
                />
              </DetailLink>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
