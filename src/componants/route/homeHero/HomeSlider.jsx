"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function HomeSlider({ banars }) {
  return (
    <div className="flex  ">
      {banars.map((banar, i) => (
        <div key={i} className={`w-[100%] min-w-[100%]`}>
          <img
            src="https://m.media-amazon.com/images/I/61HHa0VUuaL._SX3000_.jpg"
            alt=""
            className=" hidden md:block home_image 600px:mb-[-18%]  xl:mb-[-19%] mb-[-65px]"
          />
          <img
            src="/short.jpg"
            alt=""
            className="home_image 600px:mb-[-210px] md:hidden  mb-[-95px]"
          />
        </div>
      ))}
    </div>
  );
}

export default HomeSlider;
