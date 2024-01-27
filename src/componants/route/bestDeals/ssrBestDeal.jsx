import { getqueryProduct } from "@/allActions/product/product";

import { Fragment } from "react";
import ProductCardA from "../productCard/productCardA";
import ProductCardAMin from "../productCard/ProductCardAMin";
export const dynamic = "force-dynamic";
async function SsrBestDeals() {
  const queryUnderProduct = await getqueryProduct();

  return (
    <div>
      <div className=" hidden 600px:flex px-3 gap-[7px]  ">
        {queryUnderProduct.map((product, i) => (
          <Fragment key={i}>
            <ProductCardA p={product} />
          </Fragment>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 600px:hidden">
        {queryUnderProduct.slice(0, 4).map((product, i) => (
          <Fragment key={i}>
            <ProductCardAMin p={product} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default SsrBestDeals;
