import MainLayout from "../../layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { PaintingSlider } from "../../components/PaintingSlider";
import SmallPic from "../../assets/images/SmallPicture.jpg";
import GalleryPic2 from "../../assets/images/galleryPic2.jpg";
import SitPic from "../../assets/images/SitPic.jpg";
import { Contacts } from "../../components/Contacts";
import { AboutMe } from "../AboutMe";
import { Get } from "../../api/axiosInstance";
import { BeforeSlider } from "../../components/BeforeSlider";
export const Main: React.FC = () => {
  const sc = import.meta?.env?.VITE_SCHEME;
  const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
  const ai = import.meta?.env?.VITE_API_IMAGE;
  const BACKEND_API =
    sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

  const [_paintings, setPaintings] = useState<any>();

  const getPictures = async () => {
    try {
      const response = await Get(undefined, BACKEND_API, `${ai}/`, false);
      setPaintings(response.data);
    } catch (error) {
      console.error("Error fetching paintings:", error);
    } finally {
    }
  };
  useEffect(() => {
    getPictures();
  }, []);

  const HeroSection: React.FC = () => {
    return (
      <div className="bg-[#F5F5F5] mt-10">
        <div className="py-[5%] px-[5%] flex flex-col items-center md:flex-row justify-center gap-4 lg:gap-20 ">
          <div className="self-center">
            <img
              className="border-[15px] border-[#240909] "
              src={SmallPic}
            />
          </div>
          <div>
            <img
              className="border-[15px] border-[#240909] "
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

  return (
    <MainLayout>
      <HeroSection />
      <AboutMe isMain={true} />
      <BeforeSlider />
      <PaintingSlider />
      <Contacts />
    </MainLayout>
  );
};
