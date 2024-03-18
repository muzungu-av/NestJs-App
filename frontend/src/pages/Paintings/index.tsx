import MainLayout from "../../Layouts/MainLayout";

import bgImg from "../../assets/images/GroupBg.jpg";
import boatPic from "../../assets/images/1.png";
import lighthousePic from "../../assets/images/2.png";
import seaPic from "../../assets/images/3.png";
import autumnPic from "../../assets/images/4.png";
import boatManPic from "../../assets/images/5.png";
import womanPic from "../../assets/images/6.png";
import cityPic from "../../assets/images/7.png";
import ShoppingCart from "../../assets/icons/ShoppingCart.svg";
export const Paintings: React.FC = () => {
  const text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type... ";

  const data = [
    {
      text,
      img: boatPic
    },
    {
      text,
      img: lighthousePic
    },
    {
      text,
      img: seaPic
    },
    {
      text,
      img: autumnPic
    },
    {
      text,
      img: boatManPic
    },
    {
      text,
      img: womanPic
    },
    {
      text,
      img: cityPic
    }
  ];
  const PaintingSection = ({ text, img }: { text: string; img: any }) => {
    return (
      <div className="  py-[5%] px-[5%]">
        <div className="flex justify-between gap-6 p-[30px]">
          <img
            src={img}
            style={{
              border: "15px solid #240909",
              borderRadius: "3px",
              boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.3)"
            }}
            className="flex flex-col gap-6 w-[40%] "
          />

          <div className=" relative flex flex-col gap-6 w-[60%]">
            <div className="font-italiana  text-2xl">Bildname</div>
            <p className="font-federo text-xl">{text}</p>{" "}
            <button
              type="button"
              className=" absolute h-[45px] bottom-0 right-0 w-[140px] font-federo rounded-[6px] text-#000 bg-[#FFEDCB]"
            >
              <div className=" flex justify-center items-center flex-row ">
                {" "}
                Kaufen <img className=" p-[5px]" src={ShoppingCart} />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      {" "}
      <div className="font-italiana  flex justify-center text-[64px] ">
        Gemälde
      </div>
      <div
        className="min-h-[335px] flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className=" text-white text-center font-apple text-2xl color-[#fff]">
          {" "}
          “ Die Farben sind die Tasten, die die <br />
          Künstler auf der Seele spielen ”
        </div>
      </div>
      {data.map((v: { text: string; img: any }) => (
        <PaintingSection text={v.text} img={v.img} />
      ))}
    </MainLayout>
  );
};
