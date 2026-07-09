import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ButtonLink } from "@/components/ui/Button";

async function getPackages() {
  return prisma.pricingPackage.findMany({ orderBy: [{ serviceArea: "asc" }, { order: "asc" }] });
}

export default async function AdminPricingPage() {
  const packages = await getPackages();

  return (
    <>
      <AdminPageHeader
        title="Pricing"
        description="Packages shown on /pricing."
        action={
          <ButtonLink href="/admin/pricing/new" variant="primary">
            New Package
          </ButtonLink>
        }
      />

      <div className="p-8">
        <div className="overflow-hidden rounded-md border border-ink/12">
          <table className="w-full text-left text-sm">
            <thead className="bg-warmgray text-xs uppercase tracking-wide text-ink/55">
              <tr>
                <th className="px-5 py-3 font-medium">Service Area</th>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Highlighted</th>
                <th className="px-5 py-3 font-medium sr-only">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10 bg-ivory">
              {packages.map((pkg) => (
                <tr key={pkg.id}>
                  <td className="px-5 py-4 text-ink/60">{pkg.serviceArea}</td>
                  <td className="px-5 py-4 font-medium text-ink">{pkg.name}</td>
                  <td className="px-5 py-4 text-ink/60">{pkg.price}</td>
                  <td className="px-5 py-4 text-ink/60">{pkg.highlighted ? "Yes" : "—"}</td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/pricing/${pkg.id}/edit`}
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
