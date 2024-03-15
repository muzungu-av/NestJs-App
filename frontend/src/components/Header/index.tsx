import { Link, useNavigate } from "react-router-dom";

interface MenuLinkProps {
  to: string;
  children: React.ReactNode;
}
const Header = () => {
  const navigate = useNavigate();
  const MenuLink: React.FC<MenuLinkProps> = ({ to, children }) => {
    return (
      <div>
        <Link to={to} className="menu-link">
          {children}
        </Link>
      </div>
    );
  };
  return (
    <div className="header px-[5%] pt-[5%] pb-[3%] flex justify-between ">
      <h5
        onClick={() => {
          navigate("/");
        }}
        className="font-apple text-3xl cursor-pointer"
      >
        Calvin Calva
      </h5>
      <nav className="navLinks font-federo flex gap-6 text-xl">
        <MenuLink to="/about-me">Biografie</MenuLink>
        <MenuLink to="/paintings">Gemälde</MenuLink>
        <MenuLink to="/dibond">Atelier</MenuLink>
        <MenuLink to="/painting">Kopien</MenuLink>
        <MenuLink to="/contacts">Kontakte</MenuLink>
      </nav>
    </div>
  );
};
export default Header;
