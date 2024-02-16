import axios from "axios";

const MAIN_API_URL = import.meta.env.VITE_BACKEND_URL
  ? `http://${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_PORT}`
  : "http://localhost-default:9000";

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
