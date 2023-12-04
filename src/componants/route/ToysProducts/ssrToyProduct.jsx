import { Fragment } from "react";
import ProductCardA from "../productCard/productCardA";
import ProductCardAMin from "../productCard/ProductCardAMin";
import { getToyProducts } from "@/allActions/product/product";

async function SsrToysProducts() {
  const toyProducts = await getToyProducts();

  return (
    <div>
      <div className=" hidden 600px:flex px-3 gap-[7px]  ">
        {toyProducts.map((product, i) => (
          <Fragment key={i}>
            <ProductCardA p={product} />
          </Fragment>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 600px:hidden">
        {toyProducts.slice(0, 4).map((product, i) => (
          <Fragment key={i}>
            <ProductCardAMin p={product} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default SsrToysProducts;
