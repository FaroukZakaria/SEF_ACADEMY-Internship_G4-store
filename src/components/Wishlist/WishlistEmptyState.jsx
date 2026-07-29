import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function WishlistEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="w-20 h-20 bg-amazon-bg rounded-full flex items-center justify-center mb-6">
        <Heart className="w-10 h-10 text-amazon-textLight" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-amazon-textDark mb-2">
        Your wishlist is empty
      </h3>
      <p className="text-sm text-amazon-textLight mb-6 text-center max-w-sm">
        Save items you love to your wishlist. They'll be waiting for you here.
      </p>
      <Link to="/shop">
        <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-amazon-orange text-white hover:bg-amazon-orangeHover active:bg-amazon-orangeHover px-4 py-2 text-sm">
          Browse Products
        </button>
      </Link>
    </div>
  );
}