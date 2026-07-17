"use client";

import { useMemo, useState } from "react";
import { Maximize2, Play, Volume2, VolumeX } from "lucide-react";
import {
  projects,
  socialPosts,
  portfolioCategories,
  type SocialPost,
} from "@/lib/site-data";
import { PortfolioLightbox } from "@/components/site/portfolio-lightbox";
import { ReelVideo } from "@/components/site/reel-video";

const SOCIAL = "Social Media";

/**
 * A masonry column count per breakpoint. Columns (rather than a fixed-cell
 * grid) let every piece keep its true aspect ratio: these posts have copy baked
 * into the artwork, so cropping them to uniform tiles would cut off headlines
 * and contact details.
 */
const COLUMNS = "columns-2 sm:columns-3 lg:columns-4 xl:columns-5";

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  /**
   * Off by default, and deliberately so: browsers refuse to start audio until
   * the visitor has clicked something, and this toggle is that click. Once it's
   * on, hovering a reel plays it with sound; it doubles as the stop control
   * WCAG requires for audio that starts on its own.
   */
  const [soundOn, setSoundOn] = useState(false);

  const showSocial = activeFilter === "All" || activeFilter === SOCIAL;

  // The lightbox steps through whatever social work is currently on screen.
  const visibleSocial: SocialPost[] = useMemo(
    () => (showSocial ? socialPosts : []),
    [showSocial]
  );

  const visibleProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  const isEmpty = visibleSocial.length === 0 && visibleProjects.length === 0;
  // No reels on screen means nothing to unmute — don't offer a dead control.
  const hasReels = visibleSocial.some((p) => p.video);

  return (
    <section id="portfolio" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 section-reveal">
          <p className="text-xs font-bold tracking-widest uppercase mb-3">
            <span className="text-gradient">Our Portfolio</span>
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-ink">
            Our Latest <span className="text-gradient">Work</span>
          </h2>
          <p className="text-sm text-ink/55 mt-3 max-w-md mx-auto">
            Every piece below is live work — browse it all right here.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10 section-reveal"
          role="tablist"
          aria-label="Filter work by category"
        >
          {portfolioCategories.map((cat) => {
            const active = activeFilter === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setActiveFilter(cat);
                  setLightboxIndex(null);
                }}
                className={`px-5 py-3 rounded-full text-sm font-semibold leading-5 transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet ${
                  active
                    ? "text-white shadow-md"
                    : "bg-card border border-black/8 text-ink hover:border-violet/30"
                }`}
                style={
                  active
                    ? { background: "linear-gradient(135deg, #631DFE, #A7069B)" }
                    : undefined
                }
              >
                {cat}
              </button>
            );
          })}
        </div>

        {hasReels && (
          <div className="flex justify-center mb-8 section-reveal">
            <button
              onClick={() => setSoundOn((v) => !v)}
              aria-pressed={soundOn}
              className="inline-flex items-center gap-2 px-4 h-11 rounded-full text-xs font-bold bg-card border border-black/8 text-ink hover:border-violet/30 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
            >
              {soundOn ? (
                <Volume2 size={14} style={{ color: "#631DFE" }} />
              ) : (
                <VolumeX size={14} className="text-ink/40" />
              )}
              {soundOn ? "Sound on — hover a reel" : "Turn on sound"}
            </button>
          </div>
        )}

        {isEmpty ? (
          <p className="text-center text-sm text-muted py-10">
            No work in this category yet.
          </p>
        ) : (
          <div className={`${COLUMNS} gap-4`}>
            {visibleSocial.map((post, i) => (
              <button
                key={post.slug}
                onClick={() => setLightboxIndex(i)}
                aria-label={
                  post.video
                    ? `Play ${post.title} reel${
                        post.client ? ` for ${post.client}` : ""
                      } with sound`
                    : `View ${post.title}${
                        post.client ? ` for ${post.client}` : ""
                      } full size`
                }
                className="group relative block w-full mb-4 break-inside-avoid rounded-2xl overflow-hidden bg-card card-hover text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet motion-safe:animate-fade-in-up"
                style={{
                  border: `2px solid ${post.color}`,
                  animationDelay: `${Math.min(i, 12) * 45}ms`,
                }}
              >
                {post.video ? (
                  <ReelVideo post={post} soundOn={soundOn} />
                ) : (
                  <img
                    src={post.src}
                    alt={`${post.title} social media post${
                      post.client ? ` for ${post.client}` : ""
                    }`}
                    width={post.w}
                    height={post.h}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block"
                  />
                )}

                {/* Caption rides in on hover/focus; the artwork stays unobscured at rest. */}
                <div className="absolute inset-x-0 bottom-0 p-3 pt-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
                  <p className="font-display font-bold text-white text-xs leading-tight">
                    {post.title}
                  </p>
                  {post.client && (
                    <p className="text-[10px] text-white/70 mt-0.5">
                      {post.client}
                    </p>
                  )}
                </div>
                {/* Reels loop silently, so the badge stays visible to advertise
                    that sound exists behind a click. Stills only need the
                    zoom affordance on hover. */}
                <span
                  className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-opacity duration-300 ${
                    post.video
                      ? "opacity-90"
                      : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                  style={{ background: `${post.color}E6` }}
                  aria-hidden="true"
                >
                  {post.video ? (
                    <Play size={12} className="text-white fill-white" />
                  ) : (
                    <Maximize2 size={12} className="text-white" />
                  )}
                </span>
              </button>
            ))}

            {visibleProjects.map((project, i) => (
              <div
                key={project.slug}
                className="group relative mb-4 break-inside-avoid rounded-2xl overflow-hidden bg-card card-hover motion-safe:animate-fade-in-up"
                style={{
                  border: `2px solid ${project.color}`,
                  animationDelay: `${Math.min(visibleSocial.length + i, 12) * 45}ms`,
                }}
              >
                {/* Stock photography, unlike the social posts, carries no copy —
                    so a uniform 4:3 crop is safe here. */}
                <img
                  src={project.img}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/3] object-cover block transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="font-display font-bold text-ink text-sm leading-tight">
                    {project.title}
                  </h3>
                  <p
                    className="text-[11px] mt-1 font-semibold"
                    style={{ color: project.color }}
                  >
                    {project.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <PortfolioLightbox
          posts={visibleSocial}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
