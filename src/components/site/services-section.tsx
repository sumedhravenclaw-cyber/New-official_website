"use client";

import { ArrowRight } from "lucide-react";
import { services } from "@/lib/site-data";
import { DetailLink } from "@/components/site/detail-link";

export function ServicesSection() {
  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 section-reveal">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#631DFE" }}
          >
            <span className="text-gradient">Our Services</span>
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-ink">
            Services That Drive <span className="text-gradient">Growth</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <DetailLink
              key={s.slug}
              href={`/services/${s.slug}`}
              sectionId="services"
              className="section-reveal group flex flex-col items-center text-center p-6 rounded-2xl border card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer"
              style={
                {
                  background: s.bg,
                  borderColor: s.border,
                  transitionDelay: `${i * 70}ms`,
                  "--tw-ring-color": s.color,
                } as React.CSSProperties
              }
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5 shadow-lg"
                style={{
                  background: `${s.color}20`,
                  border: `2px solid ${s.color}30`,
                }}
              >
                <s.icon size={26} style={{ color: s.color }} />
              </div>

              <h3 className="font-display font-bold text-ink text-sm mb-2">
                {s.title}
              </h3>
              <p className="text-[12px] text-muted leading-relaxed">{s.desc}</p>

              <span
                className="mt-4 text-[11px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: s.color }}
              >
                View details <ArrowRight size={12} />
              </span>
            </DetailLink>
          ))}
        </div>
      </div>
    </section>
  );
}
