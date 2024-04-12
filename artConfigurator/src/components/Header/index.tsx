import { useNavigate } from "react-router-dom";
import Burger from "../../assets/icons/burger.svg";

interface SideBar {
  setIsClicked: any;
  isClicked: boolean;
  buttonRef: any;
}
const Header = ({ setIsClicked, isClicked, buttonRef }: SideBar) => {
  const navigate = useNavigate();
  return (
    <div className="header px-[1%] py-[1%] flex justify-between ">
      <img
        src={Burger}
        ref={buttonRef}
        className={`transition-all duration-700 ${
          isClicked ? "rotate-[270deg]" : ""
        } `}
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
