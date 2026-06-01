import { createFileRoute, Link } from "@tanstack/react-router";
import { useProduct } from "@/hooks/useProduct";
import { useProducts } from "@/hooks/useProducts";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/cartSlice";
import { useState } from "react";
import { FiStar, FiPlus, FiMinus, FiArrowLeft } from "react-icons/fi";
import { formatPrice, titleCase, discountedPrice } from "@/utils/helpers";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Product · Farzana Store` },
      { name: "description", content: `Product details for item ${params.id}.` },
    ],
  }),
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const { id } = Route.useParams();
  const { data: product, isLoading, isError, refetch } = useProduct(id);
  const { data: allProducts } = useProducts();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="skeleton-shimmer aspect-square w-full rounded-3xl" />
          <div className="space-y-4">
            <div className="skeleton-shimmer h-4 w-32 rounded" />
            <div className="skeleton-shimmer h-12 w-3/4 rounded" />
            <div className="skeleton-shimmer h-4 w-full rounded" />
            <div className="skeleton-shimmer h-4 w-full rounded" />
            <div className="skeleton-shimmer mt-8 h-14 w-48 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <ErrorMessage title="Product not found" message="This product may have been removed." onRetry={() => refetch()} />
      </div>
    );
  }

  const finalPrice = discountedPrice(product.price, product.discountPercentage);
  const related = (allProducts?.products ?? [])
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    dispatch(addItem({
      id: product.id,
      title: product.title,
      price: finalPrice,
      thumbnail: product.thumbnail,
      category: product.category,
      quantity: qty,
    }));
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <FiArrowLeft /> Back to shop
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-3xl bg-secondary luxury-shadow">
            <img src={product.images[activeImg] ?? product.thumbnail} alt={product.title} className="h-full w-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden rounded-xl border-2 ${activeImg === i ? "border-foreground" : "border-transparent"}`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span>{titleCase(product.category)}</span>
            {product.brand && <><span>·</span><span>{product.brand}</span></>}
          </div>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{product.title}</h1>
          <div className="mt-4 flex items-center gap-4">
            <span className="flex items-center gap-1 text-sm">
              <FiStar className="h-4 w-4 fill-current" /> {product.rating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">·</span>
            <span className={`text-sm ${product.stock > 10 ? "text-[color:var(--success)]" : "text-destructive"}`}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8 flex items-baseline gap-3">
            <div className="font-display text-4xl">{formatPrice(finalPrice)}</div>
            {product.discountPercentage > 0 && (
              <>
                <div className="text-lg text-muted-foreground line-through">{formatPrice(product.price)}</div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs uppercase tracking-wider">
                  -{Math.round(product.discountPercentage)}% Off
                </span>
              </>
            )}
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-4 hover:bg-secondary rounded-l-full" aria-label="Decrease">
                <FiMinus />
              </button>
              <span className="w-12 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-4 hover:bg-secondary rounded-r-full" aria-label="Increase">
                <FiPlus />
              </button>
            </div>
            <button onClick={handleAdd} className="flex-1 rounded-full bg-foreground py-4 text-sm font-medium text-background hover:bg-foreground/85">
              Add to Cart · {formatPrice(finalPrice * qty)}
            </button>
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 font-display text-3xl">Related Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
