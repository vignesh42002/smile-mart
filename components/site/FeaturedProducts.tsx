import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/site/ProductCard";
import type { Product, ProductCategory } from "@/lib/types";

interface FeaturedProductsProps {
  products: Product[];
  categories: ProductCategory[];
  title?: string;
  subtitle?: string;
  whatsappNumber?: string;
}

export function FeaturedProducts({
  products,
  categories,
  title = "Published Shop Products",
  subtitle = "Browse products added live in our store. Real-time items available for bulk purchase and retail.",
  whatsappNumber,
}: FeaturedProductsProps) {
  if (!products || products.length === 0) return null;

  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  return (
    <section className="py-20 sm:py-24 bg-slate-50/70 border-t border-b border-slate-100">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Live Inventory</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl">{title}</h2>
          <p className="mt-4 text-slate-600">{subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              category={categoryMap.get(product.categoryId)}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
