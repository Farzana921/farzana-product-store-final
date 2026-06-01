import { FiGithub, FiLinkedin, FiGlobe } from "react-icons/fi";

const Footer = () => (
  <footer className="border-t border-border bg-secondary/30">
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <div className="font-display text-3xl">Farzana Store</div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A premium luxury product store crafted with modern React architecture.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#products" className="hover:text-foreground">Products</a></li>
            <li><a href="#categories" className="hover:text-foreground">Categories</a></li>
            <li><a href="/cart" className="hover:text-foreground">Cart</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Connect</h4>
          <div className="mt-4 flex gap-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full border border-border p-3 hover:bg-foreground hover:text-background"><FiGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-border p-3 hover:bg-foreground hover:text-background"><FiLinkedin /></a>
            <a href="#" aria-label="Portfolio" className="rounded-full border border-border p-3 hover:bg-foreground hover:text-background"><FiGlobe /></a>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
        <p>Built with ❤️ by Farzana Akbari</p>
        <p>© 2026 Farzana Akbari. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
