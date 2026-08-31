import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { getCategoryIcon } from "@/lib/categoryIcons";
import type { ProductCategory } from "@/lib/types";

export function CategoryCard({ category }: { category: ProductCategory }) {
  const Icon = getCategoryIcon(category.slug);
  return (
    <Card className="group flex flex-col p-6 transition-shadow hover:shadow-md">
      <IconTile icon={Icon} size="lg" />
      <h3 className="mt-5 text-lg font-semibold text-brand-950">{category.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{category.shortDescription}</p>
      <Link
        href={`/products/${category.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-800"
      >
        Explore
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </Card>
  );
}
