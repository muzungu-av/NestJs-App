import React from "react";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { observable, action } from "mobx";
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
    this.token = "";
  }
  async login(loginFormData: { username: string; password: string }) {
    try {
      const res = await AxiosInstance.post("/api/auth/login", loginFormData);
      this.token = res.data.token;
      this.isLoggedIn = true;
    } catch (error: any) {
      this.error = error.response?.data?.message || "An error occurred";
    }
  }
}

export default new AuthStore();
