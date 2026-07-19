"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  Maximize2,
  MessageCircle,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  projects,
  socialPosts,
  brandingPosts,
  performancePosts,
  uiuxPosts,
  portfolioCategories,
  comingSoonCategories,
  postAlt,
  WHATSAPP_LINK,
  type SocialPost,
} from "@/lib/site-data";
import { DetailLink } from "@/components/site/detail-link";
import { PortfolioLightbox } from "@/components/site/portfolio-lightbox";
import { ReelVideo } from "@/components/site/reel-video";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const SOCIAL = "Social Media";
const BRANDING = "Branding";
const PERFORMANCE = "Performance Marketing";
const UIUX = "UI/UX Design";

/**
 * Masonry columns per breakpoint. Columns (not a fixed-cell grid) let every
 * piece keep its true aspect ratio — these posts have copy baked into the
 * artwork, so cropping to uniform tiles would slice off headlines and contact
 * details.
 */
const COLUMNS = "columns-2 sm:columns-3 lg:columns-4 xl:columns-5";

/**
 * Wider columns for screenshot work — website captures and analytics
 * dashboards carry fine print (figures, axis labels, table rows) that is
 * unreadable at the narrow width the phone-format social posts use.
 */
const WIDE_COLUMNS = "columns-1 sm:columns-2 lg:columns-3";

/**
 * Which client/subject a post belongs to, derived from its slug. Posts of the
 * same kind cluster together in the grid — gym with gym, food with food —
 * rather than being scattered. Reels and stills of a kind stay in that cluster.
 */
function kindOf(post: SocialPost): string {
  const s = post.slug;
  if (s.startsWith("fashion")) return "fashion";
  if (s.startsWith("fitness") || s.startsWith("gym")) return "fitness";
  if (s.startsWith("food")) return "food";
  if (s.startsWith("automotive")) return "automotive";
  if (s.startsWith("real-estate")) return "realestate";
  if (s.startsWith("anishas")) return "art";
  if (s.startsWith("lb-opticals") || s.startsWith("eyewear")) return "opticals";
  return "other";
}

// The order the clusters appear in, largest/most-showcased first, with the
// heading shown above each block.
const KIND_ORDER = [
  "fitness",
  "fashion",
  "opticals",
  "food",
  "art",
  "automotive",
  "realestate",
  "other",
];

const KIND_LABELS: Record<string, string> = {
  fitness: "Fitness & Gym",
  fashion: "Fashion",
  opticals: "Topical",
  food: "Food & Restaurant",
  art: "Creative",
  automotive: "Automotive",
  realestate: "Real Estate",
  other: "More Work",
};

interface KindGroup {
  kind: string;
  label: string;
  items: SocialPost[];
}

/**
 * Bucket posts into their kinds, ordered by KIND_ORDER, so each kind renders as
 * its own block — gym in one block, food in the next. Within a kind the source
 * order is kept (reels then stills). Rendering separate blocks (rather than one
 * masonry) is what makes the grouping read visually: a single CSS-columns
 * masonry would balance items across columns and scatter the clusters.
 */
function groupByKind(posts: SocialPost[]): KindGroup[] {
  const buckets = new Map<string, SocialPost[]>();
  for (const p of posts) {
    const k = kindOf(p);
    (buckets.get(k) ?? buckets.set(k, []).get(k)!).push(p);
  }
  return KIND_ORDER.filter((k) => buckets.has(k)).map((kind) => ({
    kind,
    label: KIND_LABELS[kind] ?? "More Work",
    items: buckets.get(kind)!,
  }));
}

/** A single framed post/reel tile, shared by every group block. */
function SocialCard({
  post,
  soundOn,
  onOpen,
  delayIndex,
}: {
  post: SocialPost;
  soundOn: boolean;
  onOpen: () => void;
  delayIndex: number;
}) {
  return (
    <button
      onClick={onOpen}
      aria-label={
        post.video
          ? `Play ${post.title} reel${post.client ? ` for ${post.client}` : ""}`
          : `View ${post.title}${
              post.client ? ` for ${post.client}` : ""
            } full size`
      }
      className="group relative block w-full mb-4 break-inside-avoid box-border rounded-2xl p-2 bg-transparent card-hover text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet motion-safe:animate-fade-in-up"
      style={{
        border: `2px solid ${post.color}`,
        animationDelay: `${Math.min(delayIndex, 12) * 45}ms`,
      }}
    >
      {/* The artwork sits inside the frame: a hairline brand border, a margin of
          open space (transparent, so it picks up the page), then rounded
          artwork. Matches the source post style. */}
      <div className="relative rounded-lg overflow-hidden">
        {post.video ? (
          <ReelVideo post={post} soundOn={soundOn} />
        ) : (
          <img
            src={post.src}
            alt={postAlt(post)}
            width={post.w}
            height={post.h}
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
          />
        )}

        {/* Caption rides in on hover/focus; artwork clear at rest. */}
        <div className="absolute inset-x-0 bottom-0 p-3 pt-8 bg-gradient-to-t from-black/85 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
          <p className="font-display font-bold text-white text-xs leading-tight">
            {post.title}
          </p>
          {post.client && (
            <p className="text-[10px] text-white/70 mt-0.5">{post.client}</p>
          )}
        </div>

        {/* Reels loop silently, so the badge stays visible and carries the
            duration. Stills only get the zoom affordance on hover. */}
        <span
          className={`absolute top-2 right-2 h-7 rounded-full flex items-center justify-center gap-1 transition-opacity duration-300 ${
            post.video
              ? "px-2 opacity-90"
              : "w-7 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          }`}
          style={{ background: `${post.color}E6` }}
          aria-hidden="true"
        >
          {post.video ? (
            <>
              <Play size={11} className="text-white fill-white" />
              {post.dur && (
                <span className="text-[10px] font-bold text-white">
                  {post.dur}
                </span>
              )}
            </>
          ) : (
            <Maximize2 size={12} className="text-white" />
          )}
        </span>
      </div>
    </button>
  );
}

