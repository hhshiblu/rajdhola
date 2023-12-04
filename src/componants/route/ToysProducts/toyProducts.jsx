"use client";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import Link from "next/link";

import { useRef } from "react";

function ToyProducts({ children }) {
  const boxRef = useRef(null);

  const btnprev = () => {
    let width = boxRef.current.clientWidth;
    boxRef.current.scrollLeft = boxRef.current.scrollLeft - width / 2;
  };

  const btnnext = () => {
    let width = boxRef.current.clientWidth;
    boxRef.current.scrollLeft = boxRef.current.scrollLeft + width / 2;
  };

  return (
    <div>
      <div
        className={`w-11/12 mx-auto  my-3 rounded-sm bg-white h-[390px] py-[10px] px-[20px] relative group overflow-hidden `}
      >
        <div>
          <div className="flex pb-2">
            <h2 className="text-[16px]  sm:text-[18px] md:text-[20px] font-semibold text-slate-600">
              Toy Vehicles & Playsets Under 800{" "}
              <span className=" font-medium">৳</span>
            </h2>
            <div className="hidden 600px:block text-[15px] pl-6 hover:underline hover:text-red-500 cursor-pointer text-[#007185]">
              <Link href={`/products?maxPrice=${500}`}>See more</Link>
            </div>
          </div>
          <button
            onClick={btnprev}
            className="  bg-[#FFFFFF] border py-6 px-2 text-[30px] absolute top-[34%] left-0 shadow-2xl hidden 600px:group-hover:block transition duration-1000 "
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
          <button
            onClick={btnnext}
            className="bg-[#FFFFFF] border py-6 px-2 text-[30px] absolute top-[34%] right-0 shadow-2xl hidden 600px:group-hover:block transition duration-1000 "
          >
            <MdOutlineKeyboardArrowRight />
          </button>
          <div
            className="600px:overflow-x-auto 600px:custom-scrollbar"
            ref={boxRef}
          >
            {children}
          </div>

          <div className="block 600px:hidden text-[13px] pl-2 pt-2 sm:text-[14px] sm:pl-6   hover:underline hover:text-red-500 cursor-pointer text-[#007185]">
            <Link href={`/products?maxPrice=${500}`}>See more</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToyProducts;

// export default function Skeleton() {
//   return (
//     <ul className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8'>
//       {[...Array(10)].map((movie, index) => (
//         <li key={index} className='relative animate-pulse'>
//           <div className='aspect-square h-[300] w-full overflow-hidden rounded-lg bg-gray-300'></div>
//           <p className='mt-2 h-4 w-1/2 rounded-lg bg-gray-600'></p>
//           <p className='mt-2 block h-4 rounded-lg bg-gray-600 text-sm font-medium'></p>
//           <p className='mt-2 block h-4 rounded-lg bg-gray-600 text-sm font-medium'></p>
//         </li>
//       ))}
//     </ul>
//   )
// }
