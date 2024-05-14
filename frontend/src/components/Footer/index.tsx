import Gmail from "../../assets/icons/Gmail.svg";
import Instagram from "../../assets/icons/Instagram.svg";
import FaceBook from "../../assets/icons/Facebook.svg";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-black ">
      <div className="px-[5%] py-[5%] m-auto  max-w-[1600px]">
        <div className="flex justify-between gap-10 flex-col lg:flex-row">
          <h3 className="font-apple text-2xl text-white cursor-pointer">
            Calvin Calva
          </h3>
          <div className="flex flex-col lg:flex-row justify-between text-white gap-8 font-federo text-xl ">
            <p className="cursor-pointer" onClick={() => navigate("/bio")}>
              Biografie
            </p>
            <p
              className="cursor-pointer"
              onClick={() => navigate("/paintings")}
            >
              Gemälde
            </p>
            <p className="cursor-pointer" onClick={() => navigate("/dibond")}>
              Atelier
            </p>
            <p className="cursor-pointer" onClick={() => navigate("/kopien")}>
              Kopien
            </p>
            <p className="cursor-pointer" onClick={() => navigate("/contacts")}>
              Kontakte
            </p>
          </div>

          <div className="flex gap-4 ">
            <div className="flex justify-center rounded-sm items-center bg-white w-6 h-6 cursor-pointer">
              <img className="w-6 h-6" src={Gmail} />
            </div>
            <div className="flex justify-center rounded-sm items-center bg-white w-6 h-6 cursor-pointer">
              <img src={Instagram} />
            </div>
            <div className="flex justify-center rounded-sm items-center bg-white w-6 h-6 cursor-pointer">
              <img src={FaceBook} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
