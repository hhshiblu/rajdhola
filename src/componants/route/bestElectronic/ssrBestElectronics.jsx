import { Fragment } from "react";

import { getbestElectronic } from "@/allActions/product/product";
import ProductImageCard from "../productCard/productImageCard";
import ProductImageCardMin from "../productCard/productImageCardMin";

async function SsrBestElectronic() {
  const bestElectronic = await getbestElectronic();

  return (
    <div>
      <div className=" hidden 600px:flex px-3 gap-[7px]  ">
        {bestElectronic.map((product, i) => (
          <Fragment key={i}>
            <ProductImageCard p={product} />
          </Fragment>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 600px:hidden">
        {bestElectronic.slice(0, 4).map((product, i) => (
          <Fragment key={i}>
            <ProductImageCardMin p={product} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default SsrBestElectronic;
