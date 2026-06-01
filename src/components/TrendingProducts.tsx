import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "./LoadingSkeleton";

const TrendingProducts = () => {
  const { data, isLoading } = useProducts();
  const trending = (data?.products ?? []).filter((p) => p.rating >= 4.5).slice(0, 4);
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Bestsellers</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Trending Products</h2>
        </div>
        <a href="#products" className="hidden text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground md:inline">
          View all →
        </a>
      </div>
      {isLoading ? (
        <LoadingSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
};

export default TrendingProducts;
