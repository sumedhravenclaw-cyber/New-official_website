import type { Metadata } from "next";
import { BlogPage } from "@/components/site/views/blog-page";

export const metadata: Metadata = {
  title: "The Journal — RavenClaw",
  description:
    "Field notes from the RavenClaw team on marketing, design, development, and growth.",
};

export default function Page() {
  return <BlogPage />;
}
