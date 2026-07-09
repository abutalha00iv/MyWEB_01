import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

async function getCounts() {
  const [projects, services, testimonials, unreadSubmissions, totalSubmissions] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.testimonial.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.contactSubmission.count(),
  ]);

  return { projects, services, testimonials, unreadSubmissions, totalSubmissions };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const stats = [
    { label: "Projects", value: counts.projects, href: "/admin/projects" },
    { label: "Services", value: counts.services, href: "/admin/services" },
    { label: "Testimonials", value: counts.testimonials, href: "/admin/testimonials" },
    { label: "Unread Submissions", value: counts.unreadSubmissions, href: "/admin/submissions", highlight: counts.unreadSubmissions > 0 },
  ];

  return (
    <>
      <AdminPageHeader title="Dashboard" description="An overview of your site's content." />

      <div className="grid grid-cols-1 gap-5 p-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`rounded-md border p-6 transition-colors duration-200 hover:border-plum ${
              stat.highlight ? "border-plum/40 bg-plum/5" : "border-ink/12 bg-ivory"
            }`}
          >
            <p className="text-sm text-ink/55">{stat.label}</p>
            <p className={`mt-2 font-display text-4xl ${stat.highlight ? "text-plum" : "text-ink"}`}>{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="px-8 pb-8">
        <div className="rounded-md border border-ink/12 bg-ivory p-6">
          <h2 className="font-display text-lg text-ink">Total submissions received</h2>
          <p className="mt-2 text-sm text-ink/60">
            {counts.totalSubmissions} project {counts.totalSubmissions === 1 ? "brief has" : "briefs have"} come
            through the contact form since launch.
          </p>
        </div>
      </div>
    </>
  );
}
