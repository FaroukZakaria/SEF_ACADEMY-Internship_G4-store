import axiosInstance from "../api/axiosInstance"

export const getMyProfile = async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
};

export const logOut = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
}