import { create } from "zustand";

export type ViewType =
  | "home"
  | "service"
  | "portfolio"
  | "about"
  | "blog"
  | "case-studies"
  | "careers"
  | "privacy"
  | "terms"
  | "refund";

interface NavState {
  view: ViewType;
  slug: string | undefined;
  /** Section id on the home page to scroll to after switching to home view. */
  pendingScroll: string | undefined;
  navigate: (
    view: ViewType,
    opts?: { slug?: string; scrollTarget?: string }
  ) => void;
  goHome: (scrollTarget?: string) => void;
}

export const useNav = create<NavState>((set) => ({
  view: "home",
  slug: undefined,
  pendingScroll: undefined,
  navigate: (view, opts) =>
    set({
      view,
      slug: opts?.slug,
      pendingScroll: view === "home" ? opts?.scrollTarget : undefined,
    }),
  goHome: (scrollTarget) =>
    set({ view: "home", slug: undefined, pendingScroll: scrollTarget }),
}));
