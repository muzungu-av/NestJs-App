import MainLayout from "../../Layouts/MainLayout";
import React from "react";
import { PaintingSlider } from "../../components/PaintingSlider";
import SmallPic from "../../assets/images/SmallPicture.jpg";
import BoatPic from "../../assets/images/BoatPicture.jpg";
import MainPageBg from "../../assets/images/MainPageBg.jpg";
import GalleryPic1 from "../../assets/images/galleryPic1.jpg";
import GalleryPic2 from "../../assets/images/galleryPic2.jpg";
import GalleryPic3 from "../../assets/images/galleryPic3.jpg";
import SitPic from "../../assets/images/SitPic.jpg";
import { Contacts } from "../Contacts";
import { AboutMe } from "../AboutMe";
import LonelyBoat from "../../assets/images/contactPic.jpg";

export const Main: React.FC = () => {
  const slidesArr = [SmallPic, SmallPic, SmallPic, SmallPic];

  const HeroSection: React.FC = () => {
    return (
      <div className="bg-[#F5F5F5]">
        <div className="py-[5%] px-[5%] flex justify-center gap-20 ">
          <div className="self-center">
            <img className=" border-[15px] border-[#240909]" src={SmallPic} />
          </div>
          <div>
            <img
              className=" border-[15px] border-[#240909]"
              src={GalleryPic2}
            />
          </div>
          <div className="flex flex-col justify-between">
            <img className=" border-[15px] border-[#240909]" src={SitPic} />
          </div>
        </div>
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

  return (
    <MainLayout>
      <HeroSection />
      <AboutMe />
      <GallerySection />
      <BeforeSliderSection />
      <PaintingSlider slides={slidesArr} />
      <Contacts />
    </MainLayout>
  );
};
