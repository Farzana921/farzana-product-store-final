const BASE = "https://dummyjson.com";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchProducts = async (limit = 100): Promise<ProductsResponse> => {
  const res = await fetch(`${BASE}/products?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
};

export const fetchProduct = async (id: string | number): Promise<Product> => {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
};

export const fetchCategories = async (): Promise<string[]> => {
  const res = await fetch(`${BASE}/products/category-list`);
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json();
};
