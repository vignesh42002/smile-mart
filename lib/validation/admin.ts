import { z } from "zod";
import { LEAD_STATUSES } from "@/lib/types";

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const categorySchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens only"),
  name: z.string().trim().min(2).max(100),
  shortDescription: z.string().trim().min(2).max(200),
  description: z.string().trim().max(4000).default(""),
  image: z.string().trim().min(1, "Image is required"),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  displayOrder: z.coerce.number().int().default(0),
});

export const productSchema = z.object({
  name: z.string().trim().min(2).max(150),
  categoryId: z.string().trim().min(1, "Category is required"),
  description: z.string().trim().max(4000).default(""),
  image: z.string().trim().min(1, "Image is required"),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  displayOrder: z.coerce.number().int().default(0),
});

export const businessModelSchema = z.object({
  slug: z.enum(["basic", "standard", "premium"]),
  name: z.string().trim().min(2).max(100),
  investmentAmount: z.coerce.number().int().min(0),
  tagline: z.string().trim().max(200).default(""),
  description: z.string().trim().max(4000).default(""),
  features: z.array(z.string().trim().min(1)).default([]),
  benefits: z.array(z.string().trim().min(1)).default([]),
  image: z.string().trim().min(1, "Image is required"),
  ctaLabel: z.string().trim().min(2).max(60).default("Apply Now"),
  published: z.boolean().default(true),
  displayOrder: z.coerce.number().int().default(0),
});

export const faqSchema = z.object({
  question: z.string().trim().min(3).max(300),
  answer: z.string().trim().min(3).max(4000),
  displayOrder: z.coerce.number().int().default(0),
  published: z.boolean().default(true),
});

export const testimonialSchema = z.object({
  name: z.string().trim().min(2).max(100),
  designation: z.string().trim().max(120).default(""),
  location: z.string().trim().max(120).default(""),
  testimonial: z.string().trim().min(3).max(2000),
  photo: z.string().trim().default(""),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  published: z.boolean().default(false),
});

export const businessNetworkSchema = z.object({
  name: z.string().trim().min(2).max(150),
  description: z.string().trim().max(500).default(""),
  logo: z.string().trim().default(""),
  displayOrder: z.coerce.number().int().default(0),
});

export const leadUpdateSchema = z.object({
  status: z.enum(LEAD_STATUSES as [string, ...string[]]).optional(),
  followUpDate: z.string().trim().nullable().optional(),
  assignedTo: z.string().trim().nullable().optional(),
});

export const leadNoteSchema = z.object({
  text: z.string().trim().min(1, "Note cannot be empty").max(2000),
});

export const settingsSchema = z.object({
  contact: z.object({
    address: z.string().trim().max(300),
    phone: z.string().trim().max(40),
    whatsappNumber: z
      .string()
      .trim()
      .regex(/^[0-9]{10,15}$/, "Use digits only, with country code, no spaces or symbols"),
    email: z.string().trim().email(),
  }),
  whatsappMessage: z.string().trim().max(400),
  social: z.object({
    instagram: z.string().trim().max(300),
    facebook: z.string().trim().max(300),
    youtube: z.string().trim().max(300),
  }),
  legalDisclaimer: z.string().trim().max(3000),
  businessNetworkPublished: z.boolean(),
  seo: z.object({
    defaultTitle: z.string().trim().max(120),
    defaultDescription: z.string().trim().max(300),
  }),
});
