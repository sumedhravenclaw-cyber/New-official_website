import type { Metadata } from "next";
import { AboutPage } from "@/components/site/views/about-page";

export const metadata: Metadata = {
  title: "About Us — RavenClaw",
  description:
    "A passionate team of designers, developers and strategists helping businesses create powerful digital presence.",
};

export default function Page() {
  return <AboutPage />;
}
