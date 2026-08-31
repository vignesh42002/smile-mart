import type { MetadataRoute } from "next";
import { getPublishedCategories } from "@/lib/data/categories";
import { getPublishedBusinessModels } from "@/lib/data/businessModels";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const STATIC_ROUTES = [
  "",
  "/about",
  "/products",
  "/business-opportunity",
  "/how-it-works",
  "/social-media-marketing",
  "/faq",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, models] = await Promise.all([getPublishedCategories(), getPublishedBusinessModels()]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/products/${category.slug}`,
    lastModified: category.updatedAt,
  }));

  const modelEntries: MetadataRoute.Sitemap = models.map((model) => ({
    url: `${siteUrl}/business-opportunity/${model.slug}`,
    lastModified: model.updatedAt,
  }));

  return [...staticEntries, ...categoryEntries, ...modelEntries];
}
