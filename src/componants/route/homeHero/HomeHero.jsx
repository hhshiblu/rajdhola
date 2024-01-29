import React from "react";
import HomeSlider from "./HomeSlider.jsx";
import { getBanars } from "@/allActions/home.js";

async function HomeHero() {
  const banars = await getBanars();

  return (
    <div>
      <div
        className={` lg:max-w-[1024px] md:min-h-[cale(100vh_-_400px)] min-h-[cale(100vh_-_250px)] m-auto p-10 rounded-lg mb-12 `}
      >
        <div className="  flex flex-col gap-4 overflow-hidden lg:flex-row ">
          {/* --------- slider ---------- */}

          <div className="w-full  relative  md:w-[80%]   mx-auto   border-2 rounded-xl   shadow-sm  cursor-pointer overflow-hidden ">
            <HomeSlider banars={banars} />
          </div>
          {/* ---------------------coming event--------------- */}

          <div className="w-full md:w-[80%] mx-auto p-2 md:p-2  rounded-xl bg-gray-200 lg:w-[350px] lg:aspect-square">
            <h3 className="font-medium text-xm md:text-base  ">
              Upcoming items
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHero;
