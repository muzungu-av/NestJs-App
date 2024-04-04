import { useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import SwiperArrow from "../../assets/icons/SwiperArrow.svg";

type PaintingProps = {
  slides: string[];
};
type SwiperRef = any | null;

export const PaintingSlider = ({ slides }: PaintingProps) => {
  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;

    sliderRef?.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef?.current?.swiper.slideNext();
  }, []);

  return (
    <div className="px-6 relative">
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
            <img src={image} alt="slide" className="rounded-xl px-4" />
          </SwiperSlide>
        ))}
        {/* <img
          src={SwiperArrow}
          className="rotate-180 top-[40%] left-0 absolute z-[100] ml-4 cursor-pointer scale-75 lg:scale-100"
          onClick={handlePrev}
        ></img>
        <img
          src={SwiperArrow}
          className="top-[40%] right-0 absolute z-[100] mr-4 cursor-pointer scale-75 lg:scale-100"
          onClick={handleNext}
        ></img> */}
      </Swiper>
      <img
        src={SwiperArrow}
        className="rotate-180 top-[20%] sm:top-[30%] left-0 absolute z-[100] mr-12 cursor-pointer scale-50 sm:scale-75 lg:scale-100"
        onClick={handlePrev}
      ></img>
      <img
        src={SwiperArrow}
        className="top-[20%] sm:top-[30%] right-0 absolute z-[100] ml-12 cursor-pointer scale-50 sm:scale-75 lg:scale-100"
        onClick={handleNext}
      ></img>
    </div>
  );
};
