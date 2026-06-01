import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "@/redux/cartSlice";
import { FiShoppingBag, FiSearch, FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const totalQty = useSelector(selectTotalQuantity);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/", label: "Products", hash: "products" },
    { to: "/cart", label: "Cart" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight">Farzana</span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Product Store</span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                hash={l.hash}
                className="text-sm tracking-wide text-foreground/80 transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#products"
            aria-label="Search"
            className="hidden rounded-full p-2 hover:bg-secondary md:inline-flex"
          >
            <FiSearch className="h-5 w-5" />
          </a>
          <ThemeToggle />
          <Link to="/cart" aria-label="Cart" className="relative rounded-full p-2 hover:bg-secondary">
            <FiShoppingBag className="h-5 w-5" />
            {totalQty > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                {totalQty}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="rounded-full p-2 hover:bg-secondary md:hidden"
          >
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    hash={l.hash}
                    className="block rounded-lg px-3 py-3 text-sm hover:bg-secondary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
