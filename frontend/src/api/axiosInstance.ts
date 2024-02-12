import axios from "axios";

const MAIN_API_URL = `http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}`;

export const AxiosInstance = axios.create({
  baseURL: MAIN_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_ACCESS_TOKEN",
  },
  withCredentials: true,
});

export const LogIn = async () => {
  const res = await AxiosInstance.post(`${process.env.REACT_APP_API_LOGIN}`);
};
