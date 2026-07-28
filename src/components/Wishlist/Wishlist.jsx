
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../api/axiosInstance";
import WishlistEmptyState from "./WishlistEmptyState";
import WishlistItemCard from "./WishlistItemCard";
import useShopStore from "../../store/shopStore";

export default function Wishlist() {
  // const [items, setItems] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [addingToCartId, setAddingToCartId] = useState(null);

  const wishlist = useShopStore((s) => s.wishlist);
  const setWishlist = useShopStore((s) => s.setWishlist);
  const cart = useShopStore((s) => s.cart);
  const setCart = useShopStore((s) => s.setCart);
  const wishlistLoading = useShopStore((s) => s.wishlistLoading);

  // useEffect(() => {
  //   const fetchWishlist = async () => {
  //     try {
  //       setLoading(true);
  //       const { data } = await api.get("/wishlists/my");
  //       setItems(data.wishlist?.products || []);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchWishlist();
  // }, []);

  const handleRemove = async (productId) => {
    try {
      setRemovingId(productId);

      const { data } = await api.delete(`/wishlists/remove/${productId}`);

      setWishlist(data.wishlist?.products || []);
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed Removed");
    } finally {
      setRemovingId(null);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      setAddingToCartId(product._id);

      const response = await api.post("/carts/items", {
        productId: product._id,
        quantity: 1,
      });

      setCart(response.data);

      toast.success("Added to cart");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed Added");
    } finally {
      setAddingToCartId(null);
    }
  };

  if (wishlistLoading) {
    return (
      <div className="flex items-center justify-center p-40">
        <Loader2 className="w-8 h-8 animate-spin text-amazon-orange" />
      </div>
    );
  }

  return (
    <main className="flex-1">
      <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-amazon-textDark mb-8">
          My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <WishlistEmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <WishlistItemCard
                key={product._id}
                product={product}
                isAddingToCart={addingToCartId === product._id}
                isRemoving={removingId === product._id}
                onAddToCart={handleAddToCart}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}