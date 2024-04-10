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
    <div className="px-6 py-[5%] relative my-6">
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
              className="rounded-xl px-4 w-full h-[300px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <img
        src={SwiperArrow}
        className="rotate-180 top-[25%] sm:top-[30%] lg:top-[45%] left-0 absolute z-[100]  cursor-pointer scale-50 sm:scale-75 lg:scale-100"
        onClick={handlePrev}
      ></img>
      <img
        src={SwiperArrow}
        className="top-[25%] sm:top-[30%] lg:top-[45%] right-0 absolute z-[100] cursor-pointer scale-50 sm:scale-75 lg:scale-100"
        onClick={handleNext}
      ></img>
    </div>
  );
};
