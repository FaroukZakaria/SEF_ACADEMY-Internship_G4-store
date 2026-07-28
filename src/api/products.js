import axiosInstance from "./axiosInstance";

export const getProducts = async (params = {}) => {
  const response = await axiosInstance.get("/products", {
    params,
  });

  return response.data;
};