import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/site/CategoryCard";
import type { ProductCategory } from "@/lib/types";

export function CategoryGrid({
  categories,
  showHeading = true,
}: {
  categories: ProductCategory[];
  showHeading?: boolean;
}) {
  return (
    <section className="bg-brand-50/50 py-20 sm:py-24">
      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow="Product Categories"
            title="One platform, ten product categories"
            description="Choose the categories that fit your market, or grow into new ones as your business expands."
          />
        ) : null}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
