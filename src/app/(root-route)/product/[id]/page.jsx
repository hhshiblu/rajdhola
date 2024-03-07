import { getproduct } from "@/allActions/product/product";
import ProductDetails from "@/componants/route/productDetail/productDetails";
import SuggestProduct from "@/componants/route/suggestProduct/suggestProduct";
import { deleteFiles } from "@/libs/uploadimage";

import { Suspense } from "react";

async function Page({ params }) {
  const product = await getproduct(params.id);
  const fileNameToDelete = "rajdhola.jpg";
  const res = await deleteFiles(fileNameToDelete);
  console.log(res);
  return (
    <div>
      <ProductDetails data={product} />

      <Suspense fallback={<p>load relative ...</p>}>
        <SuggestProduct id={params.id} />
      </Suspense>
    </div>
  );
}

export default Page;
