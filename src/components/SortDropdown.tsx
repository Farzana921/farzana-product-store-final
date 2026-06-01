interface Props { value: string; onChange: (v: string) => void; }

const SortDropdown = ({ value, onChange }: Props) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    aria-label="Sort products"
    className="rounded-full border border-border bg-card px-5 py-3 text-sm outline-none focus:border-accent"
  >
    <option value="default">Sort: Featured</option>
    <option value="price-asc">Price: Low → High</option>
    <option value="price-desc">Price: High → Low</option>
    <option value="rating-desc">Highest Rating</option>
    <option value="name-asc">Name: A → Z</option>
  </select>
);

export default SortDropdown;
