
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import api from "./../../api/axios";
import WishlistEmptyState from "./WishlistEmptyState";
import WishlistItemCard from "./WishlistItemCard";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [addingToCartId, setAddingToCartId] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/wishlists/my");
        setItems(data.wishlist?.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      setRemovingId(productId);

      const { data } = await api.delete(`/wishlists/remove/${productId}`);

      setItems(data.wishlist?.products || []);
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

      await api.post("/carts/items", {
        productId: product._id,
        quantity: 1,
      });

      toast.success("Added to cart");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed Added");
    } finally {
      setAddingToCartId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
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

        {items.length === 0 ? (
          <WishlistEmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => (
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