"use client";

import { useEffect, useRef, useState } from "react";
import type { SocialPost } from "@/lib/site-data";

/**
 * A reel tile in the masonry.
 *
 * Playback is always silent here — browsers refuse to autoplay audible video,
 * so sound lives in the lightbox where the visitor's click supplies the gesture
 * that unlocks it. `playsInline` stops iOS hijacking playback into fullscreen.
 *
 * How playback starts depends on the input device:
 *
 *  - Real pointer (mouse/trackpad): hover to play, per the brief. Keyboard
 *    focus counts too — a keyboard user can't hover, and the reel shouldn't be
 *    unreachable to them.
 *  - Touch: there is no hover. Relying on it alone would leave every phone
 *    visitor staring at a still, so touch falls back to playing while the reel
 *    is on screen — the familiar social-feed behaviour.
 *
 * Either way playback is bounded: it stops the moment the reel leaves the
 * viewport, and off-screen reels are never fetched. A dozen reels decoding at
 * once would burn battery and bandwidth for video nobody is watching.
 */
export function ReelVideo({
  post,
  soundOn,
}: {
  post: SocialPost;
  /**
   * Driven by the gallery's sound toggle. Audio only ever rides on hover: on
   * touch, reels start unprompted as they scroll past, and a feed that shouts
   * at you unasked is exactly what the autoplay policy exists to prevent.
   */
  soundOn: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [hoverMode, setHoverMode] = useState(false);
  const audible = soundOn && hoverMode;

  // Resolved after mount: matchMedia isn't available during SSR, and assuming
  // either device class would render the wrong behaviour on first paint.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setHoverMode(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || failed) return;

    // Motion sensitivity outranks the hover brief: hold on the poster and let
    // the visitor opt in via the lightbox instead.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // play() rejects on teardown or when interrupted mid-start. That's routine
    // churn while scrolling or flicking the cursor across a grid, not an error.
    // Muting is decided at play time, not render time: the toggle can flip
    // while a reel is already under the cursor.
    const play = () => {
      el.muted = !audible;
      el.play().catch(() => {
        // Sound was refused despite the toggle's click. Rather than leave a
        // dead tile, drop to a silent preview — the lightbox still has audio.
        el.muted = true;
        el.play().catch(() => {});
      });
    };
    const stop = () => {
      el.pause();
      el.currentTime = 0; // next hover replays the hook, not the middle
    };

    // Pause anything scrolled out of view regardless of input device.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hoverMode) play();
        } else {
          stop();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    if (!hoverMode) return () => { io.disconnect(); el.pause(); };

    // The caption overlay sits above the video, so listening on the video alone
    // would drop out as the cursor crossed it. The card is the real hover target.
    const host = el.closest("button") ?? el;
    host.addEventListener("pointerenter", play);
    host.addEventListener("pointerleave", stop);
    host.addEventListener("focusin", play);
    host.addEventListener("focusout", stop);
    return () => {
      io.disconnect();
      host.removeEventListener("pointerenter", play);
      host.removeEventListener("pointerleave", stop);
      host.removeEventListener("focusin", play);
      host.removeEventListener("focusout", stop);
      el.pause();
    };
  }, [failed, hoverMode, audible]);

  // Silence a reel the instant the toggle goes off, even mid-hover: the toggle
  // is the visitor's stop control, so it has to act immediately.
  useEffect(() => {
    const el = ref.current;
    if (el && !audible) el.muted = true;
  }, [audible]);

  // If the MP4 is missing or won't decode, degrade to exactly what the card
  // looked like before video existed.
  if (failed || !post.video) {
    return (
      <img
        src={post.src}
        alt={`${post.title}${post.client ? ` for ${post.client}` : ""}`}
        width={post.w}
        height={post.h}
        loading="lazy"
        decoding="async"
        className="w-full h-full block"
      />
    );
  }

  return (
    <video
      ref={ref}
      src={post.video}
      poster={post.src}
      width={post.w}
      height={post.h}
      muted
      loop
      playsInline
      // Hover needs a quick start, so buy the cheap header fetch up front.
      // Touch autoplays unprompted, so it pays for nothing until asked.
      preload={hoverMode ? "metadata" : "none"}
      aria-label={`${post.title} reel${post.client ? ` for ${post.client}` : ""}`}
      onError={() => setFailed(true)}
      className="w-full h-full block"
    />
  );
}
