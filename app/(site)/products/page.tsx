import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CategoryGrid } from "@/components/site/CategoryGrid";
import { FeaturedProducts } from "@/components/site/FeaturedProducts";
import { LeadCTASection } from "@/components/site/LeadCTASection";
import { getPublishedCategories } from "@/lib/data/categories";
import { getAllPublishedProducts } from "@/lib/data/products";
import { getSettings } from "@/lib/data/settings";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Products",
  description: "Explore Smile Mart's ten product categories, from gift items and garments to jewellery and home appliances.",
  alternates: { canonical: "/products" },
};

export default async function ProductsPage() {
  const [categories, products, settings] = await Promise.all([
    getPublishedCategories(),
    getAllPublishedProducts(),
    getSettings(),
  ]);

  return (
    <>
      <section className="bg-gradient-to-b from-brand-950 to-brand-800 py-20 text-center sm:py-24">
        <Container className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Products & Catalog</p>
          <h1 className="text-balance text-4xl font-bold text-white sm:text-5xl">
            Product Categories & Live Shop Items
          </h1>
          <p className="mx-auto mt-6 text-lg text-white/80">
            Explore our wide range of product categories and live published items available for your store.
          </p>
        </Container>
      </section>
      <CategoryGrid categories={categories} showHeading={false} />
      {products.length > 0 ? (
        <FeaturedProducts
          products={products}
          categories={categories}
          title="All Published Shop Products"
          subtitle="Explore the latest items updated live from our product catalog."
          whatsappNumber={settings.contact.whatsappNumber}
        />
      ) : null}
      <LeadCTASection title="Interested in one of our product categories or items?" />
    </>
  );
}
