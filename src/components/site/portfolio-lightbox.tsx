"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { postAlt, type SocialPost } from "@/lib/site-data";

interface Props {
  posts: SocialPost[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Full-size viewer for a social post. The posts carry baked-in copy (phone
 * numbers, addresses, captions) that is unreadable at masonry column width, so
 * the work needs a zoomed view — but the brief was "everything on the front
 * page", so this overlays in place rather than routing to a detail page.
 */
export function PortfolioLightbox({ posts, index, onClose, onNavigate }: Props) {
  const post = posts[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Set when the browser refuses audible playback despite the opening click.
  const [blocked, setBlocked] = useState(false);

  /**
   * Opening the lightbox is itself a user gesture, which is normally enough to
   * play with sound. Safari is stricter and can still reject, so rather than
   * leaving a dead player we retreat to muted playback and offer an explicit
   * unmute button — a second, unambiguous gesture that always succeeds.
   */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    setBlocked(false);
    el.muted = false;
    el.volume = 1;
    el.play().catch(() => {
      el.muted = true;
      setBlocked(true);
      el.play().catch(() => {});
    });
  }, [index]);

  const unmute = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    el.play().catch(() => {});
    setBlocked(false);
  }, []);

  const prev = useCallback(
    () => onNavigate((index - 1 + posts.length) % posts.length),
    [index, posts.length, onNavigate]
  );
  const next = useCallback(
    () => onNavigate((index + 1) % posts.length),
    [index, posts.length, onNavigate]
  );

  // Remember what was focused so focus can return there on close.
  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => restoreRef.current?.focus?.();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Native video controls bind the arrow keys to seeking. If the player has
      // focus, let it scrub rather than yanking the visitor to the next reel.
      if ((e.target as HTMLElement)?.tagName === "VIDEO") return;
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    // Lock scroll without a layout jump when the scrollbar disappears.
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [onClose, prev, next]);

  if (!post) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${post.title}${post.client ? ` — ${post.client}` : ""}`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm motion-safe:animate-fade-in-up"
        aria-hidden="true"
      />

      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
      >
        <X size={20} />
      </button>

      {posts.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous work"
            className="absolute left-2 sm:left-5 z-10 w-11 h-11 rounded-full flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next work"
            className="absolute right-2 sm:right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      <figure
        className="relative z-[1] flex flex-col items-center max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Same frame as the grid card the visitor clicked: hairline brand
            border, a margin of open space, transparent fill. Here that margin
            reads as the dark backdrop rather than the page. */}
        <div
          className="relative rounded-2xl p-2 shadow-2xl"
          style={{ border: `2px solid ${post.color}` }}
        >
          {post.video ? (
            <>
              <video
                key={post.slug}
                ref={videoRef}
                src={post.video}
                poster={post.src}
                width={post.w}
                height={post.h}
                controls
                loop
                playsInline
                aria-label={`${post.title} reel${post.client ? ` for ${post.client}` : ""}`}
                className="max-h-[78vh] w-auto max-w-full object-contain rounded-lg block"
              />
              {blocked && (
                <button
                  onClick={unmute}
                  className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 h-11 rounded-full text-xs font-bold text-white bg-black/70 hover:bg-black/85 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
                >
                  <Volume2 size={14} />
                  Tap for sound
                </button>
              )}
            </>
          ) : (
            <img
              key={post.slug}
              src={post.src}
              alt={postAlt(post)}
              width={post.w}
              height={post.h}
              className="max-h-[78vh] w-auto max-w-full object-contain rounded-lg block"
            />
          )}
        </div>
        <figcaption className="mt-4 text-center">
          <p className="font-display font-bold text-white text-sm">
            {post.title}
          </p>
          {post.client && (
            <p className="text-xs text-white/60 mt-0.5">{post.client}</p>
          )}
          <p className="text-[11px] text-white/40 mt-1.5">
            {index + 1} / {posts.length}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
