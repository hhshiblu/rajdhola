import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductImageCardMin({ p }) {
  return (
    // <div className="w-[45%]   ">
    //   <Link href={`${`/product/${p._id}`}  `}>
    //     <div className=" mx-auto p-3 h-[130px] ">
    //       <Image
    //         src={p.images[0].url}
    //         alt={p.name}
    //         className="h-[100%] w-auto rounded-md hover:rounded-none  object-cover mx-auto   "
    //         height={10000}
    //         width={10000}
    //         // style={{ objectFit: "contain" }}
    //       />
    //     </div>
    //   </Link>
    <div className="w-[45%]   ">
      <Link href={`${`/product/${p._id}`}  `}>
        <div className=" mx-auto p-1  h-[140px]  overflow-hidden    rounded-md">
          <Image
            src={p.images[0].url}
            alt={p.name}
            className="h-[100%] w-auto rounded-md hover:rounded-none  transform hover:scale-105   transition duration-500    object-cover mx-auto   "
            height={10000}
            width={10000}
          />
        </div>
      </Link>
    </div>
  );
}

export default ProductImageCardMin;
