import { useState } from "react";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import useCart from "../../hooks/useCart";

import useWishlist from "../../hooks/useWishlist";

const ProductActions = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { loading, handleAddToCart } = useCart();
  const { loading: wishlistLoading, wishlist, handleWishlist } = useWishlist();

  const isFavorite = wishlist.some((item) => (item._id) === product._id,);

  const handleCart = async () => {
    const success = await handleAddToCart(product._id, quantity);

    if (success) {
      setQuantity(1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quantity */}
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg border border-amazon-border">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-3 hover:bg-amazon-bg "
          >
            <Minus size={18} />
          </button>

          <span className="w-12 text-center font-semibold">{quantity}</span>

          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            className="p-3 hover:bg-amazon-bg"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Buttons */}
        <button
          disabled={loading || product.stock === 0}
          onClick={handleCart}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amazon-orange py-4 font-semibold text-amazon-textDark transition hover:bg-amazon-orangeHover disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingCart size={20} />

          {loading
            ? "Adding..."
            : product.stock === 0
              ? "Out Of Stock"
              : "Add To Cart"}
        </button>

        <button
          disabled={wishlistLoading}
          onClick={() => handleWishlist(product)}
          className={`rounded-xl border p-4 transition ${
            isFavorite
              ? "border-red-500 text-red-500"
              : "border-amazon-border hover:border-amazon-orange hover:text-amazon-orange"
          }`}
        >
          <Heart size={22} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
