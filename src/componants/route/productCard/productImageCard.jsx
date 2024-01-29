import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductImageCard({ p }) {
  return (
    <div className="min-w-[240px] pb-4   max-w[251px] ">
      <Link href={`${`/product/${p._id}`} `}>
        <div className=" p-2 h-[200px] w-[240px] rounded-md">
          <Image
            src={p.images[0].url}
            alt={p.name}
            className="h-[100%] w-auto rounded-md hover:rounded-none  object-cover mx-auto   "
            height={10000}
            width={10000}
            // style={{ objectFit: "contain" }}
          />
        </div>
      </Link>
    </div>
  );
}

export default ProductImageCard;
