import MainLayout from "../../Layouts/MainLayout";
import React from "react";
import { PaintingSlider } from "../../components/PaintingSlider";
import SmallPic from "../../assets/images/SmallPicture.jpg";
import BoatPic from "../../assets/images/BoatPicture.jpg";

import { Contacts } from "../Contacts";
import { AboutMe } from "../AboutMe";

export const Main: React.FC = () => {
  const slidesArr = [SmallPic, BoatPic, SmallPic];

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
      <PaintingSlider slides={slidesArr} />
      <AboutMe isMain={true} />
      <BeforeSliderSection />
      <PaintingSlider slides={slidesArr} />
      <Contacts />
    </MainLayout>
  );
};
