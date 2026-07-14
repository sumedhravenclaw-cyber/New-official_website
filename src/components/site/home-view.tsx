"use client";

import { useEffect } from "react";
import { HeroAboutFlow } from "./hero-about-flow";
import { WhyChooseUs } from "./why-choose-us";
import { ServicesSection } from "./services-section";
import { PortfolioSection } from "./portfolio-section";
import { ClientsSection } from "./clients-section";
import { TestimonialsSection } from "./testimonials-section";
import { ProcessSection } from "./process-section";
import { ContactSection } from "./contact-section";
import { LetsTalkSection } from "./lets-talk-section";
import { useScrollReveal, useParallax } from "@/hooks/use-scroll-reveal";

export function HomeView() {
  useParallax();

  // Re-attach the scroll reveal observer whenever this view mounts.
  useScrollReveal([]);

  // If we arrived at "/#section" (e.g. clicked "Contact" from another page),
  // smooth-scroll to that section once content is mounted.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const timer = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <HeroAboutFlow />
      <WhyChooseUs />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ClientsSection />
      <ProcessSection />
      <ContactSection />
      <LetsTalkSection />
    </>
  );
}
