import { useSettings } from "@/context/SettingsContext";
import { titleCase } from "@/utils/helpers";

interface Props { categories: string[]; }

const FilterSidebar = ({ categories }: Props) => {
  const { state, dispatch } = useSettings();
  const list = ["all", ...categories];
  return (
    <aside className="lg:sticky lg:top-28">
      <h3 className="mb-5 text-xs uppercase tracking-[0.3em] text-muted-foreground">Categories</h3>
      <ul className="space-y-1">
        {list.map((c) => {
          const active = state.category === c;
          return (
            <li key={c}>
              <button
                onClick={() => dispatch({ type: "SET_CATEGORY", payload: c })}
                className={`w-full rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${
                  active ? "bg-foreground text-background" : "hover:bg-secondary"
                }`}
              >
                {c === "all" ? "All Products" : titleCase(c)}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => dispatch({ type: "RESET_SETTINGS" })}
        className="mt-6 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        Reset Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
