"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

function Kitchen() {
  const searchParams = useSearchParams();

  const pathName = usePathname();
  const router = useRouter();
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <>
      {" "}
      <div className="flex gap-2 flex-wrap h-full ">
        <div
          className="w-[45%] mx-auto"
          onClick={() =>
            router.push(
              "/products?_c=Kitchen&_subc=Kitchen Appliances&_ch=Blender"
            )
          }
        >
          <Image
            src="/man'fasion.gif"
            alt="rajdhola_toy_product"
            width={500}
            height={500}
            className=" h-[162px] w-full cursor-pointer"
          />
          <p className="text-[12px] hover:text-red-500 cursor-pointer">
            {" "}
            Blender
          </p>
        </div>
        <div
          className="w-[45%] mx-auto"
          onClick={() =>
            router.push(
              "/products?_c=Kitchen&_subc=Kitchen Appliances&_ch=Gas Stoves"
            )
          }
        >
          <Image
            src="/woman_fasion.gif"
            alt="rajdhola_toy_product"
            width={500}
            height={500}
            className=" h-[162px] w-full cursor-pointer"
          />
          <p className="text-[12px] hover:text-red-500 cursor-pointer ">
            {" "}
            Gas Stoves
          </p>
        </div>
        <div
          className="w-[45%] mx-auto"
          onClick={() =>
            router.push(
              "/products?_c=Kitchen&_subc=Kitchen Appliances&_ch=Rice Cookers"
            )
          }
        >
          <Image
            src="/kids_fasion.jpg"
            alt="rajdhola_toy_product"
            width={500}
            height={500}
            className=" h-[162px] w-full cursor-pointer"
          />
          <p className="text-[12px] hover:text-red-500 cursor-pointer ">
            {" "}
            Rice Cookers
          </p>
        </div>
        <div
          className="w-[45%] mx-auto"
          onClick={() =>
            router.push(
              "/products?_c=Kitchen&_subc=Kitchen Appliances&_ch=Electric Kettle"
            )
          }
        >
          <Image
            src="/jualary_fasion.jpg"
            alt="rajdhola_toy_product"
            width={500}
            height={500}
            className=" h-[162px] w-full"
          />
          <p className="text-[12px] hover:text-red-500 "> Electric Kettle</p>
        </div>
      </div>
      <p
        className="text-[15px] pl-2 pt-3 hover:underline hover:text-red-500 cursor-pointer text-[#007185]"
        onClick={() => router.push("/products?_c=Kitchen")}
      >
        See more
      </p>
    </>
  );
}

export default Kitchen;
