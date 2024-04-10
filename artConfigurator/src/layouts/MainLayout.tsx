import { ReactNode, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { Spinner } from "../components/Spinner";
const MainLayout = ({ children }: { children: ReactNode }) => {
  const [isClicked, setIsClicked] = useState(true);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [isLoader, setLoader] = useState(false);
  const location = useLocation();
  useEffect(() => {
    console.log("location", location);
    setLoader(true);
    const changeState = () => {
      setTimeout(() => {
        setLoader(false);
      }, 500);
    };
    changeState();
  }, [location]);
  return (
    <>
      <Header
        buttonRef={buttonRef}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
      <SideBar
        buttonRef={buttonRef}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
      {isLoader ? <Spinner /> : children}
    </>
  );
};

export default MainLayout;
