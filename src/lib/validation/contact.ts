import { z } from "zod";

export const budgetRanges = [
  "Under $50",
  "$50 – $150",
  "$150 – $300",
  "$300 – $600",
  "$600+",
  "Not sure yet",
] as const;

export const timelines = [
  "As soon as possible",
  "Within 2 weeks",
  "Within a month",
  "Flexible",
] as const;

export const serviceOptions = [
  "Website Design & Build",
  "Landing Pages",
  "Website Redesign",
  "Bug Fixing & Repair",
  "Care & Maintenance Plans",
  "Android Apps",
  "Not sure yet",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  service: z.enum(serviceOptions, { message: "Select a service." }),
  budget: z.enum(budgetRanges, { message: "Select a budget range." }),
  timeline: z.enum(timelines, { message: "Select a timeline." }),
  description: z
    .string()
    .trim()
    .min(20, "Tell us a bit more — at least 20 characters.")
    .max(4000, "Keep it under 4000 characters."),
  // Honeypot: must stay empty. Bots tend to fill every field.
  website: z.string().max(0, "Spam check failed.").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
