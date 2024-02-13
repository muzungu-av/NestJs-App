import axios from "axios";

const MAIN_API_URL = "http://localhost:3000";

const createAxiosInstance = () => {
  const token = localStorage.getItem("token") || "";
  return axios.create({
    baseURL: MAIN_API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};
export const AxiosInstance = createAxiosInstance();
