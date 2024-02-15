import { getChildrensChildren } from "@/allActions/category/category";
import Header from "@/componants/layout/header";
import React from "react";

async function page(searchparams) {
  const children = await getChildrensChildren(
    "Man's-Fashion-qUvg3Jkum",
    "Clothing-S3VWpK6yX"
  );

  return (
    <div>
      <Header />
      <div className="px-2">
        <div className="w-[267px]">
          Department
          <hr />
          <h2 className="text-[12px]"> Men&apos;s Fasion</h2>
          <p className="text-[12px] pb-1 font-[700]">Men&apos;s clothing</p>
          <div className="pl-[6px] flex flex-col ">
            {children.map((cate, i) => (
              <h2 className="text-[12px]" key={i}>
                {cate.name}
              </h2>
            ))}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default page;
