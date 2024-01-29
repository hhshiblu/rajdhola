"use client";

import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

function LoadMore({ onLoadMore }) {
  const { ref, inView } = useInView();
  const shouldLoadMore = useRef(true);

  useEffect(() => {
    if (inView && shouldLoadMore.current) {
      shouldLoadMore.current = false;
      onLoadMore();
    }
  }, [inView, onLoadMore]);

  useEffect(() => {
    shouldLoadMore.current = true;
  }, [onLoadMore]);

  return (
    <div ref={ref}>
      {inView && (
        <section className="flex justify-center items-center w-full">
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </section>
      )}
    </div>
  );
}

export default LoadMore;
