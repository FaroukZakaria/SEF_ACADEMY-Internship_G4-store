import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { reviewSchema } from "../../schema/reviewSchema";

const ReviewForm = ({ onSubmitReview, loading }) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const rating = useWatch({ control, name: "rating", defaultValue: 0 });

  useEffect(() => {
    register("rating", { valueAsNumber: true });
  }, [register]);

  const onSubmit = async (values) => {
    const success = await onSubmitReview(values);

    if (success) {
      reset();
      setHoveredStar(0);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-amazon-border bg-amazon-surface p-6"
    >
      <h3 className="mb-5 text-xl font-semibold">Write a Review</h3>

      {/* Rating */}
      <div className="mb-5 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            onClick={() =>
              setValue("rating", star, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <Star
              size={28}
              className={`transition ${
                star <= (hoveredStar || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      {errors.rating && (
        <p className="mb-3 text-sm text-red-500">{errors.rating.message}</p>
      )}

      {/* Comment */}
      <textarea
        rows={2}
        placeholder="Share your thoughts..."
        {...register("comment")}
        className="w-full rounded-xl border border-amazon-border p-4 outline-none transition focus:border-amazon-orange"
      />

      {errors.comment && (
        <p className="mt-2 text-sm text-red-500">{errors.comment.message}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 rounded-xl bg-amazon-orange px-6 py-3 font-semibold text-amazon-textDark transition hover:bg-amazon-orangeHover disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
