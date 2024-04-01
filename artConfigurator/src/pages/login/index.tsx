import ContactPic from "../../assets/images/contactPic.jpg";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import AuthStore from "../../store/AuthStore";
import { menuItemsWithPaths } from "../../components/menu/menuItems";
type FormData = {
  username: string;
  password: string;
};

const LogIn: React.FC = observer(() => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const first_rout = menuItemsWithPaths[0].path as string;

  const handleLogin = async () => {
    try {
      // Call the login method from AuthStore and wait for it to complete
      await AuthStore.login(formData);
      console.log("AuthStore.isLoggedIn");
      console.log(AuthStore.isLoggedIn);
      if (AuthStore.isLoggedIn) {
        const access_token = AuthStore.access_token;
        localStorage.setItem("access_token", access_token);
        navigate(first_rout);
      } else {
        console.error("Authentication error: Invalid response");
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div>
      <form className="py-[5%] px-[5%]" onSubmit={handleLogin}>
        <div className="flex flex-col justify-center gap-6">
          <h2 className="font-italiana text-6xl text-center">Calvin Calva</h2>
          <div className="border-t-4 border-black flex gap-10">
            <div
              className="w-[50%] px-[5%] py-[5%] bg-no-repeat bg-cover min-w-[560px] min-h-[360px]"
              style={{ backgroundImage: `url(${ContactPic})` }}
            ></div>
            <div className="w-[50%]">
              <h3 className="font-federo text-2xl py-10">Autorisierung</h3>
              <div className="flex flex-col gap-5 font-poppins text-sm font-medium">
                <div className="flex gap-10">
                  <div className="flex flex-col w-full">
                    <label htmlFor="username">Benutzername</label>
                    <input
                      className="border-t-0 border-x-0 border-b-[1px]"
                      type="text"
                      name="username"
                      onChange={handleInputChange}
                      value={formData.username}
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex gap-10">
                  <div className="flex flex-col w-full">
                    <label htmlFor="password">Passwort</label>
                    <input
                      className="border-t-0 border-x-0 border-b-[1px] "
                      type="password"
                      name="password"
                      required
                      placeholder="••••••••"
                      onChange={handleInputChange}
                      value={formData.password}
                    ></input>
                    {/* <button className="btn-primary" onClick={handleLogin}>
                      {" "}
                      Log in{" "}
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
});
export default LogIn;
