import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/require-admin";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Middleware already guards /admin/*, but every server component here
  // re-checks the session directly — defense in depth, not just a hidden UI.
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return <AdminShell>{children}</AdminShell>;
}
