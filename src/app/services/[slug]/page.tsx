import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/lib/site-data";
import { ServiceDetail } from "@/components/site/views/service-detail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} — RavenClaw`,
    description: service.desc,
    openGraph: {
      title: service.title,
      description: service.desc,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getServiceBySlug(slug)) notFound();

  return <ServiceDetail slug={slug} />;
}
