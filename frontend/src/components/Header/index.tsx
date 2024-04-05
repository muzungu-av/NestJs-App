import { Link, useNavigate } from "react-router-dom";
import burger from "../../assets/icons/burger.svg";
import styles from "./header.module.scss";
import { useState, useEffect } from "react";

interface MenuLinkProps {
  to: string;
  children: React.ReactNode;
}
const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setPageWidth(window.innerWidth);
  };
  const navigate = useNavigate();

  const disableScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  };
  const enableScroll = () => {
    window.onscroll = function () {};
  };

  useEffect(() => {
    if (!isMenuOpen) enableScroll();
    else {
      disableScroll();
    }
  }, [isMenuOpen]);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      if (pageWidth > 1024) {
        setMenuOpen(false);
      }
    };
  }, [pageWidth]);
  const MenuLink: React.FC<MenuLinkProps> = ({ to, children }) => {
    return (
      <div>
        <Link to={to} className="menu-link">
          {children}
        </Link>
      </div>
    );
  };
  const BurgerMenu = () => {
    return (
      <div className={isMenuOpen ? styles.openedMenu : styles.menu}>
        <nav
          className={`navLinks font-federo  gap-6 text-xl flex flex-col items-center pt-10  `}
        >
          <MenuLink to="/about-me">Biografie</MenuLink>
          <MenuLink to="/paintings">Gemälde</MenuLink>
          <MenuLink to="/dibond">Atelier</MenuLink>
          <MenuLink to="/painting">Kopien</MenuLink>
          <MenuLink to="/contacts">Kontakte</MenuLink>
        </nav>
      </div>
    );
  };
  return (
    <>
      <div className="m-auto max-w-[1600px] h-24">
        <div className="header px-[5%] pt-[5%] pb-[3%] flex justify-between ">
          <h5
            onClick={() => {
              navigate("/");
            }}
            className="font-apple text-3xl cursor-pointer"
          >
            Calvin Calva
          </h5>
          <nav className="navLinks font-federo  gap-6 text-xl hidden lg:flex">
            <MenuLink to="/about-me">Biografie</MenuLink>
            <MenuLink to="/paintings">Gemälde</MenuLink>
            <MenuLink to="/dibond">Atelier</MenuLink>
            <MenuLink to="/painting">Kopien</MenuLink>
            <MenuLink to="/contacts">Kontakte</MenuLink>
          </nav>
          <img
            src={burger}
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="block lg:hidden"
          />
        </div>
      </div>
      <BurgerMenu />
    </>
  );
};
export default Header;
