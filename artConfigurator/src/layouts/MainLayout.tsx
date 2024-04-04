import { ReactNode, useRef, useState } from "react";
import Header from "../components/Header/index";
import SideBar from "../components/SideBar";
const MainLayout = ({ children }: { children: ReactNode }) => {
  const [isClicked, setIsClicked] = useState(true);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  interface SideBar {
    setIsClicked: any;
    isClicked: boolean;
    buttonRef: any;
  }
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
      {children}
    </>
  );
};

export default MainLayout;
