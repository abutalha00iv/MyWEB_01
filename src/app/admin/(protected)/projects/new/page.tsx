import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <>
      <AdminPageHeader title="New Project" description="Add a new case study to /work." />
      <ProjectForm />
    </>
  );
}
