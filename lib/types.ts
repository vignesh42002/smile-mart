// Shared domain types for every entity in the JSON data layer (lib/data/*).
// Kept in one place so the public site, admin panel, and API routes all agree on shape.

export type LeadStatus =
  | "new"
  | "contacted"
  | "followup"
  | "interested"
  | "converted"
  | "closed";

export const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "followup",
  "interested",
  "converted",
  "closed",
];

export type BusinessModelInterest = "basic" | "standard" | "premium" | "guidance";

export interface LeadNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  fullName: string;
  mobile: string;
  email?: string;
  city: string;
  interestedModel: BusinessModelInterest;
  source?: string;
  message?: string;
  status: LeadStatus;
  notes: LeadNote[];
  followUpDate: string | null;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
}

export type LeadInput = Pick<
  Lead,
  "fullName" | "mobile" | "email" | "city" | "interestedModel" | "source" | "message"
>;

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  published: boolean;
  featured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  image: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessModel {
  id: string;
  slug: "basic" | "standard" | "premium";
  name: string;
  investmentAmount: number;
  tagline: string;
  description: string;
  features: string[];
  benefits: string[];
  image: string;
  ctaLabel: string;
  published: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  location: string;
  testimonial: string;
  photo: string;
  rating: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessNetworkEntry {
  id: string;
  name: string;
  description: string;
  logo: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  contact: {
    address: string;
    phone: string;
    whatsappNumber: string;
    email: string;
  };
  whatsappMessage: string;
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  legalDisclaimer: string;
  businessNetworkPublished: boolean;
  seo: {
    defaultTitle: string;
    defaultDescription: string;
  };
}

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  name: string;
  role: "admin";
  createdAt: string;
}

export type AdminUserSafe = Omit<AdminUser, "passwordHash">;

export const OPPORTUNITY_OCCASIONS = [
  "Christmas",
  "New Year",
  "Marriage Season",
  "Valentine's Day",
  "School Holidays",
  "School Opening",
  "Deepavali",
  "Pongal",
  "Onam",
  "Ramadan",
  "Other Special Occasions",
] as const;

export interface HowItWorksStep {
  step: number;
  title: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  { step: 1, title: "Choose Your Business Model" },
  { step: 2, title: "Submit Your Enquiry" },
  { step: 3, title: "Get Business Guidance" },
  { step: 4, title: "Select Products & Start Selling" },
  { step: 5, title: "Grow Your Business" },
];

export type AnalyticsEvent =
  | "business_model_view"
  | "business_model_apply"
  | "lead_form_start"
  | "lead_form_submit"
  | "whatsapp_click"
  | "phone_click"
  | "product_view";
