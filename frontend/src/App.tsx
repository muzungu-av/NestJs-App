import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { PublicPage } from "./components/PublicPage";
import { PrivatePage } from "./components/PrivatePage";
import LoginPage from "./components/LoginPage";
import { ReactNode } from "react";
import "./App.css";

interface MenuLinkProps {
  to: string;
  children: React.ReactNode;
}
const MenuLink: React.FC<MenuLinkProps> = ({ to, children }) => {
  return (
    <div>
      <Link to={to} className="menu-link">
        {children}
      </Link>
    </div>
  );
};

const AboutMe: React.FC = () => {
  return <div>About me content</div>;
};

const Painting: React.FC = () => {
  return <div>Painting content</div>;
};

const Dibond: React.FC = () => {
  return <div>Dibond content</div>;
};

const Contacts: React.FC = () => {
  return <div>Contacts content</div>;
};

const App: React.FC = () => {
  return (
    // className="header-menu"

    <Router>
      <div className="header">
        <nav className="navLinks">
          <MenuLink to="/about-me">About me</MenuLink>
          <MenuLink to="/painting">Painting</MenuLink>
          <MenuLink to="/dibond">Dibond</MenuLink>
          <MenuLink to="/contacts">Contacts</MenuLink>
          <MenuLink to="/login">Log in</MenuLink>
        </nav>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/about-me" element={<AboutMe />} />
          <Route path="/painting" element={<Painting />} />
          <Route path="/dibond" element={<Dibond />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
