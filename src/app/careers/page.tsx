import type { Metadata } from "next";
import { CareersPage } from "@/components/site/views/careers-page";

export const metadata: Metadata = {
  title: "Careers — RavenClaw",
  description: "Build the internet with us. See open roles at RavenClaw.",
};

export default function Page() {
  return <CareersPage />;
}
