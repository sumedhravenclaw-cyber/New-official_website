import type { Metadata } from "next";
import { TermsPage } from "@/components/site/views/terms-page";

export const metadata: Metadata = {
  title: "Terms & Conditions — RavenClaw",
  description: "The terms governing your use of RavenClaw's services.",
};

export default function Page() {
  return <TermsPage />;
}
