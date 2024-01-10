"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getAllproductsFeature } from "@/allActions/product/product";

let page = 2;

function LoadMore({ products }) {
  const [data, setdata] = useState(products);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMoreProducts) {
      getAllproductsFeature(page)
        .then((newProducts) => {
          if (newProducts.length > 0) {
            setdata([...data, ...newProducts]);
            page++;
          } else {
            setHasMoreProducts(false);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [inView, data, hasMoreProducts]);

  return (
    <div>
      <section>
        <div className="grid grid-cols-2 gap-[10px] md:grid-cols-3 md:gap-[10px] lg:grid-cols-5 lg:gap-[10px] xl:grid-cols-6 xl:gap-[10px]">
          {data}
        </div>
      </section>
      {hasMoreProducts ? (
        <section ref={ref}>
          <div className="w-full text-center">
            <h4>loading...</h4>
          </div>
        </section>
      ) : (
        <section>
          <div className="w-full text-center">
            <h4>No more products</h4>
          </div>
        </section>
      )}
    </div>
  );
}

export default LoadMore;
