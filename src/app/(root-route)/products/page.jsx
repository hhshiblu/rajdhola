import {
  getCategory,
  getChildrensChildren,
} from "@/allActions/category/category";
import { ProductByQuery } from "@/allActions/product/product";
import Queryloader from "@/componants/loader/queryloader";
import Pagination from "@/components/pagination/pagination";
import Department from "@/components/products/department";
import PhoneFilter from "@/components/products/phoneFilter";
import QueryProduct from "@/components/products/queryProduct";
import Sort from "@/components/products/sort";

import React, { Suspense } from "react";
export const dynamic = "force-dynamic";
async function Page({ searchParams }) {
  const childCate = await getChildrensChildren(
    searchParams._c,
    searchParams._subc
  );
  const category = await getCategory();
  const { currentPage, totalProducts, totalPages, products } =
    await ProductByQuery(searchParams);
  return (
    <div>
      <div className="bg-white shadow-lg border-b  justify-between px-4 py-2 text-[14px] hidden 600px:flex">
        <h1>
          {" "}
          1 - {totalPages} of over {totalProducts} results
        </h1>
        <Sort />
      </div>
      <div className=" flex flex-col 600px:flex-row gap-2 bg-white p-0 600px:py-3 600px:pl-2">
        <div className="w-[267px] hidden 600px:block">
          <h2 className="text-[14px] font-[500] pb-1"> Department</h2>
          <hr />
          <div className="pl-[6px] flex flex-col ">
            <Department
              childcate={childCate}
              searchParam={searchParams}
              category={category}
            />
          </div>
        </div>
        <div className="600px:hidden block">
          <PhoneFilter
            childcate={childCate}
            searchParam={searchParams}
            totalProducts={totalProducts}
            totalPages={totalPages}
            category={category}
          />
        </div>
        <div className="w-full min-h-[95vh] px-2">
          <h2 className=" font-[400] pb-1 text-[15px]">All Result</h2>

          <Suspense
            fallback={<Queryloader />}
            key={JSON.stringify(searchParams)}
          >
            <QueryProduct searchParams={searchParams} />
          </Suspense>
          <div className="flex justify-center pt-8">
            <Pagination pageNumber={1} showItem={0} totalPage={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
