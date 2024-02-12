import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import AuthStore from "../store/AuthStore";

type FormData = {
  username: string;
  password: string;
};

const LoginPage: React.FC = observer(() => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      console.log(formData);
      // Call the login method from AuthStore and wait for it to complete
      const response = await AuthStore.login(formData);
      console.log(response);
      if (AuthStore.isLoggedIn) {
        const token = AuthStore.token;
        console.log(token);
        localStorage.setItem("token", token);
        navigate("/private");
      } else {
        console.error("Authentication error: Invalid response");
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div>
      <h2>Страница авторизации</h2>
      <form>
        <label>
          Имя пользователя:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Пароль:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Войти
        </button>
      </form>
    </div>
  );
});

export default LoginPage;
