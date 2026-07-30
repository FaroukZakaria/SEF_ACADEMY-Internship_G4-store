import { useState } from "react";
import { toast } from "react-toastify";
import { addToWishlist, removeFromWishlist } from "../api/wishlist";
import useShopStore from "../store/shopStore";

const useWishlist = () => {
  const [loading, setLoading] = useState(false);

  const { wishlist, setWishlist } = useShopStore();

  const handleWishlist = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login to use wishlist");
      return;
    }

    const isFavorite = wishlist.some((item) => item._id === product._id);

    try {
      setLoading(true);

      if (isFavorite) {
        const data = await removeFromWishlist(product._id);

        setWishlist((prev) =>
          prev.filter((item) => (item._id || item) !== product._id),
        );

        toast.success(data.message);
      } else {
        const data = await addToWishlist(product._id);

        setWishlist((prev) => [...prev, product]);

        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {loading, wishlist, handleWishlist,};
};

export default useWishlist;
