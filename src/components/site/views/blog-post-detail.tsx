"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { blogPosts, type BlogPost } from "@/lib/site-data";
import { SectionLink } from "@/components/site/section-link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function BlogDetail({ post }: { post: BlogPost }) {
  useScrollReveal([post.id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [post.id]);

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <article className="pt-24">
      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[340px] w-full overflow-hidden reveal-left">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(99,29,254,0.20), rgba(5,5,5,0.85))",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12">
          <div className="max-w-3xl mx-auto w-full">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold mb-6 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              Back to the journal
            </Link>
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white"
              style={{ background: "#631DFE" }}
            >
              {post.category}
            </span>
            <h1 className="font-display font-black text-3xl md:text-5xl text-white leading-[1.1] mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-white/80 font-semibold">
              <span>{post.author}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="inline-flex items-center gap-1">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 mt-14 pb-20">
        {/* Excerpt lead */}
        <p className="font-display text-lg md:text-xl text-ink leading-relaxed mb-12 section-reveal">
          {post.excerpt}
        </p>

        {/* Content sections */}
        <div className="space-y-10">
          {post.content.map((block, i) => (
            <section key={i} className="section-reveal">
              {block.heading && (
                <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-4">
                  {block.heading}
                </h2>
              )}
              {block.body.map((para, j) => (
                <p
                  key={j}
                  className="text-[15px] md:text-base text-ink/75 leading-[1.85] mb-4"
                >
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* Tags / share */}
        <div className="mt-14 pt-8 border-t border-black/8 flex flex-wrap items-center gap-3 section-reveal">
          <span className="text-[11px] font-bold uppercase tracking-widest text-ink/40">
            Category
          </span>
          <span
            className="text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ background: "#631DFE14", color: "#631DFE" }}
          >
            {post.category}
          </span>
        </div>

        {/* CTA */}
        <section className="mt-12 section-reveal">
          <div
            className="rounded-2xl px-6 py-10 md:px-12 md:py-14 text-center"
            style={{ backgroundColor: "#050505", color: "#FEFEFE" }}
          >
            <h3 className="font-display font-black text-2xl md:text-3xl mb-3">
              Want thinking like this on your project?
            </h3>
            <p
              className="text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed"
              style={{ color: "rgba(254, 254, 254, 0.7)" }}
            >
              We don&apos;t just write about this stuff — we do it, every day, for
              brands like yours.
            </p>
            <SectionLink
              sectionId="contact"
              className="px-8 py-3.5 rounded-xl text-sm font-display font-bold hover:opacity-90 transition-opacity cursor-pointer inline-block"
              style={{ background: "linear-gradient(135deg, #EA9D12, #D96016)", color: "#050505" }}
            >
              Start a project
            </SectionLink>
          </div>
        </section>

        {/* Related posts */}
        <section className="mt-16 section-reveal">
          <h2 className="font-display font-bold text-lg text-ink mb-6">
            Keep reading
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.id}`}
                className="group flex flex-col bg-card border border-black/8 rounded-xl overflow-hidden text-left card-hover cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-golden mb-1">
                    {p.category}
                  </p>
                  <p className="font-display font-bold text-sm text-ink leading-snug line-clamp-2 group-hover:text-gradient transition-colors">
                    {p.title}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-ink/60 group-hover:text-violet transition-colors">
                    Read
                    <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
