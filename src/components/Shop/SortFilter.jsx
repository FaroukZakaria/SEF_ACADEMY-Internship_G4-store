const SortFilter = ({ sort, setSort, setPage, }) => {
  return (
    <div>
      <h3 className="mb-4 font-semibold text-amazon-textDark">
        Sort By
      </h3>

      <select
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
          setPage(1);
        }}
        className="w-full rounded-lg border border-amazon-border bg-amazon-surface p-2 outline-none focus:ring-2 focus:ring-amazon-orange"
      >
        <option value="">Default</option>

        <option value="popular">
          Most Popular
        </option>

        <option value="rating">
          Top Rated
        </option>

        <option value="price_asc">
          Price: Low to High
        </option>

        <option value="price_desc">
          Price: High to Low
        </option>

        <option value="oldest">
          Oldest
        </option>
      </select>
    </div>
  );
};

export default SortFilter;