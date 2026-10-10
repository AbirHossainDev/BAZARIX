
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import ProductSummary from "@/components/product/ProductSummary";
import ProductAccessGuard from "@/components/product/ProductAccessGuard";

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

const ProductPage = async ({
    params,
}: ProductPageProps) => {
    const { slug } = await params;

    let product;

    try {
        product = await getProduct(slug);
    } catch {
        notFound();
    }

    if (!product) {
        notFound();
    }

    return (
        <ProductAccessGuard>
            <main className="min-h-screen bg-[#f7faf7]">
                <ProductSummary product={product} />
            </main>
        </ProductAccessGuard>
    );
};

export default ProductPage;
