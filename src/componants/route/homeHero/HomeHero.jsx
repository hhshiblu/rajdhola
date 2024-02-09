import React from "react";
import HomeSlider from "./HomeSlider.jsx";
import { getBanars } from "@/allActions/home.js";
import Image from "next/image.js";

async function HomeHero() {
  const banars = await getBanars();

  return (
    <div>
      <div
        className={` lg:max-w-[1024px] md:min-h-[cale(100vh_-_400px)] min-h-[cale(100vh_-_250px)] m-auto p-10 rounded-lg mb-12 `}
      >
        <div className="  flex flex-col gap-4 overflow-hidden lg:flex-row ">
          {/* --------- slider ---------- */}

          <div className="w-full  relative  md:w-[80%]   mx-auto    border-2 rounded-xl   shadow-sm  cursor-pointer overflow-hidden ">
            <HomeSlider banars={banars} />
          </div>
          {/* ---------------------coming event--------------- */}

          <div className="w-full md:w-[80%] mx-auto p-2 md:p-2 pb-4 rounded-xl bg-gray-200 lg:w-[350px] lg:aspect-square">
            <h3 className="font-medium text-[14px] md:text-base  ">
              Upcoming items
            </h3>
            <ul className="gap-4 flex lg:flex-col mt-4 overflow-x-scroll lg:overflow-x-hidden overflow-y-hidden lg:overflow-y-scroll lg:max-h-[267px] xl:max-h-[267px] pb-4">
              <li>
                <div className="h-full px-4 bg-white rounded-xl  min-w-[248px]">
                  <div className=" flex items-center justify-between ">
                    <h2 className="text-[21px] font-semibold pt-[6px] ">
                      Big Boom
                    </h2>
                    <p className="text-right font-medium ">On Rajdhola</p>
                  </div>
                  <div className="flex  items-center py-[3px]">
                    <div>
                      <Image
                        alt="30 percent left"
                        width={500}
                        height={500}
                        decoding="async"
                        data-nimg="1"
                        className="mx-auto  transition-opacity duration-300 ease-in-out  opacity-100  w-[70px]  "
                        src="/flash_sell.png"
                        style={{ color: "transparent" }}
                      />
                    </div>
                    <p className="mb-1 text-sm font-semibold text-center">
                      Campaign starts in
                      <p>28 , July</p>
                    </p>
                  </div>
                  <div className="h-full flex-1"></div>
                </div>
              </li>
              <li>
                <div className="h-full px-4 bg-white rounded-xl  min-w-[248px]">
                  <div className=" flex items-center justify-between ">
                    <h2 className="text-[21px] font-semibold pt-3 ">Off Day</h2>
                    <p className="text-right font-medium ">On Rajdhola</p>
                  </div>
                  <div className="flex  items-center py-2">
                    <div>
                      <Image
                        alt="30 percent left"
                        width={500}
                        height={500}
                        decoding="async"
                        data-nimg="1"
                        className="mx-auto  transition-opacity duration-300 ease-in-out  opacity-100  w-[70px]  "
                        src="/off_thirty.png"
                        style={{ color: "transparent" }}
                      />
                    </div>
                    <p className="mb-1 text-sm font-semibold text-center">
                      Campaign starts in
                      <p>12 , June</p>
                    </p>
                  </div>
                  <div className="h-full flex-1"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHero;
