"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

function HomeSlider({ banars }) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banars?.map((banars, i) => {
          return (
            <SwiperSlide key={i} className=" overflow-hidden">
              <Link href="#" className="overflow-hidden">
                <Image
                  src={banars?.image?.url}
                  alt="rajshola banars"
                  height={100}
                  width={1000}
                  className=" overflow-hidden w-full "
                  style={{ objectFit: "cover" }}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default HomeSlider;
