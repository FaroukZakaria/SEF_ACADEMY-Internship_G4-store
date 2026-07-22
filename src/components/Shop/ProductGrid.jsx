import ProductCard from "./ProductCard";

const ProductGrid = ({ products, wishlist, setWishlist }) => {
  return (
    <div className="grid items-start gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          wishlist={wishlist}
          setWishlist={setWishlist}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
