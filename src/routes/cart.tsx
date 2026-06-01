import { createFileRoute, Link } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems, selectTotalPrice, selectTotalProducts, selectTotalQuantity,
  increaseQty, decreaseQty, removeItem, clearCart,
} from "@/redux/cartSlice";
import { formatPrice } from "@/utils/helpers";
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import EmptyState from "@/components/EmptyState";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Farzana Product Store" },
      { name: "description", content: "Review your selected items and proceed to checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useSelector(selectCartItems);
  const totalProducts = useSelector(selectTotalProducts);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-10">
        <EmptyState
          icon={<FiShoppingBag className="h-7 w-7" />}
          title="Your cart is empty"
          message="Browse our collection and add your favorite products."
          action={
            <Link to="/" className="rounded-full bg-foreground px-6 py-3 text-sm text-background hover:bg-foreground/85">
              Continue Shopping
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Checkout</span>
        <h1 className="mt-3 font-display text-5xl">Your Cart</h1>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-5 luxury-shadow sm:flex-row sm:items-center"
            >
              <Link to="/product/$id" params={{ id: String(item.id) }} className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl bg-secondary">
                <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
              </Link>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{item.category}</div>
                <Link to="/product/$id" params={{ id: String(item.id) }} className="mt-1 block font-display text-xl">
                  {item.title}
                </Link>
                <div className="mt-2 font-display text-lg">{formatPrice(item.price)}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full border border-border">
                  <button
                    onClick={() => { dispatch(decreaseQty(item.id)); toast.success("Quantity updated"); }}
                    aria-label="Decrease quantity"
                    className="p-3 hover:bg-secondary rounded-l-full"
                  >
                    <FiMinus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => { dispatch(increaseQty(item.id)); toast.success("Quantity updated"); }}
                    aria-label="Increase quantity"
                    className="p-3 hover:bg-secondary rounded-r-full"
                  >
                    <FiPlus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  onClick={() => { dispatch(removeItem(item.id)); toast.success("Removed from cart"); }}
                  aria-label="Remove item"
                  className="rounded-full p-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <aside className="h-fit rounded-3xl border border-border bg-card p-8 luxury-shadow lg:sticky lg:top-28">
          <h2 className="font-display text-2xl">Order Summary</h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <dt>Total Products</dt><dd>{totalProducts}</dd>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <dt>Total Quantity</dt><dd>{totalQuantity}</dd>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <dt>Shipping</dt><dd>Free</dd>
            </div>
            <div className="my-4 border-t border-border" />
            <div className="flex items-baseline justify-between">
              <dt className="text-base">Total</dt>
              <dd className="font-display text-3xl">{formatPrice(totalPrice)}</dd>
            </div>
          </dl>
          <button className="mt-8 w-full rounded-full bg-foreground py-4 text-sm font-medium text-background hover:bg-foreground/85">
            Checkout
          </button>
          <button
            onClick={() => { dispatch(clearCart()); toast.success("Cart cleared"); }}
            className="mt-3 w-full rounded-full border border-border bg-transparent py-4 text-sm hover:bg-secondary"
          >
            Clear Cart
          </button>
        </aside>
      </div>
    </div>
  );
}
