import { useState } from "react";
import { toast } from "react-toastify";
import { addReview, deleteReview } from "../api/products";

const useReviews = ({
  productId,
  setReviews,
  setAverageRating,
  setNumReviews,
}) => {
  const [addLoading, setAddLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleAddReview = async (values) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login to write a review");
      return false;
    }

    try {
      setAddLoading(true);

      const data = await addReview(productId, values);

      setReviews((prev) => [data.review, ...prev]);
      setAverageRating(data.averageRating);
      setNumReviews(data.numReviews);

      toast.success(data.message);

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return false;
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      setDeleteLoading(true);

      const data = await deleteReview(productId, reviewId);

      setReviews((prev) => prev.filter((review) => review._id !== reviewId));

      setAverageRating(data.averageRating);
      setNumReviews(data.numReviews);

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    addLoading,
    deleteLoading,
    handleAddReview,
    handleDeleteReview,
  };
};

export default useReviews;
