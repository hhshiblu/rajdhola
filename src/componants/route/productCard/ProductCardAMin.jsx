import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductCardAMin({ p }) {
  return (
    <div className="w-[47%]  overflow-hidden ">
      <Link href={`${`/product/${p._id}`}  `}>
        <div className=" mx-auto p-1  h-[135px] w-full  overflow-hidden    rounded-md">
          <Image
            src={p.images[0].url}
            alt={p.name}
            className="h-[100%] w-auto rounded-md hover:rounded-none overflow-hidden  transform hover:scale-95  transition duration-500    object-cover mx-auto   "
            height={500}
            width={500}
          />
        </div>
      </Link>

      <div className="flex items-center  gap-3">
        {p.previousPrice ? (
          <div className="bg-[#00453e] rounded-sm pt-[3px] px-[5px] py-[2px]  font-semibold  text-white text-[10px]">
            {(p.previousPrice
              ? ((p.previousPrice - p.presentPrice) / p.previousPrice) * 100
              : 0
            ).toFixed(0)}
            % off
          </div>
        ) : (
          <div className="text-[#00453e] font-bold text-[12px]   ">Daily</div>
        )}
        <div className="text-[#00453e] font-bold text-[12px]   ">Deal</div>{" "}
      </div>
      <div className="flex">
        <h5
          className={`text-[17px] text-[#0F1111] text-sm py-1 font-semibold `}
        >
          {p.presentPrice}
          <span className="  font-medium"> ৳</span>
        </h5>
        {p?.discountPrice && (
          <h4
            className={`pl-4 text-[12px] leading-[18px] text-[#565959] line-through`}
          >
            {p?.previousPrice ? p?.previousPrice + " ৳" : null}
          </h4>
        )}
      </div>
      <Link href={"/product/" + p._id}>
        <h5 className="font-[500] text-[12px] leading-[19px]  mt-[-2px] hover:text-red-500">
          {p?.name.length > 20 ? p?.name.slice(0, 25) + "..." : p?.name}
        </h5>
      </Link>
    </div>
  );
}

export default ProductCardAMin;
