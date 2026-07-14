"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";
import { CALENDLY_URL, BRAND_GRADIENT } from "@/lib/site-data";

const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";
const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";

// Brand purple, used to theme Calendly's own UI (buttons, selected day, etc.).
const CALENDLY_PRIMARY = "631DFE";

type CalendlyGlobal = {
  initPopupWidget: (opts: { url: string }) => void;
  initInlineWidget: (opts: {
    url: string;
    parentElement: HTMLElement;
  }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyGlobal;
  }
}

let scriptPromise: Promise<void> | null = null;

/**
 * Injects Calendly's widget CSS + JS once per page and resolves when the
 * `window.Calendly` global is ready. Subsequent callers reuse the same promise.
 */
function loadCalendly(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = WIDGET_CSS;
      document.head.appendChild(link);
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${WIDGET_JS}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Calendly failed to load"))
      );
      return;
    }

    const script = document.createElement("script");
    script.src = WIDGET_JS;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Calendly failed to load"));
    document.body.appendChild(script);
  });

  return scriptPromise;
}

/** Appends Calendly styling params to the event URL without clobbering existing ones. */
function themedUrl(url: string): string {
  const [base, query = ""] = url.split("?");
  const params = new URLSearchParams(query);
  params.set("hide_gdpr_banner", "1");
  if (!params.has("primary_color")) params.set("primary_color", CALENDLY_PRIMARY);
  return `${base}?${params.toString()}`;
}

/**
 * Hook that returns an `open` function to launch the Calendly popup for any
 * element (button, heading, link…). Loads the widget script lazily on first
 * use and reports whether it's currently loading.
 */
export function useCalendlyPopup(url: string = CALENDLY_URL) {
  const [loading, setLoading] = useState(false);

  const open = useCallback(async () => {
    setLoading(true);
    try {
      await loadCalendly();
      window.Calendly?.initPopupWidget({ url: themedUrl(url) });
    } catch (err) {
      console.error("Calendly popup failed, opening in new tab:", err);
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { open, loading };
}

/**
 * "Book a Call" button that opens the Calendly scheduling popup. Loads the
 * widget script lazily on first click so it never blocks initial page load.
 */
export function CalendlyPopupButton({
  className,
  children = "Book a Call",
  url = CALENDLY_URL,
}: {
  className?: string;
  children?: React.ReactNode;
  url?: string;
}) {
  const { open, loading } = useCalendlyPopup(url);

  return (
    <button
      type="button"
      onClick={open}
      disabled={loading}
      className={
        className ??
        "flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-70"
      }
      style={{ background: BRAND_GRADIENT }}
    >
      <CalendarDays size={16} />
      {loading ? "Loading…" : children}
    </button>
  );
}

/**
 * Inline Calendly embed. Renders the scheduler directly in the page.
 */
export function CalendlyInline({
  url = CALENDLY_URL,
  className = "",
  minHeight = 680,
}: {
  url?: string;
  className?: string;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadCalendly()
      .then(() => {
        if (cancelled || !ref.current || !window.Calendly) return;
        // Guard against double-init (e.g. React strict mode remount).
        if (ref.current.childElementCount > 0) return;
        window.Calendly.initInlineWidget({
          url: themedUrl(url),
          parentElement: ref.current,
        });
      })
      .catch((err) => console.error("Calendly inline embed failed:", err));
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ minWidth: 320, minHeight }}
    />
  );
}
