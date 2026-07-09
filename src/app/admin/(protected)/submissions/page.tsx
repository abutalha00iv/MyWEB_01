import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

async function getSubmissions() {
  return prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <>
      <AdminPageHeader title="Submissions" description="Project briefs received through the contact form." />

      <div className="p-8">
        {submissions.length === 0 ? (
          <p className="text-sm text-ink/55">No submissions yet.</p>
        ) : (
          <div className="overflow-hidden rounded-md border border-ink/12">
            <table className="w-full text-left text-sm">
              <thead className="bg-warmgray text-xs uppercase tracking-wide text-ink/55">
                <tr>
                  <th className="px-5 py-3 font-medium">From</th>
                  <th className="px-5 py-3 font-medium">Service</th>
                  <th className="px-5 py-3 font-medium">Received</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium sr-only">Open</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 bg-ivory">
                {submissions.map((s) => (
                  <tr key={s.id} className={s.read ? undefined : "bg-plum/5"}>
                    <td className="px-5 py-4">
                      <span className={s.read ? "text-ink/80" : "font-semibold text-ink"}>{s.name}</span>
                      <span className="block text-xs text-ink/45">{s.email}</span>
                    </td>
                    <td className="px-5 py-4 text-ink/60">{s.service}</td>
                    <td className="px-5 py-4 text-ink/60">{formatDate(s.createdAt)}</td>
                    <td className="px-5 py-4">
                      {s.read ? (
                        <span className="text-ink/45">Read</span>
                      ) : (
                        <span className="rounded-full bg-plum px-2.5 py-0.5 text-xs text-ivory">Unread</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/submissions/${s.id}`}
                        className="text-sm font-medium text-plum transition-colors duration-200 hover:text-plum-dark"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
