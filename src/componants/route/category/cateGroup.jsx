"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

function CateGroup() {
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
    <div className="flex gap-2 flex-wrap h-full ">
      <div
        className="w-[45%] mx-auto"
        onClick={() =>
          router.push("/products" + "?" + createQueryString("_c", "Books"))
        }
      >
        <Image
          src="/man'fasion.gif"
          alt="rajdhola_toy_product"
          width={500}
          height={500}
          className=" h-[162px] w-full cursor-pointer"
        />
        <p className="text-[12px] hover:text-red-500 cursor-pointer "> Books</p>
      </div>
      <div
        className="w-[45%] mx-auto"
        onClick={() =>
          router.push(
            "/products" + "?" + createQueryString("_c", "Health & Beauty")
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
          Health & Beauty
        </p>
      </div>
      <div
        className="w-[45%] mx-auto"
        onClick={() =>
          router.push(
            "/products" + "?" + createQueryString("_c", "Kids & Toys")
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
          Kids & Toys
        </p>
      </div>
      <div
        className="w-[45%] mx-auto"
        onClick={() =>
          router.push(
            "/products" + "?" + createQueryString("_c", "Boy's Fashion")
          )
        }
      >
        <Image
          src="/jualary_fasion.jpg"
          alt="rajdhola_toy_product"
          width={500}
          height={500}
          className=" h-[162px] w-full cursor-pointer"
        />
        <p className="text-[12px] hover:text-red-500 cursor-pointer ">
          {" "}
          Boy&lsquo;s Fashion
        </p>
      </div>
    </div>
  );
}

export default CateGroup;
