"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import Rating from "../rating/rating";

const BestSelling = ({ title, products }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="flex justify-between items-center">
        <div className="text-[20px] font-[650] leading-[25px] ">
          <p>Best Selling</p>
        </div>
        <div className="flex justify-center items-center gap-3 text-slate-600">
          <button
            onClick={() => previous()}
            className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <span>
              <FiChevronRight />
            </span>
          </button>
          <button
            onClick={() => next()}
            className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <span>
              <FiChevronLeft />
            </span>
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="flex gap-8 flex-col-reverse ">
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {products.map((p, i) => {
          return (
            <div
              key={i}
              className="flex flex-col justify-start gap-2 py-3 w-full "
            >
              {p.map((pl, j) => (
                <div key={j} className="flex justify-start items-start pb-2">
                  <div className="w-[100px] h-[80px]">
                    <Link href={`/product/${pl._id}`}>
                      <Image
                        className=" rounded-md w-full h-full shadow-md "
                        src={pl.images[0].url}
                        alt="images"
                        width={500}
                        height={500}
                      />
                    </Link>
                  </div>

                  <div className="px-3 w-full flex justify-start items-start gap-1 flex-col text-slate-600">
                    <Link href={`${`/product/${pl._id}`}`}>
                      <h2 className="hover:text-red-600 text-[14px]">
                        {pl.name.length > 40
                          ? pl.name.slice(0, 40) + "..."
                          : pl.name}
                      </h2>
                    </Link>
                    <div className="flex">
                      <h5
                        className={`text-[17px] text-[#0F1111] text-sm py-[2px] font-semibold `}
                      >
                        {pl.presentPrice}
                        <span className="  font-medium"> ৳</span>
                      </h5>
                      {pl?.previousPrice && (
                        <div className=" flex">
                          <h5 className="pl-2   text-[12px] leading-[18px] text-[#565959]  ">
                            {" "}
                            Daily Price:{" "}
                          </h5>
                          <h4
                            className={`pl-1 text-[12px] leading-[18px] text-[#565959] line-through`}
                          >
                            {pl?.previousPrice
                              ? pl?.previousPrice + " ৳"
                              : null}
                          </h4>
                        </div>
                      )}
                    </div>
                    <Rating rating={4.5} />
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default BestSelling;
