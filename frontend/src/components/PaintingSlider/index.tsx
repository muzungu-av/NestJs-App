import { useRef, useCallback, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import SwiperArrow from "../../assets/icons/SwiperArrow.svg";
import { Get } from "../../api/axiosInstance";
type Paintings = {
  miniImageUrl: string;
  uid: string;
}[];
const sc = import.meta?.env?.VITE_SCHEME;
const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
const ai = import.meta?.env?.VITE_API_IMAGE;
const BACKEND_API =
  sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

export const PaintingSlider = () => {
  const [paintings, setPaintings] = useState<Paintings>([
    { miniImageUrl: "", uid: "" },
  ]);

  const getPictures = async () => {
    try {
      const response = await Get(undefined, BACKEND_API, `${ai}/`, false);
      setPaintings(
        response.data.filter((item: any) => item.typeOfImage === "isCopy")
      );
    } catch (error) {
      console.error("Error fetching paintings:", error);
    } finally {
    }
  };
  useEffect(() => {
    getPictures();
  }, []);
  type SwiperRef = any | null;
  const sliderRef = useRef<SwiperRef>(null);
  const navigate = useNavigate();
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;

    sliderRef?.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef?.current?.swiper.slideNext();
  }, []);

  return paintings.length !== 0 ? (
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
        {paintings?.map((slide) => (
          <SwiperSlide key={slide.uid}>
            <img
              src={slide.miniImageUrl}
              alt="slide"
              className="rounded-xl px-4 w-full h-[100px] sm:h-[200px] lg:h-[300px]"
              onClick={() => navigate(`/painting/${slide.uid}`)}
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
  ) : (
    <></>
  );
};
