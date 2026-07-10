"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import {
  blogCategories,
  blogPosts,
  type BlogCategory,
} from "@/lib/site-data";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { toast } from "@/hooks/use-toast";

export function BlogPage() {
  useScrollReveal([]);
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
  const [email, setEmail] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const featuredPost = blogPosts.find((p) => p.featured);
  const showFeatured = activeCategory === "All" && Boolean(featuredPost);

  const visiblePosts =
    activeCategory === "All"
      ? blogPosts.filter((p) => !p.featured)
      : blogPosts.filter((p) => p.category === activeCategory);

  const handlePostClick = () => {
    toast({
      title: "Coming soon",
      description: "Full article pages are on the way.",
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast({
      title: "You're in!",
      description: "Check your inbox to confirm your subscription.",
    });
    setEmail("");
  };

  return (
    <main className="min-h-screen bg-surface pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <header className="max-w-3xl mb-14 section-reveal">
          <p className="text-golden text-xs font-bold uppercase tracking-widest mb-4">
            The Journal
          </p>
          <h1 className="font-display font-black text-4xl md:text-6xl text-ink leading-[1.05] mb-6">
            Ideas worth <span className="text-gradient">stealing</span>
          </h1>
          <p className="text-base md:text-lg text-muted leading-relaxed">
            Field notes from the RavenClaw team — what we&apos;re learning
            about marketing, design, development, and growth, written for
            people building real brands.
          </p>
        </header>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-12 section-reveal">
          {blogCategories.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={active}
                className={
                  "px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors cursor-pointer " +
                  (active
                    ? "bg-violet text-white border-violet"
                    : "bg-card text-ink border-black/10 hover:border-golden")
                }
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured spotlight */}
        {showFeatured && featuredPost && (
          <section className="mb-14 section-reveal">
            <button
              type="button"
              onClick={handlePostClick}
              className="group block w-full text-left bg-card border border-black/10 rounded-2xl overflow-hidden card-hover cursor-pointer"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[420px] overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <span className="inline-flex self-start text-[11px] font-bold uppercase tracking-widest text-white bg-violet px-3 py-1 rounded-full mb-5">
                    Featured · {featuredPost.category}
                  </span>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-ink mb-4 group-hover:text-gradient transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm md:text-base text-muted leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-ink/60 font-semibold">
                    <span>{featuredPost.author}</span>
                    <span className="w-1 h-1 rounded-full bg-ink/30" />
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </section>
        )}

        {/* Post grid */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePosts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={handlePostClick}
              className="group flex flex-col bg-card border border-black/10 rounded-2xl overflow-hidden text-left card-hover section-reveal cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-golden text-xs font-bold uppercase tracking-wider mb-3">
                  {post.category}
                </p>
                <h3 className="font-display font-bold text-lg text-ink mb-2 line-clamp-2 group-hover:text-gradient transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-5 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-ink/60 font-semibold">
                  <span>{post.date}</span>
                  <span className="inline-flex items-center gap-1 group-hover:text-violet transition-colors">
                    Read
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </section>

        {visiblePosts.length === 0 && (
          <p className="text-center text-muted py-20 font-display">
            No posts in this category yet — check back soon.
          </p>
        )}

        {/* Newsletter CTA */}
        <section className="mt-20 section-reveal">
          <div className="bg-charcoal rounded-2xl px-6 py-10 md:px-12 md:py-14 text-center">
            <h3 className="font-display font-black text-2xl md:text-3xl text-snow mb-3">
              Get the next post in your inbox
            </h3>
            <p className="text-sm md:text-base text-snow/70 max-w-xl mx-auto mb-8 leading-relaxed">
              One practical email a week. No fluff, no spam — just the things
              we&apos;re actually testing in our work.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@brand.com"
                className="placeholder-muted flex-1 px-4 py-3 rounded-xl bg-black/10 border border-white/15 text-snow text-sm focus:outline-none focus:border-golden transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-golden text-charcoal text-sm font-display font-bold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
