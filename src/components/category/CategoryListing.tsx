"use client";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/home/ProductCard";
import type { Product } from "@/types/product";
type SortMode = "default" | "asc" | "desc";
export default function CategoryListing({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortMode>("default");
  const sorted = useMemo(() => {
    const copy = [...products];
    if (sort === "asc") copy.sort((a,b) => Number(a.today)-Number(b.today));
    if (sort === "desc") copy.sort((a,b) => Number(b.today)-Number(a.today));
    return copy;
  }, [products, sort]);
  return <>
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-gray-600">মোট {sorted.length.toLocaleString("bn-BD")}টি পণ্য</p><label className="relative flex items-center gap-2 self-start rounded-xl border border-green-100 bg-white px-3 py-2.5 text-sm sm:self-auto"><span className="shrink-0 font-medium text-gray-600">সাজান:</span><select value={sort} onChange={e=>setSort(e.target.value as SortMode)} className="max-w-[220px] appearance-none bg-transparent pr-6 font-semibold text-gray-800 outline-none" aria-label="পণ্যের দাম অনুযায়ী সাজান"><option value="default">ডিফল্ট</option><option value="asc">দাম: কম থেকে বেশি</option><option value="desc">দাম: বেশি থেকে কম</option></select><ChevronDown size={16} className="pointer-events-none absolute right-3 text-gray-500" /></label></div>
    {sorted.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{sorted.map(product=><ProductCard key={product.id} product={product}/>)}</div> : <div className="rounded-2xl border border-dashed border-green-200 bg-white px-6 py-14 text-center"><p className="text-4xl">🧺</p><h2 className="mt-4 text-xl font-bold text-gray-900">এই ক্যাটাগরিতে কোনো পণ্য নেই</h2><p className="mt-2 text-gray-600">অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।</p><a href="/" className="mt-5 inline-flex rounded-lg bg-green-700 px-5 py-3 font-semibold text-white">হোম পেজে ফিরে যান</a></div>}
  </>;
}
