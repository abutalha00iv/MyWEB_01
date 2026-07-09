// Pluggable contact-form email forwarding.
//
// The contact form ALWAYS saves to the database first — this is best-effort
// notification on top of that, not the source of truth. If it fails or isn't
// configured, the submission is still safely stored and visible in the admin
// inbox.
//
// ── HOW TO ENABLE ──────────────────────────────────────────────────────────
// Pick ONE provider and set its variables in `.env`:
//
//   EMAIL_PROVIDER=web3forms
//   WEB3FORMS_ACCESS_KEY=your-access-key       (get one free at web3forms.com)
//
//   EMAIL_PROVIDER=resend
//   RESEND_API_KEY=your-api-key                (from resend.com)
//   RESEND_FROM_EMAIL=notifications@yourdomain.com   (must be a verified sender)
//
// Leave EMAIL_PROVIDER unset to skip email forwarding entirely — submissions
// still land in Admin → Submissions.
// ─────────────────────────────────────────────────────────────────────────

type ContactNotification = {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
};

export async function sendContactNotification(
  data: ContactNotification,
  toEmail: string
): Promise<{ sent: boolean; reason?: string }> {
  const provider = process.env.EMAIL_PROVIDER;

  try {
    if (provider === "web3forms") {
      return await sendViaWeb3Forms(data, toEmail);
    }

    if (provider === "resend") {
      return await sendViaResend(data, toEmail);
    }

    return { sent: false, reason: "No EMAIL_PROVIDER configured — submission saved to database only." };
  } catch (error) {
    console.error("[email] notification failed:", error);
    return { sent: false, reason: "Provider request failed." };
  }
}

async function sendViaWeb3Forms(data: ContactNotification, toEmail: string) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return { sent: false, reason: "WEB3FORMS_ACCESS_KEY is not set." };

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New project inquiry from ${data.name}`,
      from_name: "Aureth Tyrian — Website",
      to: toEmail,
      name: data.name,
      email: data.email,
      company: data.company || "—",
      service: data.service,
      budget: data.budget,
      timeline: data.timeline,
      message: data.description,
    }),
  });

  if (!res.ok) return { sent: false, reason: `Web3Forms responded with ${res.status}.` };
  return { sent: true };
}

async function sendViaResend(data: ContactNotification, toEmail: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !fromEmail) return { sent: false, reason: "RESEND_API_KEY or RESEND_FROM_EMAIL is not set." };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: data.email,
      subject: `New project inquiry from ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company || "—"}`,
        `Service: ${data.service}`,
        `Budget: ${data.budget}`,
        `Timeline: ${data.timeline}`,
        "",
        "Description:",
        data.description,
      ].join("\n"),
    }),
  });

  if (!res.ok) return { sent: false, reason: `Resend responded with ${res.status}.` };
  return { sent: true };
}
