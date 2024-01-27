import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductCardAMin({ p }) {
  return (
    <div className="w-[45%]   ">
      <Link href={`${`/product/${p._id}`}  `}>
        <div className=" mx-auto p-3 h-[130px]  rounded-md">
          <Image
            src={p.images[0].url}
            alt=""
            className="w-auto h-[100%] text-center mx-auto"
            width={1000}
            height={1000}
            style={{ objectFit: "contain" }}
          />
        </div>
      </Link>
      <div className="flex  gap-3  ">
        <div className=" bg-[#00453e] rounded-sm px-[5px] py-[2px]  font-semibold  text-white text-[10px]">
          {(p.originalPrice === 0
            ? null
            : ((p.originalPrice - p.discountPrice) / p.originalPrice) * 100
          ).toFixed(0)}
          % off
        </div>
        <div className="text-[#00453e] font-bold text-[12px]   ">Deal</div>
      </div>
    </div>
  );
}

export default ProductCardAMin;
