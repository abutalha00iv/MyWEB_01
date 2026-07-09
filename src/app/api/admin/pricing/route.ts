import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/require-admin";
import { pricingPackageSchema } from "@/lib/validation/admin";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const packages = await prisma.pricingPackage.findMany({ orderBy: [{ serviceArea: "asc" }, { order: "asc" }] });
  return NextResponse.json({ packages });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = pricingPackageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed.", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { features, excluded, ...rest } = parsed.data;
  const pkg = await prisma.pricingPackage.create({
    data: { ...rest, features: JSON.stringify(features), excluded: JSON.stringify(excluded) },
  });
  return NextResponse.json({ package: pkg }, { status: 201 });
}
