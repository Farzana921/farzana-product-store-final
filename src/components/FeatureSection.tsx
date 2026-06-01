import { motion } from "framer-motion";
import { FiTruck, FiShield, FiAward, FiRefreshCw } from "react-icons/fi";

const FEATURES = [
  { icon: FiTruck, title: "Fast Delivery", desc: "Free express shipping on orders over $50." },
  { icon: FiShield, title: "Secure Payment", desc: "Encrypted checkout with trusted providers." },
  { icon: FiAward, title: "Premium Products", desc: "Hand-picked items from verified brands." },
  { icon: FiRefreshCw, title: "Easy Returns", desc: "30-day no-questions-asked returns." },
];

const FeatureSection = () => (
  <section className="bg-secondary/40 py-24">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="mb-12 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Why Us</span>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl">Why Shop With Us</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-3xl border border-border bg-card p-8 luxury-shadow"
          >
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureSection;
