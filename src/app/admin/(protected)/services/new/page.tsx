import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ServiceForm } from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <>
      <AdminPageHeader title="New Service" description="Add a new service to /services." />
      <ServiceForm />
    </>
  );
}
