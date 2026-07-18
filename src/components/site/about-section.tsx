"use client";

import { CheckCircle2 } from "lucide-react";
import {
  aboutBullets,
  aboutStory,
  aboutValues,
  missionVision,
  team,
} from "@/lib/site-data";
import { DetailLink } from "@/components/site/detail-link";
import { LinkedinIcon } from "@/components/site/brand-icons";

const floatingDots = [
  { top: "8%", left: "12%", size: 8, color: "#EA9D12" },
  { top: "15%", left: "58%", size: 10, color: "#EA9D12" },
  { top: "22%", left: "82%", size: 8, color: "#A7069B" },
  { top: "35%", left: "92%", size: 12, color: "#5B9EFE" },
  { top: "52%", left: "86%", size: 8, color: "#5E9929" },
  { top: "20%", left: "65%", size: 6, color: "#CC2829" },
  { top: "45%", left: "57%", size: 7, color: "#EA9D12" },
  { top: "68%", left: "75%", size: 9, color: "#5B9EFE" },
  { top: "12%", left: "73%", size: 5, color: "#5E9929" },
  { top: "60%", left: "93%", size: 6, color: "#631DFE" },
  { top: "78%", left: "8%", size: 7, color: "#A7069B" },
  { top: "30%", left: "4%", size: 9, color: "#5B9EFE" },
  { top: "85%", left: "35%", size: 6, color: "#EA9D12" },
  { top: "5%", left: "40%", size: 5, color: "#5E9929" },
  { top: "90%", left: "65%", size: 8, color: "#CC2829" },
  { top: "65%", left: "20%", size: 10, color: "#631DFE" },
  { top: "40%", left: "25%", size: 6, color: "#A7069B" },
  { top: "10%", left: "90%", size: 7, color: "#5B9EFE" },
];

export function AboutSection() {
  return (
    // No background: the hero's phoenix tail sweeps in behind this section, and
    // painting a surface here would slice it off again. overflow-hidden still
    // clips this section's OWN bird and dots — the phoenix is a child of the
    // hero, so it is unaffected by this clip.
    <section id="about" className="py-20 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-10 items-center">
          {/* Left: bird image */}
          <div className="relative h-[400px] lg:h-[480px] reveal-left">
            <img
              src="/images/bird.png"
              alt="RavenClaw Bird"
              className="absolute bottom-[-15%] left-[-10%] h-[140%] md:h-[100%] lg:h-[130%] w-auto max-w-none object-contain object-left-bottom pointer-events-none select-none"
            />
            {/* {floatingDots.map((dot, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-float pointer-events-none"
                style={{
                  top: dot.top,
                  left: dot.left,
                  width: dot.size,
                  height: dot.size,
                  background: dot.color,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${4 + i * 0.5}s`,
                  opacity: 0.8,
                  zIndex: 2,
                }}
              />
            ))} */}
          </div>

          {/* Middle: divider line */}
          <div className="hidden lg:block w-px h-64 bg-gradient-to-b from-transparent via-ink/15 to-transparent" />

          {/* Right: content */}
          <div className="reveal-right">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: "#631DFE" }}
            >
              <span className="text-gradient">About Us</span>
            </p>
            <h2 className="font-display font-black text-3xl md:text-4xl text-ink mb-5">
              We Are <span className="text-gradient">Ravenclaw</span>
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              A passionate team of designers, developers and strategists helping
              businesses create powerful digital presence. We combine creativity
              with technology to deliver solutions that truly make a difference
              for your brand.
            </p>

            <div className="space-y-4 mb-10">
              {aboutBullets.map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    style={{ color: b.color }}
                    className="flex-shrink-0"
                  />
                  <span className="text-ink font-medium text-sm">{b.label}</span>
                </div>
              ))}
            </div>

            {/* <DetailLink
              href="/about"
              sectionId="about"
              className="inline-block px-6 py-3 rounded-full border-2 border-ink text-ink text-sm font-semibold hover:bg-ink hover:text-snow transition-all duration-300"
            >
              Know More About Us
            </DetailLink> */}
          </div>
        </div>

        {/* The /about page's content, surfaced here so the front section tells
            the full story — same shared data, same card idiom as the page. */}

        {/* Our Story */}
        <div className="mt-20 max-w-3xl mx-auto text-center section-reveal">
          <h3 className="font-display font-bold text-lg text-ink mb-4">
            Our <span className="text-gradient">Story</span>
          </h3>
          {aboutStory.map((para) => (
            <p
              key={para}
              className="text-sm text-ink/70 leading-relaxed mb-3 last:mb-0"
            >
              {para}
            </p>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto section-reveal">
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
        </div>

        {/* Core Values */}
        <div className="mt-12 section-reveal">
          <h3 className="font-display font-bold text-lg text-ink mb-6 text-center">
            Our Core <span className="text-gradient">Values</span>
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {aboutValues.map((v) => (
              <div
                key={v.label}
                className="p-5 rounded-xl border card-hover"
                style={{
                  borderColor: `${v.color}30`,
                  background: `${v.color}0C`,
                }}
              >
                <h4 className="font-display font-bold text-ink text-sm mb-2">
                  {v.label}
                </h4>
                <p className="text-xs text-ink/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meet the Team */}
        <div className="mt-12 section-reveal">
          <h3 className="font-display font-bold text-lg text-ink mb-6 text-center">
            Meet the <span className="text-gradient">Team</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
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
                  {/* Falls back to the colored placeholder behind it if the
                      file 404s. */}
                  <img
                    src={member.img}
                    alt={`${member.name}, ${member.role}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: member.objectPosition }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <h4 className="font-display font-bold text-ink text-sm mb-0.5">
                  {member.name}
                </h4>
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: member.color }}
                >
                  {member.role}
                </p>
                <p className="text-xs text-ink/60 leading-relaxed">
                  {member.bio}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="mt-3 w-10 h-10 rounded-full inline-flex items-center justify-center transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
                  style={{ background: "#0A66C215", color: "#0A66C2" }}
                >
                  <LinkedinIcon size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
