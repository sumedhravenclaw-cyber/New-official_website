"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "ravenclaw-theme";

/* ------------------------------------------------------------------ */
/* External theme "store" — backs useSyncExternalStore so React can   */
/* read the theme the inline script already applied to the DOM without */
/* triggering a hydration mismatch.                                    */
/* ------------------------------------------------------------------ */

const listeners = new Set<() => void>();

/** Client snapshot: reads the class the inline script set on <html>. */
function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * Server snapshot: MUST be stable across renders so SSR HTML matches the
 * first client render. The real theme is applied post-hydration.
 */
function getServerTheme(): Theme {
  return "light";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  // Cross-tab sync: if another tab changes the theme, catch up.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      applyTheme(e.newValue === "dark" ? "dark" : "light", false);
      callback();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function applyTheme(theme: Theme, persist = true) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  if (persist) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }
  listeners.forEach((cb) => cb());
}

/* ------------------------------------------------------------------ */

export function ThemeProvider({ children }: { children: ReactNode }) {
  // useSyncExternalStore: returns getServerTheme() during SSR + the first
  // client render (so they match → no hydration error), then getTheme()
  // on subsequent renders (picks up the real theme from the DOM).
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(getTheme() === "light" ? "dark" : "light");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme() must be used within a <ThemeProvider>");
  }
  return ctx;
}
