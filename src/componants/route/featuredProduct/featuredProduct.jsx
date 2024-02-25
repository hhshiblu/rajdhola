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

// import React, { useEffect, useState } from "react";
// import LoadMore from "./loadMore";
// import { getAllproductsFeature } from "@/allActions/product/product";

// function FeaturedProduct() {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(2);

//   const loadMoreProducts = async () => {
//     const newProducts = await getAllproductsFeature(page);
//     if (newProducts.length > 0) {
//       setProducts([...products, ...newProducts]);
//       setPage(page + 1);
//     }
//   };

//   useEffect(() => {
//     const loadInitialProducts = async () => {
//       const initialProducts = await getAllproductsFeature(1);
//       setProducts(initialProducts);
//     };

//     loadInitialProducts();
//   }, []);

//   return (
//     <>
//       <section className={`600px:w-11/12 w-[98%] mx-auto py-6 `}>
//         <div
//           className={`text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-slate-600 pb-4 pl-2`}
//         >
//           <h2>For you !</h2>
//         </div>

//         <div className="grid grid-cols-2 gap-[10px] md:grid-cols-3 md:gap-[10px] lg:grid-cols-5 lg:gap-[10px] xl:grid-cols-6 xl:gap-[10px]">
//           {products}
//         </div>
//         <LoadMore onLoadMore={loadMoreProducts} />
//       </section>
//     </>
//   );
// }

// export default FeaturedProduct;
// FeaturedProduct.js
import React, { Fragment } from "react";
import LoadMore from "./loadMore";
import { getAllproductsFeature } from "@/allActions/product/product";
import ProductCard from "../productCard/productCard";
import { useInView } from "react-intersection-observer";

async function FeaturedProduct() {
  const newProducts = await getAllproductsFeature(1);

  return (
    <>
      <section className={`600px:w-11/12 w-[98%] mx-auto py-6 `}>
        <div
          className={`text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-slate-600 pb-4 pl-2`}
        >
          <h2>For you !</h2>
        </div>

        <div className="grid grid-cols-2 gap-[10px] 600px:grid-cols-3 800px:grid-cols-4 md:gap-[8px] lg:grid-cols-5 lg:gap-[10px] xl:grid-cols-6 2xl:grid-cols-7 xl:gap-[10px]">
          {newProducts.map((product, index) => (
            <Fragment key={product._id}>
              <ProductCard data={product} i={index} />
            </Fragment>
          ))}

          <LoadMore />
        </div>
      </section>
    </>
  );
}

export default FeaturedProduct;
