import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout";
import AuthStore from "../../store/AuthStore";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
type FormData = {
  username: string;
  password: string;
};

export const SignIn: React.FC = observer(() => {
  const CLIENT_ID =
    "507280334434-9lr0l5ir0kq800mlmarlhvhup4v7sp4a.apps.googleusercontent.com";
  useEffect(() => {
    function start() {
      gapi.client.init({ clientId: CLIENT_ID, scope: "" });
    }
    gapi.load("client:auth2", start);
    usernameInputRef.current?.focus();
  }, []);

  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const onSuccess = () => {
    const accessToken = gapi.auth.getToken().access_token;
    localStorage.setItem("token", accessToken);
    console.log(accessToken);
  };
  const onLogoutSuccess = () => {
    localStorage.removeItem("token");
    console.log("logout success");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      // Call the login method from AuthStore and wait for it to complete
      const response = await AuthStore.login(formData);
      if (AuthStore.isLoggedIn) {
        const token = AuthStore.token;
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
    <MainLayout>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            das Bild
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={formData.username}
                    type="email"
                    name="username"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@email.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={formData.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  onClick={handleLogin}
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <GoogleLogin
                  clientId={CLIENT_ID}
                  buttonText="Sign in"
                  onSuccess={onSuccess}
                  onFailure={() => console.log("login fail")}
                  cookiePolicy="single_host_origin"
                  isSignedIn={true}
                />
                <GoogleLogout
                  clientId={CLIENT_ID}
                  buttonText="Sign out"
                  onLogoutSuccess={onLogoutSuccess}
                />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
});
