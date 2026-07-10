"use client";

import { whyChooseFeatures, stats } from "@/lib/site-data";

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 section-reveal">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#631DFE" }}
          >
            <span className="text-gradient">Why Choose Us</span>
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-ink">
            We Create, <span className="text-gradient">You Grow</span>
          </h2>
        </div>

        {/* 6 feature cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {whyChooseFeatures.map((f, i) => (
            <div
              key={f.title}
              className="section-reveal flex flex-col items-center text-center p-5 rounded-2xl border border-black/5 card-hover bg-card shadow-sm"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ background: f.bg }}
              >
                <f.icon size={24} style={{ color: f.color }} />
              </div>
              <h3 className="font-display font-bold text-ink text-sm mb-2">
                {f.title}
              </h3>
              <p className="text-[11px] text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Dark stats bar */}
        <div
          className="section-reveal rounded-2xl px-8 py-7"
          style={{
            background:
              "linear-gradient(135deg, #050505 0%, #1a1a2e 50%, #16213e 100%)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex items-center gap-4 ${
                  i > 0 ? "pt-5 md:pt-0 md:pl-6" : ""
                }`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <s.icon size={22} className="text-golden" />
                </div>
                <div>
                  <div className="font-display font-black text-2xl text-white">
                    {s.value}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
