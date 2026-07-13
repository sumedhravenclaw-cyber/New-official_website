import type { Metadata } from "next";
import { CaseStudiesPage } from "@/components/site/views/case-studies-page";

export const metadata: Metadata = {
  title: "Case Studies — RavenClaw",
  description:
    "Real brands, real numbers — selected RavenClaw work across food, fitness, SaaS, and D2C.",
};

export default function Page() {
  return <CaseStudiesPage />;
}
