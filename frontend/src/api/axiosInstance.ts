import axios from "axios";

// const MAIN_API_URL = "http://172.18.0.102:3000";
const MAIN_API_URL = `http://${process.env.BACKEND_URL}:${process.env.PORT}`;

console.log("NODE_ENV");
console.log(process.env.NODE_ENV);
console.log("BACKEND_URL");
console.log(process.env.BACKEND_URL);

// NODE_ENV;
// production;
// BACKEND_URL;

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
  const res = await AxiosInstance.post(`${process.env.API_LOGIN}`);
  // const res = await AxiosInstance.post("/api/auth/login");
};
