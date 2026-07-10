"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useNav, type ViewType } from "@/lib/nav-store";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Contact", id: "contact" },
];

const moreLinks: { label: string; view: ViewType }[] = [
  { label: "Blog", view: "blog" },
  { label: "Case Studies", view: "case-studies" },
];

export function Navbar() {
  const [scrollScrolled, setScrollScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);
  const navigate = useNav((s) => s.navigate);
  const view = useNav((s) => s.view);

  const isHome = view === "home";
  // Detail views always show the scrolled (compact, blurred) navbar.
  const scrolled = isHome ? scrollScrolled : true;

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => {
      setScrollScrolled(window.scrollY > 40);
      const sections = ["home", "about", "services", "portfolio", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    // Defer the initial check to the next frame so it isn't a synchronous
    // setState inside the effect body.
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  useEffect(() => {
    if (!moreOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  const handleSectionNav = (id: string) => {
    setMenuOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("home", { scrollTarget: id });
    }
  };

  return (
    <nav
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "navbar-scrolled backdrop-blur-md py-3" : "navbar-top py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <button
          onClick={() => handleSectionNav("home")}
          className="flex items-center gap-2"
          aria-label="RavenClaw home"
        >
          <img
            src="/images/bird.png"
            alt="RavenClaw"
            className="w-10 h-10 object-contain"
          />
          <span className="font-display font-bold text-lg text-gradient hidden sm:inline">
            RavenClaw
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = isHome && active === link.id;
            return (
              <li key={link.label}>
                <button
                  onClick={() => handleSectionNav(link.id)}
                  className={`relative font-display text-base font-medium pb-1 transition-colors duration-200 ${
                    isActive
                      ? "text-gradient"
                      : "text-ink hover:text-gradient"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 rounded-full bg-accent-golden" />
                  )}
                </button>
              </li>
            );
          })}
          {/* More dropdown */}
          <li className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={moreOpen}
              aria-label="More pages"
              className="relative flex items-center gap-1 pb-1 text-ink hover:text-gradient transition-colors duration-200"
            >
              <span className="font-display text-base font-medium">More</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`navbar-dropdown absolute right-0 top-full mt-3 w-48 origin-top-right rounded-xl py-2 transition-all duration-200 ${
                moreOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {moreLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    setMoreOpen(false);
                    navigate(link.view);
                  }}
                  className="block w-full text-left px-4 py-2 font-display text-sm text-ink hover:text-gradient transition-colors duration-150"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 text-ink"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="navbar-mobile-panel px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleSectionNav(link.id)}
              className="block w-full text-left text-sm font-medium text-ink hover:text-accent-golden py-1"
            >
              {link.label}
            </button>
          ))}
          <div>
            <button
              onClick={() => setMobileMoreOpen((prev) => !prev)}
              aria-expanded={mobileMoreOpen}
              aria-label="More pages"
              className="flex w-full items-center justify-between text-left text-sm font-medium py-1 text-ink hover:text-accent-golden"
            >
              <span>More</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  mobileMoreOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileMoreOpen
                  ? "max-h-40 opacity-100 mt-2"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-3 space-y-2 border-l border-surface">
                {moreLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileMoreOpen(false);
                      navigate(link.view);
                    }}
                    className="block w-full text-left text-sm font-medium text-ink hover:text-accent-golden py-1"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
