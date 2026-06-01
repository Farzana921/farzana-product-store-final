import { FiSearch, FiX } from "react-icons/fi";

interface Props { value: string; onChange: (v: string) => void; }

const SearchBar = ({ value, onChange }: Props) => (
  <div className="relative w-full">
    <FiSearch className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by product or category…"
      aria-label="Search products"
      className="w-full rounded-full border border-border bg-card py-4 pl-12 pr-12 text-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/30"
    />
    {value && (
      <button
        onClick={() => onChange("")}
        aria-label="Clear search"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-secondary"
      >
        <FiX className="h-4 w-4" />
      </button>
    )}
  </div>
);

export default SearchBar;
