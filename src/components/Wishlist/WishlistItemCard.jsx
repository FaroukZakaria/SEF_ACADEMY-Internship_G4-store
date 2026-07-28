import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Loader2 } from "lucide-react";

export default function WishlistItemCard({
  product,
  isAddingToCart,
  isRemoving,
  onAddToCart,
  onRemove,
}) {
  const id = product._id;
 const hasDiscount =
  product.discountPrice > 0 && product.discountPrice < product.price;
    const displayPrice = hasDiscount ? product.discountPrice : product.price;
  const imageUrl = product.images?.[0]?.url;

  return (
    <div className="bg-amazon-surface rounded-xl border border-amazon-border overflow-hidden">
      <Link className="block" to={`/products/${id}`}>
        <div className="aspect-square overflow-hidden bg-amazon-bg">
          <img
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            src={imageUrl}
          />
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${id}`}>
          <h3 className="text-sm font-medium text-amazon-textDark line-clamp-2 mb-2 hover:text-amazon-orange">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-amazon-orange">
            EGP&nbsp;{displayPrice}
          </span>
          {hasDiscount && (
            <span className="text-sm text-amazon-textLight line-through">
              EGP&nbsp;{product.price}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onAddToCart(product)}
            disabled={isAddingToCart || product.stock === 0}
            className={`disabled:cursor-not-allowed flex-1 py-2 ${product.stock === 0 ? "bg-destructive/20 hover:bg-destructive/40 text-destructive" : "bg-amazon-orange hover:bg-amazon-orangeHover text-white"} text-sm font-medium rounded-lg flex items-center justify-center gap-2 disabled:opacity-80`}
          >
            {isAddingToCart ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
           {product.stock === 0
              ? "Out Of Stock"
              : "Add To Cart"}
          </button>

          <button
            onClick={() => onRemove(id)}
            disabled={isRemoving}
            className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 disabled:opacity-50"
          >
            {isRemoving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}