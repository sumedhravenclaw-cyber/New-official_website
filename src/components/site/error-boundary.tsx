"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Rendered in place of `children` after a throw. Defaults to nothing. */
  fallback?: ReactNode;
  /** Label used in the console warning, so crashes are attributable. */
  label?: string;
}

interface State {
  failed: boolean;
}

/**
 * Boundary for non-essential subtrees mounted in the root layout.
 *
 * Next's app/error.tsx sits *beneath* the layout, so it cannot catch a throw
 * from something the layout renders directly — that escalates straight to
 * global-error.tsx and replaces the whole document. For decorative widgets
 * that's a wildly disproportionate failure mode: a lost WebGL context on a
 * low-end phone should cost the user the background animation, not the site.
 *
 * A class component is not a stylistic choice here — componentDidCatch has no
 * hook equivalent, so error boundaries must be classes.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn(
      `[${this.props.label ?? "ErrorBoundary"}] subtree failed and was dropped:`,
      error,
      info.componentStack
    );
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
