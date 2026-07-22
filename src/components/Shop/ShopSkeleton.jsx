const ShopSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-amazon-border bg-amazon-surface"
        >
          <div className="shimmer h-60 w-full" />

          <div className="space-y-4 p-5">
            <div className="shimmer h-4 w-24 rounded" />

            <div className="shimmer h-5 w-full rounded" />

            <div className="shimmer h-5 w-4/5 rounded" />

            <div className="shimmer h-4 w-20 rounded" />

            <div className="flex gap-3">
              <div className="shimmer h-6 w-20 rounded" />

              <div className="shimmer h-6 w-14 rounded" />
            </div>

            <div className="shimmer h-11 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopSkeleton;
