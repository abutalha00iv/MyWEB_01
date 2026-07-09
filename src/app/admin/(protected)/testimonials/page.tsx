import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ButtonLink } from "@/components/ui/Button";

async function getTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { order: "asc" } });
}

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <AdminPageHeader
        title="Testimonials"
        description="Client quotes shown on the homepage."
        action={
          <ButtonLink href="/admin/testimonials/new" variant="primary">
            New Testimonial
          </ButtonLink>
        }
      />

      <div className="p-8">
        {testimonials.length === 0 ? (
          <p className="text-sm text-ink/55">No testimonials yet.</p>
        ) : (
          <div className="overflow-hidden rounded-md border border-ink/12">
            <table className="w-full text-left text-sm">
              <thead className="bg-warmgray text-xs uppercase tracking-wide text-ink/55">
                <tr>
                  <th className="px-5 py-3 font-medium">Quote</th>
                  <th className="px-5 py-3 font-medium">Client</th>
                  <th className="px-5 py-3 font-medium">Visible</th>
                  <th className="px-5 py-3 font-medium sr-only">Edit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 bg-ivory">
                {testimonials.map((t) => (
                  <tr key={t.id}>
                    <td className="max-w-md truncate px-5 py-4 text-ink/80">{t.quote}</td>
                    <td className="px-5 py-4 text-ink/60">
                      {t.clientName}
                      <span className="block text-xs text-ink/40">{t.role}</span>
                    </td>
                    <td className="px-5 py-4 text-ink/60">{t.visible ? "Yes" : "Hidden"}</td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/testimonials/${t.id}/edit`}
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
