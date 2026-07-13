import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/lib/site-data";
import { PortfolioDetail } from "@/components/site/views/portfolio-detail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — RavenClaw`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.img],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <PortfolioDetail project={project} />;
}
