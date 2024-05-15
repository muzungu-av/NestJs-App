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
  const params = {
    typeOfImage: "isCopy",
    fields: "uid,miniImageUrl,description,typeOfImage,copyAttribute",
  };
  const getPictures = async () => {
    try {
      const response = await Get(
        undefined,
        BACKEND_API,
        `${ai}/type/`,
        false,
        params
      );
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

  return paintings.length >= 4 ? (
    <div className="px-6 relative my-6 ">
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
        slidesPerView={4}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper"
        style={{ marginInline: "15px" }}
        breakpoints={{
          1300: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1020: {
            slidesPerView: 3,
            spaceBetween: 30,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          400: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          200: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
      >
        {paintings?.map((slide) => (
          <SwiperSlide key={slide.uid}>
            <img
              src={slide.miniImageUrl}
              alt="slide"
              className="rounded-sm px-4 "
              onClick={() => navigate(`/painting/${slide.uid}`)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <img
        src={SwiperArrow}
        className="rotate-180 bottom-[45%] left-0 absolute z-[100]  cursor-pointer scale-50 sm:scale-75 lg:scale-100"
        onClick={handlePrev}
      ></img>
      <img
        src={SwiperArrow}
        className="bottom-[45%] right-0 absolute z-[100] cursor-pointer scale-50 sm:scale-75 lg:scale-100"
        onClick={handleNext}
      ></img>
    </div>
  ) : (
    <></>
  );
};
