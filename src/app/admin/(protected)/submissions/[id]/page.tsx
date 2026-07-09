import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DeleteSubmissionButton } from "@/components/admin/DeleteSubmissionButton";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(date);
}

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await prisma.contactSubmission.findUnique({ where: { id } });
  if (!submission) notFound();

  if (!submission.read) {
    await prisma.contactSubmission.update({ where: { id }, data: { read: true } });
  }

  const fields: [string, string][] = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Company", submission.company || "—"],
    ["Service", submission.service],
    ["Budget", submission.budget],
    ["Timeline", submission.timeline],
    ["Received", formatDate(submission.createdAt)],
  ];

  return (
    <>
      <AdminPageHeader title="Submission" description={submission.name} />

      <div className="max-w-2xl p-8">
        <div className="grid grid-cols-1 gap-4 rounded-md border border-ink/12 bg-ivory p-6 sm:grid-cols-2">
          {fields.map(([label, value]) => (
            <div key={label}>
              <p className="text-xs uppercase tracking-wide text-ink/45">{label}</p>
              <p className="mt-1 text-sm text-ink">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-wide text-ink/45">Project Description</p>
          <p className="mt-2 whitespace-pre-wrap rounded-md border border-ink/12 bg-ivory p-6 text-sm leading-relaxed text-ink/80">
            {submission.description}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <a
            href={`mailto:${submission.email}`}
            className="inline-flex items-center justify-center rounded-sm border border-plum bg-plum px-5 py-2.5 text-sm font-medium text-ivory transition-colors duration-200 hover:bg-plum-dark"
          >
            Reply by Email
          </a>
          <DeleteSubmissionButton id={submission.id} />
        </div>
      </div>
    </>
  );
}
