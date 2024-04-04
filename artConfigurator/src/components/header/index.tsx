import { useNavigate } from "react-router-dom";
import Burger from "../../assets/icons/burger.svg";

interface SideBar {
  setIsClicked: any;
  isClicked: boolean;
  buttonRef: any;
}
const Header = ({ setIsClicked, isClicked, buttonRef }: SideBar) => {
  const navigate = useNavigate();
  //   const MenuLink: React.FC<MenuLinkProps> = ({ to, children }) => {
  //     return (
  //       <div>
  //         <Link to={to} className="menu-link">
  //           {children}
  //         </Link>
  //       </div>
  //     );
  //   };
  return (
    <div className="header px-[5%] py-[1%] flex justify-between ">
      <img
        src={Burger}
        ref={buttonRef}
        className={`${isClicked ? "rotate-90" : ""} `}
        onClick={() => setIsClicked(!isClicked)}
      />
      <h5
        onClick={() => {
          navigate("/biography");
        }}
        className="font-apple text-lg cursor-pointer"
      >
        Calvin Calva
      </h5>
    </div>
  );
};
export default Header;
