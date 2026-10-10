import { notFound } from "next/navigation";
import { getCategories, getProductsByCategory } from "@/lib/api";
import CategoryListing from "@/components/category/CategoryListing";
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let categories; let products;
  try { [categories, products] = await Promise.all([getCategories(), getProductsByCategory(slug)]); }
  catch { throw new Error("ক্যাটাগরির তথ্য আনা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।"); }
  const category = categories.find(item => item.slug === slug || item.id === slug);
  if (!category) notFound();
  return <main className="min-h-screen bg-[#f7faf7]"><section className="bg-[#f0f8f1]"><div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14"><div className="flex items-center gap-4"><span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm">{category.icon || "🧺"}</span><div><p className="text-sm font-semibold text-green-700">ক্যাটাগরি অনুযায়ী বাজারদর</p><h1 className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl">{category.nameBn}</h1><p className="mt-2 text-gray-600">এই ক্যাটাগরির পণ্যের আজকের দাম দেখুন।</p></div></div></div></section><section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14"><CategoryListing products={products}/></section></main>;
}
