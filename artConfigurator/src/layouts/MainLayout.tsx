import { ReactNode } from "react";
import Header from "../components/header/index";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
