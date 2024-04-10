import { ReactNode, useRef, useState } from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [isClicked, setIsClicked] = useState(true);
  const buttonRef = useRef<HTMLDivElement | null>(null);

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
