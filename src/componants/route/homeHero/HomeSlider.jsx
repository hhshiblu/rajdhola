"use client";
import { useEffect, useState, useRef } from "react";

import "./styles.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const YourSliderComponent = ({ banars }) => {
  const [startSlider, setStartSlider] = useState(0);
  const imgItemRef = useRef([]);

  const bigBanners = banars.filter((item) => item.type === "big");

  const endSlider = (bigBanners.length - 1) * 100;

  const handleLeftBtn = () => {
    if (startSlider < 0) {
      setStartSlider(startSlider + 100);
    }
  };

  const handleRightBtn = () => {
    if (startSlider >= -endSlider + 100) {
      setStartSlider(startSlider - 100);
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
    const intervalId = setInterval(renderSlideAuto, 5000);

    return () => clearInterval(intervalId);
  }, [startSlider]);

  return (
    <>
      <div className=" h-[90vh]  overflow-hidden hidden md:flex group 600px:mb-[-16%]  xl:mb-[-19%] mb-[-65px] relative">
        {banars
          .filter((item) => item.type === "big")
          .map((banar, index) => (
            <div
              key={index}
              className="image-item min-w-[100%] "
              ref={(el) => (imgItemRef.current[index] = el)}
              style={{ transform: `translateX(${startSlider}%)` }}
            >
              <img src={banar?.image.url} alt="" className="home_image" />
            </div>
          ))}
        <button
          onClick={handleLeftBtn}
          className=" absolute px-1 top-8 border-t-[2px] border-b-[2px]  border-r-[3px] border-white shadow-lg py-20 hidden group-hover:block "
        >
          <FaChevronLeft size={32} color="#fff" />
        </button>
        <button
          onClick={handleRightBtn}
          className=" absolute px-1  top-8 right-0 border-t-[2px] border-b-[2px] border-l-[3px] border-white shadow-lg py-20 hidden group-hover:block"
        >
          <FaChevronRight size={32} color="#fff" />
        </button>
      </div>
      <div className="  overflow-hidden flex md:hidden  600px:mb-[-210px]   mb-[-105px]">
        {banars
          .filter((item) => item.type === "small")
          .map((banar, index) => (
            <div
              key={index}
              className="image-item min-w-[100%] "
              ref={(el) => (imgItemRef.current[index] = el)}
              style={{ transform: `translateX(${startSlider}%)` }}
            >
              <img src={banar?.image.url} alt="" className="home_image  " />
            </div>
          ))}
      </div>
    </>
  );
};

export default YourSliderComponent;
