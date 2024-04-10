import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Spinner} from "../../components/Spinner";
import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }: { children: ReactNode }) => {
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
      <Header />
      {isLoader ? (
        <Spinner />
      ) : (
        <>
          <div className="m-auto max-w-[1600px]">{children}</div>
          <Footer />
        </>
      )}
    </>
  );
};

export default MainLayout;
