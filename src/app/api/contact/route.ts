import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation/contact";
import { sendContactNotification } from "@/lib/email";
import { getSiteSettings } from "@/lib/settings";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form for errors.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot tripped — pretend success so bots don't learn anything, but do nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, company, service, budget, timeline, description } = parsed.data;

  try {
    await prisma.contactSubmission.create({
      data: { name, email, company: company || null, service, budget, timeline, description },
    });
  } catch (error) {
    console.error("[contact] failed to save submission:", error);
    return NextResponse.json({ error: "Something went wrong saving your message. Please try again." }, { status: 500 });
  }

  try {
    const settings = await getSiteSettings();
    await sendContactNotification({ name, email, company, service, budget, timeline, description }, settings.contactEmail);
  } catch (error) {
    // Email forwarding is best-effort; the submission is already safely stored.
    console.error("[contact] email forwarding failed:", error);
  }

  return NextResponse.json({ ok: true });
}
