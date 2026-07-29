import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import SortFilter from "./SortFilter";
import { X } from "lucide-react";

const ShopSidebar = ({
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
  open,
  setOpen,
  setPage,
}) => {
  const clearFilters = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    setPage(1);
  };

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-80 bg-amazon-surface p-6 shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"} lg:static lg:h-fit lg:w-70 lg:shrink-0 lg:translate-x-0 lg:rounded-2xl lg:border lg:border-amazon-border lg:shadow-sm`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-amazon-textDark">
            Filters
          </h2>
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X size={22} />
          </button>
        </div>

        <CategoryFilter category={category} setCategory={setCategory} setPage={setPage} />

        <PriceFilter
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          setPage={setPage}
        />

        <SortFilter sort={sort} setSort={setSort} setPage={setPage}/>

        <button
          onClick={clearFilters}
          className="mt-6 w-full rounded-lg bg-amazon-orange py-3 font-medium text-amazon-textDark transition hover:bg-amazon-orangeHover"
        >
          Clear Filters
        </button>
      </aside>
    </>
  );
};

export default ShopSidebar;
