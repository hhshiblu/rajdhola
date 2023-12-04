import React from "react";
import ProductDetails from "../productDetail/productDetails";
import { getproduct } from "@/allActions/product/product";

async function Hello({ id }) {
  const product = await getproduct(id);
  return (
    <div>
      <ProductDetails data={product} />
    </div>
  );
}

export default Hello;
