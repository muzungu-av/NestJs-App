import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./painting.module.scss";
// import MainPageBg from "../../assets/images/MainPageBg.jpg";
type PaintingProps = {
  slides: string[];
};

export const PaintingSlider = ({ slides }: PaintingProps) => {
  const slider = useRef<Slider | null>(null);
  const [hoverDirection, setHoverDirection] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: number | null = null;
    if (hoverDirection) {
      intervalId = setInterval(() => {
        if (hoverDirection === "left") {
          slidePrev();
        } else if (hoverDirection === "right") {
          slideNext();
        }
      }, 300); // Adjust the interval time as needed
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [hoverDirection]);

  const slidePrev = () => {
    if (slider.current) {
      slider.current.slickPrev();
    }
  };

  const slideNext = () => {
    if (slider.current) {
      slider.current.slickNext();
    }
  };

  const handleHover = (direction: string) => {
    setHoverDirection(direction);
  };

  return (
    <div className="py-[5%]">
      <div className={styles["slider-container"]}>
        <Slider
          ref={slider}
          dots={false}
          infinite={true}
          speed={800}
          slidesToShow={3}
          autoplay={true}
          autoplaySpeed={100}
          slidesToScroll={1}
          centerMode={true}
          easing="ease"
          centerPadding="60px"
          className={styles["slick-track"]}
        >
          {slides.map((image: string) => {
            return (
              <div className="px-2 ">
                <img src={image} className=" border-[15px] border-[#240909]" />
              </div>
            );
          })}
        </Slider>
        <div
          className={`${styles["hover-area"]} ${styles["hover-area-left"]}`}
          onMouseEnter={() => handleHover("left")}
          onMouseLeave={() => setHoverDirection(null)}
        />
        <div
          className={`${styles["hover-area"]} ${styles["hover-area-right"]}`}
          onMouseEnter={() => handleHover("right")}
          onMouseLeave={() => setHoverDirection(null)}
        />
      </div>
    </div>
  );
};
