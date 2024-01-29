import { getproduct } from "@/allActions/product/product";
import ProductDetails from "@/componants/route/productDetail/productDetails";
import SuggestProduct from "@/componants/route/suggestProduct/suggestProduct";

import { Suspense } from "react";

async function Page({ params }) {
  const product = await getproduct(params.id);

  return (
    <div className="pb-20">
      <ProductDetails data={product} />

      <Suspense fallback={<p>load relative ...</p>}>
        <SuggestProduct id={params.id} />
      </Suspense>
    </div>
  );
}

export default Page;
