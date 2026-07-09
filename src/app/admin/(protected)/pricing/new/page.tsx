import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PricingForm } from "@/components/admin/PricingForm";

export default function NewPricingPage() {
  return (
    <>
      <AdminPageHeader title="New Package" description="Add a pricing package." />
      <PricingForm />
    </>
  );
}
