import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/cartSlice";
import { Product } from "@/services/productApi";
import { FiStar, FiShoppingBag } from "react-icons/fi";
import { formatPrice, titleCase, discountedPrice } from "@/utils/helpers";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  view?: "grid" | "list";
}

const ProductCard = ({ product, view = "grid" }: Props) => {
  const dispatch = useDispatch();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addItem({
      id: product.id,
      title: product.title,
      price: discountedPrice(product.price, product.discountPercentage),
      thumbnail: product.thumbnail,
      category: product.category,
    }));
    toast.success(`${product.title} added to cart`);
  };

  if (view === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-5 luxury-shadow sm:flex-row"
      >
        <Link to="/product/$id" params={{ id: String(product.id) }} className="block w-full overflow-hidden rounded-2xl bg-secondary sm:w-56">
          <img src={product.thumbnail} alt={product.title} className="aspect-square h-full w-full object-cover" />
        </Link>
        <div className="flex flex-1 flex-col">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{titleCase(product.category)}</div>
          <Link to="/product/$id" params={{ id: String(product.id) }}>
            <h3 className="mt-1 font-display text-2xl">{product.title}</h3>
          </Link>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
          <div className="mt-auto flex items-end justify-between pt-4">
            <div>
              <div className="flex items-center gap-1 text-sm">
                <FiStar className="h-4 w-4 fill-current" /> {product.rating.toFixed(1)}
              </div>
              <div className="mt-1 font-display text-2xl">
                {formatPrice(discountedPrice(product.price, product.discountPercentage))}
              </div>
            </div>
            <button onClick={handleAdd} className="rounded-full bg-foreground px-5 py-3 text-sm text-background hover:bg-foreground/85">
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="group flex flex-col overflow-hidden rounded-[20px] border border-border bg-card luxury-shadow"
    >
      <Link to="/product/$id" params={{ id: String(product.id) }} className="relative block aspect-square overflow-hidden bg-secondary">
        <img src={product.thumbnail} alt={product.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {product.discountPercentage > 10 && (
          <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1 text-[10px] uppercase tracking-widest text-background">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        <button
          onClick={handleAdd}
          aria-label="Add to cart"
          className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-foreground hover:text-background"
        >
          <FiShoppingBag className="h-4 w-4" />
        </button>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
          <span>{titleCase(product.category)}</span>
          <span className="flex items-center gap-1 text-foreground">
            <FiStar className="h-3 w-3 fill-current" /> {product.rating.toFixed(1)}
          </span>
        </div>
        <Link to="/product/$id" params={{ id: String(product.id) }}>
          <h3 className="mt-2 line-clamp-1 font-display text-xl">{product.title}</h3>
        </Link>
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="font-display text-lg">
            {formatPrice(discountedPrice(product.price, product.discountPercentage))}
          </div>
          <Link
            to="/product/$id"
            params={{ id: String(product.id) }}
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            View →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
