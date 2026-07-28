const categories = [
  "electronics",
  "fashion",
  "home",
  "sports",
  "beauty",
];

const CategoryFilter = ({ category, setCategory, setPage, }) => {
  return (
    <div className="mb-8">

      <h3 className="mb-4 font-semibold text-amazon-textDark">
        Category
      </h3>

      <div className="space-y-3">

        <label className="flex items-center gap-2 cursor-pointer">

          <input
            type="radio"
            checked={category === ""}
            onChange={() => {
              setCategory("");
              setPage(1);
            }}
          />

          All

        </label>

        {categories.map((item) => (
          <label
            key={item}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              checked={category === item}
              onChange={() => {
                setCategory(item);
                setPage(1);
              }}
            />

            <span className="capitalize">
              {item}
            </span>

          </label>
        ))}

      </div>

    </div>
  );
};

export default CategoryFilter;