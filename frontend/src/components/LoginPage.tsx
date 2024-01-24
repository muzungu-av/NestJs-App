import React, { useState } from "react";

interface FormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
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
      //todo CORS error
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        // Перенаправление на другую страницу после успешной авторизации
        window.location.replace("/private"); // Или используйте React Router для перенаправления
      } else {
        // Обработка ошибок
        console.error("Ошибка авторизации");
      }
    } catch (error) {
      console.error("Ошибка:", error);
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
};

export default LoginPage;
