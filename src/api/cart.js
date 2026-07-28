import axiosInstance from "./axiosInstance";

export const addToCart = async (productId, quantity = 1) => {
  const { data } = await axiosInstance.post("/carts/items", {
    productId,
    quantity,
  });

  return data;
};
