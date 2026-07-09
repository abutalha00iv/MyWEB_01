import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSiteSettings } from "@/lib/settings";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <AdminPageHeader title="Settings" description="Site-wide contact info, announcement bar, and legal pages." />
      <SettingsForm
        initialValues={{
          contactEmail: settings.contactEmail,
          socialLinks: {
            instagram: settings.socialLinks.instagram || "",
            linkedin: settings.socialLinks.linkedin || "",
            twitter: settings.socialLinks.twitter || "",
            facebook: settings.socialLinks.facebook || "",
          },
          announcementText: settings.announcementText,
          announcementActive: settings.announcementActive,
          privacyPolicy: settings.privacyPolicy,
          termsOfService: settings.termsOfService,
        }}
      />
    </>
  );
}
