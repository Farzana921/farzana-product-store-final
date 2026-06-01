import { motion } from "framer-motion";
import { useSettings } from "@/context/SettingsContext";

const CATEGORIES = [
  { key: "beauty", label: "Beauty", img: "https://images.unsplash.com/photo-1522335789203-aaa3e2462f1d?w=600&q=80" },
  { key: "smartphones", label: "Electronics", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80" },
  { key: "mens-shirts", label: "Fashion", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80" },
  { key: "groceries", label: "Groceries", img: "https://images.unsplash.com/photo-1543168256-418811576931?w=600&q=80" },
  { key: "furniture", label: "Home", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" },
];

const CategorySection = () => {
  const { dispatch } = useSettings();
  return (
    <section id="categories" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Collections</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Featured Categories</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((c, i) => (
          <motion.a
            key={c.key}
            href="#products"
            onClick={() => dispatch({ type: "SET_CATEGORY", payload: c.key })}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            className="group relative block aspect-[3/4] overflow-hidden rounded-3xl bg-secondary luxury-shadow"
          >
            <img src={c.img} alt={c.label} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 text-white">
              <div className="font-display text-2xl">{c.label}</div>
              <div className="text-xs uppercase tracking-widest opacity-80">Shop now →</div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
