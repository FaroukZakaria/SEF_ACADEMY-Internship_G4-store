import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ShopHeader from "../components/Shop/ShopHeader";
import ShopSidebar from "../components/Shop/ShopSidebar";
import ShopSkeleton from "../components/Shop/ShopSkeleton";
import EmptyProducts from "../components/Shop/EmptyProducts";
import ProductGrid from "../components/Shop/ProductGrid";
import { getWishlist } from "../api/wishlist";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [wishlist, setWishlist] = useState([]);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");

  const [openFilters, setOpenFilters] = useState(false);

  const fetchProducts = async (params) => {
    try {
      setLoading(true);

      const data = await getProducts(params);

      setProducts(data.products);
      setTotalPages(data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchProducts({
      page,
      limit: 12,
      search: debouncedSearch,
      category,
      minPrice,
      maxPrice,
      sort,
    });
  }, [page, debouncedSearch, category, minPrice, maxPrice, sort]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();

        setWishlist(data.wishlist.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-amazon-bg ">
      <div className="container mx-auto lg:w-11/12 px-5 py-8">
        <ShopHeader
          search={search}
          setSearch={setSearch}
          onOpenFilters={() => setOpenFilters(true)}
        />

        <div className="mt-8 flex gap-8">
          <ShopSidebar
            open={openFilters}
            setOpen={setOpenFilters}
            category={category}
            setCategory={setCategory}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sort={sort}
            setSort={setSort}
          />

          <div className="flex-1 min-w-0">
            {loading ? (
              <ShopSkeleton />
            ) : products.length === 0 ? (
              <EmptyProducts />
            ) : (
              <ProductGrid
                products={products}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            )}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded-lg border border-amazon-border bg-amazon-surface px-5 py-2 disabled:opacity-40"
            >
              Prev
            </button>

            <span className="flex items-center text-amazon-textDark">
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-lg border border-amazon-border bg-amazon-surface px-5 py-2 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
