import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TestimonialForm } from "@/components/admin/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <>
      <AdminPageHeader title="New Testimonial" description="Add a client quote." />
      <TestimonialForm />
    </>
  );
}
