import { PackageSearch } from "lucide-react";

const EmptyProducts = () => {
  return (
    <div className="flex min-h-125 flex-col items-center justify-center rounded-2xl border border-dashed border-amazon-border bg-amazon-surface p-10">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amazon-bg">
        <PackageSearch size={42} className="text-amazon-orange" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-amazon-textDark">
        No Products Found
      </h2>

      <p className="mt-2 max-w-md text-center text-amazon-textLight">
        We couldn't find any products matching your search or filters. Try
        changing the search keyword or clearing the filters.
      </p>
    </div>
  );
};

export default EmptyProducts;
