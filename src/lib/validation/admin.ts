import { z } from "zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const projectSchema = z.object({
  title: z.string().trim().min(2, "Title is required.").max(150),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, "Slug is required.")
    .max(150)
    .regex(slugPattern, "Use lowercase letters, numbers, and hyphens only."),
  summary: z.string().trim().min(10, "Summary is required.").max(400),
  brief: z.string().trim().min(10, "Brief is required.").max(2000),
  approach: z.string().trim().min(10, "Approach is required.").max(2000),
  result: z.string().trim().min(10, "Result is required.").max(2000),
  body: z.string().trim().max(20000).optional().or(z.literal("")),
  liveUrl: z.string().trim().url("Enter a valid URL.").max(300).optional().or(z.literal("")),
  tags: z.string().trim().max(300).optional().or(z.literal("")),
  featured: z.boolean(),
  order: z.coerce.number().int().min(0).max(9999),
  metaTitle: z.string().trim().max(120).optional().or(z.literal("")),
  metaDescription: z.string().trim().max(200).optional().or(z.literal("")),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export const serviceSchema = z.object({
  title: z.string().trim().min(2, "Title is required.").max(150),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, "Slug is required.")
    .max(150)
    .regex(slugPattern, "Use lowercase letters, numbers, and hyphens only."),
  summary: z.string().trim().min(10, "Summary is required.").max(400),
  included: z.array(z.string().trim().min(1)).min(1, "Add at least one included item."),
  process: z
    .array(
      z.object({
        title: z.string().trim().min(1, "Step title is required."),
        description: z.string().trim().min(1, "Step description is required."),
      })
    )
    .min(1, "Add at least one process step."),
  timeline: z.string().trim().min(2, "Timeline is required.").max(100),
  startingPrice: z.string().trim().min(1, "Starting price is required.").max(50),
  faq: z.array(
    z.object({
      question: z.string().trim().min(1, "Question is required."),
      answer: z.string().trim().min(1, "Answer is required."),
    })
  ),
  order: z.coerce.number().int().min(0).max(9999),
  metaTitle: z.string().trim().max(120).optional().or(z.literal("")),
  metaDescription: z.string().trim().max(200).optional().or(z.literal("")),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;

export const testimonialSchema = z.object({
  quote: z.string().trim().min(10, "Quote is required.").max(600),
  clientName: z.string().trim().min(1, "Client name is required.").max(150),
  role: z.string().trim().min(1, "Role is required.").max(150),
  visible: z.boolean(),
  order: z.coerce.number().int().min(0).max(9999),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export const pricingPackageSchema = z.object({
  serviceArea: z.string().trim().min(1, "Service area is required.").max(100),
  name: z.string().trim().min(1, "Name is required.").max(100),
  price: z.string().trim().min(1, "Price is required.").max(50),
  description: z.string().trim().min(1, "Description is required.").max(300),
  features: z.array(z.string().trim().min(1)),
  excluded: z.array(z.string().trim().min(1)),
  order: z.coerce.number().int().min(0).max(9999),
  highlighted: z.boolean(),
});

export type PricingPackageFormValues = z.infer<typeof pricingPackageSchema>;

export const settingsSchema = z.object({
  contactEmail: z.string().trim().email("Enter a valid email."),
  socialLinks: z.object({
    instagram: z.string().trim().max(300).optional().or(z.literal("")),
    linkedin: z.string().trim().max(300).optional().or(z.literal("")),
    twitter: z.string().trim().max(300).optional().or(z.literal("")),
    facebook: z.string().trim().max(300).optional().or(z.literal("")),
  }),
  announcementText: z.string().trim().max(200).optional().or(z.literal("")),
  announcementActive: z.boolean(),
  privacyPolicy: z.string().trim().max(20000).optional().or(z.literal("")),
  termsOfService: z.string().trim().max(20000).optional().or(z.literal("")),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
