import { Link } from "react-router-dom";

interface MenuLinkProps {
  to: string;
  children: React.ReactNode;
}
const Header = () => {
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
      <h5 className="font-apple text-3xl">Calvin Calva</h5>
      <nav className="navLinks font-federo flex gap-6 text-xl">
        <MenuLink to="/about-me">Biografie</MenuLink>
        <MenuLink to="/painting">Gemälde</MenuLink>
        <MenuLink to="/dibond">Atelier</MenuLink>
        <MenuLink to="/contacts">Kopien</MenuLink>
        <MenuLink to="/contacts">Kontakte</MenuLink>
      </nav>
    </div>
  );
};
export default Header;
