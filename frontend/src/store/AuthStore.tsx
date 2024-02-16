import { makeAutoObservable } from "mobx";
import { AxiosInstance } from "../api/axiosInstance";

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
      const res = await AxiosInstance.post(
        import.meta.env.VITE_API_LOGIN
          ? import.meta.env.VITE_API_LOGIN
          : "empty_api_login_url",
        loginFormData
      );
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
