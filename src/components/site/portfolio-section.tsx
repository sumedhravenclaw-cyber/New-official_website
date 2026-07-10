"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { projects, portfolioCategories } from "@/lib/site-data";
import { useNav } from "@/lib/nav-store";

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNav((s) => s.navigate);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-surface-alt">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 section-reveal">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#631DFE" }}
          >
            <span className="text-gradient">Our Portfolio</span>
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-ink">
            Our Latest <span className="text-gradient">Work</span>
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 section-reveal">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === cat
                  ? "text-white shadow-md"
                  : "bg-card border border-black/8 text-ink hover:border-violet/30"
              }`}
              style={
                activeFilter === cat
                  ? { background: "linear-gradient(135deg, #631DFE, #A7069B)" }
                  : {}
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <button
                key={project.slug}
                onClick={() => navigate("portfolio", { slug: project.slug })}
                className="animate-fade-in-up group rounded-2xl overflow-hidden shadow-sm border border-black/5 bg-card card-hover block text-left cursor-pointer"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: `${project.color}CC` }}
                  >
                    <ExternalLink size={28} className="text-white" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-ink text-base">
                    {project.title}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: project.color }}>
                    {project.type}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-muted py-10">
            No projects found in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
