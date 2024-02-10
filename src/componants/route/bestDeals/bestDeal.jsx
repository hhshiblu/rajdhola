"use client";

// import "./BestDeal.css";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import { useRef } from "react";
import { toast } from "sonner";

function BestDeals({ children }) {
  const boxRef = useRef(null);

  const btnprev = () => {
    let width = boxRef.current.clientWidth;
    boxRef.current.scrollLeft = boxRef.current.scrollLeft - width / 2;
  };

  const btnnext = () => {
    let width = boxRef.current.clientWidth;
    boxRef.current.scrollLeft = boxRef.current.scrollLeft + width / 2;
  };
  const seeMore = () => {
    toast.success("Product upload in progress", {
      duration: 3000,
      cancel: {
        label: "cancel",
      },
    });
  };
  return (
    <div className="mb-8">
      <div
        className={`600px:w-11/12 w-[98%] mx-auto  mb-3 rounded-sm bg-white 600px:h-[388px]    py-[10px] 600px:px-[20px] px-[2px] relative group overflow-hidden `}
      >
        <div>
          <div className="flex pb-2">
            <h2 className="text-[16px]  sm:text-[18px] md:text-[20px] font-semibold text-slate-600 px-[20px] ">
              Deals Under 500 <span className=" font-medium">৳</span>
            </h2>
            <div
              className="hidden 600px:block text-[15px] pl-6 hover:underline hover:text-red-500 cursor-pointer text-[#007185]"
              onClick={seeMore}
            >
              {/* <Link href={`/products?maxPrice=${500}`}> */}
              <p>See more</p>
              {/* </Link> */}
            </div>
          </div>
          <button
            onClick={btnprev}
            className="  bg-[#FFFFFF] border py-6 px-2 text-[30px] absolute top-[34%] left-0 shadow-2xl hidden 600px:group-hover:block transition duration-1000 z-50 "
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
          <button
            onClick={btnnext}
            className="bg-[#FFFFFF] border py-6 px-2 text-[30px] absolute top-[34%] right-0 shadow-2xl hidden 600px:group-hover:block transition duration-1000 z-50"
          >
            <MdOutlineKeyboardArrowRight />
          </button>
          <div
            className="600px:overflow-x-auto 600px:custom-scrollbar"
            ref={boxRef}
          >
            {children}
          </div>

          <div
            className="block 600px:hidden text-[13px] pl-2 pt-2 sm:text-[15px] sm:pl-6   hover:underline hover:text-red-500 cursor-pointer text-[#007185]"
            onClick={seeMore}
          >
            {/* <Link href={`/products?maxPrice=${500}`}> */}
            <p>See more</p>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestDeals;
