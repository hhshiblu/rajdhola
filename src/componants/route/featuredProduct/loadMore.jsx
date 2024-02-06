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

// LoadMore.js// LoadMore.js// LoadMore.js
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

function LoadMore({ onLoadMore, hasMore }) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once until the component is unmounted
  });
  const shouldLoadMore = useRef(true);

  useEffect(() => {
    console.log("LoadMore - hasMore:", hasMore);

    if (inView && shouldLoadMore.current) {
      shouldLoadMore.current = false;
      onLoadMore();
    }
  }, [inView, onLoadMore, hasMore]);

  useEffect(() => {
    shouldLoadMore.current = true;
  }, [onLoadMore, hasMore]);

  return (
    <div ref={ref}>
      {inView && (
        <>
          {" "}
          {hasMore ? (
            <section className="flex justify-center items-center w-full pt-6">
              <Image
                src="/spiner.svg" // Assuming the spinner image path is correct
                alt="spinner"
                width={80}
                height={80}
                className="object-contain"
              />
            </section>
          ) : (
            <div className="text-center pt-4">
              <p>No more products available.</p>
            </div>
          )}{" "}
        </>
      )}
    </div>
  );
}

export default LoadMore;
