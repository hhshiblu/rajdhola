import { ProductByQuery } from "@/allActions/product/product";
import ProductCard from "@/componants/route/productCard/productCard";
import React, { Fragment } from "react";

async function QueryProduct({ searchParams }) {
  const { products } = await ProductByQuery(searchParams);

  return (
    <>
      {products.length > 0 ? (
        <div className="grid pt-2 grid-cols-2 gap-[10px] 600px:grid-cols-2 md:grid-cols-3 md:gap-[8px] lg:grid-cols-4 lg:gap-[10px] xl:grid-cols-5 2xl:grid-cols-6 xl:gap-[10px]">
          {products?.map((product, index) => (
            <Fragment key={product._id}>
              <ProductCard data={product} i={index} />
            </Fragment>
          ))}
        </div>
      ) : (
        <h1 className=" absolute left-[50%] top-[50%] text-[19px] font-Roboto fornt-[400]">
          No product Yeat
        </h1>
      )}
    </>
  );
}

export default QueryProduct;
