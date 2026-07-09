import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/require-admin";

const imageSchema = z.object({
  url: z.string().trim().min(1).max(500),
  alt: z.string().trim().max(200).optional().or(z.literal("")),
});

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = imageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed." }, { status: 400 });
  }

  const project = await prisma.project.findUnique({ where: { id }, include: { images: true } });
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const image = await prisma.projectImage.create({
    data: {
      projectId: id,
      url: parsed.data.url,
      alt: parsed.data.alt || "",
      order: project.images.length,
    },
  });

  return NextResponse.json({ image }, { status: 201 });
}
