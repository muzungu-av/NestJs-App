import { ReactNode, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import { Spinner } from "../components/Spinner";
const MainLayout = ({ children }: { children: ReactNode }) => {
  const [isClicked, setIsClicked] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [isLoader, setLoader] = useState(false);
  const location = useLocation();
  useEffect(() => {
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
      <SideBar
        buttonRef={buttonRef}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
      {isLoader ? (
        <Spinner />
      ) : (
        <div className="w-[75%] relative left-[25%]">{children}</div>
      )}
    </>
  );
};

export default MainLayout;
