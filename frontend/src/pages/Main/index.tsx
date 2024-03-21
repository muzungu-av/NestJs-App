import MainLayout from "../../layouts/MainLayout";
import React from "react";
import { PaintingSlider } from "../../components/PaintingSlider";
import SmallPic from "../../assets/images/SmallPicture.jpg";
import GalleryPic2 from "../../assets/images/galleryPic2.jpg";
import SitPic from "../../assets/images/SitPic.jpg";
import { Contacts } from "../../components/Contacts";
import { AboutMe } from "../AboutMe";
import { GallerySection } from "../../components/GallerySection";
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
      <GallerySection />
      <AboutMe isMain={true} />
      <BeforeSliderSection />
      <PaintingSlider slides={slidesArr} />
      <Contacts />
    </MainLayout>
  );
};
