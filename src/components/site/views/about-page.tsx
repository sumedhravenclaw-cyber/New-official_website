"use client";

import { useEffect } from "react";
import { ArrowLeft, CheckCircle2, MessageCircle, Target, Eye } from "lucide-react";
import { aboutValues, missionVision, stats, WHATSAPP_LINK, BRAND_GRADIENT } from "@/lib/site-data";
import { SectionLink } from "@/components/site/section-link";
import { CountUp } from "@/components/site/count-up";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

// Swap `img` for the real teammate photo once uploaded — keep filenames in
// /public/images/team/ to match the /images/bird.png public-path pattern
// used for the hero bird above. Replace name/role/bio placeholders with real copy.
const team = [
  {
    name: "Teammate One",
    role: "Role / Title",
    bio: "One line about what they do and bring to the team.",
    img: "/images/team/teammate-1.jpg",
    color: "#EA9D12",
  },
  {
    name: "Teammate Two",
    role: "Role / Title",
    bio: "One line about what they do and bring to the team.",
    img: "/images/team/teammate-2.jpg",
    color: "#5B9EFE",
  },
];

export function AboutPage() {
  useScrollReveal([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <article className="pt-24">
      {/* Hero */}
      <div className="relative pt-10 pb-16 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
          <SectionLink
            sectionId="about"
            className="inline-flex items-center gap-1.5 text-xs font-bold mb-8 text-ink/60 hover:text-ink transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </SectionLink>

          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-10 items-center">
            <div className="relative h-[280px] lg:h-[360px] reveal-left order-2 lg:order-1">
              <img
                src="/images/bird.png"
                alt="RavenClaw Bird"
                className="absolute top-3 bottom-0 left-[-10%] h-[130%] w-auto max-w-none object-contain object-left-bottom pointer-events-none select-none animate-float"
                style={{ animationDuration: "20s" }}
              />
            </div>

            <div className="hidden lg:block w-px h-56 bg-gradient-to-b from-transparent via-ink/15 to-transparent order-2" />

            <div className="reveal-right order-1 lg:order-3">
              <p
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: "#631DFE" }}
              >
                <span className="text-gradient">About Us</span>
              </p>
              <h1 className="font-display font-black text-3xl md:text-5xl text-ink mb-5">
                We Are <span className="text-gradient">Ravenclaw</span>
              </h1>
              <p className="text-ink/65 leading-relaxed">
                A passionate team of designers, developers and strategists
                helping businesses create powerful digital presence. We combine
                creativity with technology to deliver solutions that truly make
                a difference for your brand.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 mt-16 pb-20">
        {/* Story */}
        <section className="mb-16 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-4">
            Our Story
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed mb-4">
            RavenClaw was born from the idea that marketing should be driven by
            intelligent thinking, not just trends. Inspired by the timeless
            values of Ravenclaw — intelligence, wisdom, wit, and creativity — we
            set out to build an agency that values thoughtful strategy as much
            as exceptional execution. In a world filled with noise, we focus on
            creating meaningful experiences that connect brands with people.
            Every project we take on is an opportunity to solve problems
            creatively, tell compelling stories, and help businesses grow with
            confidence. Our journey is fueled by curiosity, continuous learning,
            and a passion for creating work that stands the test of time.
          </p>
          <p className="text-sm text-ink/70 leading-relaxed">
            Today we work across web development, design, branding, marketing,
            and AI — but the goal hasn&apos;t changed: build things that make a
            measurable difference for the businesses we work with.
          </p>
        </section>

        {/* Meet the Team */}
        <section className="mb-16 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-6">
            Meet the Team
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-2xl border card-hover"
                style={{
                  borderColor: `${member.color}30`,
                  background: `${member.color}0C`,
                }}
              >
                <div
                  className="w-full aspect-square rounded-xl mb-4 overflow-hidden flex items-center justify-center"
                  style={{ background: `${member.color}15` }}
                >
                  {/* Swap this img src for a real import from
                      /public/images/team/ once teammate photos are
                      uploaded — same pattern as the bird image above.
                      Until then this falls back to a colored placeholder
                      if the file 404s. */}
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <h3 className="font-display font-bold text-ink text-sm mb-0.5">
                  {member.name}
                </h3>
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: member.color }}
                >
                  {member.role}
                </p>
                <p className="text-xs text-ink/60 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid sm:grid-cols-2 gap-6 mb-16 section-reveal">
          {missionVision.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl border card-hover"
              style={{
                borderColor: `${item.color}30`,
                background: `${item.color}0C`,
              }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
                style={{ background: `${item.color}20` }}
              >
                <item.icon size={20} style={{ color: item.color }} />
              </div>
              <h3 className="font-display font-bold text-ink text-sm mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-ink/65 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Values */}
        <section className="mb-16 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-6">
            What We Stand For
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {aboutValues.map((v) => (
              <div
                key={v.label}
                className="p-5 rounded-xl border card-hover"
                style={{
                  borderColor: `${v.color}30`,
                  background: `${v.color}0C`,
                }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <CheckCircle2
                    size={18}
                    style={{ color: v.color }}
                    className="flex-shrink-0"
                  />
                  <h3 className="font-display font-bold text-ink text-sm">
                    {v.label}
                  </h3>
                </div>
                <p className="text-xs text-ink/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section
          className="section-reveal rounded-2xl px-8 py-7 mb-16"
          style={{
            background:
              "linear-gradient(135deg, #050505 0%, #1a1a2e 50%, #16213e 100%)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={[
                  "flex items-center gap-4 px-4 py-4 md:py-2",
                  // Mobile 2-col grid: a clean center cross — a vertical line
                  // between the columns and a horizontal line between the rows.
                  i % 2 === 1 ? "border-l border-white/10" : "",
                  i >= 2 ? "border-t border-white/10" : "",
                  // Desktop 4-col row: vertical dividers only, no top border.
                  "md:border-t-0",
                  i === 0 ? "md:border-l-0" : "md:border-l md:border-white/10",
                ].join(" ")}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <s.icon size={22} className="text-golden" />
                </div>
                <div>
                  <CountUp
                    value={s.value}
                    className="font-display font-black text-2xl text-white block"
                  />
                  <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section-reveal flex flex-wrap gap-4">
          <SectionLink
            sectionId="contact"
            className="px-7 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl inline-block"
            style={{ background: BRAND_GRADIENT }}
          >
            Get In Touch
          </SectionLink>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border-2 border-black/10 text-ink bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <MessageCircle size={16} style={{ color: "#25D366" }} />
            Chat on WhatsApp
          </a>
        </section>
      </div>
    </article>
  );
}
