import axios from "axios";


const MAIN_API_URL = "http://172.18.0.102:3000";
// const MAIN_API_URL = `http://${process.env.BACKEND_URL}:${process.env.PORT}`;


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