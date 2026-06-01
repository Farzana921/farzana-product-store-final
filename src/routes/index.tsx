import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import FeatureSection from "@/components/FeatureSection";
import TrendingProducts from "@/components/TrendingProducts";
import ProductList from "@/components/ProductList";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Farzana Product Store — Shop Smarter. Live Better." },
      { name: "description", content: "Premium luxury shopping. Browse curated products with a smooth modern experience built using React, Redux Toolkit, Context API and React Query." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeatureSection />
      <TrendingProducts />
      <ProductList />
      <Testimonials />
      <Newsletter />
    </>
  );
}
