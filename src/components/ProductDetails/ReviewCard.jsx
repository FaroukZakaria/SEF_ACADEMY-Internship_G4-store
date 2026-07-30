import { Trash2, User } from "lucide-react";
import Rating from "../Shop/Rating";

const ReviewCard = ({ review, canDelete, onDelete, deleteLoading }) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex gap-4 rounded-xl border border-amazon-border p-5">
      {/* Avatar */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amazon-bg">
        <User size={22} className="text-amazon-textLight" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-amazon-textDark">
              {review.username}
            </h4>

            <p className="text-sm text-amazon-textLight">{formattedDate}</p>
          </div>

          {canDelete && (
            <button
              disabled={deleteLoading}
              onClick={() => onDelete(review._id)}
              className="rounded-lg p-2 text-amazon-textLight transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        <div className="mt-3">
          <Rating rating={review.rating} />
        </div>

        <p className="mt-3 leading-7 text-amazon-textDark">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
