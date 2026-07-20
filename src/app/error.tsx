"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Route-level error boundary. Catches render/effect throws anywhere beneath the
 * root layout, so a single failing section degrades to this panel instead of
 * unmounting the whole tree and leaving a blank page.
 *
 * The layout itself (navbar, footer, background) stays mounted around this —
 * failures *in* the layout are handled by global-error.tsx instead.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with a real error sink (Sentry et al) before launch — in
    // production the message is stripped and only `digest` survives, which is
    // the only handle you'll have to correlate a user report with a server log.
    console.error("Route error boundary caught:", error);
  }, [error]);

  return (
    <section className="pt-40 pb-24 text-center px-6">
      <p className="font-display font-bold text-ink text-xl mb-3">
        Something went wrong on this page.
      </p>
      <p className="text-sm text-muted mb-6">
        The rest of the site is still working — try again, or head back home.
      </p>
      <div className="flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={reset}
          className="text-sm font-bold"
          style={{ color: "#631DFE" }}
        >
          Try again
        </button>
        <Link href="/" className="text-sm font-bold text-muted">
          &larr; Back to home
        </Link>
      </div>
      {error.digest && (
        <p className="text-xs text-muted mt-8">Reference: {error.digest}</p>
      )}
    </section>
  );
}
