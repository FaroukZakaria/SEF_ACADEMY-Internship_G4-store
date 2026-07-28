const PriceFilter = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  setPage,
}) => {
  return (
    <div className="mb-8">

      <h3 className="mb-4 font-semibold text-amazon-textDark">
        Price Range
      </h3>

      <div className="grid grid-cols-2 gap-2">

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
            setPage(1);
          }}
          className="w-full rounded-lg border border-amazon-border p-2 outline-none focus:ring-2 focus:ring-amazon-orange"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setPage(1);
          }}
          className="w-full rounded-lg border border-amazon-border p-2 outline-none focus:ring-2 focus:ring-amazon-orange"
        />

      </div>

    </div>
  );
};

export default PriceFilter;