import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-product.jpg";

const Hero = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary via-background to-secondary/60" />
    <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle_at_20%_10%,var(--color-accent)_0,transparent_40%),radial-gradient(circle_at_80%_70%,var(--color-secondary)_0,transparent_45%)]" />

    <div className="mx-auto grid min-h-[88vh] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Farzana Akbari • Product Store
        </span>
        <h1 className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Shop Smarter.<br />
          <span className="italic text-muted-foreground">Live Better.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Welcome to my Product Store App. This application allows users to explore products,
          view detailed information, and manage their shopping cart through a simple and responsive shopping experience.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/"
            hash="products"
            className="rounded-full bg-foreground px-8 py-4 text-sm font-medium tracking-wide text-background transition-colors hover:bg-foreground/85"
          >
            Shop Collection
          </Link>
          <Link
            to="/"
            hash="categories"
            className="rounded-full border border-foreground/20 bg-transparent px-8 py-4 text-sm font-medium tracking-wide transition-colors hover:bg-foreground hover:text-background"
          >
            Explore Products
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-8">
          {[
            { v: "10k+", l: "Products" },
            { v: "98%", l: "Happy Clients" },
            { v: "24/7", l: "Support" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-3xl">{s.v}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.15 }}
        className="relative"
      >
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] luxury-shadow"
        >
          <img src={heroImage} alt="Featured premium product" className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-5 luxury-shadow sm:block">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Curated</div>
          <div className="font-display text-2xl">Editor's Pick</div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
