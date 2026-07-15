"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

interface DetailLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  /** Home-page section this detail page belongs to, e.g. "services". */
  sectionId: string;
  children: ReactNode;
}

/**
 * Link into a detail page (service/portfolio/about). When the click happens
 * on the home page, the current history entry is tagged with the parent
 * section's hash (e.g. "/#services") so that a browser Back press returns to
 * that section — the home page's hash-scroll effect then scrolls it into
 * view — instead of jumping to the top of the page.
 *
 * We tag the entry with the native History API rather than router.replace():
 * calling router.replace() and router.push() in the same tick makes Next's
 * App Router batch them and silently drop the replace (Back would land on the
 * top of the home page), and router.replace("/#id") also drops the hash from
 * the committed URL. replaceState is synchronous, keeps the hash, and leaves
 * Next's cached home route untouched.
 *
 * From a detail page we don't rewrite anything: a normal push means Back
 * returns to the previous page, and the home entry beneath it still carries
 * the section hash from when it was first opened.
 */
export function DetailLink({ href, sectionId, children, onClick, ...rest }: DetailLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (window.location.pathname === "/") {
      window.history.replaceState(window.history.state, "", `/#${sectionId}`);
    }
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
