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
  token: string;

  constructor() {
    makeAutoObservable(this);
    this.formData = {
      username: "",
      password: "",
    };
    this.token = localStorage.getItem("token") || "";
    this.isLoggedIn = !!this.token;
  }
  async login(loginFormData: { username: string; password: string }) {
    try {
      const res = await post(URL, login, true, true, loginFormData); // это не тестировалось, нет страницы
      this.token = res.data.token;
      localStorage.setItem("token", this.token);
      this.isLoggedIn = true;
    } catch (error: any) {
      this.error = error.response?.data?.message || "An error occurred";
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.token = "";
    this.isLoggedIn = false;
  }
}

export default new AuthStore();
