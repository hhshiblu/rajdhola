import React, { Fragment } from "react";
import LoadMore from "./loadMore";
import { getAllproductsFeature } from "@/allActions/product/product";
import styles from "@/libs/styles";

function FeaturedProduct({ data }) {
  return (
    <>
      <section className={`${styles.section} py-6`}>
        <div
          className={`className="text-[16px]  sm:text-[18px] md:text-[20px] font-semibold text-slate-600 pb-4 pl-2`}
        >
          <h2>For you !</h2>
        </div>

        <div className="grid grid-cols-2 gap-[10px] md:grid-cols-3 md:gap-[10px] lg:grid-cols-5 lg:gap-[10px] xl:grid-cols-6 xl:gap-[10px]">
          {data}
        </div>
        <LoadMore products={data} />
      </section>
    </>
  );
}

export default FeaturedProduct;
