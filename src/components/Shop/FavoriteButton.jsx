import { Heart } from "lucide-react";

const FavoriteButton = ({ isFavorite, loading, onClick }) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110 disabled:opacity-50"
    >
      <Heart
        size={20}
        className={`${isFavorite ? "fill-red-500 text-red-500" : "text-amazon-textDark"} hover:text-destructive`}
      />
    </button>
  );
};

export default FavoriteButton;
