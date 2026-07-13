"use client";

import { useEffect } from "react";
import { ArrowLeft, MessageCircle, Sparkles, Briefcase, MapPin } from "lucide-react";
import { SectionLink } from "@/components/site/section-link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { openRoles } from "@/lib/site-data";

const COLOR = "#5E9929";
const WHATSAPP_HREF =
  "https://wa.me/918010049620?text=Hello%20Ravenclaw%2C%20I%27m%20interested%20in%20a%20role";

export function CareersPage() {
  useScrollReveal([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <article className="pt-24">
      {/* Hero */}
      <div
        className="pt-16 pb-14 px-6"
        style={{ background: `${COLOR}0C` }}
      >
        <div className="max-w-3xl mx-auto reveal-left">
          <SectionLink
            sectionId="footer"
            className="inline-flex items-center gap-1.5 text-xs font-bold mb-8 text-ink/60 hover:text-ink transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </SectionLink>

          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md"
            style={{
              background: `${COLOR}20`,
              border: `2px solid ${COLOR}30`,
            }}
          >
            <Sparkles size={28} style={{ color: COLOR }} />
          </div>

          <p
            className="text-xs font-bold uppercase tracking-wider mb-3"
            style={{ color: COLOR }}
          >
            Last updated: July 2026
          </p>

          <h1 className="font-display font-black text-3xl md:text-5xl text-ink mb-4">
            Careers
          </h1>
          <p className="text-base text-ink/70 leading-relaxed max-w-xl">
            Build the internet with us.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 mt-14 pb-20">
        <section className="mb-12 section-reveal">
          <p className="text-sm text-ink/70 leading-relaxed">
            RavenClaw is a small, hands-on team of designers, engineers, and
            marketers who care about the craft of the work. We are growing
            carefully — adding people who want to do the best work of their
            career alongside clients who trust them to lead.
          </p>
        </section>

        {/* Why Work With Us */}
        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Why Work With Us
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed mb-3">
            You will work directly on client projects from day one, with real
            ownership over design and technical decisions rather than sitting on
            the sidelines.
          </p>
          <p className="text-sm text-ink/70 leading-relaxed">
            We keep the team lean on purpose, so your work is visible and your
            growth is fast.
          </p>
        </section>

        {/* Our Culture */}
        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Our Culture
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            We value curiosity, follow-through, and honest communication over
            busywork. Remote-friendly, outcome-focused, and always learning.
          </p>
        </section>

        {/* How to Apply */}
        <section className="mb-14 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            How to Apply
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            Send your resume, portfolio, and a short note on what you would like
            to work on to hello@ravenclaw.com. We reply to every application.
          </p>
        </section>

        {/* Open Roles */}
        <section className="mb-14 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-6">
            Open Roles
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {openRoles.map((role) => (
              <div
                key={role.title}
                className="p-5 rounded-xl border card-hover"
                style={{
                  borderColor: `${COLOR}30`,
                  background: `${COLOR}0C`,
                }}
              >
                <p className="font-display font-bold text-ink text-base mb-3">
                  {role.title}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase size={14} style={{ color: COLOR }} />
                  <span className="text-xs font-medium text-ink/70">
                    {role.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: COLOR }} />
                  <span className="text-xs font-medium text-ink/70">
                    {role.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section-reveal">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-display font-bold text-sm text-white px-8 py-3.5 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: COLOR }}
          >
            <MessageCircle size={16} />
            Chat with us
          </a>
        </section>
      </div>
    </article>
  );
}
