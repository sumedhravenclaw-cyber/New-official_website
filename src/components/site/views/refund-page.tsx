"use client";

import { useEffect } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { SectionLink } from "@/components/site/section-link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const COLOR = "#EA9D12";

export function RefundPage() {
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
            <RotateCcw size={28} style={{ color: COLOR }} />
          </div>

          <p
            className="text-xs font-bold uppercase tracking-wider mb-3"
            style={{ color: COLOR }}
          >
            Last updated: July 2026
          </p>

          <h1 className="font-display font-black text-3xl md:text-5xl text-ink mb-4">
            Refund Policy
          </h1>
          <p className="text-base text-ink/70 leading-relaxed max-w-xl">
            Our approach to refunds and cancellations.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 mt-14 pb-20">
        <section className="mb-12 section-reveal">
          <p className="text-sm text-ink/70 leading-relaxed">
            We want every client to feel confident working with RavenClaw. This
            policy explains how deposits, milestones, and subscriptions are
            handled if a project is cancelled or a refund is requested.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Project Deposits
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            Initial deposits cover discovery and planning work and are
            non-refundable once work has commenced.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Milestone Payments
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            Work completed up to a milestone is billable. Unused milestone
            payments may be refunded if the project is cancelled before that
            milestone begins.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Subscription Services
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            Monthly retainers can be cancelled anytime. We do not issue refunds
            for partial months.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Digital Products
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            Templates, courses, and downloadable products are non-refundable
            once accessed or downloaded.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            How to Request
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            Email hello@ravenclaw.com within 7 days of the charge with your
            project details.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Processing Time
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            Approved refunds are processed within 10 business days to the
            original payment method.
          </p>
        </section>
      </div>
    </article>
  );
}
