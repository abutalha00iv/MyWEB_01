"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { FadeUp } from "@/components/ui/FadeUp";

type WorkProject = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  tags: string;
  image: string | null;
};

export function WorkGrid({ projects }: { projects: WorkProject[] }) {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) {
      p.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .forEach((t) => set.add(t));
    }
    return Array.from(set).sort();
  }, [projects]);

  const [active, setActive] = useState<string | null>(null);

  const filtered = active
    ? projects.filter((p) =>
        p.tags
          .split(",")
          .map((t) => t.trim())
          .includes(active)
      )
    : projects;

  return (
    <div>
      {allTags.length > 1 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter work by category">
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-pressed={active === null}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors duration-200 ${
              active === null
                ? "border-plum bg-plum text-ivory"
                : "border-ink/20 text-ink/70 hover:border-plum hover:text-plum"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              aria-pressed={active === tag}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors duration-200 ${
                active === tag
                  ? "border-plum bg-plum text-ivory"
                  : "border-ink/20 text-ink/70 hover:border-plum hover:text-plum"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="mt-16 text-sm text-ink/50">No projects in this category yet.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <FadeUp key={project.id} delay={Math.min(i, 5) * 70}>
              <Link href={`/work/${project.slug}`} className="group block">
                <BrowserMockup src={project.image} alt={project.title} />
                <h2 className="mt-5 font-display text-lg text-ink transition-colors duration-200 group-hover:text-plum">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{project.summary}</p>
              </Link>
            </FadeUp>
          ))}
        </div>
      )}
    </div>
  );
}
