import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/require-admin";
import { serviceSchema } from "@/lib/validation/admin";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ service });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed.", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const existing = await prisma.service.findUnique({ where: { slug: parsed.data.slug } });
  if (existing && existing.id !== id) {
    return NextResponse.json({ error: "A service with this slug already exists.", fieldErrors: { slug: ["Slug already in use."] } }, { status: 409 });
  }

  const { included, process, faq, metaTitle, metaDescription, ...rest } = parsed.data;

  try {
    const service = await prisma.service.update({
      where: { id },
      data: {
        ...rest,
        included: JSON.stringify(included),
        process: JSON.stringify(process),
        faq: JSON.stringify(faq),
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
      },
    });
    return NextResponse.json({ service });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
