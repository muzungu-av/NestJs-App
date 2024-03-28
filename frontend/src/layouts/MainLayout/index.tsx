import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="m-auto max-w-[1600px]">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
