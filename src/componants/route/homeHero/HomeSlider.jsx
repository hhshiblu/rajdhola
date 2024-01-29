"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

function HomeSlider({ banars }) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="bg-red-900">Slide 2</SwiperSlide>
        <SwiperSlide className="bg-green-700">Slide 3</SwiperSlide>
        <SwiperSlide className="bg-green-200">Slide 4</SwiperSlide>
        <SwiperSlide className="bg-green-900">Slide 5</SwiperSlide>
        {banars?.map((banars, i) => {
          return (
            <SwiperSlide key={i} className="">
              {/* <div className="w-[100%] bg-black  h-auto"> */}
              <Image
                src={banars?.image?.url}
                alt="rajshola banars"
                height={100}
                width={1000}
                className="h-[100%] "
                style={{ objectFit: "cover" }}
              />
              {/* </div> */}
            </SwiperSlide>
          );
        })}
        {/* <SwiperSlide className="bg-green-900 text-red-950 h-[100%]">
          lorem asjfakfjka ajfaf afjafnafaf akfasf asfnas faskfa sfakf asfj
        </SwiperSlide>
        <SwiperSlide className="bg-red-900">Slide 2</SwiperSlide>
        <SwiperSlide className="bg-green-700">Slide 3</SwiperSlide>
        <SwiperSlide className="bg-green-200">Slide 4</SwiperSlide>
        <SwiperSlide className="bg-green-900">Slide 5</SwiperSlide> */}
      </Swiper>
    </>
  );
}

export default HomeSlider;
