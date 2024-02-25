import { ProductByQuery } from "@/allActions/product/product";
import ProductCard from "@/componants/route/productCard/productCard";
import React, { Fragment } from "react";

async function QueryProduct({ searchParams }) {
  const { products } = await ProductByQuery(searchParams);
  return (
    <div>
      <div className="grid pt-2 grid-cols-2 gap-[10px] 600px:grid-cols-2 md:grid-cols-3 md:gap-[8px] lg:grid-cols-4 lg:gap-[10px] xl:grid-cols-5 2xl:grid-cols-6 xl:gap-[10px]">
        {products?.map((product, index) => (
          <Fragment key={product._id}>
            <ProductCard data={product} i={index} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default QueryProduct;
