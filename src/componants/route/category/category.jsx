import { getCategory } from "@/allActions/category/category";
import styles from "@/libs/styles";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BestSelling from "./bestSelling";
import { bestSelling } from "@/allActions/product/product";
import Kitchen from "./kitchen";
import CateGroup from "./cateGroup";

async function Cetagory() {
  const products = await bestSelling();
  return (
    <div>
      <div className="mb-8">
        <div className="w-[98%]  600px:w-11/12  mx-auto ">
          <div className="flex gap-4">
            <div className="bg-white w-full md:w-[48%] lg:w-[33%]    mx-auto p-4">
              <BestSelling products={products} />
            </div>
            <div className="bg-white hidden md:block md:w-[48%] lg:w-[33%] mx-auto  p-4">
              <h2 className="text-[20px] font-[650] leading-[25px] pb-3">
                Kitchen
              </h2>
              <div className="h-250px">
                <Kitchen />
              </div>
            </div>
            <div className=" hidden lg:block bg-white w-[33%]   mx-auto p-4">
              <h2 className="text-[20px] font-[650] leading-[25px] pb-3">
                Explore Category
              </h2>
              <CateGroup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cetagory;
