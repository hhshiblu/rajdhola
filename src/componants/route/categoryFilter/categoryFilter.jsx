import Image from "next/image";
import React from "react";
import BestFasion from "./bestFasion";
import "./styles.css";

function CategoryFilter() {
  return (
    <div className="mb-8">
      <div className=" hidden md:block w-11/12  mx-auto  z-50">
        <div className="flex gap-4">
          <div className="bg-white  md:w-[32%]  xl:w-[24%] z-50 mx-auto p-4">
            <h2 className="text-[20px] font-[650] leading-[25px] pb-3">
              Best Toy for kids
            </h2>
            <Image
              src="/toy_product.jpg"
              alt="rajdhola_toy_product"
              width={500}
              height={500}
              className="h-[250px] w-full"
            />
            <p className="text-[15px] pl-2 pt-3 hover:underline hover:text-red-500 cursor-pointer text-[#007185]">
              Shop now
            </p>
          </div>
          <div className="bg-white  md:w-[32%]  xl:w-[24%] mx-auto z-50 p-4">
            <h2 className="text-[20px] font-[650] leading-[25px] pb-3">
              Elevate your fashion.
            </h2>
            <div className="h-250px">
              <BestFasion />
            </div>
            <p className="text-[15px] pl-2 pt-3 hover:underline hover:text-red-500 cursor-pointer text-[#007185]">
              See more
            </p>
          </div>
          <div className="bg-white  hidden xl:block  xl:w-[24%] z-50 mx-auto p-4">
            <h2 className="text-[20px] font-[650] leading-[25px] pb-3">
              Enhance electronic devices
            </h2>
            <Image
              src="/watch.jpg"
              alt="rajdhola_watch_product"
              width={500}
              height={500}
              className="h-[250px] w-full"
            />
            <p className="text-[15px] pl-2 pt-3 hover:underline hover:text-red-500 cursor-pointer text-[#007185]">
              Shop now
            </p>
          </div>
          <div className="bg-white  md:w-[32%]  xl:w-[24%] z-50 mx-auto p-4">
            <h2 className="text-[20px] font-[650] leading-[25px] pb-3">
              Upcoming events
            </h2>
            <div className="flex flex-col gap-3">
              <div className="shadow-lg bg-white p-2">
                <div className="flex justify-between items-center">
                  <h2 className="font-[600] text-[19px]  ">Big Boom</h2>
                  <p className="text-[15px] font-[500] "> Rajdhola</p>
                </div>
                <div className="flex justify-between items-center">
                  <Image
                    src="/flash_sell.png"
                    alt="big booom event"
                    width={100}
                    height={100}
                    className="w-[60px] h-[60px] "
                  />
                  <div className="text">
                    {" "}
                    <p>Starts from </p>
                    <p>16 , July</p>
                  </div>
                </div>
              </div>
              <div className="shadow-lg bg-white p-2">
                <div className="flex justify-between items-center">
                  <h2 className="font-[600] text-[19px]  ">Off Day</h2>
                  <p className="text-[15px] font-[500] "> Rajdhola</p>
                </div>
                <div className="flex justify-between items-center">
                  <Image
                    src="/off_thirty.png"
                    alt="big booom event"
                    width={100}
                    height={100}
                    className="w-[60px] h-[60px] "
                  />
                  <div className="text">
                    {" "}
                    <p>Starts from </p>
                    <p>16 , August</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="600px:w-11/12 w-[98%]  md:hidden mx-auto ">
        <div className="flex gap-2 home_cate_slide overflow-x-auto">
          <div className="  min-w-[160px] hover:shadow-md z-50">
            <p className="text-[15px] bg-gray-200 font-[500] p-[4px] text-gray-800">
              Best Toy for kids
            </p>
            <Image
              src="/toy_product.jpg"
              alt="rajdhola_toy_product"
              width={500}
              height={500}
              className=" w-full"
            />
          </div>
          <div className="  min-w-[160px] hover:shadow-md z-50">
            <p className="text-[15px] bg-gray-200 font-[500] p-[4px] text-gray-800">
              Popular electronic
            </p>
            <Image
              src="/watch.jpg"
              alt="rajdhola_toy_product"
              width={500}
              height={500}
              className=" w-full"
            />
          </div>
          <div className="  min-w-[160px] hover:shadow-md z-50">
            <p className="text-[15px] bg-gray-200 font-[500] p-[4px] text-gray-800">
              Elevate your fashion.
            </p>
            <Image
              src="/woman_fasion.gif"
              alt="rajdhola_women's_product"
              width={500}
              height={500}
              className=" w-full"
            />
          </div>
          <div className="  min-w-[160px] hover:shadow-md  z-50">
            <p className="text-[15px] bg-gray-200 font-[500] p-[4px] text-gray-800">
              Popular juyalari
            </p>
            <Image
              src="/jualary_fasion.jpg"
              alt="rajdhola_juyalary_product"
              width={500}
              height={5000}
              className=" w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;