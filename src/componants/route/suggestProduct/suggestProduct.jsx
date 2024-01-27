import Link from "next/link";
import ProductsCard from "../productCard/ProductsCard";
import { getRelatedProduct } from "@/allActions/product/product";

async function SuggestProduct({ id }) {
  const relatedProducts = await getRelatedProduct(id);

  return (
    <div className="bg-white">
      <div className="w-[90%]   h-full mx-auto">
        <div className="flex pb-2">
          <h2 className="text-[16px]  sm:text-[18px] md:text-[20px] font-medium text-slate-600">
            Related Product
          </h2>
          <div className=" text-[15px] pl-6 hover:underline hover:text-red-500 cursor-pointer text-[#007185]">
            <Link href={`/products?maxPrice=${500}`}>See more</Link>
          </div>
        </div>
        <hr />
        <hr />
        <div className="pt-4">
          <div className="grid grid-cols-2 gap-[10px] md:grid-cols-3 md:gap-[10px] lg:grid-cols-5 lg:gap-[10px] xl:grid-cols-6 xl:gap-[10px]  ">
            {relatedProducts?.map((data, i) => (
              <ProductsCard data={data} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestProduct;
