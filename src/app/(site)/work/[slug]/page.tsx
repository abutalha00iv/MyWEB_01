import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { SectionLabel, GoldRule } from "@/components/ui/SectionLabel";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";
import { ArrowUpRightIcon } from "@/components/icons";

async function getProject(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  });
}

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({ select: { slug: true } });
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: project.metaTitle || project.title,
    description: project.metaDescription || project.summary,
    openGraph: {
      title: project.metaTitle || project.title,
      description: project.metaDescription || project.summary,
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const tags = project.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const galleryImages = project.images.slice(1);

  return (
    <>
      <Breadcrumbs items={[{ label: "Work", href: "/work" }, { label: project.title }]} />

      <section className="border-b border-ink/10 bg-ivory">
        <Container className="py-14 sm:py-20">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="section-label rounded-full border border-gold/40 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl">
            {project.title}
          </h1>
          <p className="measure mt-6 text-lg leading-relaxed text-ink/70">{project.summary}</p>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-plum transition-colors duration-200 hover:text-plum-dark"
            >
              Visit live site
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>
          )}
        </Container>
      </section>

      <section className="bg-ivory">
        <Container className="py-16 sm:py-20">
          <FadeUp>
            <BrowserMockup src={project.images[0]?.url} alt={project.title} priority />
          </FadeUp>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
            <FadeUp>
              <SectionLabel>The Brief</SectionLabel>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{project.brief}</p>
            </FadeUp>
            <FadeUp delay={70}>
              <SectionLabel>The Approach</SectionLabel>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{project.approach}</p>
            </FadeUp>
            <FadeUp delay={140}>
              <SectionLabel>The Result</SectionLabel>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{project.result}</p>
            </FadeUp>
          </div>

          {galleryImages.length > 0 && (
            <>
              <div className="mt-16">
                <GoldRule />
              </div>
              <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2">
                {galleryImages.map((img) => (
                  <FadeUp key={img.id}>
                    <BrowserMockup src={img.url} alt={img.alt || project.title} />
                  </FadeUp>
                ))}
              </div>
            </>
          )}

          <div className="mt-16 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ButtonLink href="/work" variant="secondary">
              Back to all work
            </ButtonLink>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-plum transition-colors duration-200 hover:text-plum-dark"
              >
                Visit live site
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
