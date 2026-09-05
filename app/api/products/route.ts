import { NextResponse } from "next/server";
import { getAllPublishedProducts } from "@/lib/data/products";

export const dynamic = "force-dynamic";

export async function GET() {
  const products = await getAllPublishedProducts();
  return NextResponse.json(products);
}
