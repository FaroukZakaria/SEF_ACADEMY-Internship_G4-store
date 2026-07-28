import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import Rating from "./Rating";
import DiscountBadge from "./DiscountBadge";
import FavoriteButton from "./FavoriteButton";
import { toast } from "react-toastify";
import { addToCart } from "../../api/cart";
import { addToWishlist, removeFromWishlist } from "../../api/wishlist";
import { Link } from "react-router-dom";
import useShopStore from "../../store/shopStore";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);

  const wishlist = useShopStore((s) => s.wishlist);
  const setWishlist = useShopStore((s) => s.setWishlist);
  const cart = useShopStore((s) => s.cart);
  const setCart = useShopStore((s) => s.setCart);

  const isFavorite = wishlist.some((item) => item._id === product._id);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login to add items to cart");
      return;
    }
    try {
      setLoading(true);

      const data = await addToCart(product._id);

      setCart(data);

      toast.success(data.message || "Added To Cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login to use wishlist");
      return;
    }
    try {
      setWishlistLoading(true);

      if (isFavorite) {
        const data = await removeFromWishlist(product._id);

        setWishlist((prev) => prev.filter((item) => (item._id || item) !== product._id));

        toast.success(data.message);
      } else {
        const data = await addToWishlist(product._id);
        setWishlist((prev) => [...prev, product]);

        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="overflow-hidden relative rounded-2xl border border-amazon-border bg-amazon-bg transition hover:-translate-y-1 hover:shadow-lg ">
      <div className="p-4">
        <Link to={`/products/${product._id}`} className="block cursor-pointer">
          <img
            src={product.images?.[0]?.url}
            alt={product.name}
            className="h-60 w-full object-contain transition duration-300 hover:scale-105"
          />
        </Link>

        <DiscountBadge
          price={product.price}
          discountPrice={product.discountPrice}
        />

        <FavoriteButton
          isFavorite={isFavorite}
          loading={wishlistLoading}
          onClick={handleWishlist}
        />
      </div>

      <div className="space-y-3 p-5 bg-amazon-surface">
        <span className="text-sm capitalize text-amazon-textLight">
          {product.category}
        </span>

        <h3 className="text-lg font-semibold text-amazon-textDark line-clamp-1">
          {product.name}
        </h3>

        <Rating rating={product.averageRating} />

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-amazon-textDark">
            ${product.discountPrice || product.price}
          </span>

          {product.discountPrice > 0 && (
            <span className="text-sm text-amazon-textLight line-through">
              ${product.price}
            </span>
          )}
        </div>

        <button
          disabled={loading || product.stock === 0}
          onClick={handleAddToCart}
          className={`flex w-full items-center justify-center gap-2 rounded-lg ${product.stock === 0 ? "bg-destructive/10 hover:bg-destructive/20 text-destructive" : "bg-amazon-orange hover:bg-amazon-orangeHover text-amazon-textDark"} py-2 font-semibold transition disabled:cursor-not-allowed`}
        >
          <ShoppingCart size={18} />
          {loading
            ? "Adding..."
            : product.stock === 0
              ? "Out Of Stock"
              : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
