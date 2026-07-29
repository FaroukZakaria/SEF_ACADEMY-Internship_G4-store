import HeroSection from "../components/Home/HeroSection";
import CategorySection from "../components/Home/CategorySection";
import FeaturedProductsSection from "../components/Home/FeaturedProductsSection";
import HowItWorksSection from "../components/Home/HowItWorksSection";
import SubscriptionSection from "../components/Home/SubscriptionSection";
import initialCategories from "../components/Home/categories"
import { getProducts, getProductsSearch } from "../api/products";
import { useEffect, useState } from "react";

const Home = () => {
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);

        const data = await getProducts();

        setFeaturedProducts(data.products);

        getCategoryCount(data.products);
      } finally {
        setLoadingProducts(false);
      }
    }
    fetchProducts();
  }, []);

  const getCategoryCount = (products) => {
    const counts = {};

    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });

    setCategories((prev) =>
      prev.map((category) => ({
        ...category,
        count: counts[category.value] || 0,
      }))
    );
  };

  return (
    <div>

      {/* Hero Section */}
      <HeroSection />

      {/* Category Section */}
      <CategorySection categories={categories} loadingProducts={loadingProducts} />

      {/* Featured Products Section */}
      <FeaturedProductsSection 
        loadingProducts={loadingProducts} 
        featuredProducts={featuredProducts} 
      />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Subscription Section  */}
      <SubscriptionSection />

    </div>
  )
}

export default Home