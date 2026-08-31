import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CategoryGrid } from "@/components/site/CategoryGrid";
import { LeadCTASection } from "@/components/site/LeadCTASection";
import { getPublishedCategories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore Smile Mart's ten product categories, from gift items and garments to jewellery and home appliances.",
  alternates: { canonical: "/products" },
};

export default async function ProductsPage() {
  const categories = await getPublishedCategories();

  return (
    <>
      <section className="bg-gradient-to-b from-brand-950 to-brand-800 py-20 text-center sm:py-24">
        <Container className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Products</p>
          <h1 className="text-balance text-4xl font-bold text-white sm:text-5xl">
            Ten categories. One business opportunity.
          </h1>
          <p className="mx-auto mt-6 text-lg text-white/80">
            Select a category to see what it covers, or explore the business models to see how you can start
            selling.
          </p>
        </Container>
      </section>
      <CategoryGrid categories={categories} showHeading={false} />
      <LeadCTASection title="Interested in one of our product categories?" />
    </>
  );
}
