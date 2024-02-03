import { getCategory } from "@/allActions/category/category";
import styles from "@/libs/styles";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function Cetagory() {
  const categories = await getCategory();
  return (
    <div>
      {/* catagory */}

      <div
        className={`600px:w-11/12 w-[98%] mx-auto bg-white px-3  rounded-lg mb-12`}
        id="cetagoris"
      >
        <div
          className={`text-[16px] pt-3 pl-4 sm:text-[18px] md:text-[20px] font-semibold text-slate-600 mx-auto`}
        >
          <h1>Categoris</h1>
        </div>
        <div className=" p-4 hidden 600px:grid  grid-cols-3 gap-[5px] md:grid-cols-4 md:gap-[10px] lg:grid-cols-5 lg:gap-[10px] xl:grid-cols-7 xl:gap-[10px]">
          {categories &&
            categories?.slice(0, 9).map((i, index) => {
              return (
                <div
                  key={index}
                  className="w-full overflow-hidden hover:shadow-blue-100  bg-gray-50 rounded-md  cursor-pointer  flex items-center flex-col justify-between m-auto"
                >
                  <Link href={`/products/search?${i.name}`}>
                    <Image
                      src={i?.image?.url}
                      alt={i.title}
                      className="w-[70px] h-[70px] rounded-full object-cover mt-2 transform hover:scale-110 transition duration-300 mx-auto"
                      height={500}
                      width={500}
                    />
                    <h5 className=" text-sm px-2 mb-2 text-center">{i.name}</h5>
                  </Link>
                </div>
              );
            })}
        </div>

        <div className=" p-3 grid 600px:hidden grid-cols-3 gap-[5px] md:grid-cols-4 md:gap-[10px] lg:grid-cols-5 lg:gap-[10px] xl:grid-cols-7 xl:gap-[10px]">
          {categories &&
            categories?.slice(0, 6).map((i, index) => {
              return (
                <div
                  key={index}
                  className="w-full overflow-hidden hover:shadow-blue-100  bg-gray-50 rounded-md  cursor-pointer  flex items-center flex-col justify-between"
                >
                  <Link href={`/products/search?${i.name}`}>
                    <Image
                      src={i?.image?.url}
                      alt={i.title}
                      className="w-[65px] h-[65px] rounded-full object-cover mt-2 transform hover:scale-110 transition duration-300 mx-auto"
                    />
                    <h5 className=" text-sm px-2 mb-2  text-center">
                      {i.name}
                    </h5>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Cetagory;
