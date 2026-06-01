import { useMemo, useState } from "react";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { useSettings } from "@/context/SettingsContext";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import FilterSidebar from "./FilterSidebar";
import { FiGrid, FiList, FiFilter, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const ProductList = () => {
  const { data, isLoading, isError, refetch } = useProducts();
  const { data: categories = [] } = useCategories();
  const { state, dispatch } = useSettings();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");
  const [drawer, setDrawer] = useState(false);

  const filtered = useMemo(() => {
    let list = data?.products ?? [];
    if (state.category !== "all") list = list.filter((p) => p.category === state.category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating-desc": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "name-asc": list = [...list].sort((a, b) => a.title.localeCompare(b.title)); break;
    }
    return list;
  }, [data, state.category, query, sort]);

  return (
    <section id="products" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Catalog</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Product Collection</h2>
        </div>
        <div className="flex w-full items-center gap-3 md:w-auto">
          <SortDropdown value={sort} onChange={setSort} />
          <div className="flex items-center rounded-full border border-border bg-card p-1">
            <button
              onClick={() => dispatch({ type: "SET_VIEW", payload: "grid" })}
              aria-label="Grid view"
              className={`rounded-full p-2 ${state.view === "grid" ? "bg-foreground text-background" : ""}`}
            >
              <FiGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => dispatch({ type: "SET_VIEW", payload: "list" })}
              aria-label="List view"
              className={`rounded-full p-2 ${state.view === "list" ? "bg-foreground text-background" : ""}`}
            >
              <FiList className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => setDrawer(true)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm lg:hidden"
          >
            <FiFilter className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      <div className="mb-8">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <div className="hidden lg:block">
          <FilterSidebar categories={categories} />
        </div>

        <div>
          {isLoading && <LoadingSkeleton view={state.view} />}
          {isError && <ErrorMessage onRetry={() => refetch()} />}
          {!isLoading && !isError && filtered.length === 0 && (
            <EmptyState title="No Products Found" message="Try a different search or category." />
          )}
          {!isLoading && !isError && filtered.length > 0 && (
            state.view === "grid" ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => <ProductCard key={p.id} product={p} view="grid" />)}
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {filtered.map((p) => <ProductCard key={p.id} product={p} view="list" />)}
              </div>
            )
          )}
        </div>
      </div>

      <AnimatePresence>
        {drawer && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={() => setDrawer(false)}
          >
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
              className="h-full w-80 max-w-[80%] bg-background p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-2xl">Filters</h3>
                <button onClick={() => setDrawer(false)} aria-label="Close"><FiX className="h-5 w-5" /></button>
              </div>
              <FilterSidebar categories={categories} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductList;
