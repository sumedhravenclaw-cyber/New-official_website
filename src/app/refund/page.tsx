import type { Metadata } from "next";
import { RefundPage } from "@/components/site/views/refund-page";

export const metadata: Metadata = {
  title: "Refund Policy — RavenClaw",
  description: "RavenClaw's approach to refunds and cancellations.",
};

export default function Page() {
  return <RefundPage />;
}
