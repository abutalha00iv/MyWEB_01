import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/require-admin";
import { settingsSchema } from "@/lib/validation/admin";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return NextResponse.json({ settings });
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed.", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { socialLinks, announcementText, privacyPolicy, termsOfService, ...rest } = parsed.data;

  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      ...rest,
      socialLinks: JSON.stringify(socialLinks),
      announcementText: announcementText || "",
      privacyPolicy: privacyPolicy || "",
      termsOfService: termsOfService || "",
    },
    create: {
      id: 1,
      ...rest,
      socialLinks: JSON.stringify(socialLinks),
      announcementText: announcementText || "",
      privacyPolicy: privacyPolicy || "",
      termsOfService: termsOfService || "",
    },
  });

  return NextResponse.json({ settings });
}
