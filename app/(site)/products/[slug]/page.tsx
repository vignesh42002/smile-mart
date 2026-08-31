import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageSearch } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Card } from "@/components/ui/Card";
import { ViewTracker } from "@/components/site/ViewTracker";
import { LeadCTASection } from "@/components/site/LeadCTASection";
import { getCategoryBySlug } from "@/lib/data/categories";
import { getPublishedProductsByCategory } from "@/lib/data/products";
import { getCategoryIcon } from "@/lib/categoryIcons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.shortDescription,
    alternates: { canonical: `/products/${category.slug}` },
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category || !category.published) notFound();

  const products = await getPublishedProductsByCategory(category.id);
  const Icon = getCategoryIcon(category.slug);

  return (
    <>
      <ViewTracker event="product_view" meta={{ category: category.slug }} />
      <section className="bg-gradient-to-b from-brand-950 to-brand-800 py-16 sm:py-20">
        <Container className="max-w-3xl text-center">
          <div className="mx-auto w-fit">
            <IconTile icon={Icon} tone="gold" size="lg" />
          </div>
          <h1 className="mt-6 text-balance text-3xl font-bold text-white sm:text-4xl">{category.name}</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">{category.description || category.shortDescription}</p>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Card key={product.id} className="p-6">
                  <h3 className="text-base font-semibold text-brand-950">{product.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{product.description}</p>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center">
              <PackageSearch size={32} className="text-slate-400" />
              <h3 className="mt-4 text-base font-semibold text-brand-950">More items coming to this category soon</h3>
              <p className="mt-2 text-sm text-slate-500">
                Submit an enquiry and our team will share the current {category.name.toLowerCase()} range with you
                directly.
              </p>
            </div>
          )}
        </Container>
      </section>

      <LeadCTASection title={`Interested in ${category.name}?`} />
    </>
  );
}
