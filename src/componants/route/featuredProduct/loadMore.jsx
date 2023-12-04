"use client";
import React, { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";
import { getAllproductsFeature } from "@/allActions/product/product";
let page = 2;
function LoadMore() {
  const [data, setdata] = useState([]);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      getAllproductsFeature(page).then((products) =>
        setdata([...data, ...products])
      );
      page++;
    }
  }, [inView, data]);

  return (
    <div>
      <section>
        <div className="grid grid-cols-2 gap-[10px] md:grid-cols-3 md:gap-[10px] lg:grid-cols-5 lg:gap-[10px] xl:grid-cols-6 xl:gap-[10px]">
          {data}
        </div>
      </section>
      <section ref={ref}>
        <div className="w-full ">
          <h4>loading...</h4>
        </div>
      </section>
    </div>
  );
}

export default LoadMore;
