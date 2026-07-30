import { useEffect, useState } from "react";
import { getProductReviews } from "../../api/products";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import useReviews from "../../hooks/useReviews";

const ReviewsTab = ({ product }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [loading, setLoading] = useState(true);

  const { addLoading, deleteLoading, handleAddReview, handleDeleteReview } =
    useReviews({
      productId: product._id,
      setReviews,
      setAverageRating,
      setNumReviews,
    });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getProductReviews(product._id);

        setReviews(data.reviews);
        setAverageRating(data.averageRating);
        setNumReviews(data.numReviews);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [product._id]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-amazon-border bg-amazon-surface p-6">
        Loading reviews...
      </div>
    );
  }

  const currentUser = JSON.parse(localStorage.getItem("user"));
  
  return (
    <div className="space-y-8">
      <ReviewForm loading={addLoading} onSubmitReview={handleAddReview} />

      <div className="rounded-2xl border border-amazon-border bg-amazon-surface p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Reviews ({numReviews})</h3>

          <span className="text-amazon-textLight">
            ⭐ {averageRating.toFixed(1)}
          </span>
        </div>

        {reviews.length === 0 ? (
          <p className="text-center text-amazon-textLight">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                canDelete={
                  currentUser &&
                  (currentUser._id === review.user ||
                    currentUser.role === "admin")
                }
                onDelete={handleDeleteReview}
                deleteLoading={deleteLoading}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsTab;
