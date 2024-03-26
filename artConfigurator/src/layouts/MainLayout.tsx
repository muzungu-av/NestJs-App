import { ReactNode } from "react";
import Header from "../components/index";
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
