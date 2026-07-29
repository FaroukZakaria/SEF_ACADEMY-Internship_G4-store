import { Search, SlidersHorizontal } from "lucide-react";

const ShopHeader = ({ search, setSearch, onOpenFilters }) => {
  return (
    <div className="flex gap-3">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-amazon-textLight"
        />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-amazon-border bg-amazon-surface py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-amazon-orange"
        />
      </div>

      <button
        onClick={onOpenFilters}
        className="flex h-12 w-12 items-center justify-center rounded-xl border border-amazon-border bg-amazon-surface lg:hidden"
      >
        <SlidersHorizontal size={20} />
      </button>
    </div>
  );
};

export default ShopHeader;
