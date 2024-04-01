import { useNavigate } from "react-router-dom";

// interface MenuLinkProps {
//   to: string;
//   children: React.ReactNode;
// }
const Header = () => {
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
