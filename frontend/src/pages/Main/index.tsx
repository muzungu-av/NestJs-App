import MainLayout from "../../Layouts/MainLayout";
import React from "react";
import { PaintingSlider } from "../../components/PaintingSlider";
import SmallPic from "../../assets/images/SmallPicture.jpg";
import BoatPic from "../../assets/images/BoatPicture.jpg";
import ProfilePic from "../../assets/images/ProfilePic.jpg";
import play from "../../assets/icons/Play.svg";
import SpringSlider from "../../components/SpringSlider/index";
import videoPic from "../../assets/images/videoPic.jpg";
import videoPic2 from "../../assets/images/videoPic2.jpg";
import MainPageBg from "../../assets/images/MainPageBg.jpg";
import GalleryPic1 from "../../assets/images/galleryPic1.jpg";
import GalleryPic2 from "../../assets/images/galleryPic2.jpg";
import GalleryPic3 from "../../assets/images/galleryPic3.jpg";
import ContactPic from "../../assets/images/contactPic.jpg";
import Gmail from "../../assets/icons/Gmail.svg";
import Instagram from "../../assets/icons/Instagram.svg";
import FaceBook from "../../assets/icons/Facebook.svg";

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
    const VideoBlock = ({ picture }: { picture: string }) => {
      return (
        <div className="flex justify-between  gap-10 px-[5%]">
          <div
            className="w-[600px] h-[300px] flex justify-center items-center"
            style={{ backgroundImage: `url(${picture})` }}
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
        <VideoBlock picture={videoPic} />
        <VideoBlock picture={videoPic2} />
      </div>
    );
  };
  const GallerySection: React.FC = () => {
    return (
      <div className="" style={{ backgroundImage: `url(${MainPageBg})` }}>
        <div className="py-[5%] px-[5%] flex justify-center gap-20 ">
          <div className="self-end">
            <img
              className=" border-[15px] border-[#240909]"
              src={GalleryPic1}
            />
          </div>
          <div>
            <img
              className=" border-[15px] border-[#240909]"
              src={GalleryPic2}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <h3 className="font-federo text-5xl whitespace-nowrap">
                Meine Galerie
              </h3>
              <button className="btn-primary">Mehr erfahren</button>
            </div>
            <img
              className=" border-[15px] border-[#240909]"
              src={GalleryPic3}
            />
          </div>
        </div>
      </div>
    );
  };
  const BeforeSliderSection: React.FC = () => {
    return (
      <div className="py-[5%] px-[5%] flex flex-col items-center gap-10">
        <h3 className="font-italiana text-6xl">Dibond</h3>
        <p className="font-federo text-xl">
          Die Technologie des Kopierens von Gemälden auf Dibond. "Dibond" ist
          ein Markenzeichen von Verbundwerkstoffen, das in verschiedenen
          industriellen und künstlerischen Anwendungen verwendet wird. Dibond
          ist eine Verbundplatte, die aus zwei dünnen Aluminiumschichten
          besteht, zwischen denen sich eine Schicht aus Polyethylen befindet.
          Dieses Material ist leicht, langlebig und umweltfreundlich.
        </p>
      </div>
    );
  };
  const ContactSection: React.FC = () => {
    return (
      <div className="py-[5%] px-[5%]">
        <div className="flex flex-col justify-center gap-6">
          <h2 className="font-italiana text-6xl">Kontaktdaten</h2>
          <div className="border-t-4 border-black flex gap-10">
            <div
              className="w-[50%] px-[5%] py-[5%] bg-no-repeat bg-cover"
              style={{ backgroundImage: `url(${ContactPic})` }}
            >
              <div className="flex flex-col items-start px-[5%] mb-8">
                <div className="bg-primary-100 rounded-full w-[120px] h-[120px] mb-4 " />
                <h4 className="font-apple text-center text-base text-white">
                  Calvin Calva
                </h4>
              </div>
              <div className="flex gap-5 px-[5%] font-federo text-base">
                <div className="flex justify-center gap-4 rounded-[13px] bg-primary-100 w-32 h-12 items-center ">
                  <p>E-mail</p>
                  <img src={Gmail} />
                </div>

                <div className="flex justify-center gap-4 rounded-[13px] bg-primary-100 w-12 h-12 items-center ">
                  <img src={Instagram} />
                </div>

                <div className="flex justify-center gap-4 rounded-[13px] bg-primary-100 w-12 h-12 items-center ">
                  <img src={FaceBook} />
                </div>
              </div>
            </div>
            <div className="w-[50%]">
              <h3 className="font-federo text-2xl py-10">
                Oder schreiben Sie mir
              </h3>
              <div className="flex flex-col gap-5 font-poppins text-sm font-medium">
                <div className="flex gap-10">
                  <div className="flex flex-col w-[50%]">
                    <label htmlFor="name">Name</label>
                    <input
                      className="border-t-0 border-x-0 border-b-[1px]"
                      type="text"
                      name="name"
                    ></input>
                  </div>
                  <div className="flex flex-col w-[50%]">
                    <label htmlFor="vorname">Vorname</label>
                    <input
                      className="border-t-0 border-x-0 border-b-[1px]"
                      type="text"
                      name="vorname"
                    ></input>
                  </div>
                </div>
                <div className="flex gap-10">
                  <div className="flex flex-col w-full">
                    <label htmlFor="email">Email</label>
                    <input
                      className="border-t-0 border-x-0 border-b-[1px]"
                      type="text"
                      name="email"
                    ></input>
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="nummer">Handy Nummer</label>
                    <input
                      className="border-t-0 border-x-0 border-b-[1px]"
                      type="text"
                      name="nummer"
                    ></input>
                  </div>
                </div>
                <div className="flex gap-10">
                  <div className="flex flex-col w-full">
                    <label htmlFor="nachricht">Nachricht</label>
                    <input
                      className="border-t-0 border-x-0 border-b-[1px] "
                      type="text"
                      name="nachricht"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      <BeforeSliderSection />
      <PaintingSlider slides={slidesArr} />
      <ContactSection />
    </MainLayout>
  );
};
