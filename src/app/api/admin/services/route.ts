import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/require-admin";
import { serviceSchema } from "@/lib/validation/admin";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ services });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed.", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const existing = await prisma.service.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return NextResponse.json({ error: "A service with this slug already exists.", fieldErrors: { slug: ["Slug already in use."] } }, { status: 409 });
  }

  const { included, process, faq, metaTitle, metaDescription, ...rest } = parsed.data;

  const service = await prisma.service.create({
    data: {
      ...rest,
      included: JSON.stringify(included),
      process: JSON.stringify(process),
      faq: JSON.stringify(faq),
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
    },
  });

  return NextResponse.json({ service }, { status: 201 });
}
