"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

interface SectionLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Home-page section id to scroll to, or "home" to go to the top of "/". */
  sectionId: string;
  children: ReactNode;
}

/**
 * Navigates to a section on the home page ("/#id"). If already on "/", it
 * scrolls there directly instead of round-tripping through a navigation, so
 * the smooth-scroll UX matches what users get from a same-page anchor link.
 */
export function SectionLink({ sectionId, children, onClick, ...rest }: SectionLinkProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const href = sectionId === "home" ? "/" : `/#${sectionId}`;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (!isHome) return;
    e.preventDefault();
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Link
      href={href}
      scroll={sectionId === "home" ? undefined : false}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Link>
  );
}
