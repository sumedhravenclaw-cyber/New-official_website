"use client";

import { clients } from "@/lib/site-data";

// Duplicated once so the marquee (which translates -50%) loops seamlessly.
const track = [...clients, ...clients];

export function ClientsSection() {
  return (
    <section
      className="py-20 overflow-hidden relative"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Background glow, matching the testimonials section above it */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-20 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, #631DFE 0%, #A7069B 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 section-reveal">
          <p className="text-xs font-bold tracking-widest uppercase mb-3">
            <span className="text-gradient">Our Clients</span>
          </p>
          <h2
            className="font-display font-black text-3xl md:text-4xl"
            style={{ color: "#FEFEFE" }}
          >
            Brands We&apos;ve Helped <span className="text-gradient">Grow</span>
          </h2>
        </div>
      </div>

      <div className="relative section-reveal z-10">
        {/* Edge fade masks */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{
            background: "linear-gradient(to right, #050505, transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{
            background: "linear-gradient(to left, #050505, transparent)",
          }}
        />

        <div className="flex w-max animate-marquee">
          {track.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex items-center justify-center mx-4 px-8 h-24 w-52 flex-shrink-0"
            >
              <img
                src={client.src}
                alt={`${client.name} logo`}
                loading="lazy"
                decoding="async"
                className="max-h-14 w-auto object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
