// import React, { Fragment } from "react";
// import LoadMore from "./loadMore";
// import { getAllproductsFeature } from "@/allActions/product/product";
// import styles from "@/libs/styles";

// async function FeaturedProduct() {
//   const data = await getAllproductsFeature(1);
//   return (
//     <>
//       <section className={`${styles.section} py-6 `}>
//         <div
//           className={`className="text-[16px]  sm:text-[18px] md:text-[20px] font-semibold text-slate-600 pb-4 pl-2`}
//         >
//           <h2>For you !</h2>
//         </div>

//         <div className=" grid grid-cols-2 gap-[10px] md:grid-cols-3 md:gap-[10px] lg:grid-cols-5 lg:gap-[10px] xl:grid-cols-6 xl:gap-[10px]">
//           {data}
//         </div>
//         <LoadMore />
//       </section>
//     </>
//   );
// }

// export default FeaturedProduct;

"use client";
// FeaturedProduct.js
import React, { useEffect, useState } from "react";
import LoadMore from "./loadMore";
import { getAllproductsFeature } from "@/allActions/product/product";
import styles from "@/libs/styles";

function FeaturedProduct() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(2);

  const loadMoreProducts = async () => {
    const newProducts = await getAllproductsFeature(page);
    if (newProducts.length > 0) {
      setProducts([...products, ...newProducts]);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    // Load initial products when the component mounts
    const loadInitialProducts = async () => {
      const initialProducts = await getAllproductsFeature(1);
      setProducts(initialProducts);
    };

    loadInitialProducts();
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <>
      <section className={`600px:w-11/12 w-[98%] mx-auto py-6 `}>
        <div
          className={`text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-slate-600 pb-4 pl-2`}
        >
          <h2>For you !</h2>
        </div>

        <div className="grid grid-cols-2 gap-[10px] md:grid-cols-3 md:gap-[10px] lg:grid-cols-5 lg:gap-[10px] xl:grid-cols-6 xl:gap-[10px]">
          {products}
        </div>
        <LoadMore onLoadMore={loadMoreProducts} />
      </section>
    </>
  );
}

export default FeaturedProduct;
