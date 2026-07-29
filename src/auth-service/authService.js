import axiosInstance from "../api/axiosInstance"

export const getMyProfile = async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
};

export const logOut = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
}

export const loginUser = async (data) => {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", data.user.role);
    localStorage.setItem("token", data.token);
    return data;
}