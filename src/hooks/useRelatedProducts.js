import { useEffect, useState } from "react";
import { getRelatedProducts } from "../api/products";

const useRelatedProducts = (category, productId) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getRelatedProducts(category, productId);

        setProducts(data);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, productId]);

  return {
    products,
    loading,
  };
};

export default useRelatedProducts;
