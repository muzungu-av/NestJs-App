import { useState, useRef, useEffect, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./painting.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import SwiperArrow from "../../assets/icons/SwiperArrow.svg";

type PaintingProps = {
  slides: string[];
};

export const PaintingSlider = ({ slides }: PaintingProps) => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef?.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef?.current?.swiper.slideNext();
  }, []);

  return (
    <Swiper
      ref={sliderRef}
      centeredSlides={false}
      centerInsufficientSlides={true}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      effect="slide"
      speed={1000}
      loop={true}
      allowTouchMove
      slidesPerView={3}
      modules={[FreeMode, Pagination, Autoplay]}
      className="mySwiper"
    >
      {slides.map((image: string, index: number) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt="slide"
            className="border-[15px] border-[#240909]"
          />
        </SwiperSlide>
      ))}
      <img
        src={SwiperArrow}
        className="rotate-180 top-[40%] left-0 absolute z-[100] ml-4 cursor-pointer"
        onClick={handlePrev}
      ></img>
      <img
        src={SwiperArrow}
        className="top-[40%] right-0 absolute z-[100] mr-4 cursor-pointer"
        onClick={handleNext}
      ></img>
    </Swiper>
  );
};
