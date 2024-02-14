import MainLayout from "../../Layouts/MainLayout";
import Slide from "../../assets/images/slide.jpg";
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./painting.module.scss";
import ProfilePic from "../../assets/images/ProfilePic.jpg";
import mobileAppBg from "../../assets/images/MobileAppBg.jpg";
import { PaintingSlider } from "../../components/PaintingSlider";

const slidesArr = [Slide, mobileAppBg, ProfilePic];

type PaintingProps = {
  slides: string[];
};

export const AboutPainting: React.FC = () => {
  const PaintSlider = ({ slides }: PaintingProps) => {
    const slider1 = useRef<Slider | null>(null);
    const slider2 = useRef<Slider | null>(null);
    const [slider1Index, setSlider1Index] = useState<number>(0);
    const [slider2Index, setSlider2Index] = useState<number>(0);
    const topSliderSettings = {
      infinite: true,
      dots: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: (_current: number, next: number) => {
        // Synchronize slider2 with slider1
        setSlider2Index(next);
        slider2.current?.slickGoTo(next);
      },
    };
    const bottomSliderSettings = {
      dots: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: Math.floor(slides.length / 2), // Select the center slide initially
      beforeChange: (_current: number, next: number) => {
        // Synchronize slider1 with slider2
        setSlider1Index(next);
        slider1.current?.slickGoTo(next);
      },
    };

    return (
      <div className="w-[500px]">
        <div className={styles["slider-container"]}>
          <Slider
            ref={slider1}
            {...topSliderSettings}
            initialSlide={slider1Index}
            afterChange={setSlider1Index}
          >
            {slides.map((image: string, index: number) => {
              return (
                <div
                  className="px-2 outline-none"
                  onClick={() => slider2.current?.slickGoTo(index)}
                >
                  <img src={image} className="w-[500px] h-[300px]" />
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="w-[100%]">
          <div className={styles["slider-container"]}>
            <Slider
              ref={slider2}
              {...bottomSliderSettings}
              initialSlide={slider2Index}
              afterChange={setSlider2Index}
            >
              {slides.map((image: string, index: number) => {
                return (
                  <div
                    className="px-2 translate-x-[200px] outline-none"
                    onClick={() => slider1.current?.slickGoTo(index)}
                  >
                    <img src={image} className="w-[100px] h-[100px]" />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    );
  };
  const PaintingSection = () => {
    return (
      <div className="py-[5%]">
        <div className="flex gap-[50px]">
          <PaintSlider slides={slidesArr} />
          <div className="w-[30%] flex flex-col gap-6">
            <h3>Paining Name</h3>
            <p>Painting Description</p>
            <button
              type="button"
              className="px-8 py-2.5 w-24 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <MainLayout>
      <PaintingSection />
      <PaintingSlider slides={slidesArr} />
    </MainLayout>
  );
};
