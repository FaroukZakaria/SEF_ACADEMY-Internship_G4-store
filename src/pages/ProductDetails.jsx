import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../api/products";
import ProductGallery from "../components/ProductDetails/ProductGallery";
import ProductInfo from "../components/ProductDetails/ProductInfo";
import ProductTabs from "../components/ProductDetails/ProductTabs";
import RelatedProducts from "../components/ProductDetails/RelatedProducts";
import { Loader2 } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductDetails(id);
        setProduct(data.product);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center p-40">
        <Loader2 className="w-12 h-12 animate-spin text-amazon-orange" />
      </div>
    );

  return (
    <div className="container mx-auto w-11/12 py-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} />

        <ProductInfo product={product} />
      </div>

      <ProductTabs product={product} />

      <RelatedProducts product={product} />
    </div>
  );
};

export default ProductDetails;
