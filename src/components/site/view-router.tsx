"use client";

import { useNav } from "@/lib/nav-store";
import { HomeView } from "./home-view";
import { ServiceDetail } from "./views/service-detail";
import { PortfolioDetail } from "./views/portfolio-detail";
import { AboutPage } from "./views/about-page";
import { BlogPage } from "./views/blog-page";
import { CaseStudiesPage } from "./views/case-studies-page";
import { CareersPage } from "./views/careers-page";
import { PrivacyPage } from "./views/privacy-page";
import { TermsPage } from "./views/terms-page";
import { RefundPage } from "./views/refund-page";

export function ViewRouter() {
  const view = useNav((s) => s.view);
  const slug = useNav((s) => s.slug);

  switch (view) {
    case "service":
      return <ServiceDetail slug={slug} />;
    case "portfolio":
      return <PortfolioDetail slug={slug} />;
    case "about":
      return <AboutPage />;
    case "blog":
      return <BlogPage />;
    case "case-studies":
      return <CaseStudiesPage />;
    case "careers":
      return <CareersPage />;
    case "privacy":
      return <PrivacyPage />;
    case "terms":
      return <TermsPage />;
    case "refund":
      return <RefundPage />;
    case "home":
    default:
      return <HomeView />;
  }
}
