"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useRef } from "react";
import { FaFilter } from "react-icons/fa6";

function Sort({ sideFilter, setSideFilter }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedSortOptionRef = useRef("");

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const sortFunction = (e) => {
    const option = (selectedSortOptionRef.current = e.target.value);
    router.push(pathname + "?" + createQueryString("_sortby", option));
  };

  return (
    <>
      <div className="hidden 600px:block border px-[2px] border-blue-200 shadow-md rounded-md ">
        <label htmlFor="sortSelect">Sort by:</label>
        <select
          id="sortSelect"
          onChange={(e) => {
            sortFunction(e);
          }}
        >
          <option>Featured</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>
      <div className=" 600px:hidden block">
        <h1
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setSideFilter(true)}
        >
          {" "}
          <FaFilter />
          Filter
        </h1>
      </div>
    </>
  );
}

export default Sort;
