"use client";

import { clients } from "@/lib/site-data";

// Placeholder "logos" — a colored initial badge + name. Swap each entry
// for a real client logo image once provided.
const track = [...clients, ...clients];

export function ClientsSection() {
  return (
    <section className="py-20 bg-surface-alt overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 section-reveal">
          <p className="text-xs font-bold tracking-widest uppercase mb-3">
            <span className="text-gradient">Our Clients</span>
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-ink">
            Brands We&apos;ve Helped <span className="text-gradient">Grow</span>
          </h2>
        </div>
      </div>

      <div className="relative section-reveal">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-surface-alt to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-surface-alt to-transparent" />

        <div className="flex w-max animate-marquee">
          {track.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex items-center gap-3 mx-4 px-8 h-20 rounded-2xl border bg-card flex-shrink-0"
              style={{ borderColor: `${client.color}30` }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
                style={{ background: `${client.color}20`, color: client.color }}
              >
                {client.name.charAt(0)}
              </div>
              <span className="font-display font-bold text-sm text-ink whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
