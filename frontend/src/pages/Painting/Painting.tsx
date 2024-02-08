import React, { useState, useRef, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./painting.module.scss"; // Import the CSS Module styles

export const Painting: React.FC = () => {
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
      }, 700); // Adjust the interval time as needed
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
    <div className={styles["slider-container"]}>
      <Slider
        ref={slider}
        dots={false}
        infinite={true}
        speed={500}
        slidesToShow={3}
        slidesToScroll={1}
        className={styles["slick-track"]}
      >
        <div>
          <h3>Slide 1</h3>
        </div>
        <div>
          <h3>Slide 2</h3>
        </div>
        <div>
          <h3>Slide 3</h3>
        </div>
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
  );
};
