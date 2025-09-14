import axiosClient from "./axiosClient";

const authService = {
  register: async (userData) => {
    const response = await axiosClient.post("/auth/register", userData);
    return response.data;
  },
  login: async (credentials) => {
    const response = await axiosClient.post("/auth/login", credentials);
    return response.data;
  },
};

export default authService;