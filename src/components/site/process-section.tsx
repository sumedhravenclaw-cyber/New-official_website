"use client";

import { processSteps } from "@/lib/site-data";

export function ProcessSection() {
  return (
    <section className="py-24 bg-surface-alt relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 section-reveal">
          <span className="text-xs font-medium tracking-widest uppercase mb-4 block">
            <span className="text-gradient">How We Work</span>
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink mb-4">
            Our <span className="text-gradient">Process</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            A proven six-step process built for clarity, collaboration, and
            exceptional outcomes.
          </p>
        </div>

        {/* Desktop timeline */}
        <div className="hidden lg:block relative">
          <div
            className="absolute left-1/2 top-16 bottom-16 w-0.5 -translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, #EA9D12, #5B9EFE, #A7069B, #631DFE, #5E9929, #CC2829)",
            }}
          />

          <div className="space-y-12">
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                className={`section-reveal flex items-center gap-16 ${
                  i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className={`w-5/12 ${
                    i % 2 === 0 ? "text-right" : "text-left"
                  }`}
                >
                  <div className="inline-block glass rounded-2xl p-6 shadow-sm card-hover border border-black/5">
                    <div
                      className="font-display font-bold text-4xl mb-2 opacity-20"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </div>
                    <h3 className="font-display font-bold text-xl text-ink mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="w-2/12 flex justify-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center z-10 shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}, ${step.color}99)`,
                      boxShadow: `0 0 20px ${step.color}44`,
                    }}
                  >
                    <step.icon size={20} className="text-white" />
                  </div>
                </div>

                <div className="w-5/12" />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden grid sm:grid-cols-2 gap-6">
          {processSteps.map((step, i) => (
            <div
              key={step.number}
              className="section-reveal glass rounded-2xl p-6 shadow-sm card-hover border border-black/5"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${step.color}18` }}
                >
                  <step.icon size={22} style={{ color: step.color }} />
                </div>
                <div>
                  <div
                    className="font-display font-bold text-2xl opacity-20 leading-none mb-1"
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </div>
                  <h3 className="font-display font-semibold text-ink mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
