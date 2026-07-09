import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/require-admin";
import { pricingPackageSchema } from "@/lib/validation/admin";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { id } = await params;
  const pkg = await prisma.pricingPackage.findUnique({ where: { id } });
  if (!pkg) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ package: pkg });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = pricingPackageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed.", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { features, excluded, ...rest } = parsed.data;
  try {
    const pkg = await prisma.pricingPackage.update({
      where: { id },
      data: { ...rest, features: JSON.stringify(features), excluded: JSON.stringify(excluded) },
    });
    return NextResponse.json({ package: pkg });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.pricingPackage.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
