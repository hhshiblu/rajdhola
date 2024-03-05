"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

function BestFasion() {
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
        className="w-[45%] mx-auto cursor-pointer"
        onClick={() => {
          router.push(
            "/products" + "?" + createQueryString("_c", "Men's Fashion")
          );
        }}
      >
        <Image
          src="/man'fasion.gif"
          alt="rajdhola_toy_product"
          width={500}
          height={500}
          className=" md:h-[90px] lg:h-[105px] w-full"
        />
        <p className="text-[12px]  hover:text-red-600"> Men&lsquo;s</p>
      </div>
      <div
        className="w-[45%] mx-auto cursor-pointer"
        onClick={() =>
          router.push(
            "/products" + "?" + createQueryString("_c", "Women's Fashion")
          )
        }
      >
        <Image
          src="/woman_fasion.gif"
          alt="rajdhola_toy_product"
          width={500}
          height={500}
          className="md:h-[90px] lg:h-[105px] w-full"
        />
        <p className="text-[12px] "> Women&lsquo;s</p>
      </div>
      <div
        className="w-[45%] mx-auto cursor-pointer"
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
          className="md:h-[90px] lg:h-[105px] w-full"
        />
        <p className="text-[12px] "> Kid&lsquo;s</p>
      </div>
      <div
        className="w-[45%] mx-auto cursor-pointer"
        onClick={() =>
          router.push(
            "/products" + "?" + createQueryString("_c", "Bag & Jewellery")
          )
        }
      >
        <Image
          src="/jualary_fasion.jpg"
          alt="rajdhola_toy_product"
          width={500}
          height={500}
          className="md:h-[90px] lg:h-[105px] w-full"
        />
        <p className="text-[12px] "> jualary&lsquo;s</p>
      </div>
    </div>
  );
}

export default BestFasion;
