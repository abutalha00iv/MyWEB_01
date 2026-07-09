import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { WorkGrid } from "@/components/work/WorkGrid";

const workDescription = "Selected projects from Aureth Tyrian — websites and web applications designed, built, and shipped.";

export const metadata: Metadata = {
  title: "Work",
  description: workDescription,
  openGraph: { title: "Work — Aureth Tyrian", description: workDescription },
};

async function getProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
  });

  return projects.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    tags: p.tags,
    image: p.images[0]?.url ?? null,
  }));
}

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <>
      <Breadcrumbs items={[{ label: "Work" }]} />
      <PageHero
        label="Work"
        title="Selected projects, built to last."
        intro="A sample of what we've designed and shipped — each one tested on real devices and reviewed for security before delivery."
      />

      <section className="bg-ivory">
        <Container className="pb-24 sm:pb-32">
          <WorkGrid projects={projects} />
        </Container>
      </section>
    </>
  );
}
