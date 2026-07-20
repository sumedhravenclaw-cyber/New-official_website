"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary for failures in the root layout itself — the navbar,
 * footer, theme provider, or background. Those sit *above* app/error.tsx, so
 * nothing else can catch them; without this the user gets a blank document.
 *
 * This replaces the entire document when it renders, which is why it has to
 * supply its own <html>/<body>. That also means none of the app's fonts,
 * Tailwind theme tokens, or CSS variables are guaranteed to be available here,
 * so the styling below is deliberately inline and self-contained.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error boundary caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          backgroundColor: "#050505",
          color: "#FEFEFE",
          padding: "1.5rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "28rem" }}>
          <div
            style={{
              height: "4px",
              borderRadius: "2px",
              marginBottom: "2rem",
              background:
                "linear-gradient(90deg, #EA9D12, #D96016, #CC2829, #A7069B, #631DFE, #5A5DFE)",
            }}
          />
          <h1 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 0.75rem" }}>
            RavenClaw is temporarily unavailable.
          </h1>
          <p
            style={{
              fontSize: "0.875rem",
              lineHeight: 1.6,
              color: "rgba(254,254,254,0.55)",
              margin: "0 0 1.75rem",
            }}
          >
            We hit an unexpected error while loading the site. Reloading usually
            clears it.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              cursor: "pointer",
              border: "none",
              borderRadius: "0.75rem",
              padding: "0.75rem 1.75rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#FFFFFF",
              background: "linear-gradient(135deg, #EA9D12, #D96016)",
            }}
          >
            Reload
          </button>
          {error.digest && (
            <p
              style={{
                fontSize: "0.75rem",
                color: "rgba(254,254,254,0.3)",
                marginTop: "2rem",
              }}
            >
              Reference: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
