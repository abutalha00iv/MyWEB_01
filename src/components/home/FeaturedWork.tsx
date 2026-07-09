import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeUp } from "@/components/ui/FadeUp";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { ButtonLink } from "@/components/ui/Button";

async function getFeaturedProjects() {
  try {
    return await prisma.project.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
      take: 3,
      include: { images: { orderBy: { order: "asc" }, take: 1 } },
    });
  } catch {
    return [];
  }
}

export async function FeaturedWork() {
  const projects = await getFeaturedProjects();
  const placeholders = Math.max(0, 3 - projects.length);

  return (
    <section className="bg-ivory">
      <Container className="py-20 sm:py-28">
        <FadeUp className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight text-ink sm:text-4xl">
              A few projects we&rsquo;re proud to have shipped.
            </h2>
          </div>
          <ButtonLink href="/work" variant="ghost" showArrow>
            View all work
          </ButtonLink>
        </FadeUp>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <FadeUp key={project.id} delay={i * 90}>
              <a href={`/work/${project.slug}`} className="group block">
                <BrowserMockup src={project.images[0]?.url} alt={project.title} />
                <h3 className="mt-5 font-display text-lg text-ink transition-colors duration-200 group-hover:text-plum">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{project.summary}</p>
              </a>
            </FadeUp>
          ))}

          {Array.from({ length: placeholders }).map((_, i) => (
            <FadeUp key={`placeholder-${i}`} delay={(projects.length + i) * 90}>
              <div>
                <BrowserMockup alt="Case study coming soon" />
                <h3 className="mt-5 font-display text-lg text-ink/40">Case study coming soon</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/40">
                  New work is added to the admin panel regularly.
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
