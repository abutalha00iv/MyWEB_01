import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ButtonLink } from "@/components/ui/Button";

async function getServices() {
  return prisma.service.findMany({ orderBy: { order: "asc" } });
}

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <>
      <AdminPageHeader
        title="Services"
        description="Service pages shown on /services."
        action={
          <ButtonLink href="/admin/services/new" variant="primary">
            New Service
          </ButtonLink>
        }
      />

      <div className="p-8">
        <div className="overflow-hidden rounded-md border border-ink/12">
          <table className="w-full text-left text-sm">
            <thead className="bg-warmgray text-xs uppercase tracking-wide text-ink/55">
              <tr>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Slug</th>
                <th className="px-5 py-3 font-medium">Starting Price</th>
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium sr-only">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10 bg-ivory">
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="px-5 py-4 font-medium text-ink">{service.title}</td>
                  <td className="px-5 py-4 text-ink/60">{service.slug}</td>
                  <td className="px-5 py-4 text-ink/60">{service.startingPrice}</td>
                  <td className="px-5 py-4 text-ink/60">{service.order}</td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/services/${service.id}/edit`}
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
      </div>
    </>
  );
}
