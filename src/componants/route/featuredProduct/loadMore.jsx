"use client";

// import React, { useEffect, useRef } from "react";
// import { useInView } from "react-intersection-observer";
// import Image from "next/image";

// function LoadMore({ onLoadMore }) {
//   const { ref, inView } = useInView();
//   const shouldLoadMore = useRef(true);

//   useEffect(() => {
//     if (inView && shouldLoadMore.current) {
//       shouldLoadMore.current = false;
//       onLoadMore();
//     }
//   }, [inView, onLoadMore]);

//   useEffect(() => {
//     shouldLoadMore.current = true;
//   }, [onLoadMore]);

//   return (
//     <div ref={ref}>
//       {inView && (
//         <section className="flex justify-center items-center w-full pt-6">
//           <Image
//             src="./spiner.svg"
//             alt="spinner"
//             width={80}
//             height={80}
//             className="object-contain ] "
//           />
//         </section>
//       )}
//     </div>
//   );
// }

// export default LoadMore;
import React, { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProductCard from "../productCard/productCard";
import { getAllproductsFeature } from "@/allActions/product/product";

function LoadMore() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(2); // Maintain page state
  const { ref, inView } = useInView({
    // Optional: Adjust the trigger point
    threshold: 0, // This means the alert will trigger as soon as even one pixel is visible.
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newProducts = await getAllproductsFeature(page);
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setPage((currentPage) => currentPage + 1); // Increment page state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (inView) {
      fetchData();
      // Optionally, ensure this alert happens only once or under specific conditions
      alert("You've scrolled to the next set of products!"); // Be cautious with using alert for UX reasons
    }
  }, [inView]); // Removed page from the dependency array

  return (
    <>
      {products &&
        products.map((product, index) => (
          <div ref={ref} key={index}>
            <ProductCard data={product} i={index} />
          </div>
        ))}
    </>
  );
}

export default LoadMore;
