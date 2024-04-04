import { makeAutoObservable } from "mobx";
import { post } from "../api/axiosInstance";

const sc = import.meta?.env?.VITE_SCHEME;
const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
const login = import.meta?.env?.VITE_API_LOGIN;
const URL = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

class AuthStore {
  error: string | null = null;
  formData: {
    username: string;
    password: string;
  };
  isLoggedIn: boolean = false;
  access_token: string;

  constructor() {
    makeAutoObservable(this);
    this.formData = {
      username: "",
      password: "",
    };
    this.access_token = localStorage.getItem("access_token") || "";
    this.isLoggedIn = !!this.access_token;
  }
  async login(loginFormData: { username: string; password: string }) {
    try {
      console.log("URL", URL);
      console.log(import.meta.env?.VITE_BACKEND_URL);
      const res = await post(URL, login, true, true, loginFormData); // это не тестировалось, нет страницы
      this.access_token = res.access_token;
      localStorage.setItem("access_token", this.access_token);
      this.isLoggedIn = true;
    } catch (error: any) {
      this.isLoggedIn = false;
      localStorage.setItem("access_token", "");
      console.error("Error during login:", error);
      this.error = error.response?.data?.message || "An error occurred";
    }
  }

  logout() {
    localStorage.removeItem("access_token");
    this.access_token = "";
    this.isLoggedIn = false;
  }
}

const authStore = new AuthStore();
export default authStore;
