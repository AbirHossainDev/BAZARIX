
import type { Category, Product } from "@/types/product";

const API_URLS = [
    "https://api.api-store.workers.dev/api/bazardor",
    "https://api.abcz.workers.dev/api/bazardor",
];

async function apiFetch<T>(path: string): Promise<T> {
    let lastError: unknown;

    for (const baseUrl of API_URLS) {
        try {
            const res = await fetch(`${baseUrl}${path}`, {
                cache: "no-store",
                signal: AbortSignal.timeout(8000),
            });

            if (!res.ok) {
                throw new Error(`API error: ${res.status}`);
            }

            return (await res.json()) as T;
        } catch (error) {
            lastError = error;
            console.warn(`API failed: ${baseUrl}${path}`, error);
        }
    }

    throw lastError instanceof Error
        ? lastError
        : new Error("All APIs failed");
}

export async function getProducts(): Promise<Product[]> {
    return apiFetch<Product[]>("/products");
}

export async function getProduct(slug: string): Promise<Product> {
    const products = await getProducts();

    const product = products.find(
        (item) => item.slug === slug
    );

    if (!product) {
        throw new Error("Product not found");
    }

    return apiFetch<Product>(`/products/${product.id}`);
}

export async function getCategories(): Promise<Category[]> {
    return apiFetch<Category[]>("/categories");
}

export async function getCategory(
    slug: string
): Promise<Category | null> {
    try {
        return await apiFetch<Category>(`/categories/${encodeURIComponent(slug)}`);
    } catch {
        return null;
    }
}

export async function getProductsByCategory(
    category: string
): Promise<Product[]> {
    return apiFetch<Product[]>(
        `/products?category=${encodeURIComponent(category)}`
    );
}