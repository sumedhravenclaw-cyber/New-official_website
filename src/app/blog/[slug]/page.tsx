import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostById } from "@/lib/site-data";
import { BlogDetail } from "@/components/site/views/blog-post-detail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostById(slug);
  if (!post) return {};

  return {
    title: `${post.title} — RavenClaw`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostById(slug);
  if (!post) notFound();

  return <BlogDetail post={post} />;
}
