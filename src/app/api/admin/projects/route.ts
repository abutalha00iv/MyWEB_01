import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/require-admin";
import { projectSchema } from "@/lib/validation/admin";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed.", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const existing = await prisma.project.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return NextResponse.json({ error: "A project with this slug already exists.", fieldErrors: { slug: ["Slug already in use."] } }, { status: 409 });
  }

  const { liveUrl, tags, metaTitle, metaDescription, body: caseStudyBody, ...rest } = parsed.data;

  const project = await prisma.project.create({
    data: {
      ...rest,
      body: caseStudyBody || "",
      liveUrl: liveUrl || null,
      tags: tags || "",
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
    },
  });

  return NextResponse.json({ project }, { status: 201 });
}
