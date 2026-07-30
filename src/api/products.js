import axiosInstance from "./axiosInstance";

export const getProducts = async (params = {}) => {
  const response = await axiosInstance.get("/products", {
    params,
  });

  return response.data;
};

export const getProductsSearch = async (params = {}) => {
  const response = await axiosInstance.get("/products/search", {
    params,
  });

  return response.data;
};

export const getProductDetails = async (id) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data;
};

export const getProductReviews = async (id) => {
  const { data } = await axiosInstance.get(`/products/${id}/reviews`);
  return data;
};

export const addReview = async (id, review) => {
  const { data } = await axiosInstance.post(
    `/products/${id}/reviews`,
    review
  );

  return data;
};

export const deleteReview = async (productId, reviewId) => {
  const { data } = await axiosInstance.delete(
    `/products/${productId}/reviews/${reviewId}`
  );

  return data;
};

export const getRelatedProducts = async (category, productId) => {
  const { data } = await axiosInstance.get("/products", {
    params: {
      category,
      limit: 5,
    },
  });

  return data.products.filter(
    (item) => item._id !== productId
  );
};