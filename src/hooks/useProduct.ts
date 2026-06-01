import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/services/productApi";

export const useProduct = (id: string) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
