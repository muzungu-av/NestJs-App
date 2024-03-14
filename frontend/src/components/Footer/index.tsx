import Gmail from "../../assets/icons/Gmail.svg";
import Instagram from "../../assets/icons/Instagram.svg";
import FaceBook from "../../assets/icons/Facebook.svg";
const Footer = () => {
  return (
    <footer className="bg-black  px-[5%] py-[5%]">
      <div className="flex justify-between">
        <h3 className="font-apple text-2xl text-white">Calvin Calva</h3>
        <div className="flex justify-between text-white gap-8 font-federo text-xl">
          <p>Über mich</p>
          <p>Gemälde</p>
          <p>Dibond</p>
          <p>Kontakte</p>
        </div>

        <div className="flex gap-4 ">
          <div className="flex justify-center rounded-sm items-center bg-white w-6 h-6">
            <img className="w-6 h-6" src={Gmail} />
          </div>
          <div className="flex justify-center rounded-sm items-center bg-white w-6 h-6">
            <img src={Instagram} />
          </div>
          <div className="flex justify-center rounded-sm items-center bg-white w-6 h-6">
            <img src={FaceBook} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
