import axiosInstance from "./axiosInstance";

export const getWishlist = async () => {
  const response = await axiosInstance.get("/wishlists/my");

  return response.data;
};

export const addToWishlist = async (productId) => {
  const response = await axiosInstance.post(`/wishlists/add/${productId}`);

  return response.data;
};

export const removeFromWishlist = async (productId) => {
  const response = await axiosInstance.delete(`/wishlists/remove/${productId}`);

  return response.data;
};
