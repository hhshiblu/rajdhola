"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React, { useCallback, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Sort from "./sort";
import Rating from "@/componants/route/rating/rating";

function PhoneFilter({
  childcate,
  searchParam,
  totalProducts,
  totalPages,
  category,
}) {
  const ref = useRef();
  const minref = useRef(null);
  const maxref = useRef(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sideFilter, setSideFilter] = useState(false);
  const categoryParams = searchParam._c;
  const selectedSortOptionRef = useRef("");

  const subcategoryParams = searchParam._subc;
  const router = useRouter();
  const rating = searchParams.rating;
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [selectedRating, setSelectedRating] = useState(null);
  const sortFunction = (e) => {
    const option = (selectedSortOptionRef.current = e.target.value);
    router.push(pathname + "?" + createQueryString("_sortby", option));
  };
  const handleDivClick = (rating) => {
    setSelectedRating(rating);
    router.push(pathname + "?" + createQueryString("rating", rating));
  };

  const MaxHandler = () => {
    const max = maxref.current.value;

    router.push(pathname + "?" + createQueryString("_greaterThan", max));
  };
  const MinHandler = () => {
    const min = minref.current.value;

    router.push(pathname + "?" + createQueryString("_lessThan", min));
  };

  const withoutSideDiv = (e) => {
    if (e.target.contains(ref.current)) {
      setSideFilter(false);
    }
  };

  return (
    <div>
      <div
        ref={ref}
        className={
          sideFilter
            ? "fixed top-0 left-0 w-full h-screen bg-[#00000082]  z-[20000] "
            : null
        }
        onClick={(e) => withoutSideDiv(e)}
      ></div>
      <div>
        <div className="bg-white shadow-lg border-b flex justify-between px-4 py-2 text-[14px]">
          <h1>
            {" "}
            1 - {totalPages} of over {totalProducts} results
          </h1>
          <Sort sideFilter={sideFilter} setSideFilter={setSideFilter} />
        </div>
        <div className="bg-gray-50 text-gray-700">
          {categoryParams && (
            <p className="flex items-center justify-start ml-[-4px] text-[14px] font-[400] pt-1 pl-3">
              <IoIosArrowBack size={14} /> {categoryParams}
            </p>
          )}
          {categoryParams && subcategoryParams && (
            <p className="flex items-center justify-start pl-4 text-[14px] font-[400]  pb-[2px]">
              <IoIosArrowBack size={14} /> {subcategoryParams}
            </p>
          )}
          <hr />
          <hr />
          <div className="flex flex-row scroll_x_hiiden overflow-x-auto w-full whitespace-nowrap px-2 pb-2">
            {categoryParams &&
              subcategoryParams &&
              childcate?.map((cate, i) => (
                <h2
                  className="text-[16px] pt-1 pr-4 cursor-pointer hover:text-red-500 leading-[20px]  inline-block"
                  key={i}
                  onClick={() =>
                    router.push(
                      pathname + "?" + createQueryString("_ch", cate.name)
                    )
                  }
                >
                  {cate.name}
                </h2>
              ))}
          </div>
        </div>

        <div
          className="fixed top-0 right-0 w-[200px] h-screen bg-white z-[39999] shadow-2xl overflow-y-auto transition-transform duration-500 ease-in-out"
          style={{
            transform: sideFilter ? "translateX(0px)" : "translateX(100%)",
          }}
        >
          <div className=" border px-[2px] border-blue-200 shadow-md rounded-md ">
            <h1 className="text-center text-[14px] pt-4 pb-2">Custom plan</h1>
            <hr />
            <div className="pl-2">
              <h1 className="py-[6px] font-[500] text-[13px]">DepartMent</h1>
              <hr />
              {categoryParams ? (
                <p className="flex items-center justify-start ml-[-4px] text-[15px] font-[500] pt-1">
                  <IoIosArrowBack size={14} /> {categoryParams}
                </p>
              ) : (
                <>
                  {category.map((cate, i) => (
                    <h2
                      className="text-[13px] cursor-pointer hover:text-red-500 leading-[20px]  font-[400]"
                      key={i}
                      onClick={() =>
                        router.push(
                          pathname + "?" + createQueryString("_c", cate.name)
                        )
                      }
                    >
                      {cate.name}
                    </h2>
                  ))}
                </>
              )}
              {categoryParams ? (
                subcategoryParams ? (
                  <p className="flex items-center justify-start pl-[2px] text-[14px] font-[500] ">
                    <IoIosArrowBack size={14} /> {subcategoryParams}
                  </p>
                ) : (
                  <>
                    {category
                      ?.find((cat) => cat.name === categoryParams)
                      .children?.map(
                        (cate, i) =>
                          cate && (
                            <h2
                              className="text-[13px] pl-3 cursor-pointer hover:text-red-500 leading-[20px]  font-[400]"
                              key={i}
                              onClick={() =>
                                router.push(
                                  pathname +
                                    "?" +
                                    createQueryString("_subc", cate.name)
                                )
                              }
                            >
                              {cate.name}
                            </h2>
                          )
                      )}
                  </>
                )
              ) : (
                ""
              )}

              <div className="pt-6">
                <h2 className="text-[15px] font-[500]">price</h2>
                <form action={MinHandler}>
                  <div className="flex items-center gap-[7px] pt-1">
                    <label htmlFor="min"></label>
                    <input
                      ref={minref}
                      type="text"
                      name="min"
                      className="w-[100px] px-[3px] font-[500] text-[14px] border-[2px] border-gray-400 rounded-md text-black "
                      placeholder="Min Price"
                      style={{ backgroundColor: "transparent" }}
                    />

                    <button
                      type="submit"
                      className="border border-gray-400 px-3 rounded-md py-[px]"
                    >
                      Go
                    </button>
                  </div>
                </form>
                <form action={MaxHandler}>
                  <div className="flex items-center gap-[7px] pt-1">
                    <label htmlFor="mxn"></label>
                    <input
                      ref={maxref}
                      name="max"
                      type="text"
                      className="w-[100px] px-[3px] font-[500] text-[14px] border-[2px] border-gray-400 rounded-md text-black"
                      placeholder="Max Price"
                      style={{ backgroundColor: "transparent" }}
                    />
                    <button
                      type="submit"
                      className="border border-gray-400 px-3 rounded-md py-[px]"
                    >
                      Go
                    </button>
                  </div>
                </form>
              </div>

              <div className="pt-10 ">
                <div className="py-4 ext-[15px] font-[500] text-gray-600">
                  {" "}
                  Filter by rating
                </div>
                <div className="pl-2">
                  <div
                    className="flex gap-2 py-1"
                    onClick={() => handleDivClick(5)}
                  >
                    <input
                      type="checkbox"
                      className="cursor-pointer  w-[15px]"
                      checked={rating == 5 || selectedRating === 5}
                    />
                    <Rating rating="5" />
                  </div>
                  <div
                    className="flex gap-2 py-1"
                    onClick={() => handleDivClick(4)}
                  >
                    <input
                      type="checkbox"
                      className="cursor-pointer  w-[15px]"
                      checked={rating == 4 || selectedRating === 4}
                    />
                    <Rating rating="4" />
                  </div>
                  <div
                    className="flex gap-2 py-1"
                    onClick={() => handleDivClick(3)}
                  >
                    <input
                      type="checkbox"
                      className="cursor-pointer  w-[15px]"
                      checked={rating == 3 || selectedRating === 3}
                    />
                    <Rating rating="3" />
                  </div>
                  <div
                    className="flex gap-2 py-1"
                    onClick={() => handleDivClick(2)}
                  >
                    <input
                      type="checkbox"
                      className="cursor-pointer  w-[15px]"
                      checked={rating == 2 || selectedRating === 2}
                    />
                    <Rating rating="2" />
                  </div>
                  <div
                    className="flex gap-2 py-1"
                    onClick={() => handleDivClick(1)}
                  >
                    <input
                      type="checkbox"
                      className="cursor-pointer  w-[15px]"
                      defaultChecked={rating == 1}
                      checked={rating == 1 || selectedRating === 1}
                    />
                    <Rating rating="1" />
                  </div>
                </div>
              </div>
            </div>
            <div className="py-8">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneFilter;
