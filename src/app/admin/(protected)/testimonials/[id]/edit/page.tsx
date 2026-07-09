import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TestimonialForm } from "@/components/admin/TestimonialForm";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <>
      <AdminPageHeader title="Edit Testimonial" description={testimonial.clientName} />
      <TestimonialForm testimonialId={testimonial.id} initialValues={testimonial} />
    </>
  );
}
