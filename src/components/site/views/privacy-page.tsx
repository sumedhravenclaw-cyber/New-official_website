"use client";

import { useEffect } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useNav } from "@/lib/nav-store";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const COLOR = "#631DFE";

export function PrivacyPage() {
  const navigate = useNav((s) => s.navigate);

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
          <button
            type="button"
            onClick={() => navigate("home", { scrollTarget: "footer" })}
            className="inline-flex items-center gap-1.5 text-xs font-bold mb-8 text-ink/60 hover:text-ink transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </button>

          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md"
            style={{
              background: `${COLOR}20`,
              border: `2px solid ${COLOR}30`,
            }}
          >
            <ShieldCheck size={28} style={{ color: COLOR }} />
          </div>

          <p
            className="text-xs font-bold uppercase tracking-wider mb-3"
            style={{ color: COLOR }}
          >
            Last updated: July 2026
          </p>

          <h1 className="font-display font-black text-3xl md:text-5xl text-ink mb-4">
            Privacy Policy
          </h1>
          <p className="text-base text-ink/70 leading-relaxed max-w-xl">
            How we collect, use, and protect your information.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 mt-14 pb-20">
        <section className="mb-12 section-reveal">
          <p className="text-sm text-ink/70 leading-relaxed">
            Your privacy matters to us. This policy explains what information we
            collect, how we use it, and the choices you have. By using our
            website and services, you agree to the practices described below.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Information We Collect
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            We collect information such as your name, email, phone, and project
            details that you voluntarily provide via our contact form.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            How We Use Your Information
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            We use your information to respond to inquiries, provide services,
            send updates (with consent), and improve our website.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Information Sharing
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            We do not sell, trade, or rent your personal information. We may
            share data with service providers who help us operate our business.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Data Security
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            We implement appropriate technical and organizational measures to
            protect your data.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Cookies
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            We use cookies to improve browsing experience and analyze traffic.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Your Rights
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            You may request access, correction, or deletion of your personal
            data at any time.
          </p>
        </section>

        <section className="mb-10 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-3">
            Contact Us
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            Email hello@ravenclaw.com for privacy-related questions.
          </p>
        </section>
      </div>
    </article>
  );
}
