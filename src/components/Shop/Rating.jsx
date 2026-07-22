import { Star } from "lucide-react";

const Rating = ({ rating = 0 }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            fill={star <= Math.round(rating) ? "#f59e0b" : "transparent"}
            color="#f59e0b"
          />
        ))}
      </div>

      <span className="ml-1 text-sm text-amazon-textLight">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
};

export default Rating;