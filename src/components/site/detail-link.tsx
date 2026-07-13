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
 * Link into a detail page (service/portfolio/about) that collapses browser
 * history so a single Back press always lands on the parent section on the
 * home page, no matter which page the click happened from or how many
 * detail pages were chained through afterwards.
 */
export function DetailLink({ href, sectionId, children, onClick, ...rest }: DetailLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    router.replace(`/#${sectionId}`, { scroll: false });
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
