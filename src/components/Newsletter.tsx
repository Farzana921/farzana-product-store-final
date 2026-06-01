import { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Enter a valid email");
    toast.success("Subscribed! Welcome.");
    setEmail("");
  };
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="overflow-hidden rounded-[2.5rem] bg-foreground px-8 py-20 text-center text-background sm:px-16">
        <span className="text-xs uppercase tracking-[0.3em] text-background/60">Newsletter</span>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl sm:text-5xl">Stay Updated</h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-background/70">
          Get updates on new arrivals and exclusive offers.
        </p>
        <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            className="flex-1 rounded-full bg-background/10 px-6 py-4 text-sm text-background placeholder:text-background/50 outline-none ring-1 ring-background/20 focus:ring-background/50"
          />
          <button className="rounded-full bg-background px-8 py-4 text-sm font-medium text-foreground hover:bg-background/90">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
