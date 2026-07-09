import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ButtonLink } from "@/components/ui/Button";

async function getProjects() {
  return prisma.project.findMany({ orderBy: { order: "asc" } });
}

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <AdminPageHeader
        title="Projects"
        description="Portfolio case studies shown on /work."
        action={
          <ButtonLink href="/admin/projects/new" variant="primary">
            New Project
          </ButtonLink>
        }
      />

      <div className="p-8">
        {projects.length === 0 ? (
          <p className="text-sm text-ink/55">No projects yet. Create your first one.</p>
        ) : (
          <div className="overflow-hidden rounded-md border border-ink/12">
            <table className="w-full text-left text-sm">
              <thead className="bg-warmgray text-xs uppercase tracking-wide text-ink/55">
                <tr>
                  <th className="px-5 py-3 font-medium">Title</th>
                  <th className="px-5 py-3 font-medium">Slug</th>
                  <th className="px-5 py-3 font-medium">Featured</th>
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium sr-only">Edit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 bg-ivory">
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-5 py-4 font-medium text-ink">{project.title}</td>
                    <td className="px-5 py-4 text-ink/60">{project.slug}</td>
                    <td className="px-5 py-4 text-ink/60">{project.featured ? "Yes" : "—"}</td>
                    <td className="px-5 py-4 text-ink/60">{project.order}</td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="text-sm font-medium text-plum transition-colors duration-200 hover:text-plum-dark"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
