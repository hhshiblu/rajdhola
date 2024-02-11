"use client";
import { useEffect, useState, useRef } from "react";

import "./styles.css";

const YourSliderComponent = ({ banars }) => {
  const [startSlider, setStartSlider] = useState(0);
  const imgItemRef = useRef([]);

  const endSlider = (banars.length - 1) * 100;

  const handleLeftBtn = () => {
    if (startSlider < 0) {
      setStartSlider(startSlider + 100);
      console.log(startSlider);
    }
  };

  const handleRightBtn = () => {
    if (startSlider >= -endSlider + 100) {
      setStartSlider(startSlider - 100);
      console.log(startSlider);
    }
  };

  const renderSlideAuto = () => {
    if (startSlider >= -endSlider + 100) {
      handleRightBtn();
    } else {
      setStartSlider(0);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(renderSlideAuto, 2000);

    return () => clearInterval(intervalId);
  }, [startSlider]);

  return (
    <>
      <div className="  overflow-hidden hidden md:flex  600px:mb-[-16%]  xl:mb-[-19%] mb-[-65px]">
        {banars.map((imageUrl, index) => (
          <div
            key={index}
            className="image-item min-w-[100%] "
            ref={(el) => (imgItemRef.current[index] = el)}
            style={{ transform: `translateX(${startSlider}%)` }}
          >
            <img
              src={
                "https://m.media-amazon.com/images/I/61HHa0VUuaL._SX3000_.jpg"
              }
              alt=""
              className=" home_image  "
            />
            {/* <button onClick={handleRightBtn}>Right</button> */}
          </div>
        ))}
      </div>
      <div className="  overflow-hidden flex md:hidden  600px:mb-[-210px]   mb-[-95px]">
        {banars.map((imageUrl, index) => (
          <div
            key={index}
            className="image-item min-w-[100%] "
            ref={(el) => (imgItemRef.current[index] = el)}
            style={{ transform: `translateX(${startSlider}%)` }}
          >
            <img src="/short.jpg" alt="" className=" home_image  " />
            {/* <button onClick={handleRightBtn}>Right</button> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default YourSliderComponent;
