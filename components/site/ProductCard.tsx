import Image from "next/image";
import Link from "next/link";
import { Package, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Product, ProductCategory } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  category?: ProductCategory;
  whatsappNumber?: string;
  whatsappMessage?: string;
}

export function ProductCard({ product, category, whatsappNumber = "919000000000", whatsappMessage }: ProductCardProps) {
  const message = encodeURIComponent(
    whatsappMessage || `Hi Smile Mart, I am interested in ordering/learning more about ${product.name}.`
  );
  const waUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${message}`;

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 w-full bg-slate-100 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400">
            <Package size={40} strokeWidth={1.5} />
            <span className="mt-2 text-xs font-medium text-slate-400">Smile Mart Quality</span>
          </div>
        )}
        {product.featured ? (
          <div className="absolute top-3 left-3">
            <Badge tone="gold">Featured</Badge>
          </div>
        ) : null}
        {category ? (
          <div className="absolute top-3 right-3">
            <Badge tone="slate">{category.name}</Badge>
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-brand-950 group-hover:text-brand-700 transition-colors">
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3 flex-1">
          {product.description || "High quality product available for retail and wholesale business distribution."}
        </p>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-emerald-700 shadow-sm"
          >
            <MessageCircle size={15} />
            Enquire / Order on WhatsApp
          </a>
        </div>
      </div>
    </Card>
  );
}
