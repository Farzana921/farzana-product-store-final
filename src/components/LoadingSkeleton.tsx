interface Props { count?: number; view?: "grid" | "list" }

const LoadingSkeleton = ({ count = 8, view = "grid" }: Props) => {
  if (view === "list") {
    return (
      <div className="flex flex-col gap-5">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex gap-6 rounded-3xl border border-border bg-card p-5">
            <div className="skeleton-shimmer h-40 w-40 rounded-2xl" />
            <div className="flex-1 space-y-3 py-2">
              <div className="skeleton-shimmer h-3 w-24 rounded" />
              <div className="skeleton-shimmer h-6 w-2/3 rounded" />
              <div className="skeleton-shimmer h-3 w-full rounded" />
              <div className="skeleton-shimmer h-3 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-[20px] border border-border bg-card">
          <div className="skeleton-shimmer aspect-square w-full" />
          <div className="space-y-3 p-5">
            <div className="skeleton-shimmer h-3 w-20 rounded" />
            <div className="skeleton-shimmer h-5 w-3/4 rounded" />
            <div className="skeleton-shimmer h-5 w-1/3 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
