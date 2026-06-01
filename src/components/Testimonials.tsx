import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const REVIEWS = [
  { name: "Aisha Rahman", avatar: "https://i.pravatar.cc/120?img=47", rating: 5, text: "The shopping experience feels effortlessly elegant. Beautifully crafted and lightning fast." },
  { name: "Daniel Carter", avatar: "https://i.pravatar.cc/120?img=12", rating: 5, text: "Premium feel from browsing to checkout. Easily the cleanest store I've used this year." },
  { name: "Sara Lee", avatar: "https://i.pravatar.cc/120?img=32", rating: 4, text: "Curated selection, gorgeous typography and very smooth animations. Highly recommended." },
];

const Testimonials = () => (
  <section className="bg-secondary/40 py-24">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="mb-12 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Reviews</span>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl">Loved by Customers</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl border border-border bg-card p-8 luxury-shadow"
          >
            <div className="flex items-center gap-4">
              <img src={r.avatar} alt={r.name} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <div className="font-display text-lg">{r.name}</div>
                <div className="flex text-foreground">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <FiStar key={j} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">"{r.text}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
