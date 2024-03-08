import MainLayout from "../../Layouts/MainLayout";
import React from "react";
import { PaintingSlider } from "../../components/PaintingSlider";
import SmallPic from "../../assets/images/SmallPicture.jpg";
import BoatPic from "../../assets/images/BoatPicture.jpg";
import ProfilePic from "../../assets/images/ProfilePic.jpg";
import Play from "../../assets/icons/Play.svg";
import SpringSlider from "../../components/SpringSlider/index";
export const Main: React.FC = () => {
  const slidesArr = [SmallPic, BoatPic, SmallPic];

  const AboutPainterSection: React.FC = () => {
    return (
      <div className="py-[5%] px-[5%]">
        <h3 className="font-italiana text-6xl	text-center">Biografie</h3>
        <div className="flex justify-around items-center ">
          <div className="">
            <img
              src={ProfilePic}
              className="rounded-full w-[300px] h-[300px] mb-4 "
            />
            <h4 className="font-apple text-center text-2xl">Calvin Calva</h4>
          </div>
          <div className="flex flex-col w-[50%] gap-8">
            <p className="font-federo">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
              quam provident illum sapiente harum recusandae, atque et quisquam
              consectetur cumque, nostrum, doloribus iure culpa consequuntur
              aspernatur. Pariatur voluptate doloribus deleniti?
            </p>
            <p className="font-apple w-[60%] self-center">
              “ Lorem Ipsum is simply dummy text of the printing and typesetting
              industry ”
            </p>
          </div>
        </div>
      </div>
    );
  };
  const VideoSection: React.FC = () => {
    const VideoBlock = () => {
      return (
        <div className="flex justify-between items-end px-[5%]">
          <div
            className="w-[600px] h-[300px] flex justify-center items-center"
            style={{ backgroundImage: `url(${SmallPic})` }}
          >
            <img src={Play} className="w-8 h-8" />
          </div>
          <button
            type="button"
            className="px-8 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Watch
          </button>
        </div>
      );
    };

    return (
      <div className="py-[5%] flex flex-col gap-6">
        <VideoBlock />
        <VideoBlock />
      </div>
    );
  };
  const ContactSection: React.FC = () => {
    return (
      <div className="py-[5%] px-[5%]">
        <div className="flex justify-between gap-6">
          <h2>Kontaktdaten</h2>
          <p className="w-[50%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            deserunt placeat, beatae accusantium iusto corrupti, nemo cupiditate
            delectus officiis vitae optio quibusdam consectetur nobis
            consequuntur, natus sunt amet expedita nostrum!
          </p>
        </div>
      </div>
    );
  };
  return (
    <MainLayout>
      <PaintingSlider slides={slidesArr} />
      <AboutPainterSection />
      <VideoSection />
      <PaintingSlider slides={slidesArr} />
      <ContactSection />
      <SpringSlider />
    </MainLayout>
  );
};
