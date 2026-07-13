import type { Metadata } from "next";
import { PrivacyPage } from "@/components/site/views/privacy-page";

export const metadata: Metadata = {
  title: "Privacy Policy — RavenClaw",
  description: "How RavenClaw collects, uses, and protects your information.",
};

export default function Page() {
  return <PrivacyPage />;
}
