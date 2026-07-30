import ProductGrid from "../Shop/ProductGrid";
import useRelatedProducts from "../../hooks/useRelatedProducts";

const RelatedProducts = ({ product }) => {
  const { products, loading } = useRelatedProducts(
    product.category,
    product._id
  );

  if (loading) return null;

  if (!products.length) return null;

  return (
    <section className="mt-10">
      <h2 className="mb-6 text-2xl font-bold text-amazon-textDark">
        Related Products
      </h2>

      <ProductGrid products={products} />
    </section>
  );
};

export default RelatedProducts;