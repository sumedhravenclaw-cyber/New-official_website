"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { SectionLink } from "./section-link";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Contact", id: "contact" },
];

const moreLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
];

const HERO_EYEBROW = "Digital RavenClaw";
// Shift the eyebrow text left/right independently of the logo icon (px, negative = left).
const HERO_EYEBROW_OFFSET_X = 0;
export function Navbar() {
  const [scrollScrolled, setScrollScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isHome = pathname === "/";
  // Detail views always show the scrolled (compact, blurred) navbar.
  const scrolled = isHome ? scrollScrolled : true;

  // Publish the navbar's resting height as --nav-h so the hero's top padding and
  // the phoenix can anchor to it. The bar is content-sized (the logo block is
  // taller on narrow screens: 106px vs 90px), so a hardcoded value is wrong at
  // some width — measure it instead.
  //
  // Measured from the inner row, whose height does NOT change on scroll, plus the
  // at-rest py-4. Measuring the <nav> itself would shrink the value to py-3 the
  // moment the user scrolls and yank the hero art upward.
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const publish = () => {
      const rem =
        parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const restHeight = el.getBoundingClientRect().height + 2 * rem; // py-4
      document.documentElement.style.setProperty(
        "--nav-h",
        `${Math.round(restHeight)}px`
      );
    };
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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

  return (
    <nav
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "navbar-scrolled backdrop-blur-md py-3" : "navbar-top py-4"
      }`}
    >
      <div
        ref={barRef}
        className="max-w-7xl mx-auto flex items-center justify-between px-6"
      >
        {/* Logo */}
        <SectionLink
          sectionId="home"
          className="flex flex-col items-start  gap-0.5"
          aria-label="RavenClaw home"
        >
          <img
            src="/images/bird.png"
            alt="RavenClaw"
            className="w-10 h-10 object-contain"
          />
          <p
            className="text-[10px] font-bold uppercase tracking-widest sm:text-xs"
            style={{
              color: "#8B016D", 
              transform: `translateX(-50px)`,
            }}
          >
            <span className="text-gradient">{HERO_EYEBROW}</span>
          </p>
        </SectionLink>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = isHome && active === link.id;
            return (
              <li key={link.label}>
                <SectionLink
                  sectionId={link.id}
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
                </SectionLink>
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
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMoreOpen(false)}
                  className="block w-full text-left px-4 py-2 font-display text-sm text-ink hover:text-gradient transition-colors duration-150"
                >
                  {link.label}
                </Link>
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
            <SectionLink
              key={link.label}
              sectionId={link.id}
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left text-sm font-medium text-ink hover:text-accent-golden py-1"
            >
              {link.label}
            </SectionLink>
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
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileMoreOpen(false);
                    }}
                    className="block w-full text-left text-sm font-medium text-ink hover:text-accent-golden py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
