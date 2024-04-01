import { ReactNode } from "react";
import Header from "../components/header/index";
import { useNavigate } from "react-router";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="fixed top-0 pt-[5%] left-0 h-full w-64 bg-[#FFEDCB] border-r z-50">
        {" "}
        <div className="font-italiana text-3xl m-4">Seitenbearbeitung</div>
        <ul className="list-none p-0 m-0">
          <li className="flex items-center p-2 font-federo text-xl m-2  cursor-pointer">
            <span onClick={() => navigate("/biography")}> ◼️ Biographie</span>
          </li>
          <li className="flex items-center p-2 ont-federo text-xl m-2 cursor-pointer">
            <span onClick={() => navigate("/biography")}> ◼️ Gemälde</span>
          </li>
          <li className="flex items-center p-2 ont-federo text-xl m-2 cursor-pointer">
            <span onClick={() => navigate("/paintings-kopien")}>
              {" "}
              ◼️ Kopien
            </span>
          </li>{" "}
          <li className="flex items-center p-2 ont-federo text-xl m-2 cursor-pointer">
            <span onClick={() => navigate("/videos")}> ◼️ Videos</span>
          </li>
        </ul>
      </div>
      <div className="ml-64">{children}</div>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
