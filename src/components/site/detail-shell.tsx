"use client";

import { useEffect, type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { useNav } from "@/lib/nav-store";

interface DetailShellProps {
  children: ReactNode;
  /** Where the back button goes. Defaults to home top. */
  backTarget?: "home" | "services" | "portfolio" | "footer";
  backLabel?: string;
}

/**
 * Shared wrapper for all detail "pages" (rendered as views on the single / route).
 * Handles scroll-to-top on mount and renders a consistent back button.
 */
export function DetailShell({
  children,
  backTarget = "home",
  backLabel = "Back",
}: DetailShellProps) {
  const navigate = useNav((s) => s.navigate);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBack = () => {
    if (backTarget === "services") {
      navigate("home", { scrollTarget: "services" });
    } else if (backTarget === "portfolio") {
      navigate("home", { scrollTarget: "portfolio" });
    } else if (backTarget === "footer") {
      navigate("home", { scrollTarget: "footer" });
    } else {
      navigate("home");
    }
  };

  return (
    <article className="pt-24">
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold mb-8 text-ink/60 hover:text-ink transition-colors"
        >
          <ArrowLeft size={14} />
          {backLabel}
        </button>
      </div>
      {children}
    </article>
  );
}

/**
 * WhatsApp call-to-action button used across detail pages.
 */
export function WhatsAppCTA({
  href,
  label,
  color,
}: {
  href: string;
  label: string;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-display font-bold text-sm text-white px-8 py-3.5 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
      style={{ background: color }}
    >
      {label}
    </a>
  );
}
