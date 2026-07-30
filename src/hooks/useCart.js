import { useState } from "react";
import { toast } from "react-toastify";
import { addToCart } from "../api/cart";
import useShopStore from "../store/shopStore";

const useCart = () => {
  const [loading, setLoading] = useState(false);
  const { setCart } = useShopStore();

  const handleAddToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login to add items to cart");
      return false;
    }

    try {
      setLoading(true);

      const data = await addToCart(productId, quantity);

      setCart(data);

      toast.success(data.message || "Added To Cart");

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {loading, handleAddToCart,};
};

export default useCart;