export function PortfolioSection() {
  // There is no "All" tab — one category is always selected, defaulting to the
  // first in the list.
  const [activeFilter, setActiveFilter] = useState(portfolioCategories[0]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  /**
   * Off by default: browsers refuse audio until the visitor clicks something,
   * and this toggle is that click. Once on, hovering a reel plays it with sound;
   * it doubles as the stop control WCAG requires for auto-starting audio.
   */
  const [soundOn, setSoundOn] = useState(false);

  // Filter switches unmount/remount the group blocks; the page-level observer
  // (home-view) only saw the initial DOM, so re-observe on every filter change
  // or remounted `.section-reveal` blocks would stay at opacity 0 forever.
  useScrollReveal([activeFilter]);

  const showSocial = activeFilter === SOCIAL;
  const showBranding = activeFilter === BRANDING;
  const showPerformance = activeFilter === PERFORMANCE;
  const showUiux = activeFilter === UIUX;

  const socialGroups: KindGroup[] = useMemo(
    () => (showSocial ? groupByKind(socialPosts) : []),
    [showSocial]
  );

  const brandingItems: SocialPost[] = useMemo(
    () => (showBranding ? brandingPosts : []),
    [showBranding]
  );
  const performanceItems: SocialPost[] = useMemo(
    () => (showPerformance ? performancePosts : []),
    [showPerformance]
  );
  const uiuxItems: SocialPost[] = useMemo(
    () => (showUiux ? uiuxPosts : []),
    [showUiux]
  );
  // Flat order (groups concatenated, then branding, then performance) drives
  // the lightbox, so its prev/next walks one block fully before the next —
  // matching what's on screen.
  const flatSocial: SocialPost[] = useMemo(
    () => [
      ...socialGroups.flatMap((g) => g.items),
      ...brandingItems,
      ...performanceItems,
      ...uiuxItems,
    ],
    [socialGroups, brandingItems, performanceItems, uiuxItems]
  );

  const visibleProjects = useMemo(
    () => projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  const isEmpty = flatSocial.length === 0 && visibleProjects.length === 0;
  const comingSoon = isEmpty ? comingSoonCategories[activeFilter] : undefined;
  const hasReels = flatSocial.some((p) => p.video);

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
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet ${
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

        {comingSoon ? (
          /* Category with nothing published yet: say so plainly and give the
             visitor somewhere to go, rather than a dead empty grid. */
          <div
            className="section-reveal max-w-xl mx-auto text-center rounded-2xl border p-10"
            style={{
              borderColor: `${comingSoon.color}30`,
              background: `${comingSoon.color}0C`,
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: `${comingSoon.color}20` }}
            >
              <Sparkles size={24} style={{ color: comingSoon.color }} />
            </div>
            <h3 className="font-display font-black text-2xl text-ink mb-3">
              Coming <span className="text-gradient">Soon</span>
            </h3>
            <p className="text-sm text-ink/65 leading-relaxed mb-7">
              {comingSoon.blurb}
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-display font-bold text-sm text-white px-7 py-3 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
              style={{ background: comingSoon.color }}
            >
              <MessageCircle size={16} />
              Talk to us about {activeFilter}
            </a>
          </div>
        ) : isEmpty ? (
          <p className="text-center text-sm text-muted py-10">
            No work in this category yet.
          </p>
        ) : (
          <div className="space-y-14">
            {/* One block per kind, so gym sits with gym, food with food. */}
            {socialGroups.map((group) => (
              <div key={`group-${group.kind}`} className="section-reveal">
                <h3 className="font-display font-bold text-lg text-ink mb-5 flex items-center gap-2.5">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: group.items[0].color }}
                  />
                  {group.label}
                  <span className="text-xs font-semibold text-ink/35">
                    {group.items.length}
                  </span>
                </h3>
                <div className={`${COLUMNS} gap-4`}>
                  {group.items.map((post, i) => (
                    <SocialCard
                      key={post.slug}
                      post={post}
                      soundOn={soundOn}
                      delayIndex={i}
                      onOpen={() => setLightboxIndex(flatSocial.indexOf(post))}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Branding block: logo & identity boards, same framed masonry
                cards as the social work. */}
            {brandingItems.length > 0 && (
              <div key="group-branding" className="section-reveal">
                <h3 className="font-display font-bold text-lg text-ink mb-5 flex items-center gap-2.5">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: brandingItems[0].color }}
                  />
                  Logo &amp; Brand Identity
                  <span className="text-xs font-semibold text-ink/35">
                    {brandingItems.length}
                  </span>
                </h3>
                <div className={`${COLUMNS} gap-4`}>
                  {brandingItems.map((post, i) => (
                    <SocialCard
                      key={post.slug}
                      post={post}
                      soundOn={soundOn}
                      delayIndex={i}
                      onOpen={() => setLightboxIndex(flatSocial.indexOf(post))}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Performance block: real campaign results — insights, ads
                dashboards, lead & revenue proof — same framed masonry cards. */}
            {performanceItems.length > 0 && (
              <div key="group-performance" className="section-reveal">
                <h3 className="font-display font-bold text-lg text-ink mb-5 flex items-center gap-2.5">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: performanceItems[0].color }}
                  />
                  Campaign Results
                  <span className="text-xs font-semibold text-ink/35">
                    {performanceItems.length}
                  </span>
                </h3>
                <div className={`${WIDE_COLUMNS} gap-4`}>
                  {performanceItems.map((post, i) => (
                    <SocialCard
                      key={post.slug}
                      post={post}
                      soundOn={soundOn}
                      delayIndex={i}
                      onOpen={() => setLightboxIndex(flatSocial.indexOf(post))}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* UI/UX block: Figma design boards. Wide columns because the
                boards carry fine print (labels, token values) that is
                unreadable at the narrow width the social posts use. */}
            {uiuxItems.length > 0 && (
              <div key="group-uiux" className="section-reveal">
                <h3 className="font-display font-bold text-lg text-ink mb-5 flex items-center gap-2.5">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: uiuxItems[0].color }}
                  />
                  Product &amp; Website Design
                  <span className="text-xs font-semibold text-ink/35">
                    {uiuxItems.length}
                  </span>
                </h3>
                <div className={`${WIDE_COLUMNS} gap-4`}>
                  {uiuxItems.map((post, i) => (
                    <SocialCard
                      key={post.slug}
                      post={post}
                      soundOn={soundOn}
                      delayIndex={i}
                      onOpen={() => setLightboxIndex(flatSocial.indexOf(post))}
                    />
                  ))}
                </div>
              </div>
            )}

            {visibleProjects.length > 0 && (
              <div key="group-projects" className="section-reveal">
                {flatSocial.length > 0 && (
                  <h3 className="font-display font-bold text-lg text-ink mb-5 flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full flex-shrink-0 bg-violet" />
                    Projects
                    <span className="text-xs font-semibold text-ink/35">
                      {visibleProjects.length}
                    </span>
                  </h3>
                )}
                <div className={`${WIDE_COLUMNS} gap-4`}>
                  {visibleProjects.map((project, i) => {
                    const inner = (
                      <div className="relative rounded-lg overflow-hidden">
                        {/* Project imagery carries no copy, so a uniform 4:3 crop is safe. */}
                        <img
                          src={project.img}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full aspect-[4/3] object-cover block transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Badge signals where the card goes: out to the live
                            site, or through to the case study on this site. */}
                        <span
                          className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300"
                          style={{ background: `${project.color}E6` }}
                          aria-hidden="true"
                        >
                          {project.link ? (
                            <ExternalLink size={12} className="text-white" />
                          ) : (
                            <ArrowRight size={12} className="text-white" />
                          )}
                        </span>
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
                    );
                    const cardClass =
                      "group relative block mb-4 break-inside-avoid box-border rounded-2xl p-2 bg-transparent card-hover motion-safe:animate-fade-in-up";
                    const cardStyle = {
                      border: `2px solid ${project.color}`,
                      animationDelay: `${Math.min(i, 12) * 45}ms`,
                    };
                    return project.link ? (
                      <a
                        key={project.slug}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit the live ${project.title} website`}
                        className={`${cardClass} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet`}
                        style={cardStyle}
                      >
                        {inner}
                      </a>
                    ) : (
                      /* No live URL — open the case study on this site.
                         DetailLink tags the history entry with "#portfolio" so
                         Back returns to this section rather than the page top. */
                      <DetailLink
                        key={project.slug}
                        href={`/portfolio/${project.slug}`}
                        sectionId="portfolio"
                        aria-label={`View the ${project.title} case study`}
                        className={`${cardClass} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet`}
                        style={cardStyle}
                      >
                        {inner}
                      </DetailLink>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <PortfolioLightbox
          posts={flatSocial}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
