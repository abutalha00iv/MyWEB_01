import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site";

export type SiteSettingsData = {
  contactEmail: string;
  socialLinks: Record<string, string>;
  announcementText: string;
  announcementActive: boolean;
  privacyPolicy: string;
  termsOfService: string;
};

const defaults: SiteSettingsData = {
  contactEmail: siteConfig.defaultEmail,
  socialLinks: {},
  announcementText: "",
  announcementActive: false,
  privacyPolicy: "",
  termsOfService: "",
};

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    if (!row) return defaults;

    let socialLinks: Record<string, string> = {};
    try {
      socialLinks = JSON.parse(row.socialLinks);
    } catch {
      socialLinks = {};
    }

    return {
      contactEmail: row.contactEmail,
      socialLinks,
      announcementText: row.announcementText,
      announcementActive: row.announcementActive,
      privacyPolicy: row.privacyPolicy,
      termsOfService: row.termsOfService,
    };
  } catch {
    return defaults;
  }
}
