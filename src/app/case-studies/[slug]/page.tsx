import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudyById, type CaseStudy } from "@/lib/site-data";
import { CaseStudyDetail } from "@/components/site/views/case-study-detail";
import { db } from "@/lib/db";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.id }));
}

async function getStudy(slug: string): Promise<CaseStudy | undefined> {
  const staticStudy = getCaseStudyById(slug);
  if (staticStudy) return staticStudy;

  try {
    const dbStudy = await db.caseStudy.findUnique({ where: { slug } });
    if (!dbStudy) return undefined;

    return {
      id: dbStudy.slug,
      client: dbStudy.client,
      industry: dbStudy.industry as CaseStudy["industry"],
      summary: dbStudy.summary,
      metric: dbStudy.metric,
      metricLabel: dbStudy.metricLabel,
      image: dbStudy.image,
      content: JSON.parse(dbStudy.content),
    };
  } catch (err) {
    // No database configured (e.g. free test deploy) — only static studies exist.
    console.warn("Case study DB lookup failed, treating as not found:", err);
    return undefined;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getStudy(slug);
  if (!study) return {};

  return {
    title: `${study.client} — RavenClaw Case Study`,
    description: study.summary,
    openGraph: {
      title: study.client,
      description: study.summary,
      images: [study.image],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const study = await getStudy(slug);
  if (!study) notFound();

  return <CaseStudyDetail study={study} />;
}
