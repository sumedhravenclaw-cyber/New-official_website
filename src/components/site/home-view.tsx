"use client";

import { useEffect } from "react";
import { HeroSection } from "./hero-section";
import { AboutSection } from "./about-section";
import { WhyChooseUs } from "./why-choose-us";
import { ServicesSection } from "./services-section";
import { PortfolioSection } from "./portfolio-section";
import { TestimonialsSection } from "./testimonials-section";
import { ProcessSection } from "./process-section";
import { ContactSection } from "./contact-section";
import { useNav } from "@/lib/nav-store";
import { useScrollReveal, useParallax } from "@/hooks/use-scroll-reveal";

export function HomeView() {
  const pendingScroll = useNav((s) => s.pendingScroll);
  useParallax();

  // Re-attach the scroll reveal observer whenever this view mounts.
  useScrollReveal([]);

  // If we arrived with a pending scroll target (e.g. clicked "Contact" from
  // a detail page), smooth-scroll to that section once content is mounted.
  useEffect(() => {
    if (!pendingScroll) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(pendingScroll);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [pendingScroll]);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <WhyChooseUs />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
