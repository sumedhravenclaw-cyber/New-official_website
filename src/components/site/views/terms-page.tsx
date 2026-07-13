"use client";

import { useEffect } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { SectionLink } from "@/components/site/section-link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const COLOR = "#A7069B";

export function TermsPage() {
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
            <FileText size={28} style={{ color: COLOR }} />
          </div>

          <p
            className="text-xs font-bold uppercase tracking-wider mb-3"
            style={{ color: COLOR }}
          >
            Last updated: July 2026
          </p>

          <h1 className="font-display font-black text-3xl md:text-5xl text-ink mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-base text-ink/70 leading-relaxed max-w-xl">
            The terms governing your use of our services.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 mt-14 pb-20">
        <section className="mb-12 section-reveal">
          <p className="text-sm text-ink/70 leading-relaxed">
            Please read these terms carefully before using our website or
            engaging our services. These terms outline the agreement between you
            and RavenClaw and apply to all projects, conversations, and
            deliverables unless a separate written contract states otherwise.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Acceptance of Terms
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            By accessing our website and services, you agree to these terms.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Services
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            We provide web development, design, branding, marketing, and AI
            solutions as described on our site.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Client Responsibilities
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            Clients must provide accurate information, timely feedback, and
            necessary access to complete projects.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Payment
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            Project fees, milestones, and payment schedules are outlined in
            individual proposals and invoices.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Intellectual Property
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            Upon full payment, ownership of final deliverables transfers to the
            client, unless otherwise agreed.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Limitation of Liability
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            We are not liable for indirect, incidental, or consequential damages
            beyond the project fees paid.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Termination
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            Either party may terminate the agreement with written notice per the
            terms in the project proposal.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Contact Us
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            Email hello@ravenclaw.com for questions about these terms.
          </p>
        </section>
      </div>
    </article>
  );
}
