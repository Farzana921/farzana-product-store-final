import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "@/services/productApi";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(100),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
