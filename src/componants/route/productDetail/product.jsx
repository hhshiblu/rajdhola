import { getproduct } from "@/allActions/product/product";

import ProductDetails from "./productDetails";

async function Product({ id }) {
  const product = await getproduct(id);

  return (
    <>
      <ProductDetails data={product} />;
    </>
  );
}

export default Product;
