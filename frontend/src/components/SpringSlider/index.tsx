import { useState } from "react";
import { useSpring, animated } from "react-spring";
import BoatPic from "../../assets/images/BoatPicture.jpg";

const slides = [
  BoatPic,
  BoatPic,
  BoatPic,
  // Add more slides here
];

const Slider = () => {
  const [index, setIndex] = useState(0);

  const slideProps = useSpring({
    transform: `translateX(-${index * 100}%)`,
    config: { tension: 50, friction: 150 }, // Adjust animation config as needed
  });

  const nextSlide = () => {
    setIndex((index + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((index - 1 + slides.length) % slides.length);
  };

  return (
    <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
      <animated.div
        style={{
          display: "flex",
          width: `${slides.length * 100}%`,
          transform: slideProps.transform,
        }}
      >
        {slides.map((slide, i) => (
          <div key={i} style={{ width: "100%", flexShrink: 0 }}>
            <img src={slide} />
          </div>
        ))}
      </animated.div>
      <button onClick={prevSlide}>Previous</button>
      <button onClick={nextSlide}>Next</button>
    </div>
  );
};

export default Slider;
