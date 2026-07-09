import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { parseFaq, parseIncluded, parseProcess } from "@/lib/content-types";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <>
      <AdminPageHeader title="Edit Service" description={service.title} />
      <ServiceForm
        serviceId={service.id}
        initialValues={{
          title: service.title,
          slug: service.slug,
          summary: service.summary,
          included: parseIncluded(service.included),
          process: parseProcess(service.process),
          timeline: service.timeline,
          startingPrice: service.startingPrice,
          faq: parseFaq(service.faq),
          order: service.order,
          metaTitle: service.metaTitle || "",
          metaDescription: service.metaDescription || "",
        }}
      />
    </>
  );
}
