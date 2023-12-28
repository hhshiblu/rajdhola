import { getproduct } from "@/allActions/product/product";
import Header from "@/componants/layout/header";
import ProductDetailLoader from "@/componants/loader/productDetailsLoader";

import Product from "@/componants/route/productDetail/product";
import SuggestProduct from "@/componants/route/suggestProduct/suggestProduct";

import { Suspense } from "react";
import prisma from "../../../../../prisma/prisma";
// export async function generateMetadata({ params }) {
//   const product = await prisma.products.findUnique({
//     where: {
//       id: params.id,
//     },
//   });

//   return {
//     title: product.name,
//     description: product.description,
//   };
// }
function Page({ params }) {
  return (
    <div>
      <Header />
      <Suspense fallback={<ProductDetailLoader />}>
        <Product id={params.id} />
      </Suspense>
      <Suspense fallback={<p>load relative ...</p>}>
        <SuggestProduct id={params.id} />
      </Suspense>
    </div>
  );
}

export default Page;
