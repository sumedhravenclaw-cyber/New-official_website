import { useEffect } from "react";

/**
 * Observes all `.section-reveal`, `.reveal-left`, `.reveal-right` elements and
 * adds a `.visible` class when they enter the viewport. Returns a cleanup fn.
 */
export function useScrollReveal(deps: unknown[] = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Small delay so newly-mounted content is in the DOM
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(
        ".section-reveal, .reveal-left, .reveal-right"
      );
      elements.forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [...deps]);
}

/**
 * Mouse-parallax for any element with a `data-parallax` attribute (speed 0–0.2).
 */
export function useParallax() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const parallaxEls = document.querySelectorAll<HTMLElement>(
        "[data-parallax]"
      );
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.05");
        const x = (e.clientX - window.innerWidth / 2) * speed;
        const y = (e.clientY - window.innerHeight / 2) * speed;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
}
