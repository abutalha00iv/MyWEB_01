import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PricingForm } from "@/components/admin/PricingForm";
import { parseStringList } from "@/lib/content-types";

export default async function EditPricingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pkg = await prisma.pricingPackage.findUnique({ where: { id } });
  if (!pkg) notFound();

  return (
    <>
      <AdminPageHeader title="Edit Package" description={`${pkg.serviceArea} — ${pkg.name}`} />
      <PricingForm
        packageId={pkg.id}
        initialValues={{
          serviceArea: pkg.serviceArea,
          name: pkg.name,
          price: pkg.price,
          description: pkg.description,
          features: parseStringList(pkg.features),
          excluded: parseStringList(pkg.excluded),
          order: pkg.order,
          highlighted: pkg.highlighted,
        }}
      />
    </>
  );
}
