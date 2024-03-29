import MainLayout from "../../Layouts/MainLayout";
import React from "react";
import { PaintingSlider } from "../../components/PaintingSlider";
import SmallPic from "../../assets/images/SmallPicture.jpg";
import BoatPic from "../../assets/images/BoatPicture.jpg";
import ProfilePic from "../../assets/images/ProfilePic.jpg";
import Play from "../../assets/icons/play.svg";
import SpringSlider from "../../components/SpringSlider/index";
import videoPic from "../../assets/images/videoPic.jpg";
import MainPageBg from "../../assets/images/MainPageBg.jpg";

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
              className="rounded-full w-[220px] h-[220px] mb-4 "
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
          <button className="btn-primary self-end">Mehr erfahren</button>
        </div>
      </div>
    );
  };
  const VideoSection: React.FC = () => {
    const VideoBlock = () => {
      return (
        <div className="flex justify-between  gap-10 px-[5%]">
          <div
            className="w-[600px] h-[300px] flex justify-center items-center"
            style={{ backgroundImage: `url(${videoPic})` }}
          >
            <div className="btn-play ">
              <img src={Play} />
            </div>
          </div>
          <div className="w-[50%] flex flex-col gap-4">
            <h3 className="font-italiana text-2xl ">Videoname</h3>
            <p className="font-federo text-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <button className="btn-primary	">Mehr erfahren</button>
          </div>
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
  const GallerySection: React.FC = () => {
    return (
      <div className="" style={{ backgroundImage: `url(${MainPageBg})` }}>
        <div className="py-[5%] px-[5%] "></div>
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
      <GallerySection />
      <PaintingSlider slides={slidesArr} />
      <ContactSection />
      <SpringSlider />
    </MainLayout>
  );
};
