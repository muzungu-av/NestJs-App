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
    <div className="header">
      <nav className="navLinks">
        <MenuLink to="/about-me">About me</MenuLink>
        <MenuLink to="/painting">Painting</MenuLink>
        <MenuLink to="/dibond">Dibond</MenuLink>
        <MenuLink to="/contacts">Contacts</MenuLink>
        {/* <MenuLink to="/login">Log in</MenuLink> */}
      </nav>
    </div>
  );
};
export default Header;
