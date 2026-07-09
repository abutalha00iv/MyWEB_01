import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { ProjectImageManager } from "@/components/admin/ProjectImageManager";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });
  if (!project) notFound();

  return (
    <>
      <AdminPageHeader title="Edit Project" description={project.title} />
      <ProjectForm
        projectId={project.id}
        initialValues={{
          title: project.title,
          slug: project.slug,
          summary: project.summary,
          brief: project.brief,
          approach: project.approach,
          result: project.result,
          body: project.body,
          liveUrl: project.liveUrl || "",
          tags: project.tags,
          featured: project.featured,
          order: project.order,
          metaTitle: project.metaTitle || "",
          metaDescription: project.metaDescription || "",
        }}
      />
      <div className="border-t border-ink/10">
        <ProjectImageManager projectId={project.id} initialImages={project.images} />
      </div>
    </>
  );
}